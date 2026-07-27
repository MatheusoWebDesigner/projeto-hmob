// ============================================================
// HMOB SITE — FIGMA PLUGIN (versão robusta)
// ============================================================

figma.showUI(__html__, { width: 320, height: 280 });

const W = 1440;
const FONT = { family: "Inter", style: "Regular" };

// Cores em RGB normalizado (0..1)
const C = {
  primary:   rgb(184, 90, 0),
  primary2:  rgb(212, 107, 0),
  primaryInk:rgb(138, 66, 0),
  surface:   rgb(249, 249, 250),
  surfaceLow:rgb(244, 243, 244),
  white:     rgb(255, 255, 255),
  inkDark:   rgb(14, 16, 17),
  inkDark2:  rgb(21, 24, 26),
  inkDark3:  rgb(29, 32, 34),
  onBg:      rgb(26, 28, 29),
  onVar:     rgb(69, 72, 74),
  light:     rgb(245, 245, 245),
  light2:    rgb(232, 232, 233),
  beige:     rgb(230, 209, 191),
  imgGray:   rgb(60, 64, 68),
  imgGray2:  rgb(85, 89, 93),
  border:    rgb(220, 220, 222),
  footerBg:  rgb(16, 17, 19),
};

function rgb(r, g, b) { return { r: r/255, g: g/255, b: b/255 }; }
function solid(c, a = 1) { return [{ type: "SOLID", color: c, opacity: a }]; }

let LOG = (txt) => figma.ui.postMessage({ type: "log", text: txt });

figma.ui.onmessage = async (msg) => {
  if (msg.type !== "run") return;
  try {
    LOG("Carregando fontes…");
    await loadAllFonts();
    LOG("✓ Fontes ok");

    LOG("Criando página…");
    const page = ensurePage("Hmob Site Design");
    figma.currentPage = page;
    // limpa página
    for (const c of [...page.children]) c.remove();
    LOG("✓ Página pronta");

    let y = 0;
    const sections = [
      ["Header", buildHeader],
      ["Hero", buildHero],
      ["Trust Bar", buildTrust],
      ["Sobre", buildAbout],
      ["Categorias", buildCategories],
      ["Produto Destaque", buildFlagship],
      ["Diferenciais", buildDiffs],
      ["Projetos", buildProjects],
      ["Depoimentos", buildTestimonials],
      ["FAQ", buildFAQ],
      ["Blog", buildBlog],
      ["CTA Band", buildCTA],
      ["Footer", buildFooter],
    ];

    for (let i = 0; i < sections.length; i++) {
      const [name, fn] = sections[i];
      try {
        LOG(`[${i+1}/${sections.length}] ${name}…`);
        const h = await fn(page, y);
        y += h;
      } catch (e) {
        LOG(`✗ Erro em ${name}: ${e.message}`);
      }
    }

    figma.viewport.scrollAndZoomIntoView(page.children);
    figma.notify("✓ Hmob Site importado com sucesso!");
    figma.ui.postMessage({ type: "ok", text: `Concluído — ${y}px de altura` });
  } catch (err) {
    console.error(err);
    figma.ui.postMessage({ type: "err", text: (err && err.message) || String(err) });
  }
};

// ============================================================
// HELPERS
// ============================================================

async function loadAllFonts() {
  const styles = ["Regular", "Medium", "Semi Bold", "Bold", "Light"];
  for (const style of styles) {
    try { await figma.loadFontAsync({ family: "Inter", style }); }
    catch (_) { /* algumas instalações não têm "Light" — ignora */ }
  }
}

function ensurePage(name) {
  let p = figma.root.children.find(x => x.name === name);
  if (!p) { p = figma.createPage(); p.name = name; }
  return p;
}

function fontFor(weight) {
  if (weight >= 700) return { family: "Inter", style: "Bold" };
  if (weight >= 600) return { family: "Inter", style: "Semi Bold" };
  if (weight >= 500) return { family: "Inter", style: "Medium" };
  if (weight <= 300) return { family: "Inter", style: "Light" };
  return { family: "Inter", style: "Regular" };
}

function makeFrame(name, w, h, bg) {
  const f = figma.createFrame();
  f.name = name;
  f.resize(Math.max(1, Math.round(w)), Math.max(1, Math.round(h)));
  f.fills = bg ? solid(bg) : [];
  f.clipsContent = true;
  return f;
}

function makeRect(parent, name, x, y, w, h, fill, opts) {
  opts = opts || {};
  const r = figma.createRectangle();
  r.name = name;
  r.resize(Math.max(1, Math.round(w)), Math.max(1, Math.round(h)));
  if (fill) r.fills = solid(fill, opts.opacity != null ? opts.opacity : 1);
  else r.fills = [];
  if (opts.stroke) {
    r.strokes = solid(opts.stroke, opts.strokeOpacity != null ? opts.strokeOpacity : 1);
    r.strokeWeight = opts.strokeWeight || 1;
  }
  if (opts.radius) r.cornerRadius = opts.radius;
  parent.appendChild(r);
  r.x = Math.round(x); r.y = Math.round(y);
  return r;
}

