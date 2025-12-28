import { NextRequest, NextResponse } from 'next/server'
import { setContent, setTranslateStatus } from '@/lib/kv'
import { translateObject } from '@/lib/translate'

export const dynamic = 'force-dynamic'
export const maxDuration = 300 // 5分钟超时

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY
  
  if (!apiKey) {
    return NextResponse.json({ 
      success: false, 
      error: '未配置 OPENROUTER_API_KEY 环境变量' 
    }, { status: 500 })
  }
  
  try {
    const { content } = await request.json()
    
    if (!content) {
      return NextResponse.json({ success: false, error: 'Missing content' }, { status: 400 })
    }
    
    // 设置翻译状态
    await setTranslateStatus('translating')
    
    console.log('开始翻译...')
    
    // 翻译到英语
    console.log('翻译到英语...')
    const enContent = await translateObject(content, 'en', apiKey)
    await setContent('en', enContent)
    console.log('英语翻译完成')
    
    // 翻译到阿拉伯语
    console.log('翻译到阿拉伯语...')
    const arContent = await translateObject(content, 'ar', apiKey)
    await setContent('ar', arContent)
    console.log('阿拉伯语翻译完成')
    
    // 更新状态
    await setTranslateStatus('completed')
    
    return NextResponse.json({ 
      success: true, 
      message: '翻译完成',
      languages: ['en', 'ar']
    })
    
  } catch (error) {
    console.error('Translation error:', error)
    await setTranslateStatus('error')
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Translation failed' 
    }, { status: 500 })
  }
}

// GET: 获取翻译状态
export async function GET() {
  const { getTranslateStatus } = await import('@/lib/kv')
  const status = await getTranslateStatus()
  return NextResponse.json(status)
}
