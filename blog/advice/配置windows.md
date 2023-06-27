---
slug: windows-disposition
title: 配置windows
date: 2022-06-20
authors: 東雲研究所
tags: [随笔, windows]
keywords: [随笔, windows]
---

    618新装了电脑，随后要改很多设置，安装软件，配环境之类的，这里做一个记录

## 关闭隐私选项，开机启动，自动服务

### 先在设置里搜索隐私 之后在隐私选项里把所有选项都关闭

![](https://img.xxsoftware.top/yinsishezhi.png)

### 任务栏里关闭 cortana,隐藏搜索等

![](https://img.xxsoftware.top/renwulan.png)

### 卸载 onedrive

### 关闭建议

![](https://img.xxsoftware.top/jianyi.png)

### 关闭开机自启的项目

    直接可以在任务管理器中完成关闭开机自启
    建议把绝大部分的国产软件自启动和对启动影响较高的任务关闭

![](https://img.xxsoftware.top/kaijiziqi.png)

### 关闭自动服务

    win+r打开运行 输入services.msc 打开服务管理器
    可以关闭windows search服务 还有大部分国产软件的自助服务

## 移动下载目录

    先在主文件夹找到下载

![](https://img.xxsoftware.top/xiazai.png)

    然后在下载的属性里 =>选择位置=>移动
    一般放在D盘就行了

![](https://img.xxsoftware.top/xiazaiweizhiyidong.png)

    同理:桌面、文档、音乐、照片目录也都可以移动

## 显示文件后缀和隐藏文件

    打开资源管理器,点击 查看=>显示=>文件扩展名 和 隐藏的项目

![](https://img.xxsoftware.top/kuozhanming.png)

## 软件的安装

### powerToys

[powerToys 官网](https://learn.microsoft.com/zh-cn/windows/powertoys/install#install-with-windows-executable-file-via-github)

    在官网可以选择下载方式，虽然都挺慢的，具体使用方法我的博客里有一篇文章有提到。

### utools

[utools 官网](https://u.tools/)

    utools 作为应用启动器更加合格，也可以安装插件

### everythings

[everythings 官网](https://www.voidtools.com/zh-cn/downloads/)

    everythings在windows中能提供非常好的搜索功能

### 7zip

[7zip 官网](https://sparanoid.com/lab/7z/)

    7zip提供了压缩和解压功能，轻量又不用看到广告

### 设置字体 JetBrains Mono

[JetBrains Mono 官网](https://www.jetbrains.com/lp/mono/)

下载完要解压缩 所以放在 zip 下面，解压文件夹下的 fonts/ttf 目录下 的所有文件全选为所有用户安装

### lx 音乐

[lx 音乐 官网](https://docs.lxmusic.folltoshe.com/)

### potplayer

[potplayer 官网下载页](http://www.potplayercn.com/download)

### 滴答清单

[滴答清单 官网](https://dida365.com/)

## 配环境和安装工作需要的软件

### git bash

[git 下载](https://git-scm.com/download)

### 各种浏览器

[edge 下载](https://www.microsoft.com/zh-cn/edge/download)

[chrome 下载](https://www.google.com/intl/zh-CN/chrome/)

[firefox 下载](https://www.firefox.com.cn/)

### vscode

[vscode 下载](https://code.visualstudio.com/download)

### nvm，node.js 和 npm

[nvm 下载](https://github.com/coreybutler/nvm-windows/releases)

之后 node 就可以在 nvm 里下载了，用 nvm 下载的 node 不会自带 npm，可以参考下方链接完成 npm 的下载

[npm 安装](https://blog.csdn.net/qq_42299461/article/details/119181188)

### 微信开发者工具

[微信开发者工具下载](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

### cnpm

    npm install -g cnpm --registry=https://registry.npm.taobao.org

### yarn

    npm install -g yarn
    //切换淘宝源
    yarn config set npmRegistryServer https://registry.npm.taobao.org

### pnpm

    npm install -g pnpm
    //查看源
    pnpm config get registry
    //切换淘宝源
    pnpm config set registry http://registry.npm.taobao.org

### @antfu/ni

    npm i -g @antfu/ni
    有了ni之后不管是pnpm,npm还是yarn的项目 都可以是实现命令行的统一

### vite 和 webpack 都可以局部安装不用全局

    全局安装这会将你项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中， 可能会导致构建失败

### vscode setting

```json title="setting.json"
{
  "debug.console.fontFamily": "JetBrains Mono",
  "debug.onTaskErrors": "debugAnyway",
  "editor.accessibilitySupport": "off",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.find.addExtraSpaceOnTop": false,
  "editor.fontLigatures": "'ss01', 'ss02', 'ss03', 'ss06', 'zero'",
  "editor.glyphMargin": true,
  "editor.detectIndentation": false,
  "scm.diffDecorationsGutterWidth": 2, //设置字体大小
  "editor.tabSize": 4, // 因为设置了 "editor.detectIndentation": false 所以该设置仅对settings.json文件缩进起作用
  "editor.fontWeight": 440,
  "editor.fontFamily": "JetBrains Mono",
  "editor.unicodeHighlight.ambiguousCharacters": false,
  "editor.unicodeHighlight.invisibleCharacters": false,
  "eslint.validate": [
    //开启对.vue文件中错误的检查
    "javascript",
    "javascriptreact",
    "vue",
    "typescript",
    "typescriptreact",
    "html",
    "css",
    "scss",
    "less",
    "mpx",
    "json",
    "markdown"
  ],
  "eslint.quiet": true,
  "eslint.format.enable": true,
  "files.autoSaveDelay": 5000,
  "files.eol": "\n",
  "files.simpleDialog.enable": true,
  "git.path": "D:/Git/bin/git.exe",
  "git.confirmSync": false, //同步 Git 存储库前请先进行确认
  "git.autofetch": true,
  "security.workspace.trust.untrustedFiles": "open",
  "workbench.tree.indent": 10,
  "workbench.startupEditor": "newUntitledFile",
  "workbench.editor.untitled.hint": "hidden",
  "window.dialogStyle": "custom",
  "window.titleBarStyle": "custom",
  "workbench.activityBar.visible": true,
  "workbench.editor.closeOnFileDelete": true,
  "workbench.editor.highlightModifiedTabs": true,
  "workbench.fontAliasing": "antialiased",
  "workbench.list.smoothScrolling": true,
  "workbench.sideBar.location": "left",
  "extensions.autoUpdate": "onlyEnabledExtensions",
  "extensions.ignoreRecommendations": true,
  "terminal.integrated.cursorBlinking": true,
  "terminal.integrated.cursorStyle": "underline",
  "terminal.integrated.fontWeight": "300",
  "terminal.integrated.persistentSessionReviveProcess": "never",
  "terminal.integrated.tabs.enabled": true,
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.expand": false,
  "explorer.fileNesting.patterns": {
    "*.asax": "$(capture).*.cs, $(capture).*.vb",
    "*.ascx": "$(capture).*.cs, $(capture).*.vb",
    "*.ashx": "$(capture).*.cs, $(capture).*.vb",
    "*.aspx": "$(capture).*.cs, $(capture).*.vb",
    "*.bloc.dart": "$(capture).event.dart, $(capture).state.dart",
    "*.c": "$(capture).h",
    "*.cc": "$(capture).hpp, $(capture).h, $(capture).hxx",
    "*.cjs": "$(capture).cjs.map, $(capture).*.cjs, $(capture)_*.cjs",
    "*.component.ts": "$(capture).component.html, $(capture).component.spec.ts, $(capture).component.css, $(capture).component.scss, $(capture).component.sass, $(capture).component.less",
    "*.cpp": "$(capture).hpp, $(capture).h, $(capture).hxx",
    "*.cs": "$(capture).*.cs",
    "*.cshtml": "$(capture).cshtml.cs",
    "*.csproj": "*.config, *proj.user, appsettings.*, bundleconfig.json",
    "*.css": "$(capture).css.map, $(capture).*.css",
    "*.cxx": "$(capture).hpp, $(capture).h, $(capture).hxx",
    "*.dart": "$(capture).freezed.dart, $(capture).g.dart",
    "*.ex": "$(capture).html.eex, $(capture).html.heex, $(capture).html.leex",
    "*.go": "$(capture)_test.go",
    "*.java": "$(capture).class",
    "*.js": "$(capture).js.map, $(capture).*.js, $(capture)_*.js",
    "*.jsx": "$(capture).js, $(capture).*.jsx, $(capture)_*.js, $(capture)_*.jsx",
    "*.master": "$(capture).*.cs, $(capture).*.vb",
    "*.mjs": "$(capture).mjs.map, $(capture).*.mjs, $(capture)_*.mjs",
    "*.module.ts": "$(capture).resolver.ts, $(capture).controller.ts, $(capture).service.ts",
    "*.pubxml": "$(capture).pubxml.user",
    "*.resx": "$(capture).*.resx, $(capture).designer.cs, $(capture).designer.vb",
    "*.tex": "$(capture).acn, $(capture).acr, $(capture).alg, $(capture).aux, $(capture).bbl, $(capture).blg, $(capture).fdb_latexmk, $(capture).fls, $(capture).glg, $(capture).glo, $(capture).gls, $(capture).idx, $(capture).ind, $(capture).ist, $(capture).lof, $(capture).log, $(capture).lot, $(capture).out, $(capture).pdf, $(capture).synctex.gz, $(capture).toc, $(capture).xdv",
    "*.ts": "$(capture).js, $(capture).d.ts.map, $(capture).*.ts, $(capture)_*.js, $(capture)_*.ts",
    "*.tsx": "$(capture).ts, $(capture).*.tsx, $(capture)_*.ts, $(capture)_*.tsx",
    "*.vbproj": "*.config, *proj.user, appsettings.*, bundleconfig.json",
    "*.vue": "$(capture).*.ts, $(capture).*.js, $(capture).story.vue",
    "*.xaml": "$(capture).xaml.cs",
    "+layout.svelte": "+layout.ts,+layout.ts,+layout.js,+layout.server.ts,+layout.server.js,+layout.gql",
    "+page.svelte": "+page.server.ts,+page.server.js,+page.ts,+page.js,+page.gql",
    ".clang-tidy": ".clang-format, .clangd, compile_commands.json",
    ".env": "*.env, .env.*, .envrc, env.d.ts",
    ".gitignore": ".gitattributes, .gitmodules, .gitmessage, .mailmap, .git-blame*",
    ".project": ".classpath",
    "//": "Last update at 4/29/2023, 2:04:58 PM",
    "BUILD.bazel": "*.bzl, *.bazel, *.bazelrc, bazel.rc, .bazelignore, .bazelproject, WORKSPACE",
    "CMakeLists.txt": "*.cmake, *.cmake.in, .cmake-format.yaml, CMakePresets.json",
    "I*.cs": "$(capture).cs",
    "artisan": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .lighthouserc.*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, contentlayer.config.*, cssnano.config.*, cypress.*, env.d.ts, formkit.config.*, formulate.config.*, histoire.config.*, htmlnanorc.*, jasmine.*, jest.config.*, jsconfig.*, karma*, lighthouserc.*, playwright.config.*, postcss.config.*, puppeteer.config.*, rspack.config.*, server.php, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, uno.config.*, unocss.config.*, vitest.config.*, webpack.config.*, webpack.mix.js, windi.config.*",
    "astro.config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .lighthouserc.*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, contentlayer.config.*, cssnano.config.*, cypress.*, env.d.ts, formkit.config.*, formulate.config.*, histoire.config.*, htmlnanorc.*, jasmine.*, jest.config.*, jsconfig.*, karma*, lighthouserc.*, playwright.config.*, postcss.config.*, puppeteer.config.*, rspack.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, uno.config.*, unocss.config.*, vitest.config.*, webpack.config.*, windi.config.*",
    "cargo.toml": ".clippy.toml, .rustfmt.toml, cargo.lock, clippy.toml, cross.toml, rust-toolchain.toml, rustfmt.toml",
    "composer.json": ".php*.cache, composer.lock, phpunit.xml*, psalm*.xml",
    "default.nix": "shell.nix",
    "deno.json*": "*.env, .env.*, .envrc, api-extractor.json, deno.lock, env.d.ts, import-map.json, import_map.json, jsconfig.*, tsconfig.*, tsdoc.*",
    "dockerfile": ".dockerignore, docker-compose.*, dockerfile*",
    "flake.nix": "flake.lock",
    "gatsby-config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .lighthouserc.*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, contentlayer.config.*, cssnano.config.*, cypress.*, env.d.ts, formkit.config.*, formulate.config.*, gatsby-browser.*, gatsby-node.*, gatsby-ssr.*, gatsby-transformer.*, histoire.config.*, htmlnanorc.*, jasmine.*, jest.config.*, jsconfig.*, karma*, lighthouserc.*, playwright.config.*, postcss.config.*, puppeteer.config.*, rspack.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, uno.config.*, unocss.config.*, vitest.config.*, webpack.config.*, windi.config.*",
    "gemfile": ".ruby-version, gemfile.lock",
    "go.mod": ".air*, go.sum",
    "go.work": "go.work.sum",
    "mix.exs": ".credo.exs, .dialyzer_ignore.exs, .formatter.exs, .iex.exs, .tool-versions, mix.lock",
    "next.config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .lighthouserc.*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, contentlayer.config.*, cssnano.config.*, cypress.*, env.d.ts, formkit.config.*, formulate.config.*, histoire.config.*, htmlnanorc.*, jasmine.*, jest.config.*, jsconfig.*, karma*, lighthouserc.*, next-env.d.ts, playwright.config.*, postcss.config.*, puppeteer.config.*, rspack.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, uno.config.*, unocss.config.*, vitest.config.*, webpack.config.*, windi.config.*",
    "nuxt.config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .lighthouserc.*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, contentlayer.config.*, cssnano.config.*, cypress.*, env.d.ts, formkit.config.*, formulate.config.*, histoire.config.*, htmlnanorc.*, jasmine.*, jest.config.*, jsconfig.*, karma*, lighthouserc.*, playwright.config.*, postcss.config.*, puppeteer.config.*, rspack.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, uno.config.*, unocss.config.*, vitest.config.*, webpack.config.*, windi.config.*",
    "package.json": ".browserslist*, .circleci*, .commitlint*, .cz-config.js, .czrc, .dlint.json, .dprint.json, .editorconfig, .eslint*, .firebase*, .flowconfig, .github*, .gitlab*, .gitpod*, .huskyrc*, .jslint*, .lintstagedrc*, .markdownlint*, .node-version, .nodemon*, .npm*, .nvmrc, .pm2*, .pnp.*, .pnpm*, .prettier*, .releaserc*, .sentry*, .simple-git-hooks*, .stackblitz*, .styleci*, .stylelint*, .tazerc*, .textlint*, .tool-versions, .travis*, .versionrc*, .vscode*, .watchman*, .xo-config*, .yamllint*, .yarnrc*, Procfile, apollo.config.*, appveyor*, azure-pipelines*, bower.json, build.config.*, commitlint*, crowdin*, dangerfile*, dlint.json, dprint.json, eslint*, firebase.json, grunt*, gulp*, jenkins*, lerna*, lint-staged*, nest-cli.*, netlify*, nodemon*, npm-shrinkwrap.json, nx.*, package-lock.json, package.nls*.json, phpcs.xml, pm2.*, pnpm*, prettier*, pullapprove*, pyrightconfig.json, release-tasks.sh, release.config.*, renovate*, rollup.config.*, rspack*, simple-git-hooks*, stylelint*, tslint*, tsup.config.*, turbo*, typedoc*, unlighthouse*, vercel*, vetur.config.*, webpack*, workspace.json, xo.config.*, yarn*",
    "pubspec.yaml": ".metadata, .packages, all_lint_rules.yaml, analysis_options.yaml, build.yaml, pubspec.lock, pubspec_overrides.yaml",
    "pyproject.toml": ".pdm.toml, pdm.lock, pyproject.toml",
    "quasar.conf.js": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .lighthouserc.*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, contentlayer.config.*, cssnano.config.*, cypress.*, env.d.ts, formkit.config.*, formulate.config.*, histoire.config.*, htmlnanorc.*, jasmine.*, jest.config.*, jsconfig.*, karma*, lighthouserc.*, playwright.config.*, postcss.config.*, puppeteer.config.*, quasar.extensions.json, rspack.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, uno.config.*, unocss.config.*, vitest.config.*, webpack.config.*, windi.config.*",
    "readme*": "authors, backers*, changelog*, citation*, code_of_conduct*, codeowners, contributing*, contributors, copying, credits, governance.md, history.md, license*, maintainers, readme*, security.md, sponsors*",
    "remix.config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .lighthouserc.*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, contentlayer.config.*, cssnano.config.*, cypress.*, env.d.ts, formkit.config.*, formulate.config.*, histoire.config.*, htmlnanorc.*, jasmine.*, jest.config.*, jsconfig.*, karma*, lighthouserc.*, playwright.config.*, postcss.config.*, puppeteer.config.*, remix.*, rspack.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, uno.config.*, unocss.config.*, vitest.config.*, webpack.config.*, windi.config.*",
    "rush.json": ".browserslist*, .circleci*, .commitlint*, .cz-config.js, .czrc, .dlint.json, .dprint.json, .editorconfig, .eslint*, .firebase*, .flowconfig, .github*, .gitlab*, .gitpod*, .huskyrc*, .jslint*, .lintstagedrc*, .markdownlint*, .node-version, .nodemon*, .npm*, .nvmrc, .pm2*, .pnp.*, .pnpm*, .prettier*, .releaserc*, .sentry*, .simple-git-hooks*, .stackblitz*, .styleci*, .stylelint*, .tazerc*, .textlint*, .tool-versions, .travis*, .versionrc*, .vscode*, .watchman*, .xo-config*, .yamllint*, .yarnrc*, Procfile, apollo.config.*, appveyor*, azure-pipelines*, bower.json, build.config.*, commitlint*, crowdin*, dangerfile*, dlint.json, dprint.json, eslint*, firebase.json, grunt*, gulp*, jenkins*, lerna*, lint-staged*, nest-cli.*, netlify*, nodemon*, npm-shrinkwrap.json, nx.*, package-lock.json, package.nls*.json, phpcs.xml, pm2.*, pnpm*, prettier*, pullapprove*, pyrightconfig.json, release-tasks.sh, release.config.*, renovate*, rollup.config.*, rspack*, simple-git-hooks*, stylelint*, tslint*, tsup.config.*, turbo*, typedoc*, unlighthouse*, vercel*, vetur.config.*, webpack*, workspace.json, xo.config.*, yarn*",
    "shims.d.ts": "*.d.ts",
    "svelte.config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .lighthouserc.*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, contentlayer.config.*, cssnano.config.*, cypress.*, env.d.ts, formkit.config.*, formulate.config.*, histoire.config.*, houdini.config.*, htmlnanorc.*, jasmine.*, jest.config.*, jsconfig.*, karma*, lighthouserc.*, mdsvex.config.js, playwright.config.*, postcss.config.*, puppeteer.config.*, rspack.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, uno.config.*, unocss.config.*, vite.config.*, vitest.config.*, webpack.config.*, windi.config.*",
    "vite.config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .lighthouserc.*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, contentlayer.config.*, cssnano.config.*, cypress.*, env.d.ts, formkit.config.*, formulate.config.*, histoire.config.*, htmlnanorc.*, jasmine.*, jest.config.*, jsconfig.*, karma*, lighthouserc.*, playwright.config.*, postcss.config.*, puppeteer.config.*, rspack.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, uno.config.*, unocss.config.*, vitest.config.*, webpack.config.*, windi.config.*",
    "vue.config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .lighthouserc.*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, contentlayer.config.*, cssnano.config.*, cypress.*, env.d.ts, formkit.config.*, formulate.config.*, histoire.config.*, htmlnanorc.*, jasmine.*, jest.config.*, jsconfig.*, karma*, lighthouserc.*, playwright.config.*, postcss.config.*, puppeteer.config.*, rspack.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, uno.config.*, unocss.config.*, vitest.config.*, webpack.config.*, windi.config.*"
  },
  "[typescript]": {
    // "editor.defaultFormatter": "dbaeumer.vscode-eslint"
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "files.trimFinalNewlines": true,
  "emmet.showSuggestionsAsSnippets": true,
  "emmet.triggerExpansionOnTab": false,
  "liveServer.settings.donotShowInfoMsg": true,
  "errorLens.enabledDiagnosticLevels": ["warning", "error"],
  "errorLens.excludeBySource": ["cSpell", "Grammarly", "eslint"],
  "css.lint.hexColorLength": "ignore",
  "cSpell.allowCompoundWords": true,
  "cSpell.language": "en,en-US",
  "eslint.codeAction.showDocumentation": {
    "enable": true
  },
  "gitlens.codeLens.authors.enabled": false,
  "gitlens.codeLens.enabled": false,
  "gitlens.codeLens.recentChange.enabled": false,
  "gitlens.menus": {
    "editor": {
      "blame": false,
      "clipboard": true,
      "compare": true,
      "history": false,
      "remote": false
    },
    "editorGroup": {
      "blame": true,
      "compare": false
    },
    "editorTab": {
      "clipboard": true,
      "compare": true,
      "history": true,
      "remote": true
    },
    "explorer": {
      "clipboard": true,
      "compare": true,
      "history": true,
      "remote": true
    },
    "scm": {
      "authors": true
    },
    "scmGroup": {
      "compare": true,
      "openClose": true,
      "stash": true
    },
    "scmGroupInline": {
      "stash": true
    },
    "scmItem": {
      "clipboard": true,
      "compare": true,
      "history": true,
      "remote": false,
      "stash": true
    }
  },
  "i18n-ally.autoDetection": false,
  "i18n-ally.displayLanguage": "en",
  "i18n-ally.ignoredLocales": [],
  "iconify.annotations": true,
  "iconify.inplace": true,
  "editor.formatOnSave": true,
  "editor.linkedEditing": true,
  "leetcode.endpoint": "leetcode-cn",
  "leetcode.hint.configWebviewMarkdown": false,
  "settingsSync.ignoredExtensions": ["ritwickdey.liveserver"],
  "emmet.syntaxProfiles": {
    "html": {
      "inline_break": true
    }
  },
  "terminal.integrated.defaultProfile.windows": "Command Prompt",
  "terminal.integrated.profiles.windows": {
    "PowerShell": {
      "source": "PowerShell",
      "icon": "terminal-powershell"
    },
    "Command Prompt": {
      "path": [
        "${env:windir}\\Sysnative\\cmd.exe",
        "${env:windir}\\System32\\cmd.exe"
      ],
      "args": [],
      "icon": "terminal-cmd"
    },
    "Git Bash": {
      "source": "Git Bash"
    },
    "Windows PowerShell": {
      "path": "C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
    }
  },
  "workbench.editor.splitInGroupLayout": "vertical", //设置窗口缩放级别
  "files.autoSave": "afterDelay", //自动保存代码
  "breadcrumbs.enabled": true, // 开启 vscode 文件路径导航
  "search.exclude": {
    //用来忽略搜索的文件夹
    "**/.git": true,
    "**/.github": true,
    "**/.nuxt": true,
    "**/.output": true,
    "**/.pnpm": true,
    "**/.vscode": true,
    "**/.yarn": true,
    "**/bower_components": true,
    "**/dist/**": true,
    "**/logs": true,
    "**/node_modules": true,
    "**/out/**": true,
    "**/package-lock.json": true,
    "**/pnpm-lock.yaml": true,
    "**/tmp": true,
    "**/yarn.lock": true
  },
  "diffEditor.ignoreTrimWhitespace": false, // 控制差异编辑器是否将对前导空格或尾随空格的更改显示为差异
  "terminal.integrated.fontSize": 16,
  "editor.formatOnPaste": true, // 编辑粘贴自动格式化
  "editor.wordWrapColumn": 400, // 400 列后换行
  "editor.mouseWheelZoom": true, // 通过使用鼠标滚轮同时按住 Ctrl 可缩放编辑器的字体
  "editor.lineHeight": 22, //设置文字行高
  // 控制是否在打开文件时，基于文件内容自动检测 Editor: Tab Size 和 Editor: Insert Spaces。如果设置为true则.editorconfi文件中的indent_size会失效
  "editor.renderControlCharacters": true,
  // 设置 eslint 保存时自动修复 【可修复function关键字后不带空格】
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true,
    "source.organizeImports": false
  },
  "prettier.enable": true,
  "prettier.printWidth": 200,
  "prettier.singleQuote": true, //  #使用单引号替代双引号
  "prettier.semi": false, //去掉代码结尾的分号
  "prettier.tabWidth": 4, // tab 大小为4个空格
  "javascript.preferences.quoteStyle": "single",
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true, //让函数(名)和后面的括号之间加个空格
  "search.quickOpen.includeSymbols": true, //  配置为在 Quick Open 文件结果中包括全局符号搜索的结果。
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "files.associations": {
    //文件后缀类型的支持
    "*.cjson": "jsonc",
    "*.wxss": "css",
    "*.wxs": "javascript"
  },
  "files.exclude": {
    //用来忽略工程打开的文件夹
    "**/.git": true,
    "**/.svn": true,
    "**/.DS_Store": true,
    "**/node_modules": true,
    "**/iOS": true
  },
  "emmet.includeLanguages": {
    "wxml": "html"
  },
  "minapp-vscode.disableAutoConfig": true,
  "leetcode.workspaceFolder": "C:\\Users\\PD_CHINA\\.leetcode",
  "vsicons.dontShowNewVersionMessage": true,
  "emmet.showAbbreviationSuggestions": false,
  "workbench.productIconTheme": "icons-carbon",
  "workbench.iconTheme": "file-icons",
  "workbench.colorTheme": "Community Material Theme Palenight High Contrast",
  "Codegeex.Privacy": true,
  "editor.fontSize": 16,
  "debug.console.fontSize": 16,
  "git.enableSmartCommit": true
}
```

### 环境变量

    搜索环境变量跳转到系统属性的高级页面。顺便把性能设置为最佳性能，然后设置环境变量。
    如果有些软件像VSCOde安装的时候没有勾选设置环境变量 这里可以补配

### vscode 扩展

    这个在vscode登录的时候应该会自动同步

### 浏览器插件

    Wappalyzer - Technology profiler
    沉浸式翻译
    广告终结者
    Adblock Plus - 免费的广告拦截器
    Vue.js devtools

### snippets

```json title="global.code-snippets"
{
  "import": {
    "scope": "javascript,typescript",
    "prefix": "im",
    "body": ["import { $1 } from '$2';"],
    "description": "Import a module"
  },
  "vue-script-setup": {
    "scope": "vue",
    "prefix": "<sc",
    "body": [
      "<script setup lang=\"ts\">",
      "const props = defineProps<{",
      "  modelValue?: boolean,",
      "}>()",
      "$1",
      "</script>",
      "",
      "<template>",
      "  <div>",
      "    <slot/>",
      "  </div>",
      "</template>"
    ]
  },
  "vue-computed": {
    "scope": "javascript,typescript,vue",
    "prefix": "com",
    "body": ["computed(() => { $1 })"]
  },
  "vue-watch-effect": {
    "scope": "javascript,typescript,vue",
    "prefix": "watchE",
    "body": ["watchEffect(() => {", "  $1", "})"]
  }
}
```
