
config.baseTitle = 'TiDB 中文技术文档'
config.siteName = 'TiDB 中文技术文档'
config.siteDes = 'TiDB 中文技术文档'
config.siteKey = 'tidb-docs-cn'
config.assetBasePath = '/'

config.docProject = 'pingcap/docs-cn'
config.project = 'pingcap/tidb'

config.authorPage = 'https://github.com/pingcap'
config.authorName = 'pingcap'

config.theme = 'paper'
config.codeTheme = 'github'
// config.catelogPage = 'SUMMARY.md'
config.catelogPage = '/books/tidb-docs-cn/catelog.md'
config.defaultPage = 'README.md'
config.makeTOC = true
config.emptyData = 'No content to display!'

config.onContentWrited = function (contentDom) {
  contentDom.find('h2').first().remove()
  // contentDom.find('h1').first().prevAll().remove()
}
