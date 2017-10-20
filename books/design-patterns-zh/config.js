
config.baseTitle = '图说设计模式'
config.siteName = '图说设计模式'
config.siteDes = '使用图形和代码结合的方式来解析设计模式'
config.siteKey = 'design-patterns-zh'
config.assetBasePath = '/'

config.docType = 'rst'
config.docProject = 'me115/design_patterns'
config.project = 'me115/design_patterns'
// config.dataUrl = 'https://raw.githubusercontent.com/{docProject}/master/{lang}/source/',
// config.editUrl = 'https://github.com/{docProject}/blob/master/{lang}/source/',

config.authorPage = 'https://github.com/me115'
config.authorName = 'me115'

config.theme = 'paper'
config.codeTheme = 'github'
// config.catelogPage = 'SUMMARY.md'
config.catelogPage = '/books/design-patterns-zh/catelog.md'
config.defaultPage = 'index.rst'
config.makeTOC = true
config.emptyData = 'No content to display!'

config.onContentWrited = function (contentDom) {
  // contentDom.find('h2').first().remove()
  // contentDom.find('h1').first().prevAll().remove()
}
