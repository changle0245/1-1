import { NextRequest, NextResponse } from 'next/server'
import { getContent, setContent, defaultContent } from '@/lib/kv'

export const dynamic = 'force-dynamic'

// GET: 获取内容
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lang = (searchParams.get('lang') || 'en') as 'zh' | 'en' | 'ar'
  
  try {
    const content = await getContent(lang)
    return NextResponse.json(content)
  } catch (error) {
    console.error('Get content error:', error)
    return NextResponse.json(defaultContent)
  }
}

// POST: 保存内容
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { lang, content } = body
    
    if (!lang || !content) {
      return NextResponse.json({ error: 'Missing lang or content' }, { status: 400 })
    }
    
    const success = await setContent(lang as 'zh' | 'en' | 'ar', content)
    
    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
    }
  } catch (error) {
    console.error('Save content error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
