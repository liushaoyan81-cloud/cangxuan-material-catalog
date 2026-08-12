const products = [
  { brand: '东鹏瓷砖', name: '迪奥金', model: 'T12FV322510', size: '1600×3200mm / 1200×2700mm', finish: '柔光面 · 任意连纹', space: '客厅 · 电视背景', tone: 'warm', page: 'P004' },
  { brand: '东鹏瓷砖', name: '宝格丽白', model: 'T12FV322530', size: '1600×3200mm / 600×1200mm', finish: '柔光面 · 任意连纹', space: '客厅 · 餐厅', tone: 'cool', page: 'P022' },
  { brand: '东鹏瓷砖', name: '意大利白', model: 'T09FG721610', size: '1200×2700mm / 600×1200mm', finish: '亮光面 · 横向连纹', space: '背景墙 · 公区', tone: 'light', page: 'P029' },
  { brand: '冠珠瓷砖', name: '御彩鎏金', model: 'GF-2608JDS45', size: '800×2600×9mm', finish: '3面随机', space: '背景墙 · 岩板', tone: 'green', page: 'P006' },
  { brand: '冠珠瓷砖', name: '卡拉拉冰白', model: 'GF-LH32161', size: '1600×3200×6/12mm', finish: '细滑面 · 一石3面连纹', space: '客厅 · 岩板', tone: 'cool', page: 'P011' },
  { brand: '冠珠瓷砖', name: '宝格丽紫', model: 'GF-QG271212-451', size: '1200×2700×12mm', finish: '亮光面 · 无限连纹', space: '背景墙 · 岩板', tone: 'dark', page: 'P014' },
  { brand: '兴辉瓷砖', name: '品牌产品资料待上传', model: '等待图册', size: '—', finish: '—', space: '—', tone: 'light', page: '—', pending: true }
];

const state = { brand: 'all', selection: JSON.parse(localStorage.getItem('cangxuan-selection') || '[]') };
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const companyPages = $('#companyPages');
if (companyPages) {
  companyPages.innerHTML = Array.from({ length: 35 }, (_, index) => {
    const page = index + 1;
    const file = String(page).padStart(2, '0');
    return `<figure class="company-page" data-page="${page}"><img src="company-pages/page-${file}.webp" alt="苍玹公司介绍及施工工艺第 ${page} 页" loading="${page === 1 ? 'eager' : 'lazy'}"${page === 1 ? ' fetchpriority="high"' : ''} width="1920" height="1080"></figure>`;
  }).join('');

  const pageNodes = $$('.company-page');
  const chapterLinks = $$('.chapter-link');
  const pageCounter = $('#currentCompanyPage');
  const chapterStarts = [1, 5, 10, 24];
  let currentPage = 1;
  let wheelLocked = false;

  const setActivePage = (page) => {
    currentPage = Math.max(1, Math.min(35, page));
    pageCounter.textContent = String(currentPage).padStart(2, '0');
    const chapter = chapterStarts.reduce((active, start, index) => currentPage >= start ? index : active, 0);
    chapterLinks.forEach((link, index) => link.classList.toggle('active', index === chapter));
  };

  const goToPage = (page, behavior = 'smooth') => {
    const target = pageNodes[page - 1];
    if (!target) return;
    setActivePage(page);
    target.scrollIntoView({ behavior, block: 'start' });
  };

  chapterLinks.forEach(link => link.addEventListener('click', () => goToPage(Number(link.dataset.page))));

  const pageObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActivePage(Number(visible.target.dataset.page));
  }, { threshold: [0.45, 0.6, 0.75] });
  pageNodes.forEach(page => pageObserver.observe(page));

  window.addEventListener('wheel', (event) => {
    if (!$('#home').classList.contains('active') || window.innerWidth <= 760 || Math.abs(event.deltaY) < 8) return;
    event.preventDefault();
    if (wheelLocked) return;
    wheelLocked = true;
    goToPage(currentPage + (event.deltaY > 0 ? 1 : -1));
    window.setTimeout(() => { wheelLocked = false; }, 650);
  }, { passive: false });
}

