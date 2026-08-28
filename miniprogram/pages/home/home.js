const { categories, companyCatalog } = require('../../utils/catalogs');

Page({
  data: { categories, companyCatalog },
  onLoad() {
    wx.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
  },
  onShareAppMessage() {
    return {
      title: '苍玹',
      path: '/pages/home/home'
    };
  },
  onShareTimeline() {
    return {
      title: '苍玹',
      query: ''
    };
  },
  openCompany() {
    wx.navigateTo({ url: '/pages/reader/reader?key=company' });
  },
  openCategory(event) {
    wx.navigateTo({ url: `/pages/catalog/catalog?category=${event.currentTarget.dataset.key}` });
  }
});