async function makeText(parent, content, x, y, opts) {
  opts = opts || {};
  const fontName = fontFor(opts.weight || 400);
  // garantia: tenta carregar; se falhar, fallback Regular
  let actualFont = fontName;
  try { await figma.loadFontAsync(fontName); }
  catch (_) {
    actualFont = { family: "Inter", style: "Regular" };
    await figma.loadFontAsync(actualFont);
  }
  const t = figma.createText();
  t.fontName = actualFont;
  t.fontSize = opts.size || 14;
  t.characters = String(content);
  t.fills = solid(opts.color || C.onBg, opts.opacity != null ? opts.opacity : 1);
  if (opts.ls != null) t.letterSpacing = { value: opts.ls, unit: "PERCENT" };
  if (opts.lh) t.lineHeight = { value: opts.lh, unit: "PIXELS" };
  if (opts.upper) t.characters = String(content).toUpperCase();
  if (opts.w) {
    t.textAutoResize = "HEIGHT";
    t.resize(opts.w, t.height);
  }
  if (opts.align) t.textAlignHorizontal = opts.align;
  if (opts.name) t.name = opts.name;
  parent.appendChild(t);
  t.x = Math.round(x); t.y = Math.round(y);
  return t;
}

function imgPlaceholder(parent, name, x, y, w, h, label) {
  const f = makeFrame(name, w, h, C.imgGray);
  parent.appendChild(f);
  f.x = Math.round(x); f.y = Math.round(y);
  // listras decorativas via 2 retângulos sutis
  if (label) {
    // label como retângulo + texto (assíncrono)
    return { frame: f, addLabel: async () => {
      await makeText(f, label, 16, 16, { size: 9, weight: 500, color: C.light, ls: 20, opacity: 0.55 });
    }};
  }
  return { frame: f, addLabel: async () => {} };
}

// ============================================================
// SEÇÕES
// ============================================================

async function buildHeader(page, yOff) {
  const H = 72;
  const f = makeFrame("01 — Header", W, H, C.inkDark2);
  page.appendChild(f);
  f.y = yOff;

  await makeText(f, "H | MOB", 88, 24, { size: 24, weight: 600, color: C.light });
  await makeText(f, "FOR OFFICES", 178, 32, { size: 9, weight: 300, color: C.light, ls: 28, opacity: 0.7, upper: true });

  const navItems = ["Início", "Sobre", "Produtos", "Projetos", "Conteúdo", "FAQ", "Contato"];
  let nx = W/2 - 280;
  for (const item of navItems) {
    const t = await makeText(f, item, nx, 28, { size: 12, weight: 500, color: C.light, opacity: 0.85 });
    nx += t.width + 28;
  }

  makeRect(f, "cta-bg", W - 200, 16, 168, 40, C.primary, { radius: 2 });
  await makeText(f, "SOLICITAR PROPOSTA", W - 184, 30, { size: 10, weight: 700, color: C.white, ls: 8, upper: true });

  return H;
}

