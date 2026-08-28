const { companyCatalog, getCatalog, getPageImage } = require('../../utils/catalogs');

Page({
  data: { catalog: null, pages: [], currentPage: 1, chapters: [], selectedCount: 0, intoView: '' },
  onLoad(options) {
    wx.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
    this.shareKey = options.key || 'company';
    const catalog = options.key === 'company' ? companyCatalog : getCatalog(options.key);
    if (!catalog) return;
    const pages = Array.from({ length: catalog.pages }, (_, index) => {
      const page = index + 1;
      return { page, ...getPageImage(catalog, page), failed: false };
    });
    const windowInfo = wx.getWindowInfo();
    const rpxScale = windowInfo.windowWidth / 750;
    let offset = 0;
    this.pageOffsets = pages.map(item => {
      const start = offset;
      offset += item.displayHeight * rpxScale;
      return start;
    });
    this.viewportHeight = windowInfo.windowHeight;
    this.setData({ catalog, pages, chapters: catalog.chapters || [] });
    wx.setNavigationBarTitle({ title: catalog.title });
  },
  onShareAppMessage() {
    const catalog = this.data.catalog;
    return {
      title: `${catalog?.title || '图册浏览'} · 苍玹材料选型中心`,
      path: `/pages/reader/reader?key=${this.shareKey || 'company'}`
    };
  },
  onShareTimeline() {
    const catalog = this.data.catalog;
    return {
      title: `${catalog?.title || '图册浏览'} · 苍玹材料选型中心`,
      query: `key=${this.shareKey || 'company'}`
    };
  },
  onScroll(event) {
    const target = event.detail.scrollTop + (this.viewportHeight || 0) / 2;
    const offsets = this.pageOffsets || [];
    let low = 0;
    let high = offsets.length - 1;
    while (low < high) {
      const middle = Math.ceil((low + high) / 2);
      if (offsets[middle] <= target) low = middle;
      else high = middle - 1;
    }
    const currentPage = low + 1;
    if (currentPage !== this.data.currentPage) this.setData({ currentPage });
  },
  previewCurrentPage() {
    const currentIndex = Math.max(0, this.data.currentPage - 1);
    const current = this.data.pages[currentIndex];
    if (!current) return;
    wx.previewImage({
      current: current.src,
      urls: this.data.pages.map(item => item.src)
    });
  },
  onImageError(event) {
    const index = Number(event.currentTarget.dataset.index);
    if (Number.isInteger(index)) this.setData({ [`pages[${index}].failed`]: true });
  },
  retryImage(event) {
    const index = Number(event.currentTarget.dataset.index);
    const page = this.data.pages[index];
    if (!page) return;
    const separator = page.src.includes('?') ? '&' : '?';
    this.setData({
      [`pages[${index}].failed`]: false,
      [`pages[${index}].src`]: `${page.src}${separator}retry=${Date.now()}`
    });
  },
  jumpToChapter(event) {
    const page = Number(event.currentTarget.dataset.page);
    this.setData({ intoView: `reader-page-${page}`, currentPage: page });
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
