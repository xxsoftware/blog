---
slug: socket-one-to-one
title: socket1对1聊天
date: 2022-9-18
authors: 東雲研究所
tags: [socket, vue, javascript, express]
keywords: [socket, vue, javascript, express]
---

    最近公司有用 socket.io，我做了解写个一对一聊天的 demo 玩玩

## 服务端

```javascript title='package.json'
{
    "dependencies": {
        "express": "^4.18.2",
        "socket.io": "^4.6.1"
    }
}

```

```javascript title='server.js'
const express = require('express')
const app = express()
const { Server } = require('socket.io')

const io = new Server(3000, {
  cors: {
    origin: 'http://localhost:5173',
  },
})
const userList = []
io.on('connection', socket => {
  const id = socket.id
  const username = socket.handshake.query.username
  if (!username) {
    return
  }
  const userInfo = userList.find(user => user.username === username)
  if (userInfo) {
    userInfo.id = id
  } else {
    userList.push({ id, username })
  }
  io.emit('online', { userList })
  socket.on('send', ({ fromUserName, targetId, msg }) => {
    const targetSocket = io.sockets.sockets.get(targetId)
    const toUser = userList.find(user => user.id === targetId)
    targetSocket.emit('receive', {
      fromUserName,
      toUserName: toUser.username,
      msg,
      dateTime: new Date().getTime(),
    })
  })
})
app.listen(8000, () => {
  console.log('ok')
})
```

## 客户端

客户端就展示一个组件吧，其他部分都不是核心

```javascript title='package.json'
{
  "dependencies": {
    "socket.io-client": "^4.6.1",
    "vue": "^3.2.47",
    "vue-router": "^4.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.1.0",
    "vite": "^4.3.2"
  }
}

```

```vue title='chattingVue.vue'
<script setup>
import { io } from 'socket.io-client'
import { computed } from 'vue'
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const query = route.query
const username = ref(query.username)
const userList = ref([])
const msgText = ref('')
const targetUser = reactive({})
const msgBox = reactive({})
const socket = io('http://localhost:3000', {
  query: {
    username: username.value,
  },
})
socket.on('online', data => {
  userList.value = data.userList
  console.log(userList.value)
})
socket.on('error', err => {
  console.log(err)
})
socket.on('receive', data => {
  appendMsg(data)
})
const selectUser = userInfo => {
  targetUser.username = userInfo.username
  targetUser.id = userInfo.id
}
const messageList = computed(() => {
  return msgBox[username.value] && targetUser.username
    ? msgBox[username.value].filter(item => {
        return (
          item.fromUserName === targetUser.username ||
          item.toUserName === targetUser.username
        )
      })
    : []
})
const SendMsg = () => {
  if (!msgText.value) return
  appendMsg({
    fromUserName: username,
    toUserName: targetUser.username,
    msg: msgText,
    dateTime: new Date().getTime(),
  })
  socket.emit('send', {
    fromUserName: username.value,
    targetId: targetUser.id,
    msg: msgText.value,
  })
}
function appendMsg(data) {
  !msgBox[username.value] && (msgBox[username.value] = [])
  msgBox[username.value].push(data)
}
</script>

<template>
  <div>
    <ul>
      <template v-for="userInfo of userList" :key="userInfo.id">
        <li v-if="userInfo.username === username">{{ userInfo.username }}</li>
        <li v-else>
          <a href="javascript:;" @click="selectUser(userInfo)">
            {{ userInfo.username }}
          </a>
        </li>
      </template>
    </ul>
    <div v-if="targetUser.username">
      <h3>{{ targetUser.username }}</h3>
      <input type="text" placeholder="Input some..." v-model="msgText" />
      <button @click="SendMsg">send</button>
      <div>
        <ul>
          <li v-for="(msg, index) of messageList" :key="index">
            <p>{{ msg.fromUserName }}:{{ new Date(msg.dateTime) }}</p>
            <p>{{ msg.msg }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
```