async function buildHero(page, yOff) {
  const H = 880;
  const f = makeFrame("02 — Hero", W, H, C.inkDark);
  page.appendChild(f);
  f.y = yOff;

  // Imagem (placeholder à direita)
  const ph = imgPlaceholder(f, "hero-image", W * 0.4, 0, W * 0.6, H, "FOTO — AMBIENTE CORPORATIVO");
  await ph.addLabel();

  // Overlay escuro à esquerda
  makeRect(f, "hero-overlay", 0, 0, W * 0.7, H, C.inkDark, { opacity: 0.85 });

  // Tag
  makeRect(f, "tag-bg", 88, 180, 360, 36, C.light, { opacity: 0.06, stroke: C.light, strokeOpacity: 0.12 });
  makeRect(f, "tag-sq", 100, 194, 8, 8, C.primary2);
  await makeText(f, "MOBILIÁRIO CORPORATIVO DE ALTO DESEMPENHO", 118, 191, {
    size: 10, weight: 500, color: C.light, ls: 8, upper: true
  });

  // H1
  await makeText(f, "Ambientes que refletem", 88, 240, { size: 76, weight: 500, color: C.light, lh: 80, w: 900 });
  await makeText(f, "a seriedade da sua empresa.", 88, 330, { size: 76, weight: 500, color: C.beige, lh: 80, w: 900 });

  // Sub
  await makeText(f, "Soluções em mobiliário corporativo com conformidade técnica, durabilidade comprovada e capacidade nacional de atendimento.",
    88, 460, { size: 17, weight: 400, color: C.light, opacity: 0.78, lh: 28, w: 580 });

  // CTAs
  makeRect(f, "cta-primary", 88, 560, 200, 48, C.primary, { radius: 2 });
  await makeText(f, "SOLICITAR PROPOSTA", 110, 578, { size: 11, weight: 700, color: C.white, ls: 8, upper: true });

  makeRect(f, "cta-outline", 304, 560, 180, 48, C.inkDark, { opacity: 0, stroke: C.light, strokeOpacity: 0.4 });
  await makeText(f, "VER PORTFÓLIO", 343, 578, { size: 11, weight: 700, color: C.light, ls: 8, upper: true });

  // Stats grid (canto inferior direito)
  const stats = [
    { k: "PROJETOS", v: "2.400+" },
    { k: "ANOS DE MERCADO", v: "18" },
    { k: "ESTADOS ATEND.", v: "23" },
    { k: "SATISFAÇÃO", v: "98%" },
  ];
  for (let i = 0; i < stats.length; i++) {
    const col = i % 2, row = Math.floor(i / 2);
    const bx = W - 460 + col * 200;
    const by = 600 + row * 100;
    await makeText(f, stats[i].k, bx, by, { size: 9, weight: 400, color: C.light, ls: 20, opacity: 0.55, upper: true });
    await makeText(f, stats[i].v, bx, by + 20, { size: 36, weight: 500, color: C.light });
  }

  return H;
}

async function buildTrust(page, yOff) {
  const H = 120;
  const f = makeFrame("03 — Trust Bar", W, H, C.surfaceLow);
  page.appendChild(f);
  f.y = yOff;

  const items = [
    { k: "CONFORMIDADE TÉCNICA", v: "ABNT NBR Certificada" },
    { k: "ENTREGA NACIONAL", v: "Logística Própria" },
    { k: "PÓS-VENDA", v: "Suporte Dedicado" },
    { k: "PROJETOS ENTREGUES", v: "2.400+ Contratos" },
  ];
  const colW = W / 4;
  for (let i = 0; i < items.length; i++) {
    const cx = i * colW + 32;
    if (i > 0) makeRect(f, `div-${i}`, i * colW, 18, 1, 84, C.onBg, { opacity: 0.15 });
    makeRect(f, `ic-${i}`, cx, 44, 32, 32, C.primary, { radius: 2, opacity: 0.12 });
    makeRect(f, `ic-d-${i}`, cx + 10, 54, 12, 12, C.primary, { radius: 2 });
    await makeText(f, items[i].k, cx + 48, 42, { size: 9, weight: 400, color: C.onVar, ls: 20, upper: true });
    await makeText(f, items[i].v, cx + 48, 60, { size: 14, weight: 600, color: C.onBg });
  }

  return H;
}

async function buildAbout(page, yOff) {
  const H = 720;
  const f = makeFrame("04 — Sobre", W, H, C.surface);
  page.appendChild(f);
  f.y = yOff;

  const PAD = 88;
  const leftW = 600;

  await makeText(f, "04", PAD, 72, { size: 11, weight: 400, color: C.primaryInk, ls: 25 });
  await makeText(f, "SOBRE A EMPRESA", PAD, 92, { size: 10, weight: 500, color: C.primaryInk, ls: 8, upper: true });
  makeRect(f, "kicker-sq", PAD + 130, 94, 8, 8, C.primary);

  await makeText(f, "Três décadas de expertise em ambientes corporativos.", PAD, 130,
    { size: 42, weight: 500, color: C.onBg, lh: 48, w: leftW - PAD });

  await makeText(f, "A Hmob nasceu da necessidade de suprir a lacuna entre o mercado de mobiliário corporativo e a exigência das grandes empresas brasileiras por soluções técnicas, duráveis e esteticamente coerentes.",
    PAD, 340, { size: 16, weight: 400, color: C.onVar, lh: 26, w: leftW - PAD });

  await makeText(f, "Com fábricas próprias, logística nacional e equipe especializada, entregamos muito além de móveis — entregamos ambientes que comunicam o nível da sua empresa.",
    PAD, 440, { size: 16, weight: 400, color: C.onVar, lh: 26, w: leftW - PAD });

  // Checklist
  makeRect(f, "checks-bg", PAD, 540, leftW - PAD, 130, C.surfaceLow);
  const checks = ["Certificação ABNT NBR", "Design exclusivo", "Projetos turnkey", "Garantia estendida", "Instalação in-house", "Manutenção preventiva"];
  for (let i = 0; i < checks.length; i++) {
    const col = i % 2, row = Math.floor(i / 2);
    const cx = PAD + 16 + col * 240;
    const cy = 560 + row * 32;
    makeRect(f, `chk-${i}`, cx, cy + 4, 8, 8, C.primary);
    await makeText(f, checks[i], cx + 18, cy, { size: 13, weight: 500, color: C.onBg });
  }

  // Imagem direita
  const ph = imgPlaceholder(f, "about-image", leftW + 60, 72, W - leftW - 60 - PAD, H - 220, "FOTO — ESCRITÓRIO HMOB");
  await ph.addLabel();

  // Stats abaixo da imagem
  const sx = leftW + 60;
  const sw = W - leftW - 60 - PAD;
  makeRect(f, "stats-bg", sx, H - 130, sw, 90, C.white);
  const sd = [{ k: "PROJETOS", v: "2.400+" }, { k: "ANOS", v: "18" }, { k: "ESTADOS", v: "23" }];
  for (let i = 0; i < sd.length; i++) {
    const px = sx + i * (sw / 3) + 20;
    if (i > 0) makeRect(f, `sdiv-${i}`, sx + i * (sw / 3), H - 110, 1, 50, C.onBg, { opacity: 0.15 });
    await makeText(f, sd[i].k, px, H - 114, { size: 9, weight: 400, color: C.onVar, ls: 20, upper: true });
    await makeText(f, sd[i].v, px, H - 95, { size: 26, weight: 500, color: C.onBg });
  }

  return H;
}

