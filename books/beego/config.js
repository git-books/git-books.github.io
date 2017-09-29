  // page title = baseTile + content title
config.baseTitle = 'beego 文档'
config.siteName = 'beego 文档'
config.siteDes = 'beego 是一个快速开发 Go 应用的 HTTP 框架'
config.siteKey = 'beego-doc'
config.logoUrl = '/examples/beego/'
config.assetBasePath = '/'

config.lang = 'zh-CN'
config.langs = ["en-US", "zh-CN"]

config.docProject = 'beego/beedoc'

config.project = 'astaxie/beego'
config.authorPage = 'https://github.com/astaxie'
config.authorName = 'astaxie'

config.theme = 'paper'
config.codeTheme = 'github'
config.catelogPage = '/books/beego/catelog.md'
config.defaultPage = 'intro/Introduction.md'
config.makeTOC = true
config.emptyData = 'No content to display!'

config.onContentWrited = function (contentDom) {
  // contentDom.find('h1').first().prev('h2').remove()
  contentDom.find('h1').first().prevAll().remove()
}
