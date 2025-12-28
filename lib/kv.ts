import { kv } from '@vercel/kv'

// 内容类型定义
export interface SiteContent {
  hero: {
    badge: string
    title: string
    subtitle: string
    description: string
    backgroundImage: string
    stats: Array<{ value: string; label: string }>
  }
  about: {
    title: string
    description: string
    image: string
    features: Array<{ icon: string; title: string; desc: string }>
  }
  products: {
    items: Array<{
      id: string
      name: string
      desc: string
      image: string
      category: string
      badge: string
      moq: string
    }>
  }
  services: {
    items: Array<{ icon: string; title: string; desc: string }>
  }
  faq: {
    items: Array<{ q: string; a: string }>
  }
  markets: {
    items: Array<{ flag: string; name: string }>
  }
  contact: {
    whatsapp: string
    email: string
    address: string
    workingHours: string
  }
  meta: {
    title: string
    description: string
    keywords: string
  }
  blog: {
    posts: Array<{
      id: string
      slug: string
      title: string
      excerpt: string
      content: string
      image: string
      date: string
      author: string
    }>
  }
}

// 默认内容
const defaultContent: SiteContent = {
  hero: {
    badge: '源头工厂 · 广州',
    title: '高端阿拉伯香炉与金色餐具套装',
    subtitle: '专业生产伊斯兰家居装饰品，出口中东市场',
    description: 'ArabGold工厂专业生产香炉（Mabkhara）、镀金餐具套装和家居装饰品。工厂直销，50件起订，支持OEM定制。',
    backgroundImage: '/images/hero-bg.jpg',
    stats: [
      { value: '50件', label: '最低起订' },
      { value: '15天', label: '生产周期' },
      { value: '20+', label: '出口国家' },
      { value: 'OEM', label: '定制服务' }
    ]
  },
  about: {
    title: '关于 ArabGold 工厂',
    description: '<strong>ArabGold工厂</strong>是专业的金属工艺品制造商，位于<strong>广州市增城区</strong>。我们专业生产高品质<strong>阿拉伯香炉</strong>、<strong>镀金餐具套装</strong>和<strong>伊斯兰家居装饰品</strong>。',
    image: '/images/about.png',
    features: [
      { icon: '🏭', title: '工厂直销', desc: '无中间商，最优价格' },
      { icon: '📦', title: '低起订量', desc: '50件起订，可混装' },
      { icon: '✨', title: 'OEM定制', desc: '你的设计，你的品牌' },
      { icon: '🚀', title: '快速生产', desc: '15天交货' }
    ]
  },
  products: { items: [] },
  services: {
    items: [
      { icon: '🎨', title: 'OEM定制', desc: '按您的设计、尺寸、颜色定制' },
      { icon: '📦', title: '低起订量', desc: '50件起订，可混装' },
      { icon: '🏷️', title: '贴牌服务', desc: '添加您的Logo和包装' },
      { icon: '🔍', title: '质量控制', desc: '发货前严格质检' },
      { icon: '🚢', title: '全球发货', desc: '出口20+国家' },
      { icon: '💬', title: '24小时服务', desc: 'WhatsApp快速响应' }
    ]
  },
  faq: {
    items: [
      { q: '在哪里能找到阿拉伯香炉制造商？', a: 'ArabGold工厂位于广州增城区，是专业的阿拉伯香炉制造商。工厂直销，50件起订。WhatsApp: +86-13115825523' },
      { q: '最低起订量是多少？', a: '最低起订量50件，可以混装不同款式。适合小零售商测试市场。' },
      { q: '提供OEM定制服务吗？', a: '是的，我们提供完整的OEM服务。可定制设计、尺寸、颜色、包装和Logo。生产周期15-20天。' }
    ]
  },
  markets: {
    items: [
      { flag: '🇸🇦', name: '沙特阿拉伯' }, { flag: '🇦🇪', name: '阿联酋' },
      { flag: '🇰🇼', name: '科威特' }, { flag: '🇶🇦', name: '卡塔尔' },
      { flag: '🇧🇭', name: '巴林' }, { flag: '🇴🇲', name: '阿曼' },
      { flag: '🇮🇶', name: '伊拉克' }, { flag: '🇯🇴', name: '约旦' },
      { flag: '🇪🇬', name: '埃及' }, { flag: '🇲🇦', name: '摩洛哥' },
      { flag: '🇹🇷', name: '土耳其' }, { flag: '🇵🇰', name: '巴基斯坦' }
    ]
  },
  contact: {
    whatsapp: '+86 131 1582 5523',
    email: '5429752@qq.com',
    address: 'Zengcheng District, Guangzhou, China',
    workingHours: 'Mon-Sat 9AM-6PM (China Time)'
  },
  meta: {
    title: 'ArabGold工厂 | 阿拉伯香炉与金色餐具制造商',
    description: '广州工厂直销阿拉伯香炉、镀金餐具、伊斯兰家居装饰品。50件起订，支持OEM定制。',
    keywords: 'Arabic incense burner, Mabkhara, gold serving set, Islamic home decor'
  },
  blog: { posts: [] }
}

// 获取内容
export async function getContent(lang: 'zh' | 'en' | 'ar'): Promise<SiteContent> {
  try {
    const content = await kv.get<SiteContent>(`content:${lang}`)
    return content || defaultContent
  } catch (error) {
    console.error('KV get error:', error)
    return defaultContent
  }
}

// 保存内容
export async function setContent(lang: 'zh' | 'en' | 'ar', content: SiteContent): Promise<boolean> {
  try {
    await kv.set(`content:${lang}`, content)
    return true
  } catch (error) {
    console.error('KV set error:', error)
    return false
  }
}

// 获取翻译状态
export async function getTranslateStatus(): Promise<{ status: string; lastUpdate: string }> {
  try {
    const status = await kv.get<{ status: string; lastUpdate: string }>('translate:status')
    return status || { status: 'idle', lastUpdate: '' }
  } catch {
    return { status: 'idle', lastUpdate: '' }
  }
}

// 设置翻译状态
export async function setTranslateStatus(status: string): Promise<void> {
  await kv.set('translate:status', { status, lastUpdate: new Date().toISOString() })
}

export { defaultContent }
