---
id: shallowRef
slug: /shallowRef
title: 使用ShallowRef对接Redux到Vue
date: 2022-11-23
authors: 東雲研究所
tags: [vue, shallowRef, Redux]
keywords: [vue, shallowRef, Redux]
---

> 官方文档：(https://cn.vuejs.org/api/reactivity-advanced.html#shallowref)

    shallowRef()​是ref() 的浅层作用形式。
    ref会不断递归把深层转成响应式，而shallowRef只会对第一层也就是value进行响应式转换。
    shallowRef() 常常用于对大型数据结构的性能优化或是与外部的状态管理系统集成。
    将 Vue 的响应性系统与外部状态管理方案集成的大致思路是：将外部状态放在一个 shallowRef 中。一个浅层的 ref 中只有它的 .value 属性本身被访问时才是有响应性的，而不关心它内部的值。当外部状态改变时，替换此 ref 的 .value 才会触发更新。

```javascript title="src/store/index.js"
import { shallowRef } from 'vue'

import { createSlice, configureStore } from '@reduxjs/toolkit'
// 创建counterSlice
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
  },
  reducers: {
    increment: state => {
      state.count++
    },
  },
})
// 导出ActionCreater
const { increment } = counterSlice.actions
// 生成store实例
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
})

const refState = shallowRef(store.getState())
// 订阅状态变化
store.subscribe(() => {
  console.log('状态改变', store.getState())
  //   给refState赋值，进行整体覆盖
  refState.value = store.getState()
})
// 导出store实例和actionCreater
export { store, increment, refState }
```

    redux 这边的工作就完成了，因为我平时也不用 redux，如果有问题可以查询官网

```Vue title="app.vue"
<script setup>
    import {store,increment,refState} from "./store"
</script>
<template>
    <div>
        <button @click ="store.dispatch(increment())">{{refState.counter.count}}</button>
    </div>
</template>
```
