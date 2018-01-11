config.baseTitle = 'Zephir 语言'
config.siteName = 'Zephir 语言'
config.siteDes = 'Zephir是一个开源的，类型与内存安全的高级语言'
config.siteKey = 'zephir-docs'
config.assetBasePath = '/'

config.lang = 'zh'
config.langs = ["en", "zh"]

// https://github.com/phalcon/zephir-docs
config.docType = 'rst'
config.docProject = 'phalcon/zephir-docs'
config.project = 'phalcon/zephir'
// config.dataUrl = 'https://raw.githubusercontent.com/{docProject}/master/{lang}/source/',
// config.editUrl = 'https://github.com/{docProject}/blob/master/{lang}/source/',

config.authorPage = 'https://github.com/phalcon'
config.authorName = 'phalcon'

config.theme = 'paper'
config.codeTheme = 'github'
// config.catelogPage = 'SUMMARY.md'
config.catelogPage = '/books/zephir-lang/catelog.md'
config.defaultPage = 'index.rst'
config.makeTOC = true
config.emptyData = 'No content to display!'

config.onContentWrited = function (contentDom) {
  // contentDom.find('h2').first().remove()
  // contentDom.find('h1').first().prevAll().remove()
}
