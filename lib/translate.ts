// 专业术语表 - 确保翻译一致性
const TERMINOLOGY: Record<string, { en: string; ar: string }> = {
  '香炉': { en: 'incense burner (Mabkhara)', ar: 'مبخرة' },
  '阿拉伯香炉': { en: 'Arabic incense burner (Mabkhara)', ar: 'مبخرة عربية' },
  '镀金': { en: 'gold-plated', ar: 'مطلي بالذهب' },
  '餐具套装': { en: 'serving set', ar: 'طقم تقديم' },
  '金色餐具': { en: 'gold serving set', ar: 'طقم تقديم ذهبي' },
  '果盘': { en: 'fruit plate', ar: 'صحن فواكه' },
  '起订量': { en: 'MOQ (Minimum Order Quantity)', ar: 'الحد الأدنى للطلب' },
  '最低起订': { en: 'MOQ', ar: 'الحد الأدنى للطلب' },
  'OEM': { en: 'OEM', ar: 'OEM' },
  '定制': { en: 'customization', ar: 'تخصيص' },
  '工厂直销': { en: 'factory direct', ar: 'مباشر من المصنع' },
  '广州': { en: 'Guangzhou', ar: 'قوانغتشو' },
  '增城': { en: 'Zengcheng', ar: 'زنغتشنغ' },
  '中东': { en: 'Middle East', ar: 'الشرق الأوسط' },
  '伊斯兰': { en: 'Islamic', ar: 'إسلامي' },
  '家居装饰': { en: 'home decor', ar: 'ديكور منزلي' },
  '质量控制': { en: 'quality control', ar: 'مراقبة الجودة' },
  '生产周期': { en: 'production lead time', ar: 'مدة الإنتاج' },
  '交货': { en: 'delivery', ar: 'التسليم' },
  'WhatsApp': { en: 'WhatsApp', ar: 'واتساب' },
}

// 翻译单个文本 (使用 OpenRouter API)
async function translateText(text: string, targetLang: 'en' | 'ar', apiKey: string): Promise<string> {
  if (!text || typeof text !== 'string') return text
  if (text.startsWith('http') || text.startsWith('/')) return text
  if (/^[\p{Emoji}\s]+$/u.test(text)) return text

  const langName = targetLang === 'en' ? 'English' : 'Arabic'
  const langNote = targetLang === 'ar' 
    ? 'Use Modern Standard Arabic (MSA). Formal business tone.'
    : 'Use professional B2B business English.'

  // 构建术语提示
  const termHints = Object.entries(TERMINOLOGY)
    .filter(([zh]) => text.includes(zh))
    .map(([zh, trans]) => `"${zh}" → "${trans[targetLang]}"`)
    .join('\n')

  const prompt = `You are a professional translator specializing in B2B manufacturing and Middle East trade.

Translate the following Chinese text to ${langName}.

${langNote}

${termHints ? `IMPORTANT - Use these exact translations for terminology:\n${termHints}\n` : ''}

Keep HTML tags intact. Output ONLY the translation, nothing else.

Text to translate:
${text}`

  try {
    // 使用 OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://arabgoldfactory.com',
        'X-Title': 'ArabGold CMS'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 4096
      })
    })
    
    const data = await response.json()
    // OpenRouter 返回格式与 OpenAI 兼容
    return data.choices?.[0]?.message?.content || text
  } catch (error) {
    console.error('Translation error:', error)
    return text
  }
}

// 审查并纠错翻译 (使用 OpenRouter API)
async function reviewTranslation(
  original: string, 
  translated: string, 
  targetLang: 'en' | 'ar',
  apiKey: string
): Promise<{ corrected: string; issues: string[] }> {
  const langName = targetLang === 'en' ? 'English' : 'Arabic'
  
  const prompt = `You are a translation quality reviewer specializing in B2B manufacturing content for Middle East markets.

Review this translation and fix any issues:

ORIGINAL (Chinese): ${original}

TRANSLATION (${langName}): ${translated}

Check for:
1. Accuracy - Does it convey the same meaning?
2. Terminology - Are industry terms (incense burner/Mabkhara, gold-plated, MOQ, OEM) translated correctly?
3. Grammar - Is the grammar correct?
4. Tone - Is it professional and suitable for B2B?
5. For Arabic: Is it Modern Standard Arabic (not dialect)?

Respond in this exact JSON format:
{
  "corrected": "the corrected translation (or same as input if no issues)",
  "issues": ["list of issues found, empty array if none"]
}

Output ONLY the JSON, nothing else.`

  try {
    // 使用 OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://arabgoldfactory.com',
        'X-Title': 'ArabGold CMS'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 4096
      })
    })
    
    const data = await response.json()
    const text = data.choices?.[0]?.message?.content || ''
    
    try {
      const result = JSON.parse(text.replace(/```json|```/g, '').trim())
      return {
        corrected: result.corrected || translated,
        issues: result.issues || []
      }
    } catch {
      return { corrected: translated, issues: [] }
    }
  } catch (error) {
    console.error('Review error:', error)
    return { corrected: translated, issues: [] }
  }
}

// 翻译并审查单个文本
export async function translateAndReview(
  text: string,
  targetLang: 'en' | 'ar',
  apiKey: string
): Promise<string> {
  if (!text || typeof text !== 'string') return text
  if (text.startsWith('http') || text.startsWith('/')) return text
  if (/^[\p{Emoji}\s]+$/u.test(text)) return text
  
  // 第一步：翻译
  const translated = await translateText(text, targetLang, apiKey)
  
  // 第二步：审查纠错
  const { corrected, issues } = await reviewTranslation(text, translated, targetLang, apiKey)
  
  if (issues.length > 0) {
    console.log(`Translation issues found and corrected for "${text.substring(0, 30)}...":`, issues)
  }
  
  return corrected
}

// 递归翻译对象
export async function translateObject(
  obj: any,
  targetLang: 'en' | 'ar',
  apiKey: string
): Promise<any> {
  if (typeof obj === 'string') {
    return await translateAndReview(obj, targetLang, apiKey)
  }
  
  if (Array.isArray(obj)) {
    const results = []
    for (const item of obj) {
      results.push(await translateObject(item, targetLang, apiKey))
    }
    return results
  }
  
  if (typeof obj === 'object' && obj !== null) {
    const result: any = {}
    const skipKeys = ['id', 'slug', 'href', 'image', 'backgroundImage', 'icon', 'flag', 'category', 'email', 'whatsapp', 'date', 'author']
    
    for (const [key, value] of Object.entries(obj)) {
      if (skipKeys.includes(key)) {
        result[key] = value
      } else {
        result[key] = await translateObject(value, targetLang, apiKey)
      }
    }
    return result
  }
  
  return obj
}

export { TERMINOLOGY }
