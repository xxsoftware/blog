---
id: ajax-study
slug: /ajax-study
title: ajax学习
date: 2021-3-2
authors: 東雲研究所
tags: [js, http, ajaxs]
keywords: [js, http, ajaxs]
---

## http 协议概述

### 一、http 协议概述

    http协议全称超文本传输协议，大家只要把他理解成为一个服务器与客户端通信的协议即可。
    在http协议的约定下，客户端可以向服务器发送请求，服务器在接收到请求之后，给予服务器响应。

### 二、http 协议请求的常用方法

    本节我们讲解http协议常用的四种方法，用来完成数据的增、删、改、查操作。
        get方法：获取数据
        post方法：提交数据
        put方法：修改数据
        delete方法：删除数据
        这里需要注意的是，http请求本身并不会完成增删改查的基本操作，真正的操作仍然是由服务器完成。
        这些操作仅仅是一种约定，例如：我们用get请求配合服务器程序，可以获取数据，同样也可以增加、删除、修改数据，
        但是为了规范我们的程序，通常只用get方法来查询数据。

### 三、http 协议状态码

    http的状态码被分为5大类，状态码为客户端提供一种理解事务处理结果的便携方式，我们在network工具中可以看到响应头中的状态码。
        1.100~199(信息性状态码)：HTTP/1.1向协议中引入了信息性状态码。
        2.200~299(成功状态码)：客户端发起请求时，这些请求通常都是成功的。服务器有一组用来表示成功的状态码，分别对应不同类型的请求。
        3.300~399(重定向状态码)：重定向状态码要么告知客户端使用替代位置来访问他们所感兴趣的资源，要么就提供一个替代的响应而不是资源的内容。
        4.400~499(客户端状态码)：有时客户端会发送一些服务器无法处理的东西。浏览网页时，我们都看到过臭名昭著的404 Not Found错误码，这只是服务器在告诉我们，它对我们请求的资源一无所知。
        5.500~599(服务器状态码)：又是客户端发送了一条有效请求，服务器自身却出错了，这些会返回5xx状态码。
    下面三个常用的HTTP状态码是我们必须要记住的：
        200 OK：请求被正常处理。
        404 Not Found：服务器找不到客户端请求的资源，也有可能是服务器不想 让你访问而故意返回404
        500 Internal Server Error ：服务器内部错误

### 四、Postman

    Postman可以模拟浏览器向服务器发送请求

## 跨域请求

### 一、同源策略

    同源策略是浏览器的一个安全功能，不同源的客户端脚本在没有明确授权的情况下，不能读写对方资源。所以xyz.com下的js脚本采用ajax读取abc.com里面的文件数据是会被拒绝的。
        相同ip（域名），同端口，则为同源，否则为不同源。
    同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。

### 二、jsonp 原理

    Ajax在默认的情况下是不可以跨域的，但是 script 标签可以通过src属性获取到跨域的js文件。
    因此我们可以想到一个办法，那就是把数据装载到js文件中，然后通过 script 标签跨域引入到当前项目中，进而使用跨域的数据。
    这里需要注意的是，jsonp本质上并不是Ajax，但是功能很像，所以经常会把jsonp方法和Ajax放在一起讨论

### 三、设置响应头

    很多时候我们在制作一个前后端分离的项目时，开发过程是需要跨域的，但是项目部署后并不需要跨域，这个时候，我们可以直接设置服务器允许跨域。
    通过设置http协议的响应头部属性 Access-Control-Allow-Origin 可以允许其他服务器对本服务器进行跨域请求，示例代码如下所示：
        router.get("/getdata",async(ctx)=>{
            ctx.set('Access-Control-Allow-Origin','http://127.0.0.1:8000');
            ctx.body = "data"
        })

## ajax 入门

### 一、Ajax 概述

    在我们之前学习的内容中，向服务器发送请求后，在浏览器中响应的页面都是整页刷新。
    在某些项目中，我们只希望获取页面的局部数据，而不必整页刷新，这个时候就需要使用 Ajax 来实现功能了。
    Ajax 的全称是 Asynchronous JavaScript and XML(异步的 JavaScript 和 XML)。这个概念出现的比较早，那个时候前端和后端的数据交互主要以 XML 格式为主。
    现在仍然存在很多用 xml 交互数据的情况，但是目前主流的数据格式使用的是 json(JavaScirpt 对象表示法)
        Ajax 的优缺点：
            优点：按需获取数据，提升系统性能。
            缺点：异步获取数据，不利于搜索引擎优化。

### 二、Ajax 原理

    考虑一个问题，在之前的学习内容中，我们是如何向服务器发送请求的？

        这里我们列举一下：
            1.在浏览器中直接输入网址
            2.a 标签实现的页面跳转
            3.表单提交
            4.Postman 模拟 http 请求
    Ajax 的原理是通过 XMLhttpRequest 对象向服务器发送异步请求，从服务器获得数据，然后用 javascript 来操作 DOM 而更新页面。这其中最关键的一步就是从服务器获得请求数据。

## ajax 的步骤

            1. 创建 XMLHttpRequest 对象,也就是创建一个异步调用对象.

                var xhr;
                if (window.XMLHttpRequest){
                    xhr = new XMLHttpRequest()                      //  ie7+
                }else{
                    xhr = new ActiveXObject('Microsoft.XMLHTTP');            //ie5、6
                }

            2.创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息   HTTP:Hyper Text Transfer Protocol(超文本传输协议)
                xhr.open('get','http:xxxx',true);  //指定请求的方式   第一个参数是请求的方式 ，第二个参数是请求的地址，第三个参数true为异步 false为同步
                xhr.send();
                xhr.onreadystatechange = function(){ //onreadystatechange获取响应  监听readyState事件 即readyState变化了之后会触发onreadystatechange
                 //xhr.readyState
                //0:请求未初始化
                //1:服务器连接已建立
                //2:请求已接收
                //3:请求处理中
                //4：请求已完成，且响应已就绪
                    if(xhr.readyState===4)
                {
                ajax中接受响应最主要的四个属性：
                    //responseText:文本 ；   responseXML:XML 类型的值为'application/xml' ； status    ；statusText
                if(xhr.status>=200 && xhr.status<300 || xhr.status ==304){
                    console.log(xhr.responseText)
                }
            3.设置响应HTTP请求状态变化的函数
            4.发送HTTP请求.
            5.获取异步调用返回的数据.
            6. 使用JavaScript和DOM实现局部刷新.

## ajax 第三方模块

### 一、概述

在实际项目开发中，我们并不需要自己去封装，已经有很多成熟的 Ajax 第三方模块了，直接使用即可。本节就来说说一个常用的 Ajax 第三方模块-Axios。

### 二、下载并引入 Axios

可以直接使用 npm 下载 Axios，命令如下：  
 npm install axios 因为我们要将 Axios 引入到前端的页面，所以将 axios.js 文件拷贝到静态文件目录。在 node_modules 目录中，找到 axios>dist>axios.min.js 文件，拷贝到 public 目录中即可。然后在模板中用 script 标签来引入此 js 文件。

### 三、jQuery 中的 ajax 方法

    我们之前使用jQuery主要是用来操作DOM，其实jQuery也封装了Ajax方法，实例代码如下所示
        $.ajax({
            url:"/fruits",
            type:"get"
        }).done( res =>{
            console.log(res);
        })
