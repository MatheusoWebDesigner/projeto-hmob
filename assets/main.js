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
  <a class="logo" href="index.html"><img src="uploads/logo.webp" alt="Hmob For Offices" style="width:350px;height:auto;display:block;"></a>
  <button class="nav-toggle" id="navToggle" aria-label="Abrir menu" aria-expanded="false"><span></span></button>
  <nav class="nav" id="primaryNav">
    <div class="nav-item"><a href="index.html">Início</a></div>
    <div class="nav-item"><a href="sobre.html">Sobre Nós</a></div>
    <div class="nav-item has-mega"><button type="button">Produtos</button>
      <div class="mega" style="max-height: 70vh; overflow-y: auto;">
        <a href="acabamentos.html">Acabamentos</a>
        
        <a href="armarios-deslizantes.html">Armários Deslizantes</a>
        <a href="biombos.html">Biombos Acústicos</a>
        <a href="cabines.html">Cabines</a>
        
        <details class="mega-details">
          <summary>Cadeiras e Assentos</summary>
          <div class="mega-sub">
            <a href="colaborativos.html">Assentos Colaborativos</a>
            <a href="coletivas.html">Cadeiras Coletivas</a>
            <a href="dialogo.html">Cadeiras de Diálogo</a>
            <a href="diretivas.html">Cadeiras Diretivas</a>
            <a href="operativas.html">Cadeiras Operativas</a>
          </div>
        </details>

        <a href="estantes.html">Estantes</a>

        <details class="mega-details">
          <summary>Lockers</summary>
          <div class="mega-sub">
            <a href="lockers-em-aco.html">Lockers em Aço</a>
            <a href="lockers-em-madeira.html">Lockers em Madeira</a>
          </div>
        </details>

        <a href="mobiliario-colaborativo.html">Mobiliário Colaborativo</a>
        <a href="mobiliario-corporativo.html">Mobiliário Corporativo</a>
        <a href="traineis.html">Trainéis</a>
      </div></div>
    <div class="nav-item"><a href="contato.html">Contato</a></div>
    
    <div class="nav-item search-item" style="position:relative; margin-left: 0.5rem;">
      <button type="button" aria-label="Pesquisar produto" class="search-btn" id="searchBtn" style="display: flex; align-items: center; justify-content: center; opacity: 0.85; transition: opacity 0.2s; cursor: pointer; background: none; border: none; padding: .25rem 0;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.85">
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
        <a href="index.html" style="display:inline-block; margin-bottom:1.25rem;"><img src="uploads/logo.webp" alt="Hmob For Offices" style="width:350px; height:auto; display:block;"></a>
        <p>Mobiliário corporativo. Engenharia, conformidade e atendimento nacional desde 2009.</p>
        <div class="seal"><span class="sq"></span><span>Em conformidade com ABNT NR-17</span></div>
      </div>
      <div class="col"><h5>Mobiliário</h5><ul>
        <li><a href="mobiliario-corporativo.html">Mobiliário Corporativo</a></li>
        <li><a href="mobiliario-colaborativo.html">Mobiliário Colaborativo</a></li>
        <li><a href="estantes.html">Estantes</a></li>
        <li><a href="acabamentos.html">Acabamentos</a></li>
      </ul></div>
      <div class="col"><h5>Cadeiras &amp; Assentos</h5><ul>
        <li><a href="diretivas.html">Cadeiras Diretivas</a></li>
        <li><a href="operativas.html">Cadeiras Operativas</a></li>
        <li><a href="dialogo.html">Cadeiras de Diálogo</a></li>
        <li><a href="coletivas.html">Cadeiras Coletivas</a></li>
        <li><a href="colaborativos.html">Assentos Colaborativos</a></li>
      </ul></div>
      <div class="col"><h5>Acústica &amp; Armazenagem</h5><ul>
        <li><a href="cabines.html">Cabines Acústicas</a></li>
        <li><a href="biombos.html">Biombos Acústicos</a></li>
        <li><a href="lockers-em-aco.html">Lockers em Aço</a></li>
        <li><a href="lockers-em-madeira.html">Lockers em Madeira</a></li>
        <li><a href="armarios-deslizantes.html">Armários Deslizantes</a></li>
        <li><a href="traineis.html">Trainéis</a></li>
      </ul></div>
      <div class="col contact-col"><h5>Contato</h5>
        <div class="ci"><div class="k">Comercial</div><div class="v">(11) 94167-6724</div></div>
        <div class="ci"><div class="k">E-mail</div><div class="v">comercial@hmob.com.br</div></div>
        <div class="ci"><div class="k">Endereço</div><div class="v">R. Inácio Pereira da Rocha, 141<br/>Pinheiros — São Paulo / SP</div></div>
        <!-- Icones de redes sociais retirados por enquanto: apontavam para "#" e
             nao levavam a lugar nenhum. Basta informar os perfis para religar. -->
      </div>
    </div>
    <!-- "Politica de Privacidade" e "Termos de Uso" sairam: as paginas ainda nao
         existem e os links apontavam para "#". Religar quando forem criadas. -->
    <div class="legal"><div>© 2026 Hmob For Offices. Todos os direitos reservados.</div></div>
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
      // Páginas sem hero (ex.: contato) marcam o body com .force-solid-header:
      // o header ganha fundo escuro já no topo, senão o menu fica ilegível.
      if (document.body.classList.contains('force-solid-header')) header.classList.add('solid');
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
      { title: 'Mobiliário Corporativo', cat: 'Mobiliário', url: 'mobiliario-corporativo.html' },
      { title: 'Mobiliário Colaborativo', cat: 'Mobiliário', url: 'mobiliario-colaborativo.html' },
      { title: 'Estantes', cat: 'Mobiliário', url: 'estantes.html' },
      { title: 'Acabamentos', cat: 'Mobiliário', url: 'acabamentos.html' },
      { title: 'Cadeiras Diretivas', cat: 'Cadeiras', url: 'diretivas.html' },
      { title: 'Cadeiras Operativas', cat: 'Cadeiras', url: 'operativas.html' },
      { title: 'Cadeiras de Diálogo', cat: 'Cadeiras', url: 'dialogo.html' },
      { title: 'Cadeiras Coletivas', cat: 'Cadeiras', url: 'coletivas.html' },
      { title: 'Assentos Colaborativos', cat: 'Cadeiras', url: 'colaborativos.html' },
      { title: 'Cabines Acústicas', cat: 'Acústica', url: 'cabines.html' },
      { title: 'Biombos Acústicos', cat: 'Acústica', url: 'biombos.html' },
      { title: 'Lockers em Aço', cat: 'Lockers', url: 'lockers-em-aco.html' },
      { title: 'Lockers em Madeira', cat: 'Lockers', url: 'lockers-em-madeira.html' },
      { title: 'Armários Deslizantes', cat: 'Armários', url: 'armarios-deslizantes.html' },
      { title: 'Trainéis', cat: 'Armazenagem', url: 'traineis.html' }
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
        if (header) {
          header.classList.toggle('nav-open', open);
        }
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
        
        if (window.__lenis) {
          if (open) {
            window.__lenis.stop();
          } else {
            window.__lenis.start();
          }
        }
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

    // (reveal antigo removido — substituído por GSAP ScrollTrigger em loadMotion)

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

    // CATEGORIAS — carrossel: arraste com o mouse + setas ◀ ▶
    (function initCategoryRail(){
      const rail = document.getElementById('catRail');
      const track = document.getElementById('catTrack');
      if (!rail || !track) return;
      const prev = document.getElementById('catPrev');
      const next = document.getElementById('catNext');

      function step(){
        const card = track.querySelector('.cat-card');
        const gap = parseFloat(getComputedStyle(track).gap) || 16;
        return card ? card.getBoundingClientRect().width + gap : 320;
      }
      function updateArrows(){
        const max = rail.scrollWidth - rail.clientWidth - 2;
        if (prev) prev.disabled = rail.scrollLeft <= 2;
        if (next) next.disabled = rail.scrollLeft >= max;
      }
      if (prev) prev.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
      if (next) next.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));
      rail.addEventListener('scroll', updateArrows, { passive: true });
      window.addEventListener('resize', updateArrows);
      updateArrows();

      // arrastar com o mouse (touch usa o scroll nativo). O "drag" só começa
      // DEPOIS que o mouse se move além do limiar — assim um clique simples é
      // preservado e o card <a> navega para a categoria.
      let down = false, dragging = false, startX = 0, startLeft = 0, moved = false, pid = null;
      rail.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'touch') return;
        down = true; dragging = false; moved = false; startX = e.clientX; startLeft = rail.scrollLeft; pid = e.pointerId;
      });
      rail.addEventListener('pointermove', (e) => {
        if (!down) return;
        const dx = e.clientX - startX;
        if (!dragging && Math.abs(dx) > 6){
          dragging = true; moved = true;
          rail.classList.add('dragging');
          try { rail.setPointerCapture(pid); } catch (_) {}
        }
        if (dragging) rail.scrollLeft = startLeft - dx;
      });
      function endDrag(){
        if (!down) return;
        down = false;
        if (dragging){ rail.classList.remove('dragging'); try { rail.releasePointerCapture(pid); } catch (_) {} }
        dragging = false;
        updateArrows();
      }
      rail.addEventListener('pointerup', endDrag);
      rail.addEventListener('pointercancel', endDrag);
      // não dispara o link se o usuário arrastou
      track.addEventListener('click', (e) => {
        if (moved){ e.preventDefault(); e.stopPropagation(); moved = false; }
      }, true);
    })();

    // GALERIA DE PRODUTO — botão "Ver mais imagens" + lightbox (popup)
    (function initProductGallery(){
      var bands = Array.prototype.slice.call(document.querySelectorAll('.pband'));
      if (!bands.length) return;

      // imagens da banda: cover (ambientada) + foto (fundo branco) + extras (data-gallery, separadas por | , ou quebra de linha)
      function imagesOf(band){
        var list = [];
        var cover = band.getAttribute('data-cover-src'); if (cover) list.push(cover);
        var pi = band.querySelector('.pband-img img'); if (pi && pi.getAttribute('src')) list.push(pi.getAttribute('src'));
        var extra = band.getAttribute('data-gallery');
        if (extra) extra.split(/[|,\n]/).forEach(function(s){ s = s.trim(); if (s) list.push(s); });
        return list.filter(function(v, i){ return v && list.indexOf(v) === i; });
      }

      // modal compartilhado (criado uma vez)
      var modal = document.createElement('div');
      modal.className = 'pgal-modal';
      modal.innerHTML =
        '<button class="pgal-close" type="button" aria-label="Fechar"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
        '<div class="pgal-cap"></div>' +
        '<button class="pgal-nav prev" type="button" aria-label="Anterior"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M15 18l-6-6 6-6"/></svg></button>' +
        '<div class="pgal-stage"><img class="pgal-img" alt=""></div>' +
        '<button class="pgal-nav next" type="button" aria-label="Próxima"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 6l6 6-6 6"/></svg></button>' +
        '<div class="pgal-counter"></div>';
      document.body.appendChild(modal);
      var imgEl = modal.querySelector('.pgal-img'), capEl = modal.querySelector('.pgal-cap'), counterEl = modal.querySelector('.pgal-counter');
      var btnPrev = modal.querySelector('.pgal-nav.prev'), btnNext = modal.querySelector('.pgal-nav.next'), btnClose = modal.querySelector('.pgal-close');
      var current = [], idx = 0;

      function render(){
        if (!current.length) return;
        idx = (idx + current.length) % current.length;
        imgEl.classList.remove('ready');
        imgEl.onload = function(){ imgEl.classList.add('ready'); };
        imgEl.src = current[idx];
        counterEl.textContent = (idx + 1) + ' / ' + current.length;
        var multi = current.length > 1;
        btnPrev.style.display = btnNext.style.display = counterEl.style.display = multi ? '' : 'none';
      }
      function openModal(imgs, cap){
        current = imgs; idx = 0; capEl.textContent = cap || '';
        render(); modal.classList.add('open');
        document.documentElement.style.overflow = 'hidden';
        if (window.__lenis) { try { window.__lenis.stop(); } catch(_){} }
      }
      function closeModal(){
        modal.classList.remove('open');
        document.documentElement.style.overflow = '';
        if (window.__lenis) { try { window.__lenis.start(); } catch(_){} }
      }
      btnPrev.addEventListener('click', function(){ idx--; render(); });
      btnNext.addEventListener('click', function(){ idx++; render(); });
      btnClose.addEventListener('click', closeModal);
      modal.addEventListener('click', function(e){ if (e.target === modal) closeModal(); });
      document.addEventListener('keydown', function(e){
        if (!modal.classList.contains('open')) return;
        if (e.key === 'Escape') closeModal();
        else if (e.key === 'ArrowLeft'){ idx--; render(); }
        else if (e.key === 'ArrowRight'){ idx++; render(); }
      });

      // injeta o botão abaixo do texto de cada banda com imagens
      bands.forEach(function(band){
        var content = band.querySelector('.pband-content');
        if (!content || content.querySelector('.pgal-btn')) return;
        var imgs = imagesOf(band);
        if (!imgs.length) return;
        var nameEl = content.querySelector('h3');
        var name = nameEl ? nameEl.textContent.trim() : '';
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'pgal-btn';
        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg><span>Ver mais imagens</span>';
        btn.addEventListener('click', function(){ openModal(imagesOf(band), name); });
        content.appendChild(btn);
      });
    })();
  }

  // ===========================================================
  // MOTION — Lenis (smooth scroll) + GSAP ScrollTrigger (reveals)
  // Re-trigger: anima ao entrar, reverte ao subir, re-anima ao descer.
  // ===========================================================
  loadMotion();

  function loadMotion(){
    function load(src){
      return new Promise(function(res, rej){
        var s = document.createElement('script');
        s.src = src; s.async = true; s.onload = res; s.onerror = rej;
        document.head.appendChild(s);
      });
    }
    load('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js')
      .then(function(){ return load('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js'); })
      .then(function(){ return load('https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js'); })
      .then(initMotion)
      .catch(function(){ /* CDN indisponível: o site segue funcionando sem animações */ });
  }

  function initMotion(){
    if (!window.gsap || !window.ScrollTrigger) return;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true }); // evita re-pin/pulos qdo a barra de endereço do celular esconde/aparece

    // ---- Smooth scroll (Lenis) integrado ao ScrollTrigger ----
    if (window.Lenis){
      var lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        easing: function(t){ return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }
      });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function(time){ lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
      // âncoras internas (#...) via Lenis
      document.querySelectorAll('a[href^="#"]').forEach(function(a){
        a.addEventListener('click', function(e){
          var id = a.getAttribute('href');
          if (id && id.length > 1){
            var t = document.querySelector(id);
            if (t){ e.preventDefault(); lenis.scrollTo(t, { offset: -72 }); }
          }
        });
      });
      window.__lenis = lenis;
    }

    if (reduce) return; // reduced-motion: mantém smooth scroll, dispensa animações

    var EASE = 'power3.out';
    var TA = 'play none none reverse'; // entra ao descer, reverte ao subir

    // Cabeçalhos de seção e blocos de texto — sobem com fade
    gsap.utils.toArray('.sect-head, .sc-intro, .fl-intro, .cta-band-grid').forEach(function(el){
      gsap.from(el, { y: 42, opacity: 0, duration: .9, ease: EASE,
        scrollTrigger: { trigger: el, start: 'top 84%', toggleActions: TA } });
    });

    // Bandas — efeito "cover → split": a imagem cobre 100% da seção com o
    // título centralizado sobre um scrim (como na Hero); ao rolar, a seção
    // se divide e a imagem recolhe para a posição dela (esq/dir no desktop,
    // topo no mobile empilhado). Scrub = reversível ao subir/descer.
    var isMobile = window.matchMedia('(max-width: 900px)').matches;
    gsap.utils.toArray('.pband').forEach(function(band){
      var img = band.querySelector('.pband-img, .sc-img');
      var panel = band.querySelector('.pband-panel, .sc-panel');
      var isRev = band.classList.contains('reverse');

      if (!img || !panel){
        // Fallback: reveal simples
        if (img) gsap.from(img, { y: 34, opacity: 0, duration: 1.1, ease: EASE,
          scrollTrigger: { trigger: band, start: 'top 80%', toggleActions: TA } });
        if (panel) gsap.from(panel, { x: isRev ? -52 : 52, opacity: 0, duration: 1, ease: EASE,
          scrollTrigger: { trigger: band, start: 'top 80%', toggleActions: TA } });
        return;
      }

      // --- monta o cover dinamicamente (sem tocar no HTML) ---
      var cover = document.createElement('div');
      cover.className = 'band-cover';
      var srcImg = img.querySelector('img');
      // Imagem do cover (100% da seção): usa data-cover-src da banda se
      // configurado; senão cai na mesma imagem da banda (metade da seção).
      var coverSrc = band.getAttribute('data-cover-src') || (srcImg && srcImg.getAttribute('src'));
      if (coverSrc){
        var ci = document.createElement('img');
        ci.src = coverSrc;
        ci.alt = '';
        cover.appendChild(ci);
      } else {
        var fill = document.createElement('div');
        fill.className = 'bc-fill';
        cover.appendChild(fill);
      }
      var scrim = document.createElement('div');
      scrim.className = 'bc-scrim';
      cover.appendChild(scrim);

      var cap = document.createElement('div');
      cap.className = 'bc-caption';
      var numEl = band.querySelector('.pband-num, .sc-num');
      var titleEl = band.querySelector('.pband-content h3, .sc-content h3');
      var descEl = band.querySelector('.pband-content > p, .sc-content > p');
      cap.innerHTML =
        (numEl ? '<div class="k">' + numEl.textContent + '</div>' : '') +
        (titleEl ? '<div class="t">' + titleEl.innerHTML + '</div>' : '') +
        (descEl ? '<p class="d">' + descEl.textContent + '</p>' : '');
      cover.appendChild(cap);

      if (getComputedStyle(band).position === 'static') band.style.position = 'relative';
      band.appendChild(cover);
      gsap.set(cover, { clipPath: 'inset(0px 0px 0px 0px)' });

      var content = panel.querySelector('.pband-content, .sc-content') || panel;

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: band,
          start: 'top top',
          end: isMobile ? '+=100%' : '+=130%',   // pin mais curto no mobile
          pin: true,
          scrub: isMobile ? 0.8 : 1.2,           // amortecimento mais leve no touch
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      // Entrada do conteúdo: lateral no desktop (colunas), vertical no mobile (empilhado)
      var contentFrom = isMobile ? { opacity: 0, y: 34 } : { opacity: 0, x: isRev ? -40 : 40 };
      var contentTo   = isMobile ? { opacity: 1, y: 0, duration: .38, ease: 'power1.out', immediateRender: true }
                                 : { opacity: 1, x: 0, duration: .38, ease: 'power1.out', immediateRender: true };

      tl.to(cap,   { opacity: 0, y: -30, duration: .34, ease: 'power1.out' }, 0)
        .to(scrim, { opacity: 0, duration: .55, ease: 'power1.inOut' }, .06)
        .to(cover, {
          clipPath: function(){
            // Mede a posição real da imagem dentro da banda e recolhe o cover
            // até ela — funciona no desktop (colunas) e no mobile (empilhado).
            var br = band.getBoundingClientRect();
            var ir = img.getBoundingClientRect();
            var t = Math.max(0, Math.round(ir.top - br.top));
            var r = Math.max(0, Math.round(br.right - ir.right));
            var b = Math.max(0, Math.round(br.bottom - ir.bottom));
            var l = Math.max(0, Math.round(ir.left - br.left));
            return 'inset(' + t + 'px ' + r + 'px ' + b + 'px ' + l + 'px)';
          },
          duration: .66, ease: 'power2.inOut'   // divisão acelera e desacelera suavemente
        }, .12)
        .fromTo(content, contentFrom, contentTo, .5)
        .to(cover, { opacity: 0, duration: .16, ease: 'power1.inOut' }, .84);
    });

    // Imagens de destaque (flagship/sobre/intro) — fade-rise suave
    gsap.utils.toArray('.ab-img, .about-visual, .intro-visual').forEach(function(el){
      gsap.from(el, { y: 40, opacity: 0, duration: 1.1, ease: EASE,
        scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: TA } });
    });

    // Colunas de texto (sobre/contato/deslizantes) — entram lateralmente
    gsap.utils.toArray('.ab-text, .contact-info, .about-copy, .intro-copy, .fl-content').forEach(function(el){
      gsap.from(el, { x: -42, opacity: 0, duration: .95, ease: EASE,
        scrollTrigger: { trigger: el, start: 'top 84%', toggleActions: TA } });
    });

    // Grades com stagger (cards, amostras, features, números...)
    [['.cat-track', '.cat-card'], ['.related-grid', '.related-card'], ['.swatches-grid', '.swatch-item'],
     ['.tech-grid', '.tech-card'], ['.series-grid', '.series-card'], ['.stats .row', '.stat'],
     ['.about-stats', '.stat'], ['.cs-grid', '.pcard'], ['.marquee', '.li'], ['.htrust .row', '.item'],
     ['.contact-form', '.form-row']
    ].forEach(function(pair){
      document.querySelectorAll(pair[0]).forEach(function(w){
        var items = w.querySelectorAll(pair[1]);
        if (!items.length) return;
        gsap.from(items, { y: 28, opacity: 0, duration: .65, ease: EASE, stagger: .07,
          scrollTrigger: { trigger: w, start: 'top 86%', toggleActions: TA } });
      });
    });

    // Efeito Paralaxe na imagem de fundo da Flagship (Série 200)
    var flStage = document.querySelector('.fl-stage');
    var flBg = document.querySelector('.fl-bg');
    if (flStage && flBg) {
      gsap.fromTo(flBg, 
        { y: '-10%' }, 
        { 
          y: '10%', 
          ease: 'none',
          scrollTrigger: {
            trigger: flStage,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    }

    // Efeito Paralaxe nos cards de cases (pcard)
    gsap.utils.toArray('.pcard').forEach(function(card){
      var img = card.querySelector('img');
      var meta = card.querySelector('.meta');
      
      if (img) {
        gsap.fromTo(img, 
          { yPercent: -10 }, 
          { 
            yPercent: 10, 
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }
      
      if (meta) {
        gsap.fromTo(meta,
          { y: 20 },
          {
            y: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }
    });

    // Recalcula posições conforme as imagens (pesadas) carregam e no load completo
    ScrollTrigger.refresh();
    window.addEventListener('load', function(){ ScrollTrigger.refresh(); });
    document.querySelectorAll('img').forEach(function(im){
      if (!im.complete){ im.addEventListener('load', function(){ ScrollTrigger.refresh(); }, { once: true }); }
    });
  }
})();
