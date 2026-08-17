# 苍玹微信小程序基础版

工程目录为 `miniprogram/`，使用微信开发者工具打开该目录即可预览。

## 本地预览

1. 安装微信开发者工具。
2. 选择“导入项目”，目录选择 `miniprogram/`。
3. 当前 `project.config.json` 使用 `touristappid`，并关闭了合法域名校验，适合开发者工具预览。
4. 真机调试前，在开发者工具中打开“不校验合法域名、TLS 版本以及 HTTPS 证书”。

图册图片暂时通过 `https://liushaoyan81-cloud.github.io/cangxuan-material-catalog/` 的压缩 WebP 读取，避免把整套资料复制进小程序包。正式发布前，需要在微信公众平台配置业务域名 `https://liushaoyan81-cloud.github.io`，并将 `project.config.json` 中的 AppID 替换成公司小程序 AppID。

## 当前功能

- 苍玹公司介绍及施工工艺在线浏览
- 瓷砖岩板、卫浴、木地板、灯光、木门、玻璃隔断/门供应链入口
- 东鹏、冠珠、科勒、摩恩、圣象及灯光图册目录
- 当前页附近图片按需加载，保持原始横竖比例
- 选型单本地记录、删除和清空

小程序审核、主体认证、隐私协议和正式域名配置需要在微信公众平台完成，代码工程可以先独立调试。