function showView(id){
  $$('.view').forEach(v => v.classList.toggle('active', v.id === id));
  $$('.nav button').forEach(b => b.classList.toggle('active', b.dataset.nav === id));
  if (id === 'tiles') {
    $('#tileCatalogHub')?.classList.remove('hidden');
    $('#tileCatalogReader')?.classList.add('hidden');
  }
  if (id === 'bathroom') {
    activeBathroomCatalog = null;
    $('#bathroomCatalogHub')?.classList.remove('hidden');
    $('#kohlerCatalogHub')?.classList.add('hidden');
    $('#moenCatalogHub')?.classList.add('hidden');
    $('#bathroomCatalogReader')?.classList.add('hidden');
  }
  if (id === 'flooring') {
    activeFlooringCatalog = null;
    $('#flooringCatalogHub')?.classList.remove('hidden');
    $('#saintCatalogHub')?.classList.add('hidden');
    $('#flooringCatalogReader')?.classList.add('hidden');
  }
  window.scrollTo({top:0, behavior:'smooth'});
}
$$('[data-nav]').forEach(btn => btn.addEventListener('click', () => showView(btn.dataset.nav)));

const tileCatalogs = {
  dongpeng: {
    title: '东鹏瓷砖', eyebrow: 'DONGPENG / 2025 LOOKBOOK', pages: 174, folder: 'dongpeng', width: 1531, height: 995,
    chapters: [
      ['图册与规格索引', 1, 9], ['尊石', 10, 38], ['大地', 39, 47], ['墙面岩板', 48, 52], ['原木', 53, 57], ['地貌岩', 58, 68],
      ['净奢石', 69, 98], ['微韵石', 99, 114], ['微理石', 115, 138], ['尚木', 139, 151], ['素色', 152, 169], ['四合一', 170, 174]
    ]
  },
  guanzhu: {
    title: '冠珠瓷砖', eyebrow: 'GUANZHU / 2025 PRODUCT SUMMARY', pages: 141, folder: 'guanzhu', width: 1440, height: 810,
    chapters: [['产品架构与目录', 1, 3], ['岩板产品', 4, 57], ['瓷砖产品', 58, 105], ['整装产品', 106, 137], ['美装产品', 138, 141]]
  }
};

const tileReader = $('#tileCatalogReader');
const tilePages = $('#tileCatalogPages');
const tileChapterNav = $('#tileChapterNav');
let activeTileCatalog = null;
let activeTilePage = 1;
let tileWheelLocked = false;
let tilePageObserver = null;

function setActiveTilePage(page) {
  if (!activeTileCatalog) return;
  activeTilePage = Math.max(1, Math.min(activeTileCatalog.pages, page));
  $('#currentTilePage').textContent = String(activeTilePage).padStart(3, '0');
  const chapterIndex = activeTileCatalog.chapters.reduce((active, chapter, index) => activeTilePage >= chapter[1] ? index : active, 0);
  $$('.tile-chapter-link').forEach((link, index) => link.classList.toggle('active', index === chapterIndex));
}

function goToTilePage(page, behavior = 'smooth') {
  const target = $(`.tile-catalog-page[data-page="${page}"]`);
  if (!target) return;
  setActiveTilePage(page);
  target.scrollIntoView({ behavior: behavior === 'auto' ? 'instant' : behavior, block: 'start' });
}

function openTileCatalog(key) {
  const catalog = tileCatalogs[key];
  if (!catalog) return;
  activeTileCatalog = catalog;
  activeTilePage = 1;
  $('#tileCatalogHub').classList.add('hidden');
  tileReader.classList.remove('hidden');
  $('#tileCatalogEyebrow').textContent = catalog.eyebrow;
  $('#tileCatalogTitle').textContent = catalog.title;
  $('#totalTilePages').textContent = catalog.pages;
  tilePages.innerHTML = Array.from({ length: catalog.pages }, (_, index) => {
    const page = index + 1;
    const file = String(page).padStart(3, '0');
    return `<figure class="tile-catalog-page" data-page="${page}"><img src="tile-pages/${catalog.folder}/page-${file}.webp" alt="${catalog.title}产品图册第 ${page} 页" loading="${page === 1 ? 'eager' : 'lazy'}"${page === 1 ? ' fetchpriority="high"' : ''} width="${catalog.width}" height="${catalog.height}"></figure>`;
  }).join('');
  tileChapterNav.innerHTML = catalog.chapters.map(([name, page, endPage], index) => `<button class="tile-chapter-link${index === 0 ? ' active' : ''}" data-page="${page}"><i>${String(index + 1).padStart(2, '0')}</i><span><b>${name}</b><small>第 ${page}-${endPage} 页</small></span></button>`).join('');
  $$('.tile-chapter-link').forEach(link => link.addEventListener('click', () => goToTilePage(Number(link.dataset.page), 'auto')));
  tilePageObserver?.disconnect();
  tilePageObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActiveTilePage(Number(visible.target.dataset.page));
  }, { threshold: [0.45, 0.6, 0.75] });
  $$('.tile-catalog-page').forEach(page => tilePageObserver.observe(page));
  setActiveTilePage(1);
  window.scrollTo({ top: 0, behavior: 'auto' });
}

