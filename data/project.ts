export const projects: Project[] = [
  {
    title: '東雲研究所的小站',
    description: '基于Docusaurus v2 静态网站生成器实现个人博客',
    preview: '/img/project/blog.png',
    website: 'https://blog.xxsoftware.top/',
    source: 'https://github.com/xxsoftware/blog',
    tags: ['opensource', 'design', 'favorite'],
    type: 'web',
  },
  {
    title: '前端示例代码库',
    description:
      '📦 整理前端样式和功能的实现代码，可以用来寻找灵感或直接使用示例中的代码',
    preview: '/img/project/example-website.png',
    website: 'https://lib.xxsoftware.top/',
    source: 'https://github.com/xxsoftware/example',
    tags: ['opensource', 'design'],
    type: 'web',
  },
  {
    title: 'kz-admin',
    description:
      '基于NestJs + TypeScript + TypeORM + Redis + MySql + Vben Admin编写的一款前后端分离的权限管理系统',
    preview: '/img/project/kz-admin.png',
    website: 'https://admin.kuizuo.cn',
    source: 'https://github.com/kuizuo/kz-admin',
    tags: ['opensource', 'favorite', 'product', 'large'],
    type: 'web',
  },
  {
    title: 'KZ-API',
    description: '🔗 基于Nuxt3 + Vite3 + Vue3 + UnoCSS搭建的API接口服务网站',
    preview: '/img/project/kz-api.png',
    website: 'https://api.kuizuo.cn',
    source: 'https://github.com/kuizuo/api-service',
    tags: ['opensource', 'favorite', 'product'],
    type: 'web',
  },
  {
    title: 'Protocol',
    description: '🧪 一个用于快速复现请求协议的 Web 开发模板',
    preview: '/img/project/protocol.png',
    website: 'https://protocol.kuizuo.cn',
    source: 'https://github.com/kuizuo/protocol',
    tags: ['opensource', 'favorite'],
    type: 'web',
  },
  {
    title: 'Link Maker',
    description: '🍋 一个用于将链接转换为卡片样式的预览网站',
    preview: '/img/project/link-maker.png',
    website: 'https://link-maker.deno.dev',
    source: 'https://github.com/kuizuo/link-maker',
    tags: ['opensource'],
    type: 'web',
  },

  {
    title: 'Vitesse Nuxt3 Strapi',
    description: '一个 Vitesse Nuxt3 Strapi 的模板，灵感来源 Vitesse',
    preview: '/img/project/vitesse-nuxt3-strapi.png',
    website: 'https://vitesse-nuxt3-strapi.vercel.app',
    source: 'https://github.com/kuizuo/vitesse-nuxt3-strapi',
    tags: ['opensource'],
    type: 'web',
  },
  {
    title: '@kuizuo/utils',
    description: '整理JavaScript / TypeScript的相关工具函数',
    website: 'https://www.npmjs.com/package/@kuizuo/utils',
    tags: ['opensource', 'personal'],
    type: 'personal',
  },
]

export type Tag = {
  label: string
  description: string
  color: string
}

export type TagType =
  | 'favorite'
  | 'opensource'
  | 'product'
  | 'design'
  | 'large'
  | 'personal'

export type ProjectType = 'personal' | 'web' | 'app' | 'toy' | 'other'

export type Project = {
  title: string
  description: string
  preview?: any
  website: string
  source?: string | null
  tags: TagType[]
  type: ProjectType
}

export const Tags: Record<TagType, Tag> = {
  favorite: {
    label: '喜爱',
    description: '我最喜欢的网站，一定要去看看!',
    color: '#e9669e',
  },
  opensource: {
    label: '开源',
    description: '开源项目可以提供灵感!',
    color: '#39ca30',
  },
  product: {
    label: '产品',
    description: '与产品相关的项目!',
    color: '#dfd545',
  },
  design: {
    label: '设计',
    description: '设计漂亮的网站!',
    color: '#a44fb7',
  },
  large: {
    label: '大型',
    description: '大型项目，原多于平均数的页面',
    color: '#8c2f00',
  },
  personal: {
    label: '个人',
    description: '个人项目',
    color: '#12affa',
  },
}

export const TagList = Object.keys(Tags) as TagType[]

export const groupByProjects = projects.reduce((group, project) => {
  const { type } = project
  group[type] = group[type] ?? []
  group[type].push(project)
  return group
}, {} as Record<ProjectType, Project[]>)
