---
slug: webpack-study
title: webpack学习集合
date: 2022-12-15
authors: 東雲研究所
tags: [webpack]
keywords: [webpack]
---

## 简介

    webpack = web package

    webpack 是一个现代 JS 应用程序的静态模块打包器(module bundle) 模块(模块化开发，可以提高开发效率，避免重复造轮子) 打包(将各个模块按照一定的规律组装起来)

    官网 ：https://webpack.js.org/

    特点

    功能强大(打包、构建、发布 Web 服务)

    学习成本高

## 功能

    1.将多个文件合并(打包)，减少 HTTP 请求次数，从而提高效率

    2.对代码进行编译，确保浏览器兼容性

    3.对代码进行压缩，减少文件体积，提高加载速度

    4.检查代码格式，确保代码质量

    5.提供热更新服务，提高开发效率

    6.针对不同环境，提供不同的打包策略

## webpack 基础配置

    1.entry: 必须项，指定要打包的（入口）文件

    2.output: 必须项，最后产出 js 配置

    3.mode:在 webpack4 以后必填

    指定打包输出类型，默认为 production。可选值有 debug 和 production。

    debug 模式下，打包输出将显示每个模块的内容。

    production 模式下，打包输出将使用“压缩”的压缩质量，这意味着打包时不需要

    4.module: 可选项，配置模块化处理器，loader 编写的地方

    5.plugins:可选项，插件列表

    6.optimization:可选项，优化相关。指定压缩策略，默认为 2。0 代表不压缩(minify)，1 代表 使用“平均策略”压缩（删除无用代码），但仍然使用不同的替代策略。

    7.devServer:可选项，开发模式配置。

    8.resolve:可选项，提供一些简化功能。

默认配置在 webpack.config.js 中展示。以 commonjs 模式运行。

```javascript title='webpack.config.js'

    module.export ={
        <!-- entry:"./app.js", -->
        <!-- 单入口写法 -->
        entry:{app:"./app.js",app2:"./app2.js"},
        <!-- 多入口写法,建议单入口也使用对象的写法 -->
        output:{
            path:__dirname + "/dist",
            filename:"[name].[chunkhash:4].bundle.js",
            publicPath:"www.xxx.com"
            <!-- publicPath一般用在有cdn的时候 -->
        },
        mode:"production"
        <!-- "none"不进行处理,"development"开发模式,"production"生产模式 -->
         module: {
        rules: [{ test: /\.js/, loader: 'babel-loader' }, {}],
        },
        plugin: [],
        devServer: {},
        resolve: {},
    }

```

## loader

当 webpack 不认识到某些文件时，它可以使用一些额外的 loader 进行处理。

```javascript title='webpack.config.js'

    module: {
            // 一般babel的rules写在文件夹中的.babelrc中
            rules: [
                {
                    test: /\.tsx?$/,
                    use: {
                        loader: 'ts-loader',
                        // ts的配置比较长，一般也写在tsconfig.json
                    },
                },
                {
                    test: /\.js/,
                    use: {
                        loader: 'babel-loader',
                        // preset一套已经集合好的编译规范 一般来说是@babel/preset-env
                        options: {
                            presets: [['@babel/preset-env', { targets: { browsers: ['>1%', 'last 2 versions', 'not ie<=8'] } }]],
                        },
                    },
                },
                {
                    test: /\.css/,
                    use: [minicss.loader, 'css-loader'],
                },
                {
                    test: /\.less/,
                    use: [minicss.loader, 'css-loader', 'less-loader'],
                    // less-loader将less编译为css
                    // css-loader可以识别css
                    // minicss提供的loader可以将css代码打包成独立文件
                    // style-loader将css在js中转换为style属性插入HTML中
                },
                {
                    test: /\.(jpg|jpeg|gif|png|svg)$/,
                    type: 'asset',
                    //  使用 asset/inline 会将这些设置的图片格式全部转化为base64
                    //  使用 asset/resource 会将这些设置的图片打包成独立文件
                    //  使用 asset 可以设置选择区分打包
                    parser: {
                        dataUrlCondition: {
                            maxSize: 5000,
                        },
                    },
                    generator: {
                        filename: '[name].[chunkhash:4][ext]',
                    },
                },
                // loader后面只能跟字符串,use后面可以使用对象或者数组,在对象里可以配置loader的参数
            ],
        },


```

        loader本质上是一种方法来处理各种语言

