---
slug: websocket-heart-beat
title: Websocket心跳机制
date: 2022-11-15
authors: 東雲研究所
tags: [webpack]
keywords: [webpack]
---

    上个月有写过几个 websocket.io 的 demo，这几天写了个 websocket 的 demo 顺便更新下博客。
    还是老规矩直接贴代码

## 服务端

```javascript title='package.json'
    "dependencies": {
            "ws": "^8.13.0"
        }
```

```javascript title='app.js'
const websocket = require('ws')
const server = new websocket.Server({
  port: 8000,
})
server.on('connection', handleConnection)
function handleConnection(ws) {
  console.log('connected')
  ws.on('message', handleMessage)
  ws.on('close', handleClose)
  ws.on('error', handleError)
}
function handleClose() {
  console.log('server close')
  this.send(
    JSON.stringify({
      mode: 'MESSAGE',
      msg: 'server is closed',
    }),
  )
}
function handleError(e) {
  console.log('on error', e)
}
function handleMessage(data) {
  const { mode, message } = JSON.parse(data)
  switch (mode) {
    case 'MESSAGE':
      console.log('userMessage')
      this.send(JSON.stringify(JSON.parse(data)))
      break
    case 'HEART_BEAT':
      console.log('heart beat')
      this.send(JSON.stringify(JSON.parse(data)))
      break

    default:
      break
  }
}
```

## 客户端

```vue title='App.vue'
<script setup>
import Ws from './Ws.js'
let ws = null

function wsReConnect() {
  if (!ws) {
    return wsConnect()
  } else if (ws.reconnectingTimer) {
    clearTimeout(ws.reconnectingTimer)
    ws.reconnectingTimer = null
    wsConnect()
  }
}
function wsConnect() {
  ws = Ws.create('ws://localhost:8000/', wsReConnect)
}

const sendMessage = () => {
  if (ws) {
    ws.sendMsg({
      mode: 'MESSAGE',
      msg: 'HELLO',
    })
  }
}
wsConnect()
</script>

<template>
  <div>
    <button @click="sendMessage">SEND</button>
  </div>
</template>

<style scoped></style>
```

```javascript title='Ws.js'
const WS_MODE = {
  MESSAGE: 'MESSAGE',
  HEART_BEAT: 'HEART_BEAT',
}
class Ws extends WebSocket {
  constructor(url, wsReConnect) {
    super(url)
    this.WSurl = url
    this.init()
    this.heartBeatTimer = null
    this.reconnectingTimer = null
    this.wsReConnect = wsReConnect
  }
  init() {
    this.bindEvent()
  }
  bindEvent() {
    this.addEventListener('open', this.handleOpen, false)
    this.addEventListener('message', this.handleMessage, false)
    this.addEventListener('close', this.handleClose, false)
    this.addEventListener('error', this.handleError, false)
  }
  handleOpen() {
    console.log('client connected')
    this.startHeartBeat()
  }
  handleClose() {
    console.log('client Close')
    if (this.heartBeatTimer) {
      clearInterval(this.heartBeatTimer)
      this.heartBeatTimer = null
    }
    if (this.reconnectingTimer) {
      clearTimeout(this.reconnectingTimer)
      this.reconnectingTimer = null
    }

    this.reconnect()
  }
  handleError(e) {
    console.log('client Error', e)
    this.reconnect()
  }
  handleMessage(data) {
    const { mode, msg } = this.receiveMsg(data)
    switch (mode) {
      case WS_MODE.HEART_BEAT:
        console.log('heartbeat', msg)
        break
      case WS_MODE.MESSAGE:
        console.log('message', msg)
        break
      default:
        break
    }
    console.log('client Message')
  }
  startHeartBeat() {
    this.heartBeatTimer = setInterval(() => {
      if (this.readyState === 1) {
        this.sendMsg({
          mode: WS_MODE.HEART_BEAT,
          msg: 'HEART_BEAT',
        })
      } else {
        clearInterval(this.heartBeatTimer)
        this.heartBeatTimer = null
      }

      this.waitForResponse()
    }, 4000)
  }
  reconnect() {
    this.reconnectingTimer = setTimeout(() => {
      this.wsReConnect()
    }, 3000)
  }
  receiveMsg({ data }) {
    return JSON.parse(data)
  }
  waitForResponse() {
    setTimeout(() => {
      this.close()
    }, 2000)
  }
  sendMsg(data) {
    this.readyState === 1 && this.send(JSON.stringify(data))
  }
  static create(url, wsReConnect) {
    return new Ws(url, wsReConnect)
  }
}

export default Ws
```

    就是写了个demo，感觉这个东西也不常用，过久了就会忘记，到时候翻翻博客看看有点印象