$$('[data-open-tile-catalog]').forEach(button => button.addEventListener('click', () => openTileCatalog(button.dataset.openTileCatalog)));
$('#closeTileCatalog')?.addEventListener('click', () => {
  tilePageObserver?.disconnect();
  activeTileCatalog = null;
  tileReader.classList.add('hidden');
  $('#tileCatalogHub').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'auto' });
});

window.addEventListener('wheel', (event) => {
  if (!activeTileCatalog || !$('#tiles').classList.contains('active') || tileReader.classList.contains('hidden') || window.innerWidth <= 760 || Math.abs(event.deltaY) < 8) return;
  event.preventDefault();
  if (tileWheelLocked) return;
  tileWheelLocked = true;
  goToTilePage(activeTilePage + (event.deltaY > 0 ? 1 : -1));
  window.setTimeout(() => { tileWheelLocked = false; }, 650);
}, { passive: false });

const bathroomCatalogs = {
  'kohler-bathroom': {
    title: '科勒卫浴产品', eyebrow: 'KOHLER / FULL LINE BATHROOM 2026', pages: 177, folder: 'kohler-bathroom', width: 1715, height: 1057,
    chapters: [
      ['品牌与产品索引', 1, 11], ['智能坐便器', 12, 26], ['普通坐便器', 27, 50], ['智能盖板', 51, 60],
      ['浴室家具', 61, 100], ['镜柜', 101, 110], ['台盆', 111, 127], ['浴缸与淋浴', 128, 149],
      ['淋浴门', 150, 158], ['商用系列', 159, 177]
    ]
  },
  'kohler-faucets': {
    title: '科勒龙头与淋浴', eyebrow: 'KOHLER / FULL LINE FAUCETS 2026', pages: 110, folder: 'kohler-faucets', width: 1692, height: 1057,
    chapters: [
      ['品牌与产品索引', 1, 7], ['浴室龙头', 8, 30], ['淋浴产品', 31, 56], ['卫浴配件', 57, 71],
      ['浴霸', 72, 79], ['壁挂毛巾架', 80, 89], ['厨房龙头', 90, 98], ['厨房水槽', 99, 110]
    ]
  },
  'kohler-mirror': {
    title: '科勒镜柜产品推荐', eyebrow: 'KOHLER / MIRROR CABINET 2026', pages: 12, folder: 'kohler-mirror-public', width: 1536, height: 864,
    chapters: [['博悦镜柜', 1, 5], ['珀玥浴室组合', 6, 8], ['绮亚 / 新维乐', 9, 12]]
  },
  'moen-engineering': {
    title: '摩恩工程产品', eyebrow: 'MOEN / ENGINEERING COLLECTION 2025–26', pages: 187, folder: 'moen-engineering-2025', width: 1569, height: 1057, brand: 'moen',
    chapters: [
      ['品牌与工程案例', 1, 22], ['产品型号索引', 23, 28], ['陶瓷洁具', 29, 66], ['卫浴龙头', 67, 91],
      ['雨淋产品', 92, 97], ['卫浴挂件', 98, 116], ['淋浴房', 117, 120], ['浴室家具', 121, 127],
      ['商用系列', 128, 133], ['厨房产品', 134, 149], ['技术附录', 150, 187]
    ]
  }
};

const bathroomReader = $('#bathroomCatalogReader');
const bathroomPages = $('#bathroomCatalogPages');
const bathroomChapterNav = $('#bathroomChapterNav');
let activeBathroomCatalog = null;
let activeBathroomPage = 1;
let bathroomWheelLocked = false;
let bathroomPageObserver = null;

