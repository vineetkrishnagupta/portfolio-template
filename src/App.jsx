import { useEffect, useMemo, useState } from 'react'
import './App.css'

function App() {
  const storageKey = 'theme'
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(storageKey)
    return saved === 'dark' || saved === 'light' ? saved : 'system'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') {
      root.removeAttribute('data-theme')
      localStorage.removeItem(storageKey)
      return
    }
    root.setAttribute('data-theme', theme)
    localStorage.setItem(storageKey, theme)
  }, [theme])

  const themeLabel = useMemo(() => {
    if (theme === 'dark') return 'Dark'
    if (theme === 'light') return 'Light'
    return 'System'
  }, [theme])

  const profile = {
    name: 'Your Name',
    role: 'Frontend Developer',
    location: 'City, Country',
    blurb:
      'I build fast, accessible, and delightful web experiences. I like clean UI, strong UX, and pragmatic engineering.',
    email: 'you@example.com',
    resumeUrl: '/resume.pdf',
    imageSrc: '/profile.svg',
    socials: [
      { label: 'GitHub', href: 'https://github.com/your-handle' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-handle/' },
      { label: 'X', href: 'https://x.com/your-handle' },
    ],
  }

  const projects = [
    {
      title: 'Project One',
      description:
        'A polished product page with responsive layout, accessible components, and performance-focused UX.',
      tags: ['React', 'CSS', 'Accessibility'],
      screenshots: [
        { src: '/screenshots/placeholder-1.svg', alt: 'Project One screenshot 1' },
        { src: '/screenshots/placeholder-2.svg', alt: 'Project One screenshot 2' },
      ],
      links: [
        { label: 'Live', href: 'https://example.com' },
        { label: 'Code', href: 'https://github.com/your-handle/project-one' },
      ],
    },
    {
      title: 'Project Two',
      description:
        'Dashboard UI with reusable charts/cards, clean architecture, and thoughtful loading/error states.',
      tags: ['React', 'Vite', 'UI'],
      screenshots: [
        { src: '/screenshots/placeholder-2.svg', alt: 'Project Two screenshot 1' },
        { src: '/screenshots/placeholder-3.svg', alt: 'Project Two screenshot 2' },
      ],
      links: [{ label: 'Code', href: 'https://github.com/your-handle/project-two' }],
    },
    {
      title: 'Project Three',
      description:
        'Small tool that solves a real problem with crisp interactions and a tiny bundle.',
      tags: ['TypeScript', 'React', 'Performance'],
      screenshots: [{ src: '/screenshots/placeholder-3.svg', alt: 'Project Three screenshot 1' }],
      links: [{ label: 'Live', href: 'https://example.com' }],
    },
  ]

  const skills = [
    { title: 'Frontend', items: ['React', 'TypeScript', 'HTML', 'CSS', 'Vite'] },
    { title: 'UI/UX', items: ['Design systems', 'A11y', 'Responsive design', 'Motion'] },
    { title: 'Tools', items: ['Git', 'CI', 'Testing basics', 'Performance profiling'] },
  ]

  const experience = [
    {
      role: 'Frontend Developer',
      company: 'Company Name',
      location: 'City',
      period: '2024 — Present',
      highlights: [
        'Built responsive UI components and improved page performance.',
        'Worked closely with design to ship accessible, polished experiences.',
        'Owned features end-to-end: planning, implementation, QA, release.',
      ],
    },
    {
      role: 'Intern / Junior Developer',
      company: 'Previous Company',
      location: 'City',
      period: '2023 — 2024',
      highlights: ['Implemented UI screens, fixed bugs, and improved UX flows.'],
    },
  ]

  const education = [
    {
      degree: 'B.Tech / B.E. (Your Branch)',
      school: 'Your College / University',
      location: 'City',
      period: '2019 — 2023',
      details: ['CGPA: 8.0/10 (optional)', 'Relevant coursework: DSA, DBMS, OS (optional)'],
    },
  ]

  const certifications = [
    {
      title: 'Certification Title',
      issuer: 'Issuer / Platform',
      year: '2025',
      imageSrc: '/certifications/cert-1.svg',
    },
    {
      title: 'Certification Title',
      issuer: 'Issuer / Platform',
      year: '2024',
      imageSrc: '/certifications/cert-2.svg',
    },
  ]

  const [lightbox, setLightbox] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!lightbox) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightbox])

  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isMenuOpen])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Go to top">
          <span className="brandMark" aria-hidden="true">
            ◇
          </span>
          <span>{profile.name}</span>
        </a>
        <nav className="nav navDesktop" aria-label="Primary">
          {navItems.slice(0, -1).map((i) => (
            <a key={i.href} href={i.href}>
              {i.label}
            </a>
          ))}
          <a className="resumeLink" href={profile.resumeUrl} download>
            Resume
          </a>
          <button
            type="button"
            className="themeToggle"
            aria-label={`Theme: ${themeLabel}. Click to change.`}
            onClick={() =>
              setTheme((t) => (t === 'system' ? 'light' : t === 'light' ? 'dark' : 'system'))
            }
          >
            <span className="themeIcon" aria-hidden="true">
              {theme === 'dark' ? '☾' : theme === 'light' ? '☀︎' : '◐'}
            </span>
            <span className="themeText">{themeLabel}</span>
          </button>
          <a className="navCta" href="#contact">
            Contact
          </a>
        </nav>

        <div className="navMobile" aria-label="Mobile actions">
          <button
            type="button"
            className="iconButton"
            aria-label={`Theme: ${themeLabel}. Click to change.`}
            onClick={() =>
              setTheme((t) => (t === 'system' ? 'light' : t === 'light' ? 'dark' : 'system'))
            }
          >
            <span className="themeIcon" aria-hidden="true">
              {theme === 'dark' ? '☾' : theme === 'light' ? '☀︎' : '◐'}
            </span>
          </button>
          <button
            type="button"
            className="iconButton"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-drawer"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <span aria-hidden="true">{isMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </header>

      {isMenuOpen ? (
        <div
          className="drawerOverlay"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsMenuOpen(false)
          }}
        >
          <aside id="mobile-drawer" className="drawer">
            <div className="drawerTop">
              <p className="drawerTitle">Menu</p>
              <button type="button" className="iconButton" aria-label="Close menu" onClick={() => setIsMenuOpen(false)}>
                <span aria-hidden="true">✕</span>
              </button>
            </div>

            <div className="drawerLinks" aria-label="Site sections">
              {navItems.map((i) => (
                <a
                  key={i.href}
                  className="drawerLink"
                  href={i.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {i.label}
                </a>
              ))}
            </div>

            <div className="drawerBottom">
              <a className="button primary" href={profile.resumeUrl} download onClick={() => setIsMenuOpen(false)}>
                Download resume
              </a>
              <a className="button ghost" href={`mailto:${profile.email}`} onClick={() => setIsMenuOpen(false)}>
                Email me
              </a>
            </div>
          </aside>
        </div>
      ) : null}

      <main id="top" className="page">
        <section className="heroSection">
          <div className="heroGrid">
            <div className="heroCopy">
              <p className="eyebrow">
                {profile.role} · {profile.location}
              </p>
              <h1 className="heroTitle">
                Building modern web experiences with craft and clarity.
              </h1>
              <p className="heroBlurb">{profile.blurb}</p>
              <div className="heroActions">
                <a className="button primary" href="#projects">
                  View projects
                </a>
                <a className="button ghost" href={profile.resumeUrl} download>
                  Download resume
                </a>
                <a className="button ghost" href={`mailto:${profile.email}`}>
                  Email me
                </a>
              </div>
              <div className="heroSocial" aria-label="Social links">
                {profile.socials.map((s) => (
                  <a key={s.label} className="chip" href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="heroCard" aria-label="Profile summary">
              <div className="heroCardTop">
                {profile.imageSrc ? (
                  <img className="avatarImg" src={profile.imageSrc} alt={`${profile.name} profile photo`} />
                ) : (
                  <div className="avatar" aria-hidden="true">
                    <span>{profile.name.split(' ').slice(0, 2).map((p) => p[0]).join('')}</span>
                  </div>
                )}
                <div>
                  <p className="cardTitle">{profile.name}</p>
                  <p className="cardSubtitle">{profile.role}</p>
                </div>
              </div>
              <div className="heroCardBody">
                <div className="stat">
                  <p className="statLabel">Focus</p>
                  <p className="statValue">UI engineering</p>
                </div>
                <div className="stat">
                  <p className="statLabel">Strengths</p>
                  <p className="statValue">A11y · performance · DX</p>
                </div>
                <div className="stat">
                  <p className="statLabel">Availability</p>
                  <p className="statValue">Open to work</p>
                </div>
              </div>
              <a className="button subtle" href="#contact">
                Let’s work together
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="sectionHead">
            <h2>About</h2>
            <p>
              A quick intro you can tailor. Keep this to 2–4 lines for best readability.
            </p>
          </div>
          <div className="twoCol">
            <div className="card">
              <h3>What I do</h3>
              <p>
                I help teams ship user-facing features: from component systems to product pages,
                with a strong focus on accessibility, responsiveness, and performance.
              </p>
            </div>
            <div className="card">
              <h3>What I value</h3>
              <p>
                Clear requirements, thoughtful UX, small pull requests, and interfaces that feel
                effortless to use.
              </p>
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="sectionHead">
            <h2>Projects</h2>
            <p>Selected work. Replace the content and links with your real projects.</p>
          </div>
          <div className="grid">
            {projects.map((p) => (
              <article key={p.title} className="card projectCard">
                <div className="projectTop">
                  <h3>{p.title}</h3>
                  <p className="muted">{p.description}</p>
                </div>
                <div className="tagRow" aria-label={`${p.title} tags`}>
                  {p.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                {p.screenshots?.length ? (
                  <div className="shotBlock" aria-label={`${p.title} screenshots`}>
                    <p className="shotLabel">Screenshots</p>
                    <div className="shotGrid">
                      {p.screenshots.map((s) => (
                        <button
                          key={s.src}
                          type="button"
                          className="shot"
                          onClick={() => setLightbox({ src: s.src, alt: s.alt })}
                        >
                          <img src={s.src} alt={s.alt} loading="lazy" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
                <div className="linkRow">
                  {p.links.map((l) => (
                    <a key={l.label} className="textLink" href={l.href} target="_blank" rel="noreferrer">
                      {l.label} →
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section">
          <div className="sectionHead">
            <h2>Skills</h2>
            <p>A simple breakdown to help recruiters scan quickly.</p>
          </div>
          <div className="grid three">
            {skills.map((s) => (
              <div key={s.title} className="card">
                <h3>{s.title}</h3>
                <ul className="list">
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="section">
          <div className="sectionHead">
            <h2>Experience</h2>
            <p>Real-world impact and responsibilities.</p>
          </div>
          <div className="stack">
            {experience.map((e) => (
              <article key={`${e.company}-${e.period}`} className="card timelineCard">
                <div className="timelineTop">
                  <div>
                    <h3 className="timelineTitle">{e.role}</h3>
                    <p className="muted">
                      {e.company} · {e.location}
                    </p>
                  </div>
                  <p className="timelineMeta">{e.period}</p>
                </div>
                {e.highlights?.length ? (
                  <ul className="bullets">
                    {e.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section">
          <div className="sectionHead">
            <h2>Education</h2>
            <p>Your academic background.</p>
          </div>
          <div className="stack">
            {education.map((ed) => (
              <article key={`${ed.school}-${ed.period}`} className="card timelineCard">
                <div className="timelineTop">
                  <div>
                    <h3 className="timelineTitle">{ed.degree}</h3>
                    <p className="muted">
                      {ed.school} · {ed.location}
                    </p>
                  </div>
                  <p className="timelineMeta">{ed.period}</p>
                </div>
                {ed.details?.length ? (
                  <ul className="bullets">
                    {ed.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section id="certifications" className="section">
          <div className="sectionHead">
            <h2>Certifications</h2>
            <p>Certificates with images (click to preview).</p>
          </div>
          <div className="grid three certGrid">
            {certifications.map((c) => (
              <article key={`${c.title}-${c.year}`} className="card certCard">
                <button
                  type="button"
                  className="certMedia"
                  onClick={() => setLightbox({ src: c.imageSrc, alt: `${c.title} certificate` })}
                >
                  <img src={c.imageSrc} alt={`${c.title} certificate`} loading="lazy" />
                </button>
                <div className="certBody">
                  <h3 className="certTitle">{c.title}</h3>
                  <p className="muted">
                    {c.issuer} · {c.year}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <div className="callout">
            <div>
              <h2>Contact</h2>
              <p className="muted">
                Want to collaborate or hire me? The fastest way is email.
              </p>
            </div>
            <div className="calloutActions">
              <a className="button primary" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <a className="button ghost" href="#top">
                Back to top
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React.
        </p>
      </footer>

      {lightbox ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setLightbox(null)
          }}
        >
          <div className="lightboxInner">
            <div className="lightboxBar">
              <p className="lightboxTitle">{lightbox.alt}</p>
              <button type="button" className="lightboxClose" onClick={() => setLightbox(null)}>
                Close
              </button>
            </div>
            <img className="lightboxImg" src={lightbox.src} alt={lightbox.alt} />
          </div>
        </div>
      ) : null}
    </>
  )
}

export default App
