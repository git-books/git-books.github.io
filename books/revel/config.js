
config.baseTitle = 'Revel framework'
config.siteName = 'Revel framework'
config.siteDes = 'A high productivity, full-stack web framework for the Go language.'
config.siteKey = 'revel-framework'
config.assetBasePath = '/'

// https://github.com/youzan/php-co-koa
config.docProject = 'revel/revel.github.io'
config.project = 'revel/revel'

config.authorPage = 'https://github.com/revel'
config.authorName = 'revel'

config.theme = 'yeti'
config.codeTheme = 'github'
// config.catelogPage = 'SUMMARY.md'
config.catelogPage = '/books/revel/catelog.md'
config.defaultPage = 'tutorial/index.md'
config.makeTOC = true
config.emptyData = 'No content to display!'

config.onContentWrited = function (contentDom) {
  contentDom.find('h2').first().remove()
  // contentDom.find('h1').first().prevAll().remove()
}
