export const allMdxNodes = [
  {
    fields: { slug: 'uilib/components/button' },
    frontmatter: { title: 'Button', order: 1 },
  },
  {
    fields: { slug: 'uilib/components/anchor' },
    frontmatter: { title: 'Anchor', order: 2 },
  },
  {
    fields: { slug: 'uilib/elements/heading' },
    frontmatter: { title: 'Heading', draft: true },
  },
  {
    fields: { slug: 'uilib/components/slider' },
    frontmatter: { title: null },
  },
  {
    fields: { slug: 'uilib/components/modal/demos' },
    frontmatter: {},
  },
  {
    fields: { slug: 'quickguide-designer' },
    frontmatter: { title: 'Design', hideInMenu: true },
  },
]

export const routes = [
  { path: '/uilib/components/button', lazy: () => Promise.resolve({}) },
  { path: '/uilib/components/button/', lazy: () => Promise.resolve({}) },
]
