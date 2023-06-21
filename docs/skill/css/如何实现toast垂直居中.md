---
id: toast-center
slug: /toast-center
title: 如何实现toast垂直居中
date: 2023-2-11
authors: 東雲研究所
tags: [css]
keywords: [css]
---

    toast效果是前端非常常见的一种效果，就是中间有个文本弹框的效果

## 第 1 种方法

    .toast{
        position: fixed;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
    }
    这是一个非常经典的居中，但是有一个缺点那就是他把transform属性占用掉了,如果我要写个hover让他scale一下大小就很烦了
    还有一个问题就是文字多的情况下会换行

## 第 2 种方法

    .toast{
        position:fixed;
        width:fit-content;
        inset-inline:1rem
        margin-inline:auto;
        }
    这个就比较好了，不过兼容性可能有点问题

## 第 3 种方法

    .toast{
    position:fixed;
    width:fit-content;
    left:1rem;
    right:1rem;
    margin-left:auto;
    margin-right:auto;
    }
    第三个就完美了

这篇文章是看(张鑫旭老师的视频)[https://www.bilibili.com/video/BV19Y411q7kH/?spm_id_from=333.999.0.0&vd_source=ca3c9326184c271fd49027dac62987a6]学的，如果要深入 css，可以购买《css 新世界》