## plugins 和 html 处理

```javascript title='webpack.config.js'
        // 先引入模块
        const eslintplugin = require('eslint-webpack-plugin')
        const minicss = require('mini-css-extract-plugin')
        const minimizer = require('css-minimizer-webpack-plugin')
        const htmlplugin = require('html-webpack-plugin')
        // 之后在plugins里配置
        plugins: [
                new eslintplugin(),
                new minicss({
                    filename: './css/test.bundle.css',
                }),
                new minimizer(),
                // html的处理是放在plugins中的
                new htmlplugin({
                    template: './index.html',
                    filename: 'index.html',
                    chunks: ['app'],
                    minify: {
                        collapseWhitespace: false,
                        removeComments: false,
                        removeAttributeQuotes: false,
                    },
                    // inject 一共有三个取值  body|true将js放在body里 , head将js放在head里 ,false不放js
                    inject: 'body',
                }),
                new htmlplugin({
                    template: './index.html',
                    filename: 'index2.html',
                    chunks: ['app2'],
                }),
            ],
```

```javascript title='eslint.rc'
module.exports = {
  env: {
    browser: true,
    // 或者node环境 因为browser环境有window等对象
    es2021: true,
  },
  extends: [
    // 如果不想一条一条写配置，可以直接extends继承别人的规范
    // 例如eslint-config-standard和eslint-config-airbnb
    // 'standard'
    'plugin:vue/strongly-recommended',
  ],
  // plugins一般是提供一些特殊语法的支持,额外的rules和一套现成的规范
  plugins: ['vue'],
  parserOptions: {
    ecmaVersion: 6,
    // sourceType是配置es6module的方案 即支持import
    sourceType: 'module',
    // ecmaFeatures额外的语言特性
    ecmaFeatures: { jsx: true },
  },
  rules: {
    // 0或者off代表关闭
    // 1或者warning表示检查 但有问题只会抛出警告
    // 2或者error表示检查和抛出错误
    'no-console': 0,
  },
}
```

## 代码分割

    单入口代码=> runtime+vendor+核心业务代码+异步模块多入口代码=> runtime+vendor+每个入口的核心业务代码+common 模块

### 单入口文件处理

单入口意味着所有代码在一个文件里，这样会导致代码过大，首屏速度变慢，所以我们需要把一些不是马上用到的代码拆分出来来加快首屏速度。

        坏处:增加了http请求，给服务器增加负担。
        使用场景：文件体积大且首屏不使用这段js代码（后面使用）
        例子：
        在app.js中写入以下代码

```javascript title='app.js'
setTimeout(() => {
  // 异步引入有两种方法
  //  1.import()
  //  2.require.ensure(['fs'], (require) => {...})
  // 如果想命名打包完成的异步js 可以根据下行的魔法注释
  import(/*webpackChunkName:"newA"*/ './a.js').then(res => {
    console.log(res.default)
  })
  // 第一个参数是回调里会用到的依赖
  // 第二个参数是回调函数
  // 第三个参数是命名打包完成的异步js
  require.ensure(
    [],
    () => {
      let b = require('./a')
      console.log(b.default)
    },
    'a',
  )
}, 3000)
```

### 多入口文件处理

多入口的问题主要是重复加载同一段逻辑代码

例子：在 webpack.config.js 中加入以下代码(单入口多入口通用代码)

