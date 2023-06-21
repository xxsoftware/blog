---
id: customRef
slug: /customRef
title: customRef实现敏感词替换
date: 2022-5-13
authors: 東雲研究所
tags: [vue, customRef]
keywords: [vue, customRef]
---

    customRef可以帮助在输入内容时遇到敏感词汇，做一个*的替换。

## 思路

    1.字符串的替换 str.replace(, 'X')
    2.维护白名单列表 const list = ["sb","SB"]
    3.在输入的过程中需要不断监听输入值是否触发机制，如果触发则替换  customRef

## 实现

```vue title="demo.vue"
<script setup lang="ts">
// 字符串替换函数
import { customRef } from 'vue'
function replaceStr(str) {
  const list = ['sb', 'SB']
  list.forEach(item => {
    str = str.replace(item, '**')
  })
  return str
}

function useReplaceRef(value) {
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        // 赋值
        value = replaceStr(newValue)
        trigger()
      },
    }
  })
}
const msg = useReplaceRef('I am a string')
// v-model没法中间拦截 我们可以使用customRef
</script>

<template>
  <div>
    <input type="text" v-model="msg" />
  </div>
</template>
```

    当然这是很简单的功能用 computed 之类的都行，只是因为 customRef 是个低频的 api，这里写个笔记，而且customRef更容易抽离出来做复用