function setActiveBathroomPage(page) {
  if (!activeBathroomCatalog) return;
  activeBathroomPage = Math.max(1, Math.min(activeBathroomCatalog.pages, page));
  $('#currentBathroomPage').textContent = String(activeBathroomPage).padStart(3, '0');
  const chapterIndex = activeBathroomCatalog.chapters.reduce((active, chapter, index) => activeBathroomPage >= chapter[1] ? index : active, 0);
  $$('.bathroom-chapter-link').forEach((link, index) => link.classList.toggle('active', index === chapterIndex));
}

function goToBathroomPage(page, behavior = 'smooth') {
  const target = $(`.bathroom-catalog-page[data-page="${page}"]`);
  if (!target) return;
  setActiveBathroomPage(page);
  target.scrollIntoView({ behavior: behavior === 'auto' ? 'instant' : behavior, block: 'start' });
}

function openBathroomCatalog(key) {
  const catalog = bathroomCatalogs[key];
  if (!catalog) return;
  activeBathroomCatalog = catalog;
  activeBathroomPage = 1;
  $('#kohlerCatalogHub').classList.add('hidden');
  $('#moenCatalogHub').classList.add('hidden');
  bathroomReader.classList.remove('hidden');
  $('#bathroomCatalogEyebrow').textContent = catalog.eyebrow;
  $('#bathroomCatalogTitle').textContent = catalog.title;
  $('#totalBathroomPages').textContent = catalog.pages;
  bathroomPages.innerHTML = Array.from({ length: catalog.pages }, (_, index) => {
    const page = index + 1;
    const file = String(page).padStart(3, '0');
    return `<figure class="tile-catalog-page bathroom-catalog-page" data-page="${page}"><img src="bathroom-pages/${catalog.folder}/page-${file}.webp" alt="${catalog.title}第 ${page} 页" loading="${page === 1 ? 'eager' : 'lazy'}"${page === 1 ? ' fetchpriority="high"' : ''} width="${catalog.width}" height="${catalog.height}"></figure>`;
  }).join('');
  bathroomChapterNav.innerHTML = catalog.chapters.map(([name, page, endPage], index) => `<button class="tile-chapter-link bathroom-chapter-link${index === 0 ? ' active' : ''}" data-page="${page}"><i>${String(index + 1).padStart(2, '0')}</i><span><b>${name}</b><small>第 ${page}-${endPage} 页</small></span></button>`).join('');
  $$('.bathroom-chapter-link').forEach(link => link.addEventListener('click', () => goToBathroomPage(Number(link.dataset.page), 'auto')));
  bathroomPageObserver?.disconnect();
  bathroomPageObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActiveBathroomPage(Number(visible.target.dataset.page));
  }, { threshold: [0.45, 0.6, 0.75] });
  $$('.bathroom-catalog-page').forEach(page => bathroomPageObserver.observe(page));
  setActiveBathroomPage(1);
  window.scrollTo({ top: 0, behavior: 'auto' });
}

$$('[data-open-bathroom-brand]').forEach(button => button.addEventListener('click', () => {
  $('#bathroomCatalogHub').classList.add('hidden');
  const brand = button.dataset.openBathroomBrand;
  $('#kohlerCatalogHub').classList.toggle('hidden', brand !== 'kohler');
  $('#moenCatalogHub').classList.toggle('hidden', brand !== 'moen');
  window.scrollTo({ top: 0, behavior: 'auto' });
}));
$$('[data-open-bathroom-catalog]').forEach(button => button.addEventListener('click', () => openBathroomCatalog(button.dataset.openBathroomCatalog)));
$('#closeKohlerHub')?.addEventListener('click', () => {
  $('#kohlerCatalogHub').classList.add('hidden');
  $('#bathroomCatalogHub').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'auto' });
});
$('#closeMoenHub')?.addEventListener('click', () => {
  $('#moenCatalogHub').classList.add('hidden');
  $('#bathroomCatalogHub').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'auto' });
});
$('#closeBathroomCatalog')?.addEventListener('click', () => {
  bathroomPageObserver?.disconnect();
  const hub = activeBathroomCatalog?.brand === 'moen' ? '#moenCatalogHub' : '#kohlerCatalogHub';
  activeBathroomCatalog = null;
  bathroomReader.classList.add('hidden');
  $(hub).classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'auto' });
});

