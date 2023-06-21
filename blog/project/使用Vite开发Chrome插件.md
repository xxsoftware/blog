---
slug: Vite-chrome-extension
title: 使用Vite开发Chrome插件
date: 2021-09-18
authors: 東雲研究所
tags: [chrome, plugin, vue, develop]
keywords: [chrome, plugin, vue, develop]
description: 使用 Vue2 开发一个 Chrome 插件
---

![mini](https://img.xxsoftware.top//mini.jpg)

<!-- truncate -->

## 前言

之前学习开发 Chrome 插件的时候，用的是原生的技术，效率低，而这次发现了一个基于 vite 的浏览器插件入门模板，分享学习一下

相关代码开源[github 地址](https://github.com/antfu/vitesse-webext)

## 环境搭建

```sh
npx degit antfu/vitesse-webext my-webext
cd my-webext
pnpm i
```

安装完就可以跑了

### 项目结构

```
src - main source.
    contentScript - scripts and components to be injected as content_script
    background - scripts for background.
    components - auto-imported Vue components that are shared in popup and options page.
    styles - styles shared in popup and options page
    assets - assets used in Vue components
    manifest.ts - manifest for the extension.
extension - extension package root.
    assets - static assets (mainly for manifest.json).
    dist - built files, also serve stub entry for Vite on development.
scripts - development and bundling helper scripts.


```

    开发模式 pnpm dev
    如果是 firefox pnpm start:firefox
    生成扩展pnpm build，然后将文件打包在 extension 以下

整体的开发和 vue 开发基本上没太大的区别，不过有很多 api

在 src/popup/App.vue 可以修改扩展框弹出的内容

```vue title="src/popup/App.vue"
<script setup lang="ts">
import { storageDemo } from '~/logic/storage'

function openOptionsPage() {
  browser.runtime.openOptionsPage()
}
</script>

<template>
  <main class="w-[300px] px-4 py-5 text-center text-gray-700">
    <Logo />
    <div>Popup</div>
    <SharedSubtitle />

    <button class="btn mt-2" @click="openOptionsPage">Open Options</button>
    <div class="mt-2">
      <span class="opacity-50">Storage:</span> {{ storageDemo }}
    </div>
  </main>
</template>
```

## 相关模板

[vitesse-webext](https://github.com/antfu/vitesse-webext)

[plasmo](https://www.plasmo.com/)

## 整体体验

当时写 Chrome 插件的效率比较低，还不能用框架。现在基于 vite 写一个插件就和编写网页一样简单，也非常感谢 antfu 大佬能带来这么一款模板脚手架，我目前仅仅只是体验了一下，写了几个跳转页面 demo,还需要了解更多 api
