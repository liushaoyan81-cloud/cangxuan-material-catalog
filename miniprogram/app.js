App({
  globalData: {
    selectionStorageKey: 'cangxuan-mini-selection'
  },
  onLaunch() {
    wx.setStorageSync('cangxuan-mini-ready', true);
  }
});