window.addEventListener('wheel', (event) => {
  if (!activeBathroomCatalog || !$('#bathroom').classList.contains('active') || bathroomReader.classList.contains('hidden') || window.innerWidth <= 760 || Math.abs(event.deltaY) < 8) return;
  event.preventDefault();
  if (bathroomWheelLocked) return;
  bathroomWheelLocked = true;
  goToBathroomPage(activeBathroomPage + (event.deltaY > 0 ? 1 : -1));
  window.setTimeout(() => { bathroomWheelLocked = false; }, 650);
}, { passive: false });

const flooringCatalogs = {
  'saint-laminate': {
    title: '圣象强化地板', eyebrow: 'POWER DEKOR / LAMINATE FLOORING 2026', pages: 40, folder: 'saint-laminate-2026', width: 1692, height: 1057,
    chapters: [
      ['目录与绿色产业链', 1, 5], ['地板拼法与工艺', 6, 7], ['宠爱家系列', 8, 15], ['1515系列', 16, 19],
      ['真木纹系列', 20, 21], ['浮视绘系列', 22, 25], ['田园系列', 26, 27], ['轻享系列', 28, 29],
      ['超次元系列', 30, 31], ['全品展示与圣象元配', 32, 40]
    ]
  },
  'saint-three-layer': {
    title: '圣象三层实木复合', eyebrow: 'POWER DEKOR / THREE-LAYER WOOD 2026', pages: 292, folder: 'saint-three-layer-2026', width: 1692, height: 1057,
    chapters: [
      ['品牌与结构工艺', 1, 20], ['顶层设计系列', 21, 40], ['Miracle Time 奇迹时光', 41, 68], ['国风实木系列', 69, 94],
      ['Maillard 美拉德', 95, 132], ['原木生活系列', 133, 144], ['Oakome 橡木系列', 145, 160], ['唐之韵系列', 161, 186],
      ['相思木系列', 187, 194], ['大宅通铺系列', 195, 204], ['活色生活系列', 205, 220], ['三拼艺术系列', 221, 241],
      ['M系星座系列', 242, 258], ['FB科技地板', 259, 272], ['颜值时代系列', 273, 280], ['ADI高阶系列', 281, 292]
    ]
  },
  'saint-multilayer': {
    title: '圣象多层实木复合', eyebrow: 'POWER DEKOR ASPIN / MULTI-LAYER WOOD 2026', pages: 52, folder: 'saint-multilayer-2026', width: 1692, height: 1057,
    chapters: [
      ['艾斯本品牌与产品优势', 1, 7], ['胡桃木系列', 8, 11], ['柚木系列', 12, 17], ['栎木与橡木系列', 18, 27],
      ['榆木系列', 28, 35], ['多层花色产品', 36, 49], ['圣象元配', 50, 52]
    ]
  }
};

const flooringReader = $('#flooringCatalogReader');
const flooringPages = $('#flooringCatalogPages');
const flooringChapterNav = $('#flooringChapterNav');
let activeFlooringCatalog = null;
let activeFlooringPage = 1;
let flooringWheelLocked = false;
let flooringPageObserver = null;

function setActiveFlooringPage(page) {
  if (!activeFlooringCatalog) return;
  activeFlooringPage = Math.max(1, Math.min(activeFlooringCatalog.pages, page));
  $('#currentFlooringPage').textContent = String(activeFlooringPage).padStart(3, '0');
  const chapterIndex = activeFlooringCatalog.chapters.reduce((active, chapter, index) => activeFlooringPage >= chapter[1] ? index : active, 0);
  $$('.flooring-chapter-link').forEach((link, index) => link.classList.toggle('active', index === chapterIndex));
}

function goToFlooringPage(page, behavior = 'smooth') {
  const target = $(`.flooring-catalog-page[data-page="${page}"]`);
  if (!target) return;
  setActiveFlooringPage(page);
  target.scrollIntoView({ behavior: behavior === 'auto' ? 'instant' : behavior, block: 'start' });
}

