export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  category: string
  readingTime: number
  body: string
  translations?: {
    en?: string
    es?: string
    pt?: string
  }
}

import enPost1 from '@/content/blog/en/self-hosted-pos-no-commission'
import esPost1 from '@/content/blog/es/pos-sin-comisiones-para-salones'
import ptPost1 from '@/content/blog/pt/pos-sem-comissao-para-saloes'

const ALL_POSTS: Record<string, BlogPost[]> = {
  en: [enPost1 as BlogPost],
  es: [esPost1 as BlogPost],
  pt: [ptPost1 as BlogPost],
}

export function getPosts(locale: string): BlogPost[] {
  return ALL_POSTS[locale] ?? []
}

export function getPost(locale: string, slug: string): BlogPost | undefined {
  return getPosts(locale).find(p => p.slug === slug)
}
