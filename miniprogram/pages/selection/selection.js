Page({
  data: { list: [] },
  onShow() { this.setData({ list: wx.getStorageSync('cangxuan-mini-selection') || [] }); },
  remove(event) {
    const id = event.currentTarget.dataset.id;
    const list = this.data.list.filter(item => item.id !== id);
    wx.setStorageSync('cangxuan-mini-selection', list);
    this.setData({ list });
  },
  clearAll() {
    wx.showModal({ title: '清空选型单', content: '确定删除当前记录吗？', success: result => { if (result.confirm) { wx.removeStorageSync('cangxuan-mini-selection'); this.setData({ list: [] }); } } });
  },
  backHome() { wx.switchTab({ url: '/pages/home/home' }); }
});
