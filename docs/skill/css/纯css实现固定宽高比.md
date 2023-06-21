---
id: css-Fixed-wh
slug: /css-Fixed-wh
title: 纯css实现固定宽高比
date: 2022-3-11
authors: 東雲研究所
tags: [css]
keywords: [css]
---

    遇到实际开发时经常有这么一个需求，需要实现盒子的宽高比始终喂 2:1 在这种情况下我们可以用纯 css 实现这个需求

## 直接通过 css 宽高属性 aspect-ratio 控制

```html
<style type="text/css">
  .box {
    width: 100%;
    aspect-ratio: 2/1;
    background: red;
  }
</style>
```

## 上面的方法虽然简单 但是在兼容性上还是稍微欠缺点，在一些古早的项目了我们可以这么写

```html
<style type="text/css">
  .box {
    width: 100%;
    height: 0;
    padding-top: 50%;
    background: red;
  }
</style>
```

    这是因为一个机制，当一个盒子高度为 0 时且 padding-top 的值为百分比时，padding-top 的依赖是我们的宽度
    我们依靠这个机制也能完成2/1
    注意：在用第二种方法时因为box的高度为0 所以box里的文本会偏出box。
