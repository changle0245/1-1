'use client'

import { useState, useEffect } from 'react'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pwd, setPwd] = useState('')
  const [tab, setTab] = useState('hero')
  const [data, setData] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [translating, setTranslating] = useState(false)
  const [msg, setMsg] = useState('')

  // 验证密码
  const checkPwd = () => {
    // 从环境变量或硬编码（建议用环境变量）
    if (pwd === 'arabgold2024') {
      setAuthed(true)
      localStorage.setItem('admin_auth', 'true')
    } else {
      setMsg('密码错误')
    }
  }

  // 加载数据
  useEffect(() => {
    if (localStorage.getItem('admin_auth') === 'true') {
      setAuthed(true)
    }
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const res = await fetch('/api/content?lang=zh')
      const json = await res.json()
      setData(json)
    } catch (e) {
      console.error(e)
    }
  }

  // 保存数据
  const saveData = async () => {
    setSaving(true)
    setMsg('')
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang: 'zh', content: data })
      })
      if (res.ok) {
        setMsg('✅ 已保存中文内容')
        // 自动触发翻译
        translateAll()
      } else {
        setMsg('❌ 保存失败')
      }
    } catch (e) {
      setMsg('❌ 保存失败')
    }
    setSaving(false)
  }

  // 翻译
  const translateAll = async () => {
    setTranslating(true)
    setMsg('🌐 正在翻译...')
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: data })
      })
      const json = await res.json()
      if (json.success) {
        setMsg('✅ 翻译完成，网站已更新')
      } else {
        setMsg('⚠️ 翻译部分完成: ' + (json.error || ''))
      }
    } catch (e) {
      setMsg('⚠️ 翻译请求失败，请检查API配置')
    }
    setTranslating(false)
  }

  // 更新字段
  const upd = (path: string, val: any) => {
    const d = { ...data }
    const keys = path.split('.')
    let obj = d
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]]
    }
    obj[keys[keys.length - 1]] = val
    setData(d)
  }

  // 更新数组项
  const updArr = (path: string, idx: number, field: string, val: any) => {
    const d = { ...data }
    const keys = path.split('.')
    let obj = d
    for (const k of keys) obj = obj[k]
    obj[idx][field] = val
    setData(d)
  }

  // 添加数组项
  const addItem = (path: string, template: any) => {
    const d = { ...data }
    const keys = path.split('.')
    let obj = d
    for (const k of keys) obj = obj[k]
    obj.push({ ...template, id: 'i' + Date.now() })
    setData(d)
  }

  // 删除数组项
  const delItem = (path: string, idx: number) => {
    const d = { ...data }
    const keys = path.split('.')
    let obj = d
    for (const k of keys) obj = obj[k]
    obj.splice(idx, 1)
    setData(d)
  }

  if (!authed) {
    return (
      <div style={styles.loginWrap}>
        <div style={styles.loginBox}>
          <h1 style={styles.loginTitle}>ArabGold CMS</h1>
          <p style={styles.loginSub}>请输入管理密码</p>
          <input 
            type="password" 
            value={pwd} 
            onChange={e => setPwd(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && checkPwd()}
            style={styles.input}
            placeholder="密码"
          />
          <button onClick={checkPwd} style={styles.btnGold}>登录</button>
          {msg && <p style={{color: '#f44336', marginTop: '1rem'}}>{msg}</p>}
        </div>
      </div>
    )
  }

  if (!data) return <div style={styles.loading}>加载中...</div>

  return (
    <div style={styles.app}>
      <aside style={styles.side}>
        <div style={styles.logo}>ARAB<span style={{color:'#fff'}}>GOLD</span> CMS</div>
        <div style={styles.navGroup}>
          <div style={styles.navTitle}>页面内容</div>
          {['hero', 'about', 'products', 'services', 'faq', 'markets'].map(t => (
            <div key={t} style={{...styles.navItem, ...(tab===t?styles.navActive:{})}} onClick={() => setTab(t)}>
              {t === 'hero' && '🎯 首屏Banner'}
              {t === 'about' && '📖 关于我们'}
              {t === 'products' && '📦 产品管理'}
              {t === 'services' && '⚙️ 服务项目'}
              {t === 'faq' && '❓ 常见问题'}
              {t === 'markets' && '🌍 出口市场'}
            </div>
          ))}
        </div>
        <div style={styles.navGroup}>
          <div style={styles.navTitle}>设置</div>
          {['contact', 'meta', 'blog'].map(t => (
            <div key={t} style={{...styles.navItem, ...(tab===t?styles.navActive:{})}} onClick={() => setTab(t)}>
              {t === 'contact' && '📞 联系方式'}
              {t === 'meta' && '🔍 SEO设置'}
              {t === 'blog' && '📝 Blog文章'}
            </div>
          ))}
        </div>
      </aside>

      <main style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            {tab === 'hero' && '首屏Banner'}
            {tab === 'about' && '关于我们'}
            {tab === 'products' && '产品管理'}
            {tab === 'services' && '服务项目'}
            {tab === 'faq' && '常见问题'}
            {tab === 'markets' && '出口市场'}
            {tab === 'contact' && '联系方式'}
            {tab === 'meta' && 'SEO设置'}
            {tab === 'blog' && 'Blog文章'}
          </h1>
          <div style={styles.headerBtns}>
            <button onClick={saveData} disabled={saving || translating} style={styles.btnGold}>
              {saving ? '保存中...' : translating ? '翻译中...' : '💾 保存并发布'}
            </button>
          </div>
        </div>

        {msg && <div style={styles.msg}>{msg}</div>}

        {/* Hero */}
        {tab === 'hero' && (
          <div style={styles.card}>
            <Field label="顶部标签" value={data.hero.badge} onChange={v => upd('hero.badge', v)} />
            <Field label="主标题" value={data.hero.title} onChange={v => upd('hero.title', v)} />
            <Field label="副标题" value={data.hero.subtitle} onChange={v => upd('hero.subtitle', v)} />
            <Field label="描述" value={data.hero.description} onChange={v => upd('hero.description', v)} multi />
            <Field label="背景图URL" value={data.hero.backgroundImage} onChange={v => upd('hero.backgroundImage', v)} />
            
            <h3 style={styles.subTitle}>统计数字</h3>
            {data.hero.stats?.map((s: any, i: number) => (
              <div key={i} style={styles.itemRow}>
                <input style={styles.inputSm} value={s.value} onChange={e => updArr('hero.stats', i, 'value', e.target.value)} placeholder="数值" />
                <input style={styles.inputSm} value={s.label} onChange={e => updArr('hero.stats', i, 'label', e.target.value)} placeholder="标签" />
                <button style={styles.btnDel} onClick={() => delItem('hero.stats', i)}>🗑</button>
              </div>
            ))}
            <button style={styles.btnAdd} onClick={() => addItem('hero.stats', {value:'', label:''})}>+ 添加统计</button>
          </div>
        )}

        {/* About */}
        {tab === 'about' && (
          <div style={styles.card}>
            <Field label="标题" value={data.about.title} onChange={v => upd('about.title', v)} />
            <Field label="描述 (支持HTML)" value={data.about.description} onChange={v => upd('about.description', v)} multi />
            <Field label="图片URL" value={data.about.image} onChange={v => upd('about.image', v)} />
            
            <h3 style={styles.subTitle}>特色卡片</h3>
            {data.about.features?.map((f: any, i: number) => (
              <div key={i} style={styles.itemBox}>
                <div style={styles.itemRow}>
                  <input style={{...styles.inputSm, width:'60px'}} value={f.icon} onChange={e => updArr('about.features', i, 'icon', e.target.value)} placeholder="图标" />
                  <input style={styles.inputSm} value={f.title} onChange={e => updArr('about.features', i, 'title', e.target.value)} placeholder="标题" />
                  <button style={styles.btnDel} onClick={() => delItem('about.features', i)}>🗑</button>
                </div>
                <input style={styles.input} value={f.desc} onChange={e => updArr('about.features', i, 'desc', e.target.value)} placeholder="描述" />
              </div>
            ))}
            <button style={styles.btnAdd} onClick={() => addItem('about.features', {icon:'⭐', title:'', desc:''})}>+ 添加卡片</button>
          </div>
        )}

        {/* Products */}
        {tab === 'products' && (
          <div style={styles.card}>
            <p style={styles.help}>添加产品，保存后自动翻译</p>
            {data.products.items?.map((p: any, i: number) => (
              <div key={i} style={styles.itemBox}>
                <div style={styles.itemHead}>
                  <span>📦 {p.name || '新产品'}</span>
                  <button style={styles.btnDel} onClick={() => delItem('products.items', i)}>🗑</button>
                </div>
                <Field label="名称" value={p.name} onChange={v => updArr('products.items', i, 'name', v)} />
                <Field label="描述" value={p.desc} onChange={v => updArr('products.items', i, 'desc', v)} multi />
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.5rem'}}>
                  <Field label="图片URL" value={p.image} onChange={v => updArr('products.items', i, 'image', v)} />
                  <Field label="起订量" value={p.moq} onChange={v => updArr('products.items', i, 'moq', v)} />
                </div>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.5rem'}}>
                  <Field label="标签" value={p.badge} onChange={v => updArr('products.items', i, 'badge', v)} />
                  <div>
                    <label style={styles.label}>分类</label>
                    <select style={styles.input} value={p.category} onChange={e => updArr('products.items', i, 'category', e.target.value)}>
                      <option value="incense-burners">香炉</option>
                      <option value="serving-sets">餐具</option>
                      <option value="decorations">装饰品</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
            <button style={styles.btnAdd} onClick={() => addItem('products.items', {name:'', desc:'', image:'', moq:'50件', badge:'', category:'incense-burners'})}>+ 添加产品</button>
          </div>
        )}

        {/* Services */}
        {tab === 'services' && (
          <div style={styles.card}>
            {data.services.items?.map((s: any, i: number) => (
              <div key={i} style={styles.itemBox}>
                <div style={styles.itemRow}>
                  <input style={{...styles.inputSm, width:'60px'}} value={s.icon} onChange={e => updArr('services.items', i, 'icon', e.target.value)} placeholder="图标" />
                  <input style={styles.inputSm} value={s.title} onChange={e => updArr('services.items', i, 'title', e.target.value)} placeholder="标题" />
                  <button style={styles.btnDel} onClick={() => delItem('services.items', i)}>🗑</button>
                </div>
                <input style={styles.input} value={s.desc} onChange={e => updArr('services.items', i, 'desc', e.target.value)} placeholder="描述" />
              </div>
            ))}
            <button style={styles.btnAdd} onClick={() => addItem('services.items', {icon:'⭐', title:'', desc:''})}>+ 添加服务</button>
          </div>
        )}

        {/* FAQ */}
        {tab === 'faq' && (
          <div style={styles.card}>
            <p style={styles.help}>FAQ是GEO的核心内容，问题要模拟买家问AI的问题</p>
            {data.faq.items?.map((f: any, i: number) => (
              <div key={i} style={styles.itemBox}>
                <div style={styles.itemHead}>
                  <span>Q{i+1}</span>
                  <button style={styles.btnDel} onClick={() => delItem('faq.items', i)}>🗑</button>
                </div>
                <Field label="问题" value={f.q} onChange={v => updArr('faq.items', i, 'q', v)} />
                <Field label="答案" value={f.a} onChange={v => updArr('faq.items', i, 'a', v)} multi />
              </div>
            ))}
            <button style={styles.btnAdd} onClick={() => addItem('faq.items', {q:'', a:''})}>+ 添加FAQ</button>
          </div>
        )}

        {/* Markets */}
        {tab === 'markets' && (
          <div style={styles.card}>
            <p style={styles.help}>出口国家列表</p>
            {data.markets.items?.map((m: any, i: number) => (
              <div key={i} style={styles.itemRow}>
                <input style={{...styles.inputSm, width:'60px'}} value={m.flag} onChange={e => updArr('markets.items', i, 'flag', e.target.value)} placeholder="🏳️" />
                <input style={styles.inputSm} value={m.name} onChange={e => updArr('markets.items', i, 'name', e.target.value)} placeholder="国家名" />
                <button style={styles.btnDel} onClick={() => delItem('markets.items', i)}>🗑</button>
              </div>
            ))}
            <button style={styles.btnAdd} onClick={() => addItem('markets.items', {flag:'🏳️', name:''})}>+ 添加国家</button>
          </div>
        )}

        {/* Contact */}
        {tab === 'contact' && (
          <div style={styles.card}>
            <p style={styles.help}>联系方式不需要翻译</p>
            <Field label="WhatsApp" value={data.contact.whatsapp} onChange={v => upd('contact.whatsapp', v)} />
            <Field label="邮箱" value={data.contact.email} onChange={v => upd('contact.email', v)} />
            <Field label="地址" value={data.contact.address} onChange={v => upd('contact.address', v)} />
            <Field label="工作时间" value={data.contact.workingHours} onChange={v => upd('contact.workingHours', v)} />
          </div>
        )}

        {/* Meta */}
        {tab === 'meta' && (
          <div style={styles.card}>
            <Field label="页面标题" value={data.meta.title} onChange={v => upd('meta.title', v)} />
            <Field label="页面描述" value={data.meta.description} onChange={v => upd('meta.description', v)} multi />
            <Field label="关键词" value={data.meta.keywords} onChange={v => upd('meta.keywords', v)} />
          </div>
        )}

        {/* Blog */}
        {tab === 'blog' && (
          <div style={styles.card}>
            <p style={styles.help}>Blog文章（极简版）</p>
            {data.blog?.posts?.map((p: any, i: number) => (
              <div key={i} style={styles.itemBox}>
                <div style={styles.itemHead}>
                  <span>📝 {p.title || '新文章'}</span>
                  <button style={styles.btnDel} onClick={() => delItem('blog.posts', i)}>🗑</button>
                </div>
                <Field label="标题" value={p.title} onChange={v => updArr('blog.posts', i, 'title', v)} />
                <Field label="Slug (URL)" value={p.slug} onChange={v => updArr('blog.posts', i, 'slug', v)} />
                <Field label="摘要" value={p.excerpt} onChange={v => updArr('blog.posts', i, 'excerpt', v)} />
                <Field label="正文 (支持Markdown)" value={p.content} onChange={v => updArr('blog.posts', i, 'content', v)} multi />
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.5rem'}}>
                  <Field label="封面图URL" value={p.image} onChange={v => updArr('blog.posts', i, 'image', v)} />
                  <Field label="日期" value={p.date} onChange={v => updArr('blog.posts', i, 'date', v)} />
                </div>
              </div>
            ))}
            <button style={styles.btnAdd} onClick={() => addItem('blog.posts', {title:'', slug:'', excerpt:'', content:'', image:'', date: new Date().toISOString().split('T')[0], author:'ArabGold'})}>+ 添加文章</button>
          </div>
        )}
      </main>
    </div>
  )
}

// 字段组件
function Field({ label, value, onChange, multi }: { label: string; value: string; onChange: (v: string) => void; multi?: boolean }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      {multi ? (
        <textarea style={{...styles.input, minHeight: '80px'}} value={value || ''} onChange={e => onChange(e.target.value)} />
      ) : (
        <input style={styles.input} value={value || ''} onChange={e => onChange(e.target.value)} />
      )}
    </div>
  )
}

// 样式
const styles: Record<string, React.CSSProperties> = {
  loginWrap: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' },
  loginBox: { background: '#1a1a1a', padding: '2rem', borderRadius: '10px', textAlign: 'center', width: '320px' },
  loginTitle: { color: '#D4AF37', fontSize: '1.5rem', marginBottom: '0.5rem' },
  loginSub: { color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' },
  loading: { color: '#888', padding: '2rem', textAlign: 'center' },
  
  app: { display: 'flex', minHeight: '100vh', background: '#0a0a0a', color: '#fff' },
  side: { width: '200px', background: '#141414', borderRight: '1px solid #2a2a2a', padding: '1rem', position: 'fixed', height: '100vh', overflowY: 'auto' },
  logo: { color: '#D4AF37', fontSize: '1rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #2a2a2a' },
  navGroup: { marginBottom: '1.5rem' },
  navTitle: { fontSize: '0.65rem', color: '#666', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.1em' },
  navItem: { padding: '0.5rem 0.6rem', color: '#888', borderRadius: '4px', marginBottom: '2px', cursor: 'pointer', fontSize: '0.85rem' },
  navActive: { background: '#D4AF37', color: '#000' },
  
  main: { flex: 1, marginLeft: '200px', padding: '1.5rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #2a2a2a' },
  title: { fontSize: '1.3rem', color: '#D4AF37' },
  headerBtns: { display: 'flex', gap: '0.5rem' },
  
  msg: { background: '#1a1a2e', border: '1px solid #2196F3', borderRadius: '6px', padding: '0.8rem 1rem', marginBottom: '1rem', fontSize: '0.9rem' },
  
  card: { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '8px', padding: '1.25rem', marginBottom: '1rem' },
  subTitle: { color: '#D4AF37', fontSize: '0.95rem', marginTop: '1.5rem', marginBottom: '0.8rem' },
  help: { color: '#888', fontSize: '0.8rem', marginBottom: '1rem' },
  
  field: { marginBottom: '0.9rem' },
  label: { display: 'block', fontSize: '0.75rem', color: '#888', marginBottom: '0.3rem' },
  input: { width: '100%', padding: '0.5rem 0.6rem', background: '#141414', border: '1px solid #2a2a2a', borderRadius: '4px', color: '#fff', fontSize: '0.85rem', fontFamily: 'inherit' },
  inputSm: { flex: 1, padding: '0.4rem 0.5rem', background: '#141414', border: '1px solid #2a2a2a', borderRadius: '4px', color: '#fff', fontSize: '0.85rem' },
  
  itemBox: { background: '#141414', border: '1px solid #2a2a2a', borderRadius: '6px', padding: '0.8rem', marginBottom: '0.6rem' },
  itemHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', color: '#D4AF37', fontSize: '0.9rem' },
  itemRow: { display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' },
  
  btnGold: { padding: '0.5rem 1rem', background: '#D4AF37', color: '#000', border: 'none', borderRadius: '4px', fontSize: '0.85rem', fontWeight: '500', cursor: 'pointer' },
  btnAdd: { padding: '0.4rem 0.8rem', background: 'transparent', color: '#D4AF37', border: '1px dashed #D4AF37', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer', marginTop: '0.5rem' },
  btnDel: { padding: '0.3rem 0.5rem', background: 'transparent', color: '#f44336', border: '1px solid #f44336', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' },
}