```javascript title='webpack.config.js'
        optimization: {
            splitChunks: {
                // chunks有三个参数all都会拆分 async只拆分异步 initial只拆分同步
                // 一般都用all
                chunks: 'all',
                //可以在cacheGroups自定义分割规则
                cacheGroups: {
                    // 第三方库单独打包vendor
                    vendor: {
                        test: /[\\/]node_module[\\/]/,
                        filename: 'vendor.[chunkhash:4].js',
                        chunks: 'all',
                        minChunks: 1,
                        minSizes: 0,
                    },
                    // 业务代码
                    common: {
                        filename: 'common.[chunkhash:4].js',
                        chunks: 'all',
                        // 文件被引用2次或以上且大于0Byte，就会被拆分
                        minChunks: 2,
                        minSizes: 0,
                    },
                },
            },
            // 组织代码运行时的runtime代码块
            runtimeChunk: {
                name: 'runtime.js',
            },
        },
```

## Webpack 技巧性配置

### 取名时加 hash 值的意义

    1.浏览器载入一个资源后会缓存资源，名字改变之后就会启用新的资源，以防用户使用的是以前的资源

    2.使用hash值取名的时候可以使用chunkhash：仅仅用hash的时候如果只改变一个文件，其他文件打包时名字都会进行改变；而在使用chunkhash的时候，如果文件发生变化，之后打包只会影响变化文件的文件名，这样用户还是能使用之前浏览器缓存的部分资源，最大程度的利用浏览器缓存。

### resolve

    1. alias: 别名，提供路径的简写
    2. extensions: 扩展省略，定义可省略的扩展名
    例如:
    在webpack.config.js中加入以下代码

```javascript title='webpack.config.js'
        resolve: {
            alias: {
                '@css': '/css',
            },
            extensions: ['.js', '.json', '.scss', '.css'],
        },
```

### require.context

    批量引入指定文件夹下的所有文件
    例如:
    在app.js中加入

```javascript title='app.js'
//第一个参数是指定文件夹
//第二个参数是一个布尔值，true代表这个文件夹下的子文件夹也要引入,false则不会引入子文件夹
//第三个参数是设置一个规则, 例如设置一个正则只引入js文件
const r = require.context('./mode', false, /.js/)
r.keys().forEach(item => {
  console.log(r(item).default)
})
```

    在编写路由的时候可以用到require.context

## 开发模式

### webpack-dev-server 工作原理

