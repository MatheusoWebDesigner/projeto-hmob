// =============================================================
// HMOB — Shared interactions for inner pages
// =============================================================

(function(){
  'use strict';

  // -----------------------------------------------------------
  // HEADER / FOOTER INJECTION
  // -----------------------------------------------------------
  const HEADER_HTML = `
<header class="header" id="header">
  <a class="logo" href="index.html"><span class="mark">H<span class="bar"></span>MOB</span><span class="tag">for offices</span></a>
  <button class="nav-toggle" id="navToggle" aria-label="Abrir menu" aria-expanded="false"><span></span></button>
  <nav class="nav" id="primaryNav">
    <div class="nav-item"><a href="index.html">Início</a></div>
    <div class="nav-item"><a href="sobre.html">Sobre Nós</a></div>
    <div class="nav-item has-mega"><button type="button">Produtos</button>
      <div class="mega" style="max-height: 70vh; overflow-y: auto;">
        <div class="mega-title">Mobiliário</div>
        <a href="mesas-e-plataformas.html">Mesas e Plataformas</a>

        <a href="arquivamento.html">Arquivamento</a>
        <a href="acabamentos.html">Acabamentos</a>
        <div class="mega-title" style="margin-top: 1rem;">Cadeiras &amp; Assentos</div>
        <a href="diretivas.html">Diretivas</a>
        <a href="operativas.html">Operativas</a>
        <a href="dialogo.html">Diálogo</a>
        <a href="coletivas.html">Coletivas</a>
        <a href="colaborativos.html">Colaborativas</a>
        <div class="mega-title" style="margin-top: 1rem;">Lockers</div>
        <a href="lockers-em-aco.html">Aço</a>
        <a href="lockers-em-madeira.html">Madeira</a>
        <div class="mega-title" style="margin-top: 1rem;">Armários Deslizantes</div>
        <a href="armarios-deslizantes.html">Linhas</a>
        <a href="armarios-deslizantes-aplicacao.html">Aplicações</a>
        <div class="mega-title" style="margin-top: 1rem;">Divisórias</div>
        <a href="divisorias.html">Divisórias Corporativas</a>
      </div></div>
    <div class="nav-item"><a href="contato.html">Contato</a></div>
    
    <div class="nav-item search-item" style="position:relative; margin-left: 0.5rem;">
      <button type="button" aria-label="Pesquisar produto" class="search-btn" id="searchBtn" style="color: #F5F5F5; display: flex; align-items: center; justify-content: center; opacity: 0.85; transition: opacity 0.2s; cursor: pointer; background: none; border: none; padding: .25rem 0;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.85">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      </button>
      <div class="search-dropdown" id="searchDropdown">
        <div class="search-input-wrapper">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" id="searchInput" placeholder="Pesquisar produtos..." autocomplete="off">
        </div>
        <div class="search-results" id="searchResults">
          <div class="search-empty">Digite para buscar...</div>
        </div>
      </div>
    </div>
  </nav>
</header>`;

  const FOOTER_HTML = `
<footer class="footer">
  <div class="container rail-pad">
    <div class="footer-grid">
      <div class="col brand">
        <div class="mark">H<span class="bar"></span>MOB <span class="tag">for offices</span></div>
        <p>Soluções corporativas certificadas para ambientes de alta performance. Engenharia de produto, conformidade e operação nacional.</p>
        <div class="seal"><span class="sq"></span><span>ABNT NR-17 · certificado</span></div>
      </div>
      <div class="col"><h5>Mobiliário</h5><ul>
        <li><a href="mesas-e-plataformas.html">Mesas e Plataformas</a></li>

        <li><a href="arquivamento.html">Arquivamento</a></li>
        <li><a href="acabamentos.html">Acabamentos</a></li>
        <li><a href="divisorias.html">Divisórias</a></li>
      </ul></div>
      <div class="col"><h5>Cadeiras &amp; Lockers</h5><ul>
        <li><a href="diretivas.html">Diretivas</a></li>
        <li><a href="operativas.html">Operativas</a></li>
        <li><a href="dialogo.html">Diálogo</a></li>
        <li><a href="lockers-em-aco.html">Lockers em Aço</a></li>
        <li><a href="armarios-deslizantes.html">Armários Deslizantes</a></li>
      </ul></div>
      <div class="col contact-col"><h5>Contato</h5>
        <a class="wa" href="contato.html"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg><span>Falar com um Consultor</span></a>
        <div class="ci"><div class="k">Comercial</div><div class="v">(11) 4705-9947 · (11) 5627-9020</div></div>
        <div class="ci"><div class="k">E-mail</div><div class="v">atendimento.hmob@gmail.com</div></div>
        <div class="ci"><div class="k">Endereço</div><div class="v">Barra Funda · São Paulo · SP</div></div>
        <div class="social">
          <a href="#" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.4-1.1 2.5-2.5 2.5S0 4.9 0 3.5 1.1 1 2.5 1s2.48 1.1 2.48 2.5zM.2 21h4.6V8H.2v13zm7.6-13h4.4v2h.1c.6-1.1 2.1-2.3 4.3-2.3 4.6 0 5.5 3 5.5 7V21h-4.6v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H7.8V8z"/></svg></a>
          <a href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>
          <a href="#" aria-label="YouTube"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4A3 3 0 0 0 23 16.5 31 31 0 0 0 23.5 12 31 31 0 0 0 23 7.5zM9.75 15.5v-7L15.5 12l-5.75 3.5z"/></svg></a>
        </div>
      </div>
    </div>
    <div class="legal"><div>© 2026 Hmob For Offices. Todos os direitos reservados.</div><div><a href="#">Política de Privacidade</a><a href="#">Termos de Uso</a></div></div>
  </div>
</footer>`;

  const headerSlot = document.getElementById('site-header');
  const footerSlot = document.getElementById('site-footer');
  if (headerSlot) headerSlot.outerHTML = HEADER_HTML;
  if (footerSlot) footerSlot.outerHTML = FOOTER_HTML;

  // Wait microtask for DOM update before binding
  Promise.resolve().then(initInteractions);

  function initInteractions(){
    // HEADER SCROLL
    const header = document.getElementById('header');
    if (header){
      // Make header solid by default if page has class .force-solid-header (e.g. contact-only pages)
      const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive:true });
    }

    // SEARCH FUNCTIONALITY
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchItem = document.querySelector('.search-item');

    const products = [
      { title: 'Mesas e Plataformas', cat: 'Mobiliário', url: 'mesas-e-plataformas.html' },

      { title: 'Arquivamento', cat: 'Mobiliário', url: 'arquivamento.html' },
      { title: 'Acabamentos', cat: 'Mobiliário', url: 'acabamentos.html' },
      { title: 'Cadeiras Diretivas', cat: 'Cadeiras', url: 'diretivas.html' },
      { title: 'Cadeiras Operativas', cat: 'Cadeiras', url: 'operativas.html' },
      { title: 'Cadeiras de Diálogo', cat: 'Cadeiras', url: 'dialogo.html' },
      { title: 'Cadeiras Coletivas', cat: 'Cadeiras', url: 'coletivas.html' },
      { title: 'Assentos Colaborativos', cat: 'Cadeiras', url: 'colaborativos.html' },
      { title: 'Lockers em Aço', cat: 'Lockers', url: 'lockers-em-aco.html' },
      { title: 'Lockers em Madeira', cat: 'Lockers', url: 'lockers-em-madeira.html' },
      { title: 'Armários Deslizantes - Linhas', cat: 'Armários', url: 'armarios-deslizantes.html' },
      { title: 'Armários Deslizantes - Aplicações', cat: 'Armários', url: 'armarios-deslizantes-aplicacao.html' },
      { title: 'Divisórias Corporativas', cat: 'Divisórias', url: 'divisorias.html' },
      { title: 'H | Série 200 (Flagship)', cat: 'Produto', url: 'index.html#flagship' },
      { title: 'H | Mesa Axial', cat: 'Produto', url: 'index.html#flagship' },
      { title: 'H | Locker Flex', cat: 'Produto', url: 'index.html#flagship' },
      { title: 'H | Divisória Linear', cat: 'Produto', url: 'index.html#flagship' }
    ];

    if (searchBtn && searchInput) {
      searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchItem.classList.toggle('open');
        if (searchItem.classList.contains('open')) {
          setTimeout(() => searchInput.focus(), 100);
        }
      });

      document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-item')) {
          searchItem.classList.remove('open');
        }
      });

      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        if (!q) {
          searchResults.innerHTML = '<div class="search-empty">Digite para buscar...</div>';
          return;
        }
        const filtered = products.filter(p => p.title.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q));
        
        if (filtered.length === 0) {
          searchResults.innerHTML = '<div class="search-empty">Nenhum produto encontrado.</div>';
          return;
        }

        searchResults.innerHTML = filtered.map(p => `
          <a href="${p.url}" class="search-result-item">
            <div class="item-img"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg></div>
            <div class="item-info">
              <span class="item-title">${p.title}</span>
              <span class="item-cat">${p.cat}</span>
            </div>
          </a>
        `).join('');
      });
    }

    // MOBILE NAV TOGGLE
    const navToggle = document.getElementById('navToggle');
    const nav = document.querySelector('.nav');
    if (navToggle && nav){
      navToggle.addEventListener('click', () => {
        const open = navToggle.classList.toggle('open');
        nav.classList.toggle('open', open);
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
      });
    }

    // ACTIVE NAV HIGHLIGHT
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.nav a, .mega a').forEach(a => {
      const href = (a.getAttribute('href') || '').toLowerCase().split('/').pop();
      if (href && href === path) a.classList.add('active');
    });

    // MEGA MENU TOGGLE
    const megaButtons = document.querySelectorAll('.nav-item.has-mega > button');
    megaButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = btn.parentElement;
        const isOpen = parent.classList.contains('open');
        document.querySelectorAll('.nav-item.has-mega').forEach(item => item.classList.remove('open'));
        if (!isOpen) {
          parent.classList.add('open');
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-item.has-mega')) {
        document.querySelectorAll('.nav-item.has-mega').forEach(item => item.classList.remove('open'));
      }
    });

    // RAIL OBSERVER
    const dots = document.querySelectorAll('.rail-dot');
    const railNum = document.getElementById('railNum');
    if (dots.length){
      const ids = Array.from(dots).map(d => d.dataset.to).filter(Boolean);
      const total = ids.length;
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting){
            const id = e.target.id;
            const idx = ids.indexOf(id);
            if (idx < 0) return;
            dots.forEach(d => d.classList.toggle('active', d.dataset.to === id));
            if (railNum) railNum.textContent = String(idx+1).padStart(2,'0') + '/' + String(total).padStart(2,'0');
          }
        });
      }, { threshold: 0.35 });
      ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
      dots.forEach(d => d.addEventListener('click', () => {
        document.getElementById(d.dataset.to)?.scrollIntoView({ behavior:'smooth', block:'start' });
      }));
    }

    // REVEAL ON SCROLL
    const revealEls = document.querySelectorAll('.sect-head, .intro-grid, .series-grid, .pb-grid, .apps-grid, .tech-grid, .related-grid, .cta-band-grid, .contact-grid, .swatches-cluster, .subhero-inner');
    revealEls.forEach(el => el.classList.add('reveal'));
    const rio = new IntersectionObserver((es) => {
      es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); rio.unobserve(e.target); } });
    }, { threshold: 0.1 });
    revealEls.forEach(el => rio.observe(el));

    // SUBHERO PARALLAX
    const subheroImg = document.querySelector('.subhero-img');
    const subhero = document.querySelector('.subhero');
    if (subhero && subheroImg){
      subhero.addEventListener('mousemove', (e) => {
        const r = subhero.getBoundingClientRect();
        const x = (e.clientX - r.left)/r.width - 0.5;
        const y = (e.clientY - r.top)/r.height - 0.5;
        subheroImg.style.transform = `translate(${x*-10}px, ${y*-8}px) scale(1.03)`;
      });
      subhero.addEventListener('mouseleave', () => { subheroImg.style.transform = ''; });
    }

    // CONTACT FORM
    const form = document.getElementById('contactForm');
    if (form && form.tagName === 'FORM'){
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submit = form.querySelector('button[type="submit"]');
        if (!submit) return;
        const original = submit.innerHTML;
        submit.innerHTML = 'Enviando...';
        submit.disabled = true;
        setTimeout(() => {
          submit.innerHTML = '✓ Mensagem enviada';
          setTimeout(() => { submit.innerHTML = original; submit.disabled = false; form.reset(); }, 2400);
        }, 800);
      });
    }
  }
})();
