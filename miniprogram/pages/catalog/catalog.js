const { categories, categoryCatalogs, getCatalog } = require('../../utils/catalogs');

Page({
  data: { category: null, categoryInfo: null, catalogs: [] },
  onLoad(options) {
    const key = options.category || 'tiles';
    const categoryInfo = categories.find(item => item.key === key) || categories[0];
    const list = (categoryCatalogs[key] || []).map(getCatalog).filter(Boolean);
    this.setData({ category: key, categoryInfo, catalogs: list });
    wx.setNavigationBarTitle({ title: categoryInfo.title });
  },
  goBack() { wx.navigateBack(); },
  openReader(event) {
    wx.navigateTo({ url: `/pages/reader/reader?key=${event.currentTarget.dataset.key}` });
  }
});