async function buildCategories(page, yOff) {
  const H = 760;
  const f = makeFrame("05 — Categorias", W, H, C.inkDark);
  page.appendChild(f);
  f.y = yOff;

  await makeText(f, "LINHA DE PRODUTOS", 88, 72, { size: 10, weight: 500, color: C.primary2, ls: 8, upper: true });
  makeRect(f, "kick-sq", 88 + 152, 74, 8, 8, C.primary2);
  await makeText(f, "Do escritório individual aos grandes corporativos.", 88, 110,
    { size: 50, weight: 500, color: C.light, lh: 54, w: W - 176 });

  const cats = [
    { num: "01", title: "Estações de Trabalho", ct: "OPEN SPACE & FOCADO", desc: "Soluções modulares de alta ergonomia, com gerenciamento de cabos e superfícies amplas para produtividade real." },
    { num: "02", title: "Salas de Reunião", ct: "COLABORAÇÃO & GESTÃO", desc: "Mesas executivas, credenzas e mobiliário de apoio que traduzem hierarquia e funcionalidade." },
    { num: "03", title: "Cadeiras & Poltronas", ct: "ERGONOMIA & CONFORTO", desc: "Seating de alto desempenho certificado. Da cadeira operacional à poltrona diretiva." },
    { num: "04", title: "Lounge Corporativo", ct: "RECEPÇÃO & WELLNESS", desc: "Ambientes de descompressão e recepção que reforçam a marca e a cultura da empresa." },
  ];
  const cardW = (W - 4) / 4;
  for (let i = 0; i < cats.length; i++) {
    const cx = i * cardW + i;
    const cardH = 480;
    const card = makeFrame(`cat-${cats[i].title}`, cardW, cardH, C.inkDark);
    f.appendChild(card);
    card.x = cx; card.y = 240;

    const ph = imgPlaceholder(card, "cat-img", 0, 0, cardW, 200, cats[i].title.toUpperCase());
    await ph.addLabel();

    await makeText(card, cats[i].num, 24, 220, { size: 10, weight: 400, color: C.light, ls: 20, opacity: 0.5 });
    await makeText(card, cats[i].title, 24, 244, { size: 22, weight: 500, color: C.light, lh: 26, w: cardW - 48 });
    await makeText(card, cats[i].ct, 24, 296, { size: 10, weight: 500, color: C.primary2, ls: 18, upper: true });
    await makeText(card, cats[i].desc, 24, 326, { size: 13, weight: 400, color: C.light, opacity: 0.65, lh: 20, w: cardW - 48 });
    await makeText(card, "VER LINHA →", 24, cardH - 40, { size: 11, weight: 600, color: C.light, ls: 16, upper: true });
  }

  // Card central
  const fcW = 320;
  makeRect(f, "footer-card", (W - fcW) / 2, H - 80, fcW, 60, C.inkDark3);
  await makeText(f, "Explorar Catálogo Completo →", (W - fcW) / 2 + 24, H - 60, { size: 16, weight: 500, color: C.light });

  return H;
}

