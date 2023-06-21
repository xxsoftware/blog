---
id: h-render
slug: /h-render
title: h+render实现函数式组件调用
date: 2022-6-23
authors: 東雲研究所
tags: [vue, render, h]
keywords: [vue, render, h]
---

    用过elementUI的h函数式编程的应该都知道这么一个api吧 this.$message，用了这个api就帮自动弹个弹窗不需要引入别的组件在template里，我们用vue提供的h和render函数可以实现这点。

## 介绍

    > 官方文档：(https://cn.vuejs.org/api/render-function.html#h)
    h函数能把一个组件变成一个Vnode
    > 官方文档：(https://cn.vuejs.org/api/options-rendering.html#render)
    render函数能把Vnode渲染成一个真实dom节点

    通过这两个API我们可以自己写一个alert组件 通过调用h函数变成vnode，然后再准备一个渲染挂载的节点调用render API把vnode渲染挂载在准备好的节点完成渲染。

## 实现

### 写一个 alert 组件

```vue title="alertCom.vue"
<script setup lang="ts">
interface Props {
  message?: string
  position?: 'center' | 'top' | 'bottom'
}
withDefaults(defineProps<Props>(), {
  message: 'Hello World!',
  position: 'center',
})
const show = ref(false)
onMounted(() => {
  show.value = true
})
function cancel() {
  show.value = false
}
</script>

<template>
  <transition name="fade">
    <div v-if="show" fixed left-0 top-0 h-full w-full class="alertContainer">
      <div :class="position" class="alertBox" absolute>
        <div class="ui-modal">
          <header class="header">
            <a href="javascript:;" @click="cancel">&times;</a>
          </header>
          <article class="content">
            <p p-8>
              {{ message }}
            </p>
          </article>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.alertContainer {
  background: rgba(0, 0, 0, 0.1);

  a {
    text-decoration: none;
    outline: none;
    color: #333;
  }
  h1,
  p {
    font-weight: normal;
    margin: 0;
  }
  button {
    outline: none;
    border: none;
  }

  .header {
    height: 45px;
    padding: 0 15px;
    box-sizing: border-box;

    h1 {
      display: inline-block;
      font-size: 18px;
      line-height: 45px;
    }
    a {
      float: right;
      font-size: 20px;
      margin-top: 6px;
    }
  }
  .content {
    padding: 15px;
    box-sizing: border-box;
  }
  .btn-group {
    height: 50px;
    padding: 10px;
    border-top: 1px solid #ddd;
    .btn {
      float: right;
      min-width: 80px;
      height: 30px;
      font-size: 14px;
      border-radius: 3px;
      cursor: pointer;
      &.btn-confirm {
        color: '#fff';
        margin-left: 15px;
      }
      &.btn-cancel {
        background: #ddd;
        color: #666;
      }
    }
  }
}
.alertBox {
  border-radius: 12px;
  box-shadow: 12px 12px 18px rgba(155, 196, 255, 0.42), inset 10px 10px 11px
      rgba(250, 252, 255, 0.48), inset -10px -10px 15px rgba(46, 129, 255, 0.22);
  left: 50%;
  transform: translate(-50%, -50%);
}
.center {
  top: 50%;
}
.top {
  top: 10%;
}
.bottom {
  top: 80%;
}
</style>
```

### 使用 h 和 render 函数

```javascript title="alert.js"
import { h, render } from 'vue'
import alertCom from '~/components/alertCom.vue'

function alert(message, position, time) {
  //  1.调用h把组件变成虚拟dom Vnode
  const VNode = h(alertCom, {
    message,
    position,
    time,
  })
  //   2.准备挂载节点
  const container = document.createElement('div')
  document.body.appendChild(container)
  //   3.渲染虚拟dom到真实DOM
  render(VNode, container)
  if (time) {
    setTimeout(() => {
      document.body.removeChild(container)
    }, time * 1000)
  }
}
export { alert }
```

### 在别的组件中使用 alert 方法

```vue title="xxalert.vue"
<script setup lang="ts">
import { alert } from '~/utils/alert'

const open = () => alert('alert123', 'center')
</script>

<template>
  <div>
    <button @click="open">打开alert</button>
  </div>
</template>
```

## 总结

    1.一般的组件都是基于vue的模板生成器生成的 ，是一种声明式的渲染
    2.特殊的函数调用组件 命令式的写法更加灵活
    3.vue3暴露了一些偏底层的api，我们可以加以利用
