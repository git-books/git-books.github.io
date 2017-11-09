
config.baseTitle = 'faygo framework'
config.siteName = 'faygo framework'
config.siteDes = 'Faygo 是一款快速、简洁的Go Web框架，可用极少的代码开发出高性能的Web应用程序（尤其是API接口）'
config.siteKey = 'faygo-framework'
config.assetBasePath = '/'

// https://github.com/youzan/php-co-koa
config.docProject = 'henrylee2cn/faydoc'
config.project = 'henrylee2cn/faygo'

config.lang = 'zh'
config.langs = ['zh']

config.authorPage = 'https://github.com/henrylee2cn'
config.authorName = 'henrylee2cn'

config.theme = 'paper'
config.codeTheme = 'github'
// config.catelogPage = 'SUMMARY.md'
config.catelogPage = '/books/faygo/catelog.md'
config.defaultPage = '../README_ZH.md'
// config.defaultPage = 'https://raw.githubusercontent.com/henrylee2cn/faydoc/master/zh/README_ZH.md'
config.makeTOC = true
config.emptyData = 'No content to display!'

config.onContentWrited = function (contentDom) {
  contentDom.find('h2').first().remove()
  // contentDom.find('h1').first().prevAll().remove()
}
