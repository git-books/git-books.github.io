  // page title = baseTile + content title
config.baseTitle = 'phalcon 文档'
config.siteName = 'phalcon 文档'
config.siteDes = 'Phalcon is an open source full stack framework for PHP, written as a C-extension'
config.siteKey = 'phalcon-doc'
// config.logoUrl = '/examples/phalcon/'
config.assetBasePath = '/'

config.lang = 'en'
config.langs = ["en", "zh"]

config.version = '3.2'
config.docProject = 'phalcon/docs'
config.dataUrl = 'https://raw.githubusercontent.com/{docProject}/3.2/{lang}/',
config.editUrl = 'https://github.com/{docProject}/blob/3.2/{lang}/',

config.project = 'phalcon/cphalcon'

config.authorPage = 'https://github.com/phalcon'
config.authorName = 'phalcon'

config.theme = 'paper'
config.codeTheme = 'github'
config.catelogPage = '/books/php-phalcon/catelog.md'
config.defaultPage = 'introduction.md'
config.makeTOC = true
config.emptyData = 'No content to display!'

config.onContentWrited = function (contentDom) {
  // contentDom.find('h1').first().prev('h2').remove()
  contentDom.find('h1').first().prevAll().remove()
}