async function buildFlagship(page, yOff) {
  const H = 700;
  const f = makeFrame("06 — Produto Destaque", W, H, C.surfaceLow);
  page.appendChild(f);
  f.y = yOff;

  const PAD = 88;
  await makeText(f, "LINHA PRESTIGE — PRODUTO DESTAQUE", PAD, 60, { size: 10, weight: 500, color: C.primaryInk, ls: 8, upper: true });
  await makeText(f, "Mesa de Reunião Prestige 3200", PAD, 100,
    { size: 50, weight: 500, color: C.onBg, lh: 56, w: 580 });
  await makeText(f, "LAMINADO AMADEIRADO / AÇO INOX / 3,20M", PAD, 240, { size: 11, weight: 500, color: C.onVar, ls: 18, upper: true });
  await makeText(f, "A peça central de qualquer sala de liderança. Combina estrutura em aço inoxidável com tampo em laminado amadeirado de alta pressão, entregando presença visual sem abrir mão da funcionalidade corporativa.",
    PAD, 270, { size: 16, weight: 400, color: C.onVar, lh: 26, w: 500 });

  // Specs
  makeRect(f, "specs-bg", PAD, 410, 500, 80, C.white, { stroke: C.border });
  const specs = [
    { k: "COMPRIMENTO", v: "3,20m" },
    { k: "LARGURA", v: "1,20m" },
    { k: "TAMPO", v: "Laminado HP" },
    { k: "ESTRUTURA", v: "Aço Inox" },
  ];
  const sw = 500 / 4;
  for (let i = 0; i < specs.length; i++) {
    const px = PAD + i * sw + 14;
    if (i > 0) makeRect(f, `sd-${i}`, PAD + i * sw, 422, 1, 56, C.onBg, { opacity: 0.12 });
    await makeText(f, specs[i].k, px, 424, { size: 9, weight: 400, color: C.onVar, ls: 20, upper: true });
    await makeText(f, specs[i].v, px, 444, { size: 14, weight: 500, color: C.onBg });
  }

  // Tabs
  const tabs = ["Especificações", "Configurações", "Entrega & Garantia"];
  for (let i = 0; i < tabs.length; i++) {
    const tx = PAD + i * 168;
    makeRect(f, `tab-${i}`, tx, 510, 168, 52, i === 0 ? C.white : C.surfaceLow);
    if (i === 0) makeRect(f, `tab-ind-${i}`, tx, 510, 168, 2, C.primary);
    await makeText(f, tabs[i], tx + 16, 528, {
      size: 13, weight: i === 0 ? 600 : 400, color: i === 0 ? C.onBg : C.onVar
    });
  }

  // CTA
  makeRect(f, "flag-cta", PAD, 590, 220, 48, C.inkDark, { radius: 2 });
  await makeText(f, "SOLICITAR ORÇAMENTO", PAD + 28, 608, { size: 11, weight: 700, color: C.light, ls: 8, upper: true });

  // Imagem direita
  const ph = imgPlaceholder(f, "flag-img", W * 0.55, 0, W * 0.45, H, "FOTO — MESA PRESTIGE 3200");
  await ph.addLabel();

  return H;
}

async function buildDiffs(page, yOff) {
  const H = 580;
  const f = makeFrame("07 — Diferenciais", W, H, C.surface);
  page.appendChild(f);
  f.y = yOff;

  const PAD = 88;
  await makeText(f, "POR QUE A HMOB", PAD, 60, { size: 10, weight: 500, color: C.primaryInk, ls: 8, upper: true });
  await makeText(f, "Não vendemos móveis. Resolvemos ambientes.", PAD, 100,
    { size: 42, weight: 500, color: C.onBg, lh: 48, w: 700 });

  const diffs = [
    { num: "01", title: "Projeto & Consultoria", body: "Equipe de arquitetos e designers especializados em ambientes corporativos. Do briefing à aprovação." },
    { num: "02", title: "Fabricação Própria", body: "Fábricas em Bento Gonçalves e SP com controle de qualidade ABNT. Produção nacional rastreável." },
    { num: "03", title: "Logística Nacional", body: "Entrega e instalação própria em todo o território nacional. Cronograma e montagem com equipe certificada." },
    { num: "04", title: "Garantia Estendida", body: "Até 5 anos de garantia nos produtos da linha Prestige. Manutenção preventiva contratual." },
    { num: "05", title: "Pós-Venda Ativo", body: "Acompanhamento de satisfação, reposição de peças e suporte técnico presencial. Parceria de longo prazo." },
    { num: "06", title: "Compliance & Certificações", body: "Conformidade com normas ABNT NBR para mobiliário de trabalho. Certificações que protegem a empresa." },
  ];
  const colW = (W - PAD * 2) / 3;
  for (let i = 0; i < diffs.length; i++) {
    const col = i % 3, row = Math.floor(i / 3);
    const cx = PAD + col * colW;
    const cy = 230 + row * 160;

    makeRect(f, `dl-${i}`, cx, cy - 8, colW - 32, 1, C.onBg, { opacity: 0.15 });
    await makeText(f, diffs[i].num, cx, cy, { size: 10, weight: 400, color: C.primaryInk, ls: 24 });
    makeRect(f, `di-${i}`, cx, cy + 22, 36, 36, C.surfaceLow);
    makeRect(f, `dd-${i}`, cx + 12, cy + 34, 12, 12, C.primary);
    await makeText(f, diffs[i].title, cx, cy + 70, { size: 20, weight: 500, color: C.onBg, lh: 24, w: colW - 32 });
    await makeText(f, diffs[i].body, cx, cy + 105, { size: 13, weight: 400, color: C.onVar, lh: 20, w: colW - 32 });
  }

  return H;
}