![img](http://img.xxsoftware.top/webpack-dev-server.jpg)

### proxy

    proxy就是由webpack-dev-server开启的node服务来代替我们请求接口，因为如果后端没有开启cors，我们直接从前端请求会跨域。我们可以利用proxy让请求从node服务发

    例如:

```javascript title='webpack.config.js'
    devServer: {
            port: 3000,
            hot: true,
            proxy: {
                '/': {
                    targets: 'http://localhost:3000/',
                    // 如果请求的地址很长，可以用pathRewrite简化地址
                    pathRewrite: { '^/account': '/api/ getAccount' },
                    // 设置请求头
                    headers: {},
                },
            },
        },
```

### source-map

    出现错误或者输出内容的时候，source-map能够帮助我们定位到它来自哪行代码

    设置了devtools: 'eval-cheap-source-map',报错就会定位至原始代码
    官网还有别的sourcemap，一般开发模式是用这个'eval-cheap-source-map'，生产模式不用source-map
    如果不设置，报错会定位在打包后的代码

## webpack 实战技巧

### 区分环境

    生产环境
        需要:代码压缩，tree-shaking
        不需要:详细的source-map,开启开发模式
    开发模式
        需要:详细的source-map,开启开发模式
        不需要:压缩，代码混淆等等
    根据不同环境进行不同打包，一般在process.env中设置。
    有的时候需要在js代码中获取环境，可以借助插件来完成。


    可以写一个webpack.baseconfig.js,一个webpack.devconfig.js,一个webpack.proconfig.js，
    根据开发环境的不同在webpack.devconfig.js或者webpack.proconfig.js引入webpack.baseconfig.js进行合并并且打包,这样就不用再写一遍公用的webpack.baseconfig.js。
    例如：
    webpack.devconfig.js如下

```javascript title='webpack.devconfig.js'
const base = require('./webpack.baseconfig.js')
const merge = require('webpack-merge').merge
module.exports = merge(base, {
  mode: 'development',
  devServer: {
    port: 3000,
    hot: true,
    proxy: {
      '/': {
        targets: 'http://localhost:3000/',
        pathRewrite: { '^/account': '/api/ getAccount' },
        headers: {},
      },
    },
  },
  devtools: 'eval-cheap-source-map',
})
```

    webpack.proconfig.js如下

```javascript title='webpack.proconfig.js'
const base = require('./webpack.baseconfig.js')
const merge = require('webpack-merge').merge
module.exports = merge(base, {
  mode: 'production',
})
```

```javascript title='package.json'
    "scripts":{
        "build":"cross-env NODE_ENV=production webpack --config ./webpack.proconfig.js",
        "dev":"cross-env NODE_ENV=development webpack-dev-server --config ./webpack.proconfig.js",
    }
```

    cross-env是一个库，能够帮助指令跨平台运行
    通过cross-env NODE_ENV=XXX,我们就可以在webpack.baseconfig.js中通过process.env.NODE_ENV拿到环境变量。

### 如何在业务代码里也能拿到环境变量

    在webpack.devconfig.js中

```javascript title='webpack.devconfig.js'
const webpack = require('webpack')
然后在plugins: [
  new AAA(),
  new BBB(),
  new webpack.DefinePlugin({
    baseURL: 'www.xxx.com',
  }),
]
```

    在webpack.proconfig.js中

```javascript title='webpack.proconfig.js'
const webpack = require('webpack')
然后在plugins: [
  new AAA(),
  new BBB(),
  new webpack.DefinePlugin({
    baseURL: 'www.yyy.com',
  }),
]
```

    就能在业务代码中使用baseURL变量（全局变量）了。
        console.log(baseURL)  --> www.xxx.com

### 打包分析优化

    1.官方方案：打包时加上--json输出打包结果分析json
    package.json

```javascript title='package.json'
    "scripts":{
        "build":"cross-env NODE_ENV=production webpack --config ./webpack.proconfig.js",
        "getjson":"cross-env NODE_ENV=production webpack --config ./webpack.proconfig.js --json>stats.json"
    }
```

    然后npm run getjson将打印出stats.json的内容。
    然后在webpack.github.io/analyzer分析json

    2.webpack-bundle-analyzer
        const bundleanalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
        然后在pulgins:[...,new bundleanalyzer()]

    3.dll优化
    打包太慢的话可以用dll优化
    提前打包不变的包==>通知到正式打包==>DLL处理过的不再处理
    在webpack.dll.config.js设置：

```javascript title='webpack.dll.config.js'
        const webpack = require("webpack")
        module.exports = {
            mode:"production",
            entry:{
                vendor:[
                    "axios","lodash"
                ]
            },
            output:{
                path:__dirname+"/dist",
                filename:"[name].[hash].dll.js",
                library:"[name]_library",
                <!--library是用来通知的，定位哪些需要打包  -->
            },
            plugins:[
                    new webpack.DllPlugin({
                        path:__dirname+"/[name]-manifest.json",
                        name: "[name]_library",
                        <!-- 必须和output的library同名 -->
                        context:__dirname,
                    })
                ]
            }
```

```javascript title='webpack.proconfig.js'
        在webpack.proconfig.js中
            plugins:[...,
                new webpack.DllReferencePlugin(
                    mainfest:require(__dirname+"vendor-mainfest.json")
                ),
            ]
```

然后在 package.json

```javascript title='package.json'
            "scripts":{
                "dll":"webpack --config ./webpack.dll.config.js",
            }
```

        之后运行npm run dll就可以了

        但是dll之后打包的html不会引入vendor.dll.js,需要我们自己手动在index.html里加入<script scr="vendor.dll.js"></script>

### 压缩与 tree-shaking

    tree-shaking 就是在只打包一个库中 业务代码存在依赖关系的方法，这样可以显著减少代码体积
    但是tree-shaking 在一个class的原型方法上是不会有作用的，只有在函数式编程中tree-shaking才会生效