function openFlooringCatalog(key) {
  const catalog = flooringCatalogs[key];
  if (!catalog) return;
  activeFlooringCatalog = catalog;
  activeFlooringPage = 1;
  $('#saintCatalogHub').classList.add('hidden');
  flooringReader.classList.remove('hidden');
  $('#flooringCatalogEyebrow').textContent = catalog.eyebrow;
  $('#flooringCatalogTitle').textContent = catalog.title;
  $('#totalFlooringPages').textContent = catalog.pages;
  flooringPages.innerHTML = Array.from({ length: catalog.pages }, (_, index) => {
    const page = index + 1;
    const file = String(page).padStart(3, '0');
    return `<figure class="tile-catalog-page flooring-catalog-page" data-page="${page}"><img src="flooring-pages/${catalog.folder}/page-${file}.webp" alt="${catalog.title}第 ${page} 页" loading="${page === 1 ? 'eager' : 'lazy'}"${page === 1 ? ' fetchpriority="high"' : ''} width="${catalog.width}" height="${catalog.height}"></figure>`;
  }).join('');
  flooringChapterNav.innerHTML = catalog.chapters.map(([name, page, endPage], index) => `<button class="tile-chapter-link flooring-chapter-link${index === 0 ? ' active' : ''}" data-page="${page}"><i>${String(index + 1).padStart(2, '0')}</i><span><b>${name}</b><small>第 ${page}-${endPage} 页</small></span></button>`).join('');
  $$('.flooring-chapter-link').forEach(link => link.addEventListener('click', () => goToFlooringPage(Number(link.dataset.page), 'auto')));
  flooringPageObserver?.disconnect();
  flooringPageObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActiveFlooringPage(Number(visible.target.dataset.page));
  }, { threshold: [0.45, 0.6, 0.75] });
  $$('.flooring-catalog-page').forEach(page => flooringPageObserver.observe(page));
  setActiveFlooringPage(1);
  window.scrollTo({ top: 0, behavior: 'auto' });
}

$$('[data-open-flooring-brand]').forEach(button => button.addEventListener('click', () => {
  $('#flooringCatalogHub').classList.add('hidden');
  $('#saintCatalogHub').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'auto' });
}));
$$('[data-open-flooring-catalog]').forEach(button => button.addEventListener('click', () => openFlooringCatalog(button.dataset.openFlooringCatalog)));
$('#closeSaintHub')?.addEventListener('click', () => {
  $('#saintCatalogHub').classList.add('hidden');
  $('#flooringCatalogHub').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'auto' });
});
$('#closeFlooringCatalog')?.addEventListener('click', () => {
  flooringPageObserver?.disconnect();
  activeFlooringCatalog = null;
  flooringReader.classList.add('hidden');
  $('#saintCatalogHub').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'auto' });
});

window.addEventListener('wheel', (event) => {
  if (!activeFlooringCatalog || !$('#flooring').classList.contains('active') || flooringReader.classList.contains('hidden') || window.innerWidth <= 760 || Math.abs(event.deltaY) < 8) return;
  event.preventDefault();
  if (flooringWheelLocked) return;
  flooringWheelLocked = true;
  goToFlooringPage(activeFlooringPage + (event.deltaY > 0 ? 1 : -1));
  window.setTimeout(() => { flooringWheelLocked = false; }, 650);
}, { passive: false });

const craftDetails = [
  {
    title: '从生活方式开始，而不是从风格标签开始',
    text: '现场勘测光线、通风与空间尺度，梳理客户的生活习惯，再进入平面、效果图和施工图方案。',
    points: ['明确需求、预算、风格与项目边界', '意向图沟通后定稿，施工图细化到节点', '产品图纸审核，统筹各个商家衔接']
  },
  {
    title: '水电与防水，先把隐蔽工程做扎实',
    text: '按照空间功能分区定位水电点位，管线走向和防水范围在现场交底时确认，闭水测试合格后进入下一道工序。',
    points: ['水电点位与家电需求一次确认', '强弱电分离、管线横平竖直并留存记录', '卫生间、阳台等区域完成闭水测试并验收']
  },
  {
    title: '铺贴与木作，先排版再施工',
    text: '瓷砖、岩板和木作按照图纸排版，提前确认收口、留缝、纹理方向和基层条件，减少现场返工。',
    points: ['铺贴前确认砖卡、起铺点和对缝关系', '检查墙地面坡度、平整度与基层强度', '吊顶和柜体节点预留检修、收口和加固']
  },
  {
    title: '墙面与交付，把细节留在验收之前',
    text: '墙面基层、腻子、乳胶漆和安装收口按工序检查，完成清洁和成品保护后，再进行内部验收与客户交付。',
    points: ['基层处理到位，分遍腻子并检查平整度', '乳胶漆颜色、阴阳角和灯光下观感复核', '按节点清单逐项验收，整理交付资料']
  }
];
const craftItems = $$('.process-item');
const craftDetail = $('.process-detail');
craftItems.forEach((item, index) => item.addEventListener('click', () => {
  craftItems.forEach((node, i) => node.classList.toggle('active', i === index));
  const detail = craftDetails[index];
  craftDetail.querySelector('.eyebrow').textContent = `STANDARD ${String(index + 1).padStart(2, '0')}`;
  craftDetail.querySelector('h2').textContent = detail.title;
  craftDetail.querySelector('p:not(.eyebrow)').textContent = detail.text;
  craftDetail.querySelector('ul').innerHTML = detail.points.map(point => `<li>${point}</li>`).join('');
}));