async function buildProjects(page, yOff) {
  const H = 700;
  const f = makeFrame("08 — Projetos", W, H, C.surfaceLow);
  page.appendChild(f);
  f.y = yOff;

  const PAD = 88;
  await makeText(f, "PORTFÓLIO SELECIONADO", PAD, 60, { size: 10, weight: 500, color: C.primaryInk, ls: 8, upper: true });
  await makeText(f, "Empresas que confiam na Hmob.", PAD, 100, { size: 42, weight: 500, color: C.onBg, lh: 48 });

  const clients = ["Grupo Votorantim", "Bradesco", "Vale S.A.", "Magazine Luiza", "Itaú Unibanco", "Embraer"];
  let cx = PAD;
  for (const cl of clients) {
    const t = await makeText(f, cl, cx, 200, { size: 18, weight: 500, color: C.onVar, opacity: 0.65 });
    cx += t.width + 48;
  }

  // Project cards
  const cardW = (W - PAD * 2 - 24) / 2;
  const data = [
    { ec: "ESCRITÓRIO CORPORATIVO", t: "Torre B — Sede Bradesco", m: "São Paulo, SP · 2024", v: "840", k: "M² MOBILIADOS" },
    { ec: "CAMPUS CORPORATIVO", t: "Campus Embraer", m: "São José dos Campos, SP · 2023", v: "2.100", k: "M² MOBILIADOS" },
  ];
  for (let i = 0; i < 2; i++) {
    const px = PAD + i * (cardW + 24);
    const card = makeFrame(`pcard-${i}`, cardW, 280, C.white);
    f.appendChild(card);
    card.x = px; card.y = 280;

    const ph = imgPlaceholder(card, "p-img", cardW * 0.55, 0, cardW * 0.45, 280, "PROJETO");
    await ph.addLabel();

    await makeText(card, data[i].ec, 32, 32, { size: 9, weight: 400, color: C.primaryInk, ls: 20, upper: true });
    await makeText(card, data[i].t, 32, 60, { size: 24, weight: 500, color: C.onBg, lh: 28, w: cardW * 0.5 });
    await makeText(card, data[i].m, 32, 130, { size: 13, weight: 400, color: C.onVar });
    await makeText(card, data[i].v, 32, 170, { size: 38, weight: 500, color: C.primary });
    await makeText(card, data[i].k, 32, 220, { size: 9, weight: 400, color: C.onVar, ls: 20, upper: true });
  }

  await makeText(f, "Ver Todos os Projetos →", W / 2 - 100, H - 60, { size: 14, weight: 600, color: C.primaryInk });

  return H;
}

async function buildTestimonials(page, yOff) {
  const H = 520;
  const f = makeFrame("09 — Depoimentos", W, H, C.surface);
  page.appendChild(f);
  f.y = yOff;

  const PAD = 88;
  await makeText(f, "O QUE DIZEM NOSSOS CLIENTES", PAD, 60, { size: 10, weight: 500, color: C.primaryInk, ls: 8, upper: true });
  await makeText(f, "A voz de quem já transformou seu espaço.", PAD, 100,
    { size: 38, weight: 500, color: C.onBg, lh: 44, w: 800 });

  const ts = [
    { q: '"A Hmob entregou nosso escritório de 1.200m² no prazo e sem surpresas. Qualidade e rigor incomparáveis."', n: "Ana Rodrigues", r: "DIRETORA DE FACILITIES · BRADESCO" },
    { q: '"Foram três projetos consecutivos. A equipe entende de ambientes corporativos de verdade."', n: "Marcos Lima", r: "HEAD DE INFRAESTRUTURA · VALE S.A." },
    { q: '"O projeto da sala de liderança ficou além do esperado. Produto premium com entrega de alto nível."', n: "Roberta Campos", r: "CTO · GRUPO VOTORANTIM" },
    { q: '"Garantia, assistência técnica ágil e produto que dura. É o que uma empresa de grande porte precisa."', n: "Felipe Marques", r: "GERENTE DE OPERAÇÕES · EMBRAER" },
  ];
  const cardW = (W - PAD * 2 - 2) / 2;
  for (let i = 0; i < ts.length; i++) {
    const col = i % 2, row = Math.floor(i / 2);
    const cx = PAD + col * (cardW + 2);
    const cy = 220 + row * 140;
    const card = makeFrame(`testi-${i}`, cardW, 135, C.white);
    f.appendChild(card);
    card.x = cx; card.y = cy;

    await makeText(card, '"', 28, 8, { size: 36, weight: 500, color: C.primary });
    await makeText(card, ts[i].q, 28, 18, { size: 15, weight: 400, color: C.onBg, lh: 22, w: cardW - 56 });
    await makeText(card, ts[i].n, 28, 95, { size: 13, weight: 600, color: C.onBg });
    await makeText(card, ts[i].r, 28, 113, { size: 9, weight: 400, color: C.onVar, ls: 18, upper: true });
  }

  return H;
}

