---
slug: xx-charge
title: xx记账
date: 2023-06-11
authors: 東雲研究所
tags: [project, vue, miniprogram]
keywords: [project, vue, miniprogram]
draft: true
---

很早就了解与学习过微信小程序开发相关的技术栈与框架，小程序的账号也都已经申请过。之前都是写的uniapp做项目，taro只是写demo玩玩，而这次准备写一个记账相关的小程序，也是时候实战发布一下，顺带记录下整个开发与发布过程。

在线体验：搜索xxsoftware

或者记账扫下图小程序二维码

![小程序二维码](https://img.xxsoftware.top/gh_6f9f88ffcb9a_1280.jpg)

小程序的源码地址：[https://gitee.com/xxsoftware/taro-app](https://gitee.com/xxsoftware/taro-app)

<!-- truncate -->

## 技术栈

小程序所采用的是 Taro + Vue3 + NutUI，之所以选这套技术栈，主要是不想用hbuilder。所以便选用了这套技术栈来进行开发。

## 页面设计

![图片](https://img.xxsoftware.top/taro-app.png)

## 项目配置

### 项目搭建

[安装及使用 | Taro 文档 (jd.com)](https://taro-docs.jd.com/docs/GETTING-STARTED)

```
taro init myApp
```

配置如下

安装完依赖，使用`nr dev:weapp`，在打开微信开发者工具，导入项目即可。

当然网上也有很多集成好了的taro脚手架


### 获取用户信息

要获取用户信息的可以调用 getUserProfile

```javascript
Taro.getUserProfile({
    desc: '获取用户个人信息',
    success: function(res) {
    const userInfo = res.userInfo
    console.log(res.userInfo)
    }
})
```
但是我开发的时候这个api已经调整了，我每次调用只能拿到default的信息，所以只能另辟蹊径了。
```vue title="login.vue"
<script setup lang="ts">
import Taro from '@tarojs/taro';
import { useAuthStore } from '@/store';
const AuthStore = useAuthStore();
const avatarUrl = ref(
  'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
);
function onChooseAvatar(e: any) {
  avatarUrl.value = e.detail.avatarUrl;
}
function commitUser(e) {
  if (e.detail.value.nickname) {
    Taro.setStorageSync('token', '123');
    AuthStore.setUserInfo({
      userName: e.detail.value.nickname,
      avatarUrl: avatarUrl.value
    });
    AuthStore.login();
    Taro.navigateBack();
  } else {
    Taro.showToast({
      title: '必须填写昵称',
      icon: 'error'
    });
  }
}
</script>

<template>
  <basic-layout show-tab-bar>
    <custom-nav-bar title="登录" />
    <nut-row type="flex" justify="space-between" class="pt-2">
      <nut-col :span="4" @tap="Taro.navigateBack()">
        <IconFont
          name="rect-left"
          style="height: var(--nut-button-default-height, 76rpx); width: var(--nut-button-default-height, 76rpx)"
        ></IconFont>
      </nut-col>
      <nut-col :span="4"></nut-col>
      <nut-col :span="12">
        <text
          style="height: var(--nut-button-default-height, 76rpx); line-height: var(--nut-button-default-height, 76rpx)"
        >
          设置头像和昵称
        </text>
      </nut-col>
      <nut-col :span="4"></nut-col>
    </nut-row>
    <form @submit="commitUser">
      <div class="p-5 flex-center">
        <button open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
          <nut-avatar size="large">
            <img :src="avatarUrl" />
          </nut-avatar>
        </button>
      </div>
      <nut-input type="nickname" placeholder="请输入昵称" name="nickname" />
      <view class="fjm">
        <nut-button type="primary" form-type="submit">
          <template #icon>
            <IconFont name="checklist" class="nut-icon-am-jump nut-icon-am-infinite"></IconFont>
          </template>
          确定
        </nut-button>
      </view>
    </form>
  </basic-layout>
</template>

```

    原生里只要在输入框里 设置 type="nickname"  name="nickname"，当你点击输入框时就会弹出是否使用用户的昵称，头像也是一样的，然后我们就需要把原生的这些封装成vue组件
    但是昵称用v-model绑在input上是拿不到的，所以我只能外面套一个表单属性，然后在submit的时候拿到nickname了


### 获取用户唯一标识（openid）

借助微信小程序能十分方便的获取到微信用户。在微信中，为了识别用户，每个用户针对每个公众号或小程序等应用会产生一个安全的 openid，开发者可以通过这个标识识别出用户。

要获取 openid 有以下几种方法(这里以 Taro 为例子，而为 wx 官方文档)，具体代码可在官方文档中查看到。

[Taro.login(option) | Taro 文档 (jd.com)](https://taro-docs.jd.com/taro/docs/apis/open-api/login/)

首先调用`Taro.login()` 获取 5 分钟时长的 code，然向 api.weixin.qq.com 获取 openid 代码如下

```javascript
Taro.login({
  success(res) {
    let code = res.code
    let appId = '小程序->开发管理->开发设置->开发者ID获取'
    let appSecret = '小程序->开发管理->开发设置->开发者ID获取'
    Taro.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      data: {
        appid: appId,
        secret: appSecret,
        js_code: res.code,
        grant_type: 'authorization_code',
      },
      method: 'GET',
      success(res) {
        console.log('openid', res.data.openid) // 得到openid
        console.log('session_key', res.data.session_key) // 得到 session_key
      },
    })
  },
})
```

可以使用云开发可以免去很多步骤。

## 上传发布

当本地开发完毕时，点击右上角的上传，填写版本号相关以及项目备注，然后上传成功如下图
[](https://img.xxsoftware.top/wx-sc.png)
在网页小程序管理的版本管理中可以看到上传的代码
随后提交审核,提交发布就可以让小程序上线了


## 一些开发时的注意事项（坑）

### pinia 持久化

    在用pinia不能用sessionStorage和localStorage，因为小程序中没有sessionStorage 与 localStorage，可以用Taro.setStorageSync和Taro.getStorageSync做到，也可以wx.setStorageSync和wx.getStorageSync做到。

### 微信小程序的css和unocss

    小程序中不支持 <style scoped>，建议使用 cssModules 代替。

    我想尽办法在小程序里配置unocss，但是配置结果只能说不尽人意，因为我在使用的过程中还是需要把设置写在元素的class里，根本做不到原子化的功能。
    然后在用小程序的时候有点习惯用rpx了，反而不太用unocss平常使用的rem

### 微信小程序echarts
    echats的配置是需要绑定一个dom的，但是小程序获取dom又特别麻烦，这点让我在做echarts的封装时动不动报错改了很久，后来就根据网上的方法用ec-canvas，因为微信小程序获取dom除了canvas以外只能拿到数据层面的元素。第二点是echarts非常大，建议去官网定制需要的组件，不然小程序就算分包的话也可能报错

    然后配置完了使用echarts，在微信开发者工具里发现echarts永远置顶，我改了不少z-index都没用，最后查询得出在实际使用中没有问题，只有在微信开发者工具有bug。
```js title="ec-canvas.vue"
<template>
  <canvas
    type="2d"
    class="ec-canvas"
    :canvas-id="canvasId"
    @touchStart="touchStart"
    @touchMove="touchMove"
    @touchEnd="touchEnd"
  ></canvas>
</template>

<script lang="js">
import Taro from "@tarojs/taro";
import WxCanvas from "./wx-canvas";
import * as echarts from "./echarts.min";

export default {
  name: "EcCanvas",
  props: {
    canvasId: {
      type: String,
      default: ""
    },
    ec: {
      type: Object,
      default: null
    }
  },
  mounted() {
    echarts.registerPreprocessor(option => {
      if (option && option.series) {
        if (option.series.length > 0) {
          option.series.forEach(series => {
            series.progressive = 0;
          });
        } else if (typeof option.series === "object") {
          option.series.progressive = 0;
        }
      }
    });
    if (!this.ec) {
      console.warn(
        '组件需绑定 ec 变量，例：<ec-canvas id="mychart-dom-bar" ' +
        'canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>'
      );
      return;
    }
    if (!this.ec.lazyLoad) {
      this.init();
    }
  },
  methods: {
    init(callback) {
      this.initByNewWay(callback);
    },
    initByNewWay(callback) {
      const query = Taro.createSelectorQuery();
      query
        .select(".ec-canvas")
        .fields({
          node: true,
          size: true
        })
        .exec(res => {
          if (!res || res.length == 0 || res[0] == null || res[0].node == null) {
            console.error('未获取到canvas的dom节点,请确认在页面渲染完成后或节点,taro中页面渲染完成的生命周期是useReady');
            return
          }
          const canvasNode = res[0].node;
          // this.canvasNode = canvasNode;

          const canvasDpr = Taro.getSystemInfoSync().pixelRatio;
          const canvasWidth = res[0].width;
          const canvasHeight = res[0].height;

          const ctx = canvasNode.getContext("2d");
          const canvas = new WxCanvas(ctx, this.canvasId, true, canvasNode);
          echarts.setCanvasCreator(() => {
            return canvas;
          });

          if (typeof callback === "function") {
            this.chart = callback(canvas, canvasWidth, canvasHeight, canvasDpr);
          } else if (typeof this.ec.onInit === "function") {
            this.chart = this.ec.onInit(
              canvas,
              canvasWidth,
              canvasHeight,
              canvasDpr
            );
          } else {
            this.triggerEvent('init', {
              canvas,
              width: canvasWidth,
              height: canvasHeight,
              dpr: canvasDpr
            })
          }
        });
    },
    canvasToTempFilePath(opt) {
      const query = Taro.createSelectorQuery().in(this);
      query
        .select(".ec-canvas")
        .fields({
          node: true,
          size: true
        })
        .exec(res => {
          const canvasNode = res[0].node;
          opt.canvas = canvasNode;
          Taro.canvasToTempFilePath(opt);
        });
    },
    touchStart(e) {
      if (this.chart && e.touches.length > 0) {
        const touch = e.touches[0];
        const handler = this.chart.getZr().handler;
        handler.dispatch("mousedown", {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.dispatch("mousemove", {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(this.wrapTouch(e), "start");
      }
    },
    touchMove(e) {
      if (this.chart && e.touches.length > 0) {
        const touch = e.touches[0];
        const handler = this.chart.getZr().handler;
        handler.dispatch("mousemove", {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(this.wrapTouch(e), "change");
      }
    },
    touchEnd(e) {
      if (this.chart) {
        const touch = e.changedTouches ? e.changedTouches[0] : {};
        const handler = this.chart.getZr().handler;
        handler.dispatch("mouseup", {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.dispatch("click", {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(this.wrapTouch(e), "end");
      }
    },
    wrapTouch(event) {
      for (let i = 0; i < event.touches.length; ++i) {
        const touch = event.touches[i];
        touch.offsetX = touch.x;
        touch.offsetY = touch.y;
      }
      return event;
    }
  }
};
</script>

<style>
.ec-canvas {
  width: 100%;
  height: 500rpx;
}
</style>

```
### 微信小程序获取dom
    taro中用ref的方式拿不到正常的dom，只能拿到数据层面的元素，我们可以
``` javascript title="taro ref"

Taro.createSelectorQuery()
      .select('.class')
      .boundingClientRect()
      .exec(res =>console.log(res));
```
### nutUI
    nut-date-picker组件中自定义filter和min-date、max-date同时存在时导致滚动选中错乱，闪烁，相互影响,回弹的问题.
    nut-number-keyboard 存在click和blur 冲突之类的
    只能说nutUI还需要改进啊

## 总结

    trao里的坑还是很多的，尤其是我在处理echarts模块的时候，从获取dom到封装组件基本走一步就是一个坑，而且最烂的就是taro在我使用的时候不支持使用vite，导致每次打包事件都非常久，我还是写一行代码就下意识ctrl+s的那种人，开发体验真的不提了