function renderProducts(){
  const list = state.brand === 'all' ? products : products.filter(p => p.brand === state.brand);
  $('#productGrid').innerHTML = list.map((p, i) => `<article class="product-card">
    <div class="product-visual ${p.tone}"><span class="visual-label">${p.pending ? 'COMING SOON' : 'TILE / ' + p.page}</span></div>
    <div class="product-body"><div class="product-brand">${p.brand}</div><h2 class="product-name">${p.name}</h2><p class="product-meta">${p.model}<br>${p.size} · ${p.finish}<br>适用：${p.space}</p>
    <div class="product-actions">${p.pending ? '<small>等待产品图册</small>' : `<button data-add="${i}">加入选型单 +</button><small>图册 ${p.page}</small>`}</div></div>
  </article>`).join('');
  $$('[data-add]').forEach(btn => btn.addEventListener('click', () => addSelection(list[Number(btn.dataset.add)])));
}
$$('.brand-filter').forEach(btn => btn.addEventListener('click', () => { state.brand = btn.dataset.brand; $$('.brand-filter').forEach(b => b.classList.toggle('active', b === btn)); renderProducts(); }));

function addSelection(p){
  if(!state.selection.some(x => x.model === p.model)){ state.selection.push(p); localStorage.setItem('cangxuan-selection', JSON.stringify(state.selection)); renderSelection(); toast(`${p.name} 已加入选型单`); }
  else toast('这个产品已经在选型单里');
}
function renderSelection(){
  $('#selectionCount').textContent = state.selection.length;
  const empty = state.selection.length === 0;
  $('#selectionEmpty').classList.toggle('hidden', !empty); $('#selectionContent').classList.toggle('hidden', empty);
  $('#selectionList').innerHTML = state.selection.map((p,i) => `<div class="selection-row"><div class="selection-thumb"></div><div><h3>${p.name}</h3><p>${p.brand} · ${p.model}<br>${p.size} · ${p.finish}</p></div><button class="remove" data-remove="${i}">移除</button></div>`).join('');
  $$('[data-remove]').forEach(btn => btn.addEventListener('click', () => { state.selection.splice(Number(btn.dataset.remove),1); localStorage.setItem('cangxuan-selection', JSON.stringify(state.selection)); renderSelection(); }));
}
$('#selectionForm').addEventListener('submit', e => { e.preventDefault(); const id = 'CX-' + Math.random().toString(36).slice(2,8).toUpperCase(); toast(`选型记录 ${id} 已提交，苍玹会与您联系`); e.target.reset(); });
function toast(msg){ const el=$('#toast'); el.textContent=msg; el.classList.add('show'); setTimeout(()=>el.classList.remove('show'),2600); }
renderProducts(); renderSelection();

const slides = $$('.doc-slide');
const dots = $('#slideDots');
let slideIndex = 0;
if (slides.length && dots) {
  dots.innerHTML = slides.map((_, i) => `<button class="slider-dot${i === 0 ? ' active' : ''}" aria-label="第 ${i + 1} 页"></button>`).join('');
  const renderSlide = (index) => {
    slideIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === slideIndex));
    $$('.slider-dot').forEach((dot, i) => dot.classList.toggle('active', i === slideIndex));
  };
  $('#slidePrev').addEventListener('click', () => renderSlide(slideIndex - 1));
  $('#slideNext').addEventListener('click', () => renderSlide(slideIndex + 1));
  $$('.slider-dot').forEach((dot, i) => dot.addEventListener('click', () => renderSlide(i)));
}
