---
id: one-line-js
slug: /one-line-js
title: 一行代码js
date: 2021-10-21
authors: 東雲研究所
tags: [js]
keywords: [js]
---

记录一下自己在 js 学习中常用到的一些一行方法，进行封装使用

## js 一行代码小技巧

### 获取 URL 参数

    let params = new URLSearchParams(window.location.search)
    之后可以 params.get("paramName")之类的拿到参数

### 对象转 url 字符串

    Object.keys(param).map(key => `${key}=${param[key]}`).join('&')

### 检测对象是否为空

    const isEmpty = obj => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;

### 深度克隆对象

    let cloneObj = JSON.parse(JSON.stringify(obj))
    方法 symbol 属性值为undefined 都会被扔掉

### 生成随机颜色

    let randomColor = '###' + Math.floor(Math.random() * 16777215).toString(16)

### 计算数组中的最大值

    let max = Math.max(...arr)

### 生成指定范围内的随机整数

    let randomInt = (min, max) =>  Math.floor(Math.random() * (max - min + 1) + min)

### 生成随机字符串

    const randomString = () => Math.random().toString(36).slice(2);

### 计算两个日期之间的间隔

    const dayDif = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000)
    dayDif(new Date("2021-11-3"), new Date("2022-2-1"))  // 90

### 查找日期位于一年中的第几天

    const dayOfYear = (date) => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

    dayOfYear(new Date()); // 307

### 检查日期是否为工作日

    const isWeekday = (date) => date.getDay() % 6 !== 0
    前排提醒 月份要减-1
    例如isWeekday(new Date(2022,0,1))其实测得是2022年的一月一日

### 保留小数点

    const toFixed = (n, fixed) => ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed);
    // Examples
    toFixed(25.198726354, 1);       // 25.1
    toFixed(25.198726354, 2);       // 25.19
    tips:输出后是字符串，不是真正的数字

### 检查浏览器是否支持触摸事件

    const touchSupported = () => ('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch);

    console.log(touchSupported());
    // Result: will return true if touch events are supported, false if not

### 滚动到页面顶部

    const gotoTop = () => window.scrollTo(0, 0)

### 获取所有参数平均值

    const average = (...args) => args.reduce((a, b) => a + b) / args.length;

### 数组去重

    const removeDuplicates = (arr) => [...new Set(arr)];

### 复制内容到剪切板

    const copyToClipboard = (text) => navigator.clipboard.writeText(text);

### 清除所有 cookie

    const clearCookies = document.cookie.split(';').forEach(cookie => document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`));

### 获取选中的文本

    const getSelectedText = () => window.getSelection().toString();

### 检测是否是黑暗模式

    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

### 打开浏览器打印框

    const showPrintDialog = () => window.print()

## 推荐 2 个网站，

    1. www.30secondsofcode.org （30 seconds of code）
    2. 1loc.dev （Favorite JavaScript Utilities
    in single line of code! No more!）
