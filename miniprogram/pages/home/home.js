const { categories, companyCatalog } = require('../../utils/catalogs');

Page({
  data: { categories, companyCatalog },
  onLoad() {
    wx.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
  },
  onShareAppMessage() {
    return {
      title: '苍玹设计全案软装 · 材料选型中心',
      path: '/pages/home/home'
    };
  },
  onShareTimeline() {
    return {
      title: '苍玹材料选型中心 · 公司介绍与供应链图册',
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
