Page({
  data: { list: [] },
  onLoad() {
    wx.showShareMenu({ menus: ['shareAppMessage', 'shareTimeline'] });
  },
  onShareAppMessage() {
    return {
      title: '苍玹材料选型单',
      path: '/pages/selection/selection'
    };
  },
  onShareTimeline() {
    return {
      title: '苍玹材料选型中心',
      query: ''
    };
  },
  onShow() { this.setData({ list: wx.getStorageSync('cangxuan-mini-selection') || [] }); },
  remove(event) {
    const id = event.currentTarget.dataset.id;
    const list = this.data.list.filter(item => item.id !== id);
    wx.setStorageSync('cangxuan-mini-selection', list);
    this.setData({ list });
  },
  editNote(event) {
    const id = event.currentTarget.dataset.id;
    const list = this.data.list.map(item => item.id === id ? { ...item, draftNote: event.detail.value } : item);
    this.setData({ list });
  },
  saveNote(event) {
    const id = event.currentTarget.dataset.id;
    const list = this.data.list.map(item => item.id === id ? { ...item, note: item.draftNote ?? item.note ?? '' } : item);
    wx.setStorageSync('cangxuan-mini-selection', list);
    this.setData({ list });
    wx.showToast({ title: '备注已保存', icon: 'success' });
  },
  clearAll() {
    wx.showModal({ title: '清空选型单', content: '确定删除当前记录吗？', success: result => { if (result.confirm) { wx.removeStorageSync('cangxuan-mini-selection'); this.setData({ list: [] }); } } });
  },
  backHome() { wx.switchTab({ url: '/pages/home/home' }); }
});