async function buildFAQ(page, yOff) {
  const H = 600;
  const f = makeFrame("10 — FAQ", W, H, C.surfaceLow);
  page.appendChild(f);
  f.y = yOff;

  const PAD = 88;
  await makeText(f, "PERGUNTAS FREQUENTES", PAD, 60, { size: 10, weight: 500, color: C.primaryInk, ls: 8, upper: true });
  await makeText(f, "Tudo que você precisa saber.", PAD, 100, { size: 42, weight: 500, color: C.onBg, lh: 48 });

  const faqs = [
    "A Hmob atende projetos de qualquer porte?",
    "Qual o prazo médio de entrega e instalação?",
    "A Hmob realiza projetos fora do eixo SP-RJ?",
    "Como funciona a garantia dos produtos?",
    "É possível customizar peças fora do catálogo?",
  ];
  makeRect(f, "faq-bg", PAD, 220, W - PAD * 2, H - 260, C.white);
  for (let i = 0; i < faqs.length; i++) {
    const fy = 220 + i * 70;
    if (i > 0) makeRect(f, `fdiv-${i}`, PAD + 24, fy, W - PAD * 2 - 48, 1, C.onBg, { opacity: 0.12 });
    await makeText(f, `0${i+1}`, PAD + 24, fy + 24, { size: 10, weight: 400, color: C.primaryInk, ls: 22 });
    await makeText(f, faqs[i], PAD + 80, fy + 22, { size: 17, weight: 500, color: C.onBg });
    makeRect(f, `fp-${i}`, W - PAD - 56, fy + 18, 32, 32, C.surfaceLow);
    await makeText(f, "+", W - PAD - 46, fy + 22, { size: 18, weight: 300, color: C.primary });
  }

  return H;
}

async function buildBlog(page, yOff) {
  const H = 620;
  const f = makeFrame("11 — Blog", W, H, C.surface);
  page.appendChild(f);
  f.y = yOff;

  const PAD = 88;
  await makeText(f, "CONTEÚDO & TENDÊNCIAS", PAD, 60, { size: 10, weight: 500, color: C.primaryInk, ls: 8, upper: true });
  await makeText(f, "Insights para decisores.", PAD, 100, { size: 42, weight: 500, color: C.onBg, lh: 48 });

  const featW = Math.floor((W - PAD * 2) * 0.58);
  const featH = H - 240;

  const featCard = makeFrame("blog-feat", featW, featH, C.white);
  f.appendChild(featCard);
  featCard.x = PAD; featCard.y = 220;

  const ph1 = imgPlaceholder(featCard, "feat-img", 0, 0, featW, 260, "ARTIGO DESTAQUE");
  await ph1.addLabel();
  await makeText(featCard, "ERGONOMIA  ·  15 JAN 2025", 28, 280, { size: 9, weight: 400, color: C.primaryInk, ls: 20, upper: true });
  await makeText(featCard, "NR-17 atualizada: o que muda no mobiliário corporativo em 2025", 28, 304,
    { size: 24, weight: 500, color: C.onBg, lh: 28, w: featW - 56 });
  await makeText(featCard, "A revisão da norma traz novas exigências para altura de superfícies, apoio de braços e dispositivos de entrada.",
    28, 380, { size: 14, weight: 400, color: C.onVar, lh: 22, w: featW - 56 });

  const sideW = W - PAD * 2 - featW - 24;
  const sideH = (featH - 8) / 2;

  for (let i = 0; i < 2; i++) {
    const card = makeFrame(`blog-side-${i+1}`, sideW, sideH, C.white);
    f.appendChild(card);
    card.x = PAD + featW + 24;
    card.y = 220 + i * (sideH + 8);

    const ph = imgPlaceholder(card, "side-img", 0, 0, sideW, 130, `ARTIGO ${i+2}`);
    await ph.addLabel();
    await makeText(card, i === 0 ? "DESIGN" : "GESTÃO", 24, 144, { size: 9, weight: 400, color: C.primaryInk, ls: 20, upper: true });
    await makeText(card, i === 0 ? "Como o layout do escritório impacta a produtividade da equipe" : "Mobiliário como ativo: depreciação e CAPEX vs OPEX",
      24, 162, { size: 17, weight: 500, color: C.onBg, lh: 22, w: sideW - 48 });
  }

  return H;
}

