const { companyCatalog, getCatalog, getPageImage } = require('../../utils/catalogs');

Page({
  data: { catalog: null, pages: [], currentPage: 1, chapters: [], selectedCount: 0, intoView: '' },
  onLoad(options) {
    const catalog = options.key === 'company' ? companyCatalog : getCatalog(options.key);
    if (!catalog) return;
    const pages = Array.from({ length: catalog.pages }, (_, index) => {
      const page = index + 1;
      return { page, ...getPageImage(catalog, page), loaded: page <= 3 };
    });
    this.setData({ catalog, pages, chapters: catalog.chapters || [] });
    wx.setNavigationBarTitle({ title: catalog.title });
  },
  onReady() {
    this.pageObserver = wx.createIntersectionObserver(this, { observeAll: true });
    this.pageObserver.relativeTo('.reader-scroll').observe('.reader-page', result => {
      if (result.intersectionRatio > 0.12) this.loadAround(result.dataset.index);
    });
  },
  onUnload() { this.pageObserver?.disconnect(); },
  loadAround(index) {
    const center = Number(index);
    if (!Number.isInteger(center)) return;
    const next = {};
    const start = Math.max(0, center - 2);
    const end = Math.min(this.data.pages.length - 1, center + 2);
    this.data.pages.forEach((item, i) => {
      const loaded = i >= start && i <= end;
      if (item.loaded !== loaded) next[`pages[${i}].loaded`] = loaded;
    });
    next.currentPage = center + 1;
    if (Object.keys(next).length) this.setData(next);
  },
  jumpToChapter(event) {
    const page = Number(event.currentTarget.dataset.page);
    this.setData({ intoView: `reader-page-${page}` });
    this.loadAround(page - 1);
  },
  addCurrentPage() {
    const item = this.data.pages[this.data.currentPage - 1];
    const catalog = this.data.catalog;
    const key = 'cangxuan-mini-selection';
    const list = wx.getStorageSync(key) || [];
    const entry = { id: `${catalog.title}-${item.page}`, title: catalog.title, brand: catalog.brand || '苍玹资料', page: item.page, note: '', createdAt: Date.now() };
    if (!list.some(record => record.id === entry.id)) list.unshift(entry);
    wx.setStorageSync(key, list);
    this.setData({ selectedCount: list.length });
    wx.showToast({ title: '已记录到选型单', icon: 'success' });
  },
  openSelection() { wx.switchTab({ url: '/pages/selection/selection' }); }
});
