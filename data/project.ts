export const projects: Project[] = [
  {
    title: '東雲研究所的小站',
    description: '基于Docusaurus v2 静态网站生成器实现个人博客',
    preview: 'https://img.xxsoftware.fun/blog.png',
    website: 'https://blog.xxsoftware.fun/',
    source: 'https://github.com/xxsoftware/blog',
    tags: ['opensource', 'design', 'favorite'],
    type: 'web',
  },
  {
    title: '前端示例代码库',
    description:
      '📦 整理前端样式和功能的实现代码，可以用来寻找灵感或直接使用示例中的代码',
    preview: 'https://img.xxsoftware.fun/lib.png',
    website: 'https://lib.xxsoftware.fun/',
    source: 'https://gitee.com/xxsoftware/vue',
    tags: ['opensource', 'design'],
    type: 'web',
  },
  {
    title: 'xx记账',
    description:
      'trao+vue3+pinia+nutUI+echarts构建的记账微信小程序',
    preview: 'https://img.xxsoftware.fun/taro-app.png',
    website: 'https://img.xxsoftware.fun/gh_6f9f88ffcb9a_1280.jpg',
    source: 'https://gitee.com/xxsoftware/taro-app',
    tags: ['opensource', 'product'],
    type: 'web',
  },
  {
    title: '小游戏平台',
    description:
      'vitesse+elementplus构建的小游戏平台',
    preview: 'https://img.xxsoftware.fun/game-minesweeper.png',
    website: 'https://www.xxsoftware.fun/',
    source: 'https://gitee.com/xxsoftware/games',
    tags: ['opensource', 'product'],
    type: 'web',
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
