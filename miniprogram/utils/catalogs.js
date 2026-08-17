const BASE_URL = 'https://liushaoyan81-cloud.github.io/cangxuan-material-catalog';
const ASSET_VERSION = '20260817-mobile-compression-v3';

function asset(path) {
  return `${BASE_URL}/${path}?site=${ASSET_VERSION}`;
}

const companyCatalog = {
  key: 'company', title: '关于苍玹', eyebrow: 'ABOUT CANGXUAN', folder: 'company-pages', pages: 35,
  width: 1200, height: 675,
  chapters: [['企业简介', 1, 4], ['合作流程', 5, 9], ['装修辅材', 10, 24], ['实景案例', 24, 35]]
};

const categories = [
  { key: 'tiles', title: '瓷砖岩板', english: 'TILE & SLAB', intro: '东鹏瓷砖、冠珠瓷砖', color: 'terracotta' },
  { key: 'bathroom', title: '卫浴系列', english: 'BATHROOM', intro: '科勒、摩恩', color: 'sage' },
  { key: 'flooring', title: '木地板', english: 'FLOORING', intro: '圣象强化、三层、多层', color: 'wood' },
  { key: 'lighting', title: '灯光系列', english: 'LIGHTING', intro: '吊灯、树脂灯、云石灯', color: 'gold' },
  { key: 'doors', title: '木门系列', english: 'WOOD DOOR', intro: '资料待接入', color: 'ink' },
  { key: 'glass', title: '玻璃隔断 / 门', english: 'GLASS', intro: '资料待接入', color: 'mist' }
];

