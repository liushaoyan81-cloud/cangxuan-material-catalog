const { categories, companyCatalog } = require('../../utils/catalogs');

Page({
  data: { categories, companyCatalog },
  openCompany() {
    wx.navigateTo({ url: '/pages/reader/reader?key=company' });
  },
  openCategory(event) {
    wx.navigateTo({ url: `/pages/catalog/catalog?category=${event.currentTarget.dataset.key}` });
  }
});
