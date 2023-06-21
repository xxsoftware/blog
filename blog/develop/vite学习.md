---
slug: vite-study
title: Vite 学习笔记
date: 2022-03-16
authors: 東雲研究所
tags: [vite, webpack, rollup]
keywords: [vite, webpack, rollup]
---

## rollup 区别于 webpack 的特点

    1.不会生成过多的运行代码

    2.可以多模块化规范打包

### rollup 核心配置

```javascript title='rollup.config.js'
// 打包第三方库的插件
const resolve = require('@rollup/plugin-node-resolve')
// 压缩用的插件
const terser = require('@rollup/plugin-terser')
module.export = {
  // 入口,必须
  input: './app.js',
  output: {
    // 输出目录
    // dir和file只能存在一个
    dir: '/dist',
    // 输出文件名
    file: './dist/bundle.js',
    // format是输出模块化方式。cjs就是commonjs规范,es就是esmodule的引入规范，iife是浏览器版本，umd,amd
    format: 'cjs',
  },
  // 忽略，不打包到bundle
  external: ['lodash-es'],
  // 插件
  plugins: [resolve(), terser()],
}
```

rollup 打包相对于 webpack 功能和生态比较匮乏，但是有 external 和 不会生成过多的运行代码等特点，基本是专门用来处理 js 的，vite 底层用的就是 rollup 打包

## vite

### vite 的特点

    1.vite最大的特点就是利用esm，让代码不像传统的构建工具一样去分析引入，打包构建，而是直接保持模块化，这样省去了大量的编译时间，大量提升代码更改后的响应速度。

    2.构建方面，vite其实使用的就是rollup。

    3.vite是指定一个html为入口，而rollup和webpack都是以js为入口，vite可以零配置，在大多数的项目中vite不需要额外配置，可以拿来就用。

### 处理各种资源

    1.天生支持css以及预处理语言。

    2.支持ts(jsx还是需要配置的)。

    3.能处理各种资源。

### 基础配置

```javascript title='vite.config.js'
import { defineConfig } from 'vite'
export default defineConfig({
  resolve: {
    extension: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': __dirname + '/src',
    },
  },
  build: {
    assetsInlineLimit: 20000,
    // 小于20MB的图片都会转为base64
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://www.aaa.com',
        rewrite: path => {
          return path.replace('/api', '')
        },
      },
    },
    header: {},
  },
})
```

### 特殊语言

    像vue或者jsx这种语言，vite没有插件也是识别不了的

```javascript title='vite.config.js'
        import vue from '@vitejs/plugin-vue'

    // 然后在插件里注册

        plugins: [vue()]

    // 如果需要用jsx,则需要在defineConfig里配置

        esbuild:{
            jsxFactory:"h",
            jsxFragment:"Fragment",
            jsxInject:"import {h} from 'vue'"
        }
```

### 代码分割

    Vite会自动分割异步引入代码，第三方库vendor或者特殊的拆分需要借助rollup的manualChunks

```javascript title='vite.config.js'
build: {
  rollupOptions: {
    manualChunks: {
      vendor: ['vue', 'vue-router']
    }
  }
}

// 在rollupOptions下的manualChunks下的vendor 写入打包需要分割的第三方库代码，打包完成后vendor.js就包含这些第三方库了，如果太多库不想写也可以manualChunks写个函数
```

    manualChunks: id => { if (id.includes('node_modules')) { return 'vendor' } }

    vite在打包方面跟rollup一样的的配置要写在build的rollupOptions中

### 更改入口和出口名名字

```javascript title='vite.config.js'
export default defineConfig({
  build: {
    rollupOptions: {
      input: './index.build.html',
      // 修改入口文件
      output: {
        dir: 'dist2',
        // 修改路径
        entryFileNames: 'bundle.js',
        chunkFileNames: '[name].chunks.js',
        // 修改出口文件名
      },
    },
  },
})
```

    在rollupOptions下的input和output可以更改
    但是更改build下的rollupOptions下的input，只会改变打包时的html文件，不会改变在跑开发模式下的入口文件

### 共享配置

```javascript title='vite.config.js'
    base:"/www.xxx.com",
    //基础路径，只会的所有路径都会加上这个前缀，类似webpack里的publicPath
    root:"/",
    //根目录，就是index.html存在的文件夹
    publicDir:"/static",
    //共享目录，一般资源在这个目录下面
```

    vite可配置的地方相对于webpack较少，主打一个开箱即用。

### 自带模板仓库

    生成Vue3最新模板，就完成了类似vue-cli脚手架的一个作用
    npm create vite@latest my-app -- --template vue

### 一些好用的插件

#### vitejs-plugin-legacy

        默认打包完成的html还是使用esm的方式，如果要兼容老的浏览器则需要vitejs-plugin-legacy，在plugins注册一下就能用，会自动编译成支持老浏览器的版本

#### unplugin-auto-import 和 unplugin-vue-component

    unplugin-vue-component自动引入组件，unplugin-vue-component不用引入ref之类的hook，大大方便我们写代码

#### vite-plugin-compression

    打包的时候提供gzip压缩，体积更小

#### vite-plugin-imagemin

    打包的时候提供图像压缩，不需要用户自行处理。

```

```
