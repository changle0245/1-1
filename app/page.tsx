import { getContent } from '@/lib/kv'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  const content = await getContent('en')
  const { hero, about, products, services, faq, markets, contact, meta } = content

  return (
    <>
      <style>{`
        header{position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(10,10,10,.95);backdrop-filter:blur(10px);border-bottom:1px solid var(--dark-border)}
        .header-content{display:flex;justify-content:space-between;align-items:center;padding:1rem 2rem;max-width:1200px;margin:0 auto}
        .logo{font-family:'Cinzel',serif;font-size:1.3rem;color:var(--gold);text-decoration:none}
        .logo span{color:var(--white)}
        nav ul{display:flex;gap:2rem;list-style:none}
        nav a{color:var(--white);text-decoration:none;font-size:.9rem}
        nav a:hover{color:var(--gold)}
        .wa-btn{background:#25D366;color:#fff;padding:.6rem 1.2rem;border-radius:50px;text-decoration:none;font-size:.85rem}
        
        .hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:8rem 2rem 4rem;background:linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,.9)),url('${hero.backgroundImage}') center/cover}
        .hero-badge{display:inline-block;background:var(--gold);color:var(--black);padding:.5rem 1.5rem;border-radius:50px;font-size:.85rem;font-weight:600;margin-bottom:2rem}
        .hero h1{font-size:clamp(2rem,5vw,3.5rem);margin-bottom:1rem}
        .hero-subtitle{font-size:1.1rem;color:var(--gold);margin-bottom:1rem}
        .hero-desc{max-width:700px;margin:0 auto 2rem;color:var(--gray)}
        .hero-stats{display:flex;justify-content:center;gap:2rem;margin-bottom:2rem;flex-wrap:wrap}
        .hero-stat-value{display:block;font-family:'Cinzel',serif;font-size:1.8rem;color:var(--gold)}
        .hero-stat-label{font-size:.85rem;color:var(--gray)}
        .hero-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
        .btn{padding:1rem 2rem;border-radius:4px;text-decoration:none;font-weight:500;transition:all .3s}
        .btn-primary{background:var(--gold);color:var(--black)}
        .btn-primary:hover{background:var(--gold-light)}
        .btn-secondary{border:2px solid var(--gold);color:var(--gold);background:transparent}
        .btn-secondary:hover{background:var(--gold);color:var(--black)}
        
        .section{padding:5rem 0}
        .section-dark{background:var(--dark)}
        .section-title{font-size:clamp(1.8rem,4vw,2.5rem);margin-bottom:1rem;text-align:center}
        .section-subtitle{color:var(--gray);text-align:center;max-width:600px;margin:0 auto 3rem}
        
        .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center}
        .about-img img{width:100%;border-radius:8px}
        .features-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;margin-top:1.5rem}
        .feature-card{background:var(--dark-card);padding:1.2rem;border-radius:8px;border:1px solid var(--dark-border)}
        .feature-icon{font-size:1.8rem;margin-bottom:.3rem}
        .feature-card h4{font-size:.95rem;color:var(--gold);margin-bottom:.2rem}
        .feature-card p{font-size:.85rem;color:var(--gray);margin:0}
        
        .products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.5rem;margin-top:2rem}
        .product-card{background:var(--dark-card);border-radius:10px;overflow:hidden;border:1px solid var(--dark-border);transition:all .3s}
        .product-card:hover{transform:translateY(-5px);border-color:var(--gold)}
        .product-img{height:220px;background:var(--dark);display:flex;align-items:center;justify-content:center;position:relative}
        .product-img img{max-width:85%;max-height:85%;object-fit:contain}
        .product-badge{position:absolute;top:.8rem;left:.8rem;background:var(--gold);color:var(--black);padding:.2rem .6rem;border-radius:4px;font-size:.7rem;font-weight:600}
        .product-info{padding:1.2rem}
        .product-info h3{font-size:1rem;margin-bottom:.4rem;color:var(--gold)}
        .product-info p{font-size:.85rem;line-height:1.4;color:var(--gray)}
        .product-moq{color:var(--gold);font-weight:500;margin-top:.4rem;font-size:.9rem}
        
        .services-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.5rem;margin-top:2rem}
        .service-card{background:var(--dark-card);padding:1.5rem;border-radius:10px;border:1px solid var(--dark-border);text-align:center}
        .service-icon{font-size:2.5rem;margin-bottom:.8rem}
        .service-card h3{font-size:1.1rem;margin-bottom:.5rem;color:var(--gold)}
        .service-card p{font-size:.9rem;color:var(--gray)}
        
        .markets-grid{display:flex;flex-wrap:wrap;justify-content:center;gap:.8rem;margin-top:2rem}
        .market-tag{background:var(--dark-card);padding:.6rem 1rem;border-radius:50px;border:1px solid var(--dark-border);font-size:.9rem}
        
        .faq-list{max-width:800px;margin:2rem auto 0}
        .faq-item{border-bottom:1px solid var(--dark-border);padding:1.2rem 0}
        .faq-q{color:var(--white);font-weight:500;font-size:.95rem;margin-bottom:.5rem}
        .faq-a{color:var(--gray);font-size:.9rem}
        
        .contact-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem;margin-top:2rem}
        .contact-card{background:var(--dark-card);padding:1.5rem;border-radius:10px;text-align:center;border:1px solid var(--dark-border)}
        .contact-card h4{margin-bottom:.8rem;color:var(--gold)}
        .contact-card a{color:var(--gold)}
        .contact-card p{color:var(--gray);font-size:.9rem}
        
        footer{background:var(--dark);padding:3rem 0 1.5rem;border-top:1px solid var(--dark-border)}
        .footer-content{text-align:center}
        .footer-logo{font-family:'Cinzel',serif;font-size:1.2rem;color:var(--gold);margin-bottom:1rem}
        .footer-logo span{color:var(--white)}
        .footer-links{display:flex;justify-content:center;gap:2rem;margin-bottom:1rem}
        .footer-links a{color:var(--gray);font-size:.85rem}
        .footer-bottom{font-size:.8rem;color:var(--gray)}
        
        .wa-float{position:fixed;bottom:1.5rem;right:1.5rem;background:#25D366;width:55px;height:55px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 15px rgba(37,211,102,.4);z-index:999}
        .wa-float:hover{transform:scale(1.1)}
        .wa-float svg{width:28px;height:28px;fill:#fff}
        
        .lang-switch{position:fixed;top:80px;right:1rem;display:flex;flex-direction:column;gap:.4rem;z-index:999}
        .lang-btn{padding:.4rem .8rem;background:var(--dark-card);border:1px solid var(--dark-border);border-radius:4px;color:var(--white);font-size:.8rem;text-decoration:none}
        .lang-btn:hover{border-color:var(--gold)}
        
        @media(max-width:768px){
          .about-grid{grid-template-columns:1fr}
          nav ul{display:none}
          .hero-stats{gap:1rem}
        }
      `}</style>

      <header>
        <div className="header-content">
          <Link href="/" className="logo">ARAB<span>GOLD</span></Link>
          <nav>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`} className="wa-btn">WhatsApp</a>
        </div>
      </header>

      <div className="lang-switch">
        <Link href="/" className="lang-btn">EN</Link>
        <Link href="/ar" className="lang-btn">AR</Link>
      </div>

      <section className="hero">
        <div className="container">
          <span className="hero-badge">{hero.badge}</span>
          <h1>{hero.title}</h1>
          <p className="hero-subtitle">{hero.subtitle}</p>
          <p className="hero-desc" dangerouslySetInnerHTML={{ __html: hero.description }} />
          <div className="hero-stats">
            {hero.stats.map((stat, i) => (
              <div key={i}>
                <span className="hero-stat-value">{stat.value}</span>
                <span className="hero-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="hero-btns">
            <a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`} className="btn btn-primary">Get Quote</a>
            <a href="#products" className="btn btn-secondary">View Products</a>
          </div>
        </div>
      </section>

      <section id="about" className="section section-dark">
        <div className="container">
          <div className="about-grid">
            <div className="about-img">
              <img src={about.image} alt="About ArabGold" />
            </div>
            <div>
              <h2 className="section-title" style={{textAlign: 'left'}}>{about.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: about.description }} style={{color: 'var(--gray)'}} />
              <div className="features-grid">
                {about.features.map((f, i) => (
                  <div key={i} className="feature-card">
                    <div className="feature-icon">{f.icon}</div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {products.items.length > 0 && (
        <section id="products" className="section">
          <div className="container">
            <h2 className="section-title">Our Products</h2>
            <p className="section-subtitle">Premium Arabic home decor for wholesale buyers</p>
            <div className="products-grid">
              {products.items.map((p, i) => (
                <div key={i} className="product-card">
                  <div className="product-img">
                    {p.badge && <span className="product-badge">{p.badge}</span>}
                    <img src={p.image} alt={p.name} />
                  </div>
                  <div className="product-info">
                    <h3>{p.name}</h3>
                    <p>{p.desc}</p>
                    <p className="product-moq">MOQ: {p.moq}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="services" className="section section-dark">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Complete solutions for your business</p>
          <div className="services-grid">
            {services.items.map((s, i) => (
              <div key={i} className="service-card">
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Export Markets</h2>
          <p className="section-subtitle">We serve 20+ countries worldwide</p>
          <div className="markets-grid">
            {markets.items.map((m, i) => (
              <span key={i} className="market-tag">{m.flag} {m.name}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="section section-dark">
        <div className="container">
          <h2 className="section-title">FAQ</h2>
          <div className="faq-list">
            {faq.items.map((f, i) => (
              <div key={i} className="faq-item">
                <div className="faq-q">{f.q}</div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">Ready to start your order?</p>
          <div className="contact-grid">
            <div className="contact-card">
              <h4>📱 WhatsApp</h4>
              <a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}>{contact.whatsapp}</a>
            </div>
            <div className="contact-card">
              <h4>📧 Email</h4>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </div>
            <div className="contact-card">
              <h4>📍 Address</h4>
              <p>{contact.address}</p>
            </div>
            <div className="contact-card">
              <h4>🕐 Hours</h4>
              <p>{contact.workingHours}</p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footer-content">
          <div className="footer-logo">ARAB<span>GOLD</span> FACTORY</div>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#products">Products</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </div>
          <p className="footer-bottom">© {new Date().getFullYear()} ArabGold Factory. All rights reserved.</p>
        </div>
      </footer>

      <a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`} className="wa-float">
        <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ArabGold Factory",
        "url": "https://arabgoldfactory.com",
        "logo": "https://arabgoldfactory.com/images/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": contact.whatsapp,
          "contactType": "sales"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Guangzhou",
          "addressCountry": "CN"
        }
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faq.items.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      })}} />
    </>
  )
}
