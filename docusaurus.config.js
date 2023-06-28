const path = require('path')
const beian = '沪ICP备2023014937号'

const announcementBarContent = `<a href="/rip-ch" target="_blank">世间再无击节客，左耳从此不听风</a>`

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '東雲研究所',
  titleDelimiter: '-',
  url: 'https://blog.xxsoftware.top/',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  projectName: 'blog',
  tagline: '记录所学知识，领略编程之美',
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  themeConfig: {
    image: 'img/logo.png',
    announcementBar: {
      id: 'announcementBar-3',
      content: announcementBarContent,
    },
    metadata: [
      {
        name: 'keywords',
        content: '東雲研究所',
      },
      {
        name: 'keywords',
        content: 'blog, javascript, typescript, node, vue, web',
      },
      {
        name: 'keywords',
        content: '编程爱好者, Web开发者,',
      },
    ],
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      title: '東雲研究所',
      logo: {
        alt: '東雲研究所',
        src: 'img/logo.webp',
        srcDark: 'img/logo.webp',
      },
      hideOnScroll: true,
      items: [
        {
          label: '学习',
          position: 'right',
          items: [
            {
              label: '标签',
              to: 'tags',
            },
            {
              label: '归档',
              to: 'archive',
            },
            {
              label: '笔记',
              to: 'docs/skill/',
            },
            {
              label: '工具推荐',
              to: 'docs/tools/',
            },
          ],
        },
        {
          label: '工具',
          position: 'right',
          items: [
            {
              label: '前端示例',
              to: 'https://lib.xxsoftware.top/',
            },
            {
              label: 'Vue.js 挑战',
              to: 'https://cn-vuejs-challenges.netlify.app/',
            },
            {
              label: '前端面试指南',
              to: 'https://interview.poetries.top/',
            },
            {
              label: '代码转图片工具',
              to: 'https://carbon.now.sh/',
            },
            {
              label: '在线工具箱',
              to: 'https://tool.lu/',
            },
            {
              label: '绘图网站',
              to: 'https://www.tldraw.com/',
            },
            {
              label: 'css查询can i use',
              to: 'https://caniuse.com/',
            },
            {
              label: '程序员盒子',
              to: 'https://www.coderutil.com/',
            },
          ],
        },
        {
          label: 'WEB图标',
          position: 'right',
          items: [
            {
              label: 'unocss-icones',
              to: 'https://icones.netlify.app/',
            },
            {
              label: 'fontawesome',
              to: 'https://fontawesome.com.cn/',
            },
            {
              label: 'feathericons',
              to: 'https://feathericons.com/',
            },
            {
              label: 'tablericons',
              to: 'https://tablericons.com/',
            },
            {
              label: 'simpleicons',
              to: 'https://simpleicons.org/',
            },
          ],
        },
        {
          label: '导航',
          position: 'right',
          to: 'resource',
        },
        {
          label: '项目',
          position: 'right',
          to: 'project',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '学习',
          items: [
            {
              label: '标签',
              to: 'tags',
            },
            {
              label: '归档',
              to: 'archive',
            },
            {
              label: '技术笔记',
              to: 'docs/skill',
            },
            {
              label: '实战项目',
              to: 'project',
            },
            {
              label: '前端示例',
              to: 'https://lib.xxsoftware.top/',
            },
          ],
        },
        {
          title: '社交媒体',
          items: [
            {
              label: '关于我',
              to: '/about',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/xxsoftware',
            },
            {
              label: 'Gitee',
              href: 'https://gitee.com/xxsoftware',
            },
            {
              label: 'QQ',
              href: 'http://wpa.qq.com/msgrd?v=3&uin=1105735390&site=qq&menu=yes',
            },
            {
              label: 'Email',
              href: 'mailto:1105735390@qq.com',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: '导航',
              position: 'right',
              to: 'resource',
            },
            {
              html: `<a href="https://docusaurus.io/zh-CN/" target="_blank"><img style="height:50px;margin-top:0.5rem" src="/img/buildwith.png" /><a/>`,
            },
          ],
        },
      ],
      copyright: `<p><a href="http://beian.miit.gov.cn/" >${beian}</a></p><p>Copyright © 2020 - PRESENT 東雲研究所 Built with Docusaurus.</p>`,
    },
    prism: {
      theme: require('prism-react-renderer/themes/vsLight'),
      darkTheme: require('prism-react-renderer/themes/vsDark'),
      additionalLanguages: ['java', 'php', 'rust', 'toml'],
      defaultLanguage: 'javascript',
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    algolia: {
      appId: 'ECJ5V2E3V3',
      apiKey: '6b8422cd37573ad23b3d55b171a69652',
      indexName: 'blog_xxsoftware',
    },
    zoom: {
      selector: '.markdown :not(em) > img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
      config: {},
    },
    matomo: {
      matomoUrl: 'https://blogxxsoftwaretop.matomo.cloud/',
      siteId: '1',
      phpLoader: 'matomo.php',
      jsLoader: 'matomo.js',
    },
    giscus: {
      repo: 'xxsoftware/blog',
      repoId: 'R_kgDOJxy1Fw',
      category: 'General',
      categoryId: 'DIC_kwDOJxy1F84CXVy1',
      theme: 'light',
      darkTheme: 'dark',
    },
    liveCodeBlock: {
      playgroundPosition: 'top',
    },
    socials: {
      github: 'https://github.com/xxsoftware',
      gitee: 'https://gitee.com/xxsoftware',
      qq: 'http://wpa.qq.com/msgrd?v=3&uin=1105735390&site=qq&menu=yes',
      eMail: 'mailto:1105735390@qq.com',
    },
  },
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'description',
        content: '東雲研究所的个人博客',
      },
    },
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          sidebarPath: 'sidebars.js',
        },
        blog: false,
        theme: {
          customCss: [require.resolve('./src/css/custom.scss')],
        },
        sitemap: {
          changefreq: 'daily',
          priority: 0.5,
        },
        gtag: {
          trackingID: 'G-S4SD5NXWXF',
          anonymizeIP: true,
        },
        // debug: true,
      }),
    ],
  ],
  // themes: ['@docusaurus/theme-live-codeblock'],
  plugins: [
    'docusaurus-plugin-matomo',
    'docusaurus-plugin-image-zoom',
    'docusaurus-plugin-sass',
    path.resolve(__dirname, './src/plugin/plugin-baidu-tongji'),
    path.resolve(__dirname, './src/plugin/plugin-baidu-push'),
    [
      path.resolve(__dirname, './src/plugin/plugin-content-blog'),
      {
        path: 'blog',
        routeBasePath: '/',
        editUrl: ({ locale, blogDirPath, blogPath, permalink }) =>
          `https://github.com/xxsoftware/blog/edit/main/${blogDirPath}/${blogPath}`,
        editLocalizedFiles: false,
        blogDescription: '東雲研究所的个人博客',
        blogSidebarCount: 10,
        blogSidebarTitle: '最近更新',
        postsPerPage: 10,
        showReadingTime: true,
        readingTime: ({ content, frontMatter, defaultReadingTime }) =>
          defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
        feedOptions: {
          type: 'all',
          title: '東雲研究所',
          copyright: `Copyright © ${new Date().getFullYear()} 東雲研究所 Built with Docusaurus.<p><a href="http://beian.miit.gov.cn/" class="footer_lin">${beian}</a></p>`,
        },
      },
    ],
    [
      '@docusaurus/plugin-ideal-image',
      {
        disableInDev: false,
      },
    ],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/logo.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(51 139 255)',
          },
        ],
      },
    ],
  ],
  stylesheets: [],
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['en', 'zh-CN'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
    },
  },
}

module.exports = config
