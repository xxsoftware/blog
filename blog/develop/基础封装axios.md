---
slug: basic-axios
title: 基础封装axios
date: 2022-3-11
authors: 東雲研究所
tags: [axios, javascript]
keywords: [axios, javascript]
---

    这篇就写点基础封装axios要注意的点吧，主要内容还是贴点代码为主。

## 服务端

    服务端就随便写点，一个简单的例子。

```javascript title='server.js'
const express = require('express')
const app = express()
app.use((req, res, next) => {
  //设置一个
  //res.setHeader()
  //res.header == res.set
  res.header({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type,a,token,secret',
  })
  next()
})
app.get('/getlist', (req, res) => {
  res.json({
    code: 200,
    data: { a: 1 },
    msg: '成功',
  })
})
app.listen(8000)
```

## 客户端

    主要还是讲客户端怎么封装 axios

global.config.js 主要就是设定白名单和秘钥之类的，起到一个配置中心的作用，这些也不一定要在前端写死

```javascript title='global.config.js'
export default {
  whiteListApi: ['/a', '/b'],
  secretId: 'helloworld',
  pageSize: [20, 40, 80],
}
```

基础封装里主要封装的是基础配置，请求拦截器和响应拦截器

```javascript title='axios.js'
//配置全局得基础配置
import axios from 'axios'
//配置中心
import webConfig from '@/global.config.js'
//base64
import { Base64 } from 'js-base64'
import router from '@/router'
//baseURL,timeout,header,responseType,withCredentials(是否cookie要附带在请求头下)
//后面的请求用request来发
let request = axios.create({
  //1,基础配置
  baseURL: 'http://localhost:8000/',
  timeout: 30 * 1000,
  responseType: 'json',
  headers: {
    a: '123',
  },
})
//请求拦截器
request.interceptors.request.use(
  config => {
    //token，密钥得设置
    let whiteList = webConfig.whiteListApi
    let url = config.url
    let token = localStorage.getItem('token')
    if (whiteList.indexOf(url) === -1 && token) {
      config.headers.token = token
    }
    //密钥-secretId+特殊算法
    let _secret = Base64.encode(webConfig.secretId + new Date().toString())
    config.headers.secret = _secret
    return config
  },
  error => {
    return Promise.reject(new Error(error))
  },
)
//响应拦截器
request.interceptors.response.use(
  res => {
    //响应的统一处理
    const status = res.data.code || 200
    const message = res.data.msg || '未知错误'
    if (status === 401) {
      alert('你没有权限')
      router.push('/about')
      // 重新登录
      return Promise.reject(new Error(message))
    }
    if (status !== 200) {
      alert('错误码' + status + '   ' + message)
      return Promise.reject(new Error(message))
    }
    return res
  },
  error => {
    //真实项目中，往往使用组件库得消息提示 $waring
    alert(error)
    return Promise.reject(new Error(error))
  },
)
export default request
```

request.js 就处理了进一步的封装 像缓存功能

```javascript title='request.js'
import request from '@/axios'
let myRequest = (function () {
  let mem = {}
  //Map对象更合适
  let hasRequest = []
  return function (config) {
    let url = config.url
    if (mem[url]) {
      return Promise.resolve(mem[url])
    } else {
      if (hasRequest.indexOf(url) !== -1) {
        return Promise.reject({ mes: '请求已经提交' })
      }
      hasRequest.push(url)
      return request({
        ...config,
      }).then(res => {
        hasRequest = hasRequest.filter(item => {
          if (item !== url) {
            return item
          }
        })
        mem[url] = res
        return res
      })
    }
  }
})()
export { myRequest as request, request as initRequest }
```

最后再封装一个专门处理业务的代码，像这个 user.js,到时直接调用就不用再写一边了

```javascript title='user.js'
import { request } from './request'
export const getList = params => {
  return request({
    url: '/getList',
    method: 'get',
    params: {
      ...params,
    },
  })
}
```