async function buildCTA(page, yOff) {
  const H = 320;
  const f = makeFrame("12 — CTA Band", W, H, C.inkDark);
  page.appendChild(f);
  f.y = yOff;

  const PAD = 88;
  await makeText(f, "Pronto para transformar o ambiente da sua empresa?", PAD, 90,
    { size: 42, weight: 500, color: C.light, lh: 46, w: 700 });
  await makeText(f, "Da consultoria à entrega, a Hmob cuida de tudo. Fale com um especialista hoje.", PAD, 200,
    { size: 16, weight: 400, color: C.light, opacity: 0.72, lh: 26, w: 600 });

  makeRect(f, "cta-b1", W - PAD - 240, 110, 240, 48, C.inkDark, { stroke: C.light, strokeOpacity: 0.4 });
  await makeText(f, "SOLICITAR PROPOSTA →", W - PAD - 220, 128, { size: 11, weight: 700, color: C.light, ls: 8, upper: true });

  makeRect(f, "cta-b2", W - PAD - 240, 170, 240, 48, C.inkDark3);
  await makeText(f, "VER PROJETOS REALIZADOS", W - PAD - 220, 188, { size: 11, weight: 700, color: C.light, ls: 8, upper: true, opacity: 0.8 });

  return H;
}

async function buildFooter(page, yOff) {
  const H = 420;
  const f = makeFrame("13 — Footer", W, H, C.footerBg);
  page.appendChild(f);
  f.y = yOff;

  const PAD = 88;
  await makeText(f, "H | MOB", PAD, 56, { size: 26, weight: 600, color: C.light });
  await makeText(f, "FOR OFFICES", PAD + 100, 64, { size: 9, weight: 300, color: C.light, ls: 28, opacity: 0.6, upper: true });
  await makeText(f, "Mobiliário corporativo de alto desempenho. Projetos, fabricação e instalação em todo o Brasil.",
    PAD, 102, { size: 13, weight: 400, color: C.light2, opacity: 0.6, lh: 22, w: 260 });

  makeRect(f, "seal", PAD, 180, 220, 36, C.light, { opacity: 0.04 });
  makeRect(f, "seal-dot", PAD + 14, 194, 8, 8, C.primary2);
  await makeText(f, "SINCE 2006 · MADE IN BRAZIL", PAD + 30, 192, { size: 9, weight: 400, color: C.light2, ls: 18, opacity: 0.7, upper: true });

  const cols = [
    { title: "PRODUTOS", items: ["Estações de Trabalho", "Salas de Reunião", "Cadeiras", "Lounge Corporativo", "Linha Prestige"] },
    { title: "EMPRESA", items: ["Sobre a Hmob", "Nossa Fábrica", "Certificações", "Blog", "Trabalhe Conosco"] },
    { title: "CONTATO", items: ["+55 (11) 3000-0000", "contato@hmob.com.br", "São Paulo, SP", "Bento Gonçalves, RS"] },
  ];
  for (let i = 0; i < cols.length; i++) {
    const cx = PAD + 320 + i * 200;
    await makeText(f, cols[i].title, cx, 56, { size: 9, weight: 400, color: C.light2, ls: 22, opacity: 0.5, upper: true });
    for (let j = 0; j < cols[i].items.length; j++) {
      await makeText(f, cols[i].items[j], cx, 88 + j * 26, { size: 13, weight: 400, color: C.light2, opacity: 0.8 });
    }
  }

  // WhatsApp CTA
  const wx = PAD + 320 + 3 * 200;
  if (wx + 200 < W - PAD) {
    makeRect(f, "wa", wx, 56, 200, 44, C.primary, { radius: 2 });
    await makeText(f, "FALAR NO WHATSAPP", wx + 24, 74, { size: 10, weight: 700, color: C.white, ls: 8, upper: true });
  }

  // Legal bar
  makeRect(f, "legal-line", PAD, H - 60, W - PAD * 2, 1, C.light, { opacity: 0.06 });
  await makeText(f, "© 2025 Hmob For Offices Ltda. · CNPJ 00.000.000/0001-00", PAD, H - 40,
    { size: 9, weight: 400, color: C.light2, ls: 18, opacity: 0.5, upper: true });
  await makeText(f, "Privacidade  ·  Termos  ·  Cookies", W - PAD - 240, H - 40,
    { size: 9, weight: 400, color: C.light2, ls: 18, opacity: 0.5, upper: true });

  return H;
}
