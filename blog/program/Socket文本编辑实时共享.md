---
slug: socket-word
title: Socket文本编辑实时共享
date: 2022-10-2
authors: 東雲研究所
tags: [socket, vue, javascript, express]
keywords: [socket, vue, javascript, express]
---

    上个月我用 socket.io 写个一对一聊天的 demo 玩玩，今天趁国庆节再写一个文本编辑实时共享工具，原型就是 qq 的那种线上文档

## 服务端

```javascript title='package.json'
{
    "dependencies": {
        "socket.io": "^4.6.1",
        "express": "^4.18.2"
    }
}

```

```javascript title='server.js'
const express = require('express')
const { Server } = require('socket.io')
const app = express()

const io = new Server(3000, {
  cors: {
    origin: ['http://localhost:5173'],
  },
})
const data = [
  {
    id: 1,
    name: 'zhangsan',
    age: 7,
    score: 8,
  },
  {
    id: 2,
    name: 'lisi',
    age: 2,
    score: 5,
  },
  {
    id: 3,
    name: 'wangwu',
    age: 6,
    score: 17,
  },
]
io.on('connection', socket => {
  console.log('connected')
  socket.emit('loadData', data)
  socket.on('changeStatus', status => {
    io.emit('changeStatus', status)
  })
  socket.on('input', inputInfo => {
    io.emit('input', inputInfo)
  })
})

app.listen(8000, () => {
  console.log('ok')
})
```

## 客户端

因为是个 demo，基本任务也是完成功能为主，所以客户端也没多写

```javascript title='package.json'
{
 "dependencies": {
    "socket.io-client": "^4.6.1",
    "vue": "^3.2.47"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.1.0",
    "vite": "^4.3.2"
  }
}

```

```vue title='App.vue'
<script setup>
import { io } from 'socket.io-client'
import VTableClick from './directives/tableClick'
import { computed, reactive } from 'vue'
const socket = io('http://localhost:3000')
const state = reactive({
  userList: [],
  status: false,
  field: '',
  index: -1,
  socket,
})
socket.on('loadData', data => {
  state.userList = data
})
socket.on('changeStatus', status => {
  state.status = status
})
socket.on('input', ({ field, index, value }) => {
  console.log(field, index, value)
  state.userList = state.userList.map((userInfo, ind) => {
    if (ind == index) {
      userInfo[field] = value
    }
    return userInfo
  })
})
const statusText = computed(() => (state.status ? '正在修改中' : ''))
</script>

<template>
  <div>
    <p>{{ statusText }}</p>
    <table border="1" width="300" align="center" v-table-click="state">
      <tr>
        <td>id</td>
        <td>name</td>
        <td>age</td>
        <td>score</td>
      </tr>
      <tr v-for="(userInfo, index) of state.userList" :key="index">
        <td>{{ userInfo.id }}</td>
        <td :data-index="index" data-field="name">
          <span>{{ userInfo.name }}</span>
        </td>
        <td :data-index="index" data-field="age">
          <span>{{ userInfo.age }}</span>
        </td>
        <td :data-index="index" data-field="score">
          <span>{{ userInfo.score }}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
td {
  position: relative;
}
</style>
```

因为用了个指令操作 dom，下面再贴个指令的代码

```javascript title='tableClick.js'
import { toRefs } from 'vue'
const tableClick = {
  mounted(el, bindings) {
    const { userList, status, field, index, socket } = toRefs(bindings.value)
    tableClick.el = el
    tableClick.status = status
    tableClick.userList = userList
    tableClick.field = field
    tableClick.index = index
    tableClick.socket = socket.value
    bindEvent()
  },
}
function bindEvent() {
  tableClick.el.addEventListener('click', handleTableClick, false)
}
function createInput(value) {
  const oInput = document.createElement('input')
  tableClick.socket.emit('changeStatus', true)
  oInput.value = value
  oInput.style.cssText = `width:100%;height:100%;border:none;box-sizing:border;position:absolute;top:0;left:0`
  return oInput
}
function handleTableClick(e) {
  const field = getTd(e).dataset.field
  const index = getTd(e).dataset.index
  if (field) {
    const InputText = e.target.innerText
    const oInput = createInput(InputText)
    getTd(e).appendChild(oInput)
    oInput.select()
    tableClick.field.value = field
    tableClick.index.value = index
    oInput.addEventListener('input', oInputInput, false)
    oInput.addEventListener('blur', oInputBlur, false)
  }
}
function oInputInput(e) {
  const value = e.target.value
  tableClick.socket.emit('input', {
    value: value,
    field: tableClick.field.value,
    index: tableClick.index.value,
  })
}
function oInputBlur(e) {
  tableClick.socket.emit('changeStatus', false)
  console.log(e.target.value)
  e.target.remove()
}
function getTd(e) {
  const tag = e.target.tagName.toLowerCase()
  switch (tag) {
    case 'td':
      return e.target
    case 'span':
      return e.target.parentNode
    default:
      return e.target
  }
}
export default tableClick
```
