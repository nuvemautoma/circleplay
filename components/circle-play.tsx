'use client'

import { useEffect, useMemo, useState } from 'react'

type ContentItem = {
  id: string
  title: string
  type: 'Filme' | 'Série' | 'Canal'
  meta: string
  genre: string
  description: string
  image: string
  progress?: number
  badge?: string
}

const items: ContentItem[] = [
  { id: 'aurora', title: 'Aurora de Vidro', type: 'Filme', meta: '2024  ·  2h 08min', genre: 'Ficção científica', description: 'Em uma cidade que esqueceu o sol, uma cartógrafa encontra um mapa capaz de devolver a luz ao mundo.', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80', badge: 'Destaque' },
  { id: 'marte', title: 'Horizonte Marte', type: 'Filme', meta: '2023  ·  1h 52min', genre: 'Aventura', description: 'Uma missão improvável atravessa o planeta vermelho para encontrar a primeira casa da humanidade.', image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=900&q=80' },
  { id: 'noite', title: 'Depois da Noite', type: 'Série', meta: '2 temporadas', genre: 'Suspense', description: 'Uma detetive retorna à sua cidade natal quando todos os relógios param ao mesmo tempo.', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80', progress: 62 },
  { id: 'oceano', title: 'Oceano Profundo', type: 'Série', meta: '1 temporada', genre: 'Documentário', description: 'Uma expedição revela paisagens e criaturas que parecem pertencer a outro planeta.', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80', progress: 28 },
  { id: 'linha', title: 'Linha de Fuga', type: 'Filme', meta: '2024  ·  1h 46min', genre: 'Ação', description: 'Uma motorista precisa cruzar o país antes que a única testemunha desapareça.', image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80' },
  { id: 'sinais', title: 'Sinais do Norte', type: 'Filme', meta: '2022  ·  2h 01min', genre: 'Drama', description: 'Dois irmãos se reencontram em uma estação isolada sob as luzes do norte.', image: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=900&q=80' },
]

const channels = [
  { title: 'Jornal 24h', category: 'Notícias', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=700&q=80', live: 'AO VIVO' },
  { title: 'Arena Sports', category: 'Esportes', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=700&q=80', live: 'AO VIVO' },
  { title: 'Cultura+', category: 'Cultura', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80', live: '20:30' },
  { title: 'Kids Club', category: 'Infantil', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=700&q=80', live: '21:00' },
]

function Logo() {
  return <div className="brand-mark" aria-label="CirclePlay"><span className="brand-ring">C</span><span>Circle<span className="brand-accent">Play</span></span></div>
}

function MediaCard({ item, onOpen }: { item: ContentItem; onOpen: (item: ContentItem) => void }) {
  return <button className="media-card focusable" onClick={() => onOpen(item)} aria-label={`Abrir ${item.title}`}>
    <div className="media-image" style={{ backgroundImage: `url(${item.image})` }}>
      {item.badge && <span className="card-badge">{item.badge}</span>}
      {item.progress !== undefined && <div className="progress-track"><span style={{ width: `${item.progress}%` }} /></div>}
      <span className="play-overlay">▶</span>
    </div>
    <strong>{item.title}</strong>
    <span className="card-meta">{item.meta}</span>
  </button>
}

function Rail({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="rail"><div className="rail-heading"><h2>{title}</h2><button className="see-all focusable">Ver todos <span>→</span></button></div><div className="rail-row">{children}</div></section>
}

export default function CirclePlay() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [activeNav, setActiveNav] = useState('Início')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<ContentItem | null>(null)
  const [playing, setPlaying] = useState(false)
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    const handleRemoteBack = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'BrowserBack') {
        if (playing) setPlaying(false)
        else if (selected) setSelected(null)
        else if (activeNav !== 'Início') setActiveNav('Início')
      }
    }
    window.addEventListener('keydown', handleRemoteBack)
    return () => window.removeEventListener('keydown', handleRemoteBack)
  }, [activeNav, playing, selected])

  const filteredItems = useMemo(() => search ? items.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()) || item.genre.toLowerCase().includes(search.toLowerCase())) : items, [search])

  if (!loggedIn) return <main className="login-screen"><section className="login-panel"><Logo /><h1>Entrar na sua conta</h1><p className="login-copy">Acesse seus filmes, séries e canais favoritos.</p><form onSubmit={(event) => { event.preventDefault(); setLoggedIn(true); setLoginError('') }}><label>Usuário ou e-mail<input className="focusable" required placeholder="usuario@exemplo.com" /></label><label>Senha<div className="password-wrap"><input className="focusable" required minLength={4} type={showPassword ? 'text' : 'password'} placeholder="••••••••" /><button type="button" className="show-password focusable" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Ocultar' : 'Mostrar'}</button></div></label>{loginError && <p className="error-message">{loginError}</p>}<button className="primary-button focusable" type="submit">Entrar <span>→</span></button></form></section></main>

  const navItems = ['Início', 'Filmes', 'Séries', 'Canais', 'Pesquisa', 'Favoritos']
  const contentForNav = activeNav === 'Filmes' ? filteredItems.filter((item) => item.type === 'Filme') : activeNav === 'Séries' ? filteredItems.filter((item) => item.type === 'Série') : filteredItems

  return <main className="app-shell">
    <header className="topbar"><button className="logo-button focusable" onClick={() => setActiveNav('Início')}><Logo /></button><nav aria-label="Navegação principal">{navItems.map((nav) => <button key={nav} className={`nav-link focusable ${activeNav === nav ? 'active' : ''}`} onClick={() => { setActiveNav(nav); if (nav !== 'Pesquisa') setSearch('') }}>{nav}</button>)}</nav><div className="profile-area"><button className="search-trigger focusable" onClick={() => setActiveNav('Pesquisa')} aria-label="Pesquisar">⌕</button><button className="avatar focusable" onClick={() => setActiveNav('Perfil')}>MP</button></div></header>
    {activeNav === 'Pesquisa' ? <section className="search-page"><p className="eyebrow">ENCONTRE SUA PRÓXIMA HISTÓRIA</p><h1>O que você quer assistir?</h1><input autoFocus className="search-input focusable" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Pesquisar filmes, séries e gêneros..." />{search && <Rail title={`${contentForNav.length} resultados`}><>{contentForNav.map((item) => <MediaCard key={item.id} item={item} onOpen={setSelected} />)}</></Rail>}</section> : activeNav === 'Perfil' ? <section className="profile-page"><div className="avatar large">MP</div><p className="eyebrow">PERFIL</p><h1>Marina Pessoa</h1><p className="muted">Plano CirclePlay Premium · Renovação em 12 de outubro</p><button className="secondary-button focusable" onClick={() => setLoggedIn(false)}>Sair da conta</button></section> : <>
      {activeNav === 'Início' && <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(7,11,20,.98) 0%, rgba(7,11,20,.82) 35%, rgba(7,11,20,.1) 78%), linear-gradient(0deg, #070b14 0%, transparent 26%), url(${items[0].image})` }}><div className="hero-copy"><span className="hero-kicker">CIRCLEPLAY ORIGINAL</span><h1>{items[0].title}</h1><div className="hero-meta"><span>2024</span><span>16</span><span>2h 08min</span><span>{items[0].genre}</span></div><p>{items[0].description}</p><div className="hero-actions"><button className="primary-button focusable" onClick={() => setPlaying(true)}>▶&nbsp; Assistir</button><button className="secondary-button focusable" onClick={() => setSelected(items[0])}>Mais informações</button></div></div></section>}
      <div className="content-wrap">{activeNav === 'Canais' ? <Rail title="Canais ao vivo"><>{channels.map((channel) => <button className="channel-card focusable" key={channel.title} onClick={() => setPlaying(true)}><div className="channel-image" style={{ backgroundImage: `url(${channel.image})` }}><span className={channel.live === 'AO VIVO' ? 'live-dot' : 'time-chip'}>{channel.live}</span></div><strong>{channel.title}</strong><span className="card-meta">{channel.category}</span></button>)}</> </Rail> : activeNav === 'Favoritos' ? <Rail title="Minha lista"><>{items.slice(1, 5).map((item) => <MediaCard key={item.id} item={item} onOpen={setSelected} />)}</></Rail> : <><Rail title="Continuar assistindo">{items.slice(2, 5).map((item) => <MediaCard key={item.id} item={item} onOpen={setSelected} />)}</Rail><Rail title={activeNav === 'Início' ? 'Filmes em destaque' : activeNav}><>{contentForNav.map((item) => <MediaCard key={item.id} item={item} onOpen={setSelected} />)}</></Rail><Rail title="Canais ao vivo"><>{channels.map((channel) => <button className="channel-card focusable" key={channel.title} onClick={() => setPlaying(true)}><div className="channel-image" style={{ backgroundImage: `url(${channel.image})` }}><span className={channel.live === 'AO VIVO' ? 'live-dot' : 'time-chip'}>{channel.live}</span></div><strong>{channel.title}</strong><span className="card-meta">{channel.category}</span></button>)}</></Rail></>}</div></>}
    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><section className="detail-modal" onClick={(event) => event.stopPropagation()}><button className="close-button focusable" onClick={() => setSelected(null)}>×</button><div className="detail-art" style={{ backgroundImage: `url(${selected.image})` }} /><div className="detail-copy"><span className="eyebrow">{selected.type.toUpperCase()}</span><h1>{selected.title}</h1><p className="hero-meta">{selected.meta} · {selected.genre}</p><p>{selected.description}</p><button className="primary-button focusable" onClick={() => { setSelected(null); setPlaying(true) }}>▶&nbsp; Assistir agora</button></div></section></div>}
    {playing && <div className="player" role="dialog"><div className="player-screen" style={{ backgroundImage: `linear-gradient(0deg, rgba(7,11,20,.9), rgba(7,11,20,.15)), url(${items[0].image})` }}><button className="close-button focusable" onClick={() => setPlaying(false)}>×</button><div className="player-controls"><span>▶</span><div className="player-progress"><span /></div><span>01:12:38</span><button className="focusable" onClick={() => setPlaying(false)}>Tela cheia</button></div></div></div>}
  </main>
}
