const { categories, categoryCatalogs, getCatalog } = require('../../utils/catalogs');

Page({
  data: { category: null, categoryInfo: null, catalogs: [] },
  onLoad(options) {
    wx.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
    const key = options.category || 'tiles';
    const categoryInfo = categories.find(item => item.key === key) || categories[0];
    const list = (categoryCatalogs[key] || []).map(getCatalog).filter(Boolean);
    this.setData({ category: key, categoryInfo, catalogs: list });
    wx.setNavigationBarTitle({ title: categoryInfo.title });
  },
  onShareAppMessage() {
    const category = this.data.category || 'tiles';
    return {
      title: `${this.data.categoryInfo?.title || '供应链目录'} · 苍玹材料选型中心`,
      path: `/pages/catalog/catalog?category=${category}`
    };
  },
  onShareTimeline() {
    return {
      title: `${this.data.categoryInfo?.title || '供应链目录'} · 苍玹材料选型中心`,
      query: `category=${this.data.category || 'tiles'}`
    };
  },
  goBack() { wx.navigateBack(); },
  openReader(event) {
    wx.navigateTo({ url: `/pages/reader/reader?key=${event.currentTarget.dataset.key}` });
  }
});