const catalogs = {
  dongpeng: { category: 'tiles', brand: '东鹏瓷砖', title: '东鹏瓷砖', eyebrow: 'DONGPENG / 2025 LOOKBOOK', folder: 'tile-pages/dongpeng', pages: 174, width: 1200, height: 780, chapters: [['品牌与目录', 1, 3], ['岩板系列', 4, 57], ['瓷砖系列', 58, 105], ['整装与美装', 106, 174]] },
  guanzhu: { category: 'tiles', brand: '冠珠瓷砖', title: '冠珠瓷砖', eyebrow: 'GUANZHU / 2025 PRODUCT SUMMARY', folder: 'tile-pages/guanzhu', pages: 141, width: 1200, height: 675, chapters: [['品牌与产品架构', 1, 8], ['岩板产品', 9, 45], ['瓷砖产品', 46, 120], ['空间应用', 121, 141]] },
  kohlerBathroom: { category: 'bathroom', brand: '科勒', title: '科勒卫浴产品', eyebrow: 'KOHLER / FULL LINE BATHROOM 2026', folder: 'bathroom-pages/kohler-bathroom', pages: 177, width: 1200, height: 740, chapters: [['品牌与目录', 1, 8], ['卫浴洁具', 9, 90], ['浴室家具', 91, 140], ['淋浴与配套', 141, 177]] },
  kohlerFaucets: { category: 'bathroom', brand: '科勒', title: '科勒龙头与淋浴', eyebrow: 'KOHLER / FULL LINE FAUCETS 2026', folder: 'bathroom-pages/kohler-faucets', pages: 110, width: 1200, height: 750, chapters: [['龙头系列', 1, 42], ['淋浴系统', 43, 78], ['厨房龙头', 79, 110]] },
  kohlerMirror: { category: 'bathroom', brand: '科勒', title: '科勒镜柜产品推荐', eyebrow: 'KOHLER / MIRROR CABINET 2026', folder: 'bathroom-pages/kohler-mirror-public', pages: 12, width: 1200, height: 675, chapters: [['镜柜产品', 1, 12]] },
  moen: { category: 'bathroom', brand: '摩恩', title: '摩恩工程产品', eyebrow: 'MOEN / ENGINEERING COLLECTION 2025-26', folder: 'bathroom-pages/moen-engineering-2025', pages: 187, width: 1200, height: 810, chapters: [['产品架构', 1, 12], ['卫浴洁具', 13, 76], ['龙头与淋浴', 77, 133], ['浴室家具与厨房', 134, 187]] },
  saintLaminate: { category: 'flooring', brand: '圣象', title: '圣象强化地板', eyebrow: 'POWER DEKOR / LAMINATE FLOORING 2026', folder: 'flooring-pages/saint-laminate-2026', pages: 40, width: 848, height: 1200, portraitPages: [], chapters: [['目录与绿色产业链', 1, 5], ['地板拼法与工艺', 6, 7], ['强化地板花色', 8, 40]] },
  saintThreeLayer: { category: 'flooring', brand: '圣象', title: '圣象三层实木复合', eyebrow: 'POWER DEKOR / THREE-LAYER WOOD 2026', folder: 'flooring-pages/saint-three-layer-2026', pages: 292, width: 1200, height: 848, portraitPages: [4, 5, 12, 52, 55, 58, 78, 90, 117, 121, 157, 214, 228, 239, 249, 257, 269], chapters: [['品牌与结构工艺', 1, 20], ['顶层设计系列', 21, 40], ['奇迹时光', 41, 68], ['国风实木', 69, 94], ['原木生活', 95, 144], ['系列与配套', 145, 292]] },
  saintMultilayer: { category: 'flooring', brand: '圣象', title: '圣象多层实木复合', eyebrow: 'POWER DEKOR ASPIN / MULTI-LAYER WOOD 2026', folder: 'flooring-pages/saint-multilayer-2026', pages: 52, width: 848, height: 1200, landscapePages: [9, 30], chapters: [['品牌与产品优势', 1, 7], ['胡桃木系列', 8, 11], ['多层花色产品', 12, 49], ['圣象元配', 50, 52]] },
  diningPendant: { category: 'lighting', brand: '灯光供应链', title: '餐吊灯', eyebrow: 'DINING PENDANT LIGHTING', folder: 'lighting-pages/dining-pendant', pages: 11, width: 1200, height: 849, chapters: [['餐吊灯产品', 1, 11]] },
  resinLight: { category: 'lighting', brand: '灯光供应链', title: '树脂灯', eyebrow: 'RESIN LIGHTING', folder: 'lighting-pages/resin-light', pages: 5, width: 1200, height: 849, chapters: [['树脂灯产品', 1, 5]] },
  smallPendant: { category: 'lighting', brand: '灯光供应链', title: '小吊灯', eyebrow: 'SMALL PENDANT LIGHTING', folder: 'lighting-pages/small-pendant', pages: 91, width: 1200, height: 849, chapters: [['小吊灯产品', 1, 91]] },
  largeChandelier: { category: 'lighting', brand: '灯光供应链', title: '大吊灯', eyebrow: 'LARGE CHANDELIER', folder: 'lighting-pages/large-chandelier', pages: 64, width: 1200, height: 849, chapters: [['大吊灯产品', 1, 64]] },
  alabasterSmallPendant: { category: 'lighting', brand: '灯光供应链', title: '云石小吊灯', eyebrow: 'ALABASTER SMALL PENDANT', folder: 'lighting-pages/alabaster-small-pendant', pages: 8, width: 1200, height: 849, chapters: [['云石小吊灯', 1, 8]] },
  alabasterChandelier: { category: 'lighting', brand: '灯光供应链', title: '云石大吊灯', eyebrow: 'ALABASTER CHANDELIER', folder: 'lighting-pages/alabaster-chandelier', pages: 5, width: 1200, height: 849, chapters: [['云石大吊灯', 1, 5]] },
  alabasterTableFloor: { category: 'lighting', brand: '灯光供应链', title: '云石台灯 / 落地灯', eyebrow: 'ALABASTER TABLE & FLOOR', folder: 'lighting-pages/alabaster-table-floor', pages: 5, width: 1200, height: 849, chapters: [['云石台灯与落地灯', 1, 5]] },
  alabasterCeiling: { category: 'lighting', brand: '灯光供应链', title: '云石吸顶灯', eyebrow: 'ALABASTER CEILING LIGHT', folder: 'lighting-pages/alabaster-ceiling', pages: 2, width: 1200, height: 849, chapters: [['云石吸顶灯', 1, 2]] }
};

const categoryCatalogs = {
  tiles: ['dongpeng', 'guanzhu'],
  bathroom: ['kohlerBathroom', 'kohlerFaucets', 'kohlerMirror', 'moen'],
  flooring: ['saintLaminate', 'saintThreeLayer', 'saintMultilayer'],
  lighting: ['diningPendant', 'resinLight', 'smallPendant', 'largeChandelier', 'alabasterSmallPendant', 'alabasterChandelier', 'alabasterTableFloor', 'alabasterCeiling']
};

function getCatalog(key) {
  return catalogs[key] ? { key, ...catalogs[key] } : null;
}

function getPageImage(catalog, page) {
  const portrait = catalog.portraitPages?.includes(page)
    || (catalog.landscapePages && !catalog.landscapePages.includes(page) && catalog.portraitPages === undefined);
  const width = portrait ? catalog.height : catalog.width;
  const height = portrait ? catalog.width : catalog.height;
  const folderFile = String(page).padStart(3, '0');
  return { src: asset(`${catalog.folder}/page-${folderFile}.webp`), width, height, portrait };
}

module.exports = { ASSET_VERSION, BASE_URL, asset, categories, categoryCatalogs, companyCatalog, getCatalog, getPageImage };
