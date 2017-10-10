
config.baseTitle = 'ZanPHP 中文文档'
config.siteName = 'ZanPHP 中文文档'
config.siteDes = '基于PHP协程的网络服务框架，提供最简单的方式开发面向C10K+的高并发SOA服务和RPC服务'
config.siteKey = 'zanphp-doc'
config.assetBasePath = '/'

config.docType = 'rst'
config.docProject = 'youzan/zanphp-doc'
config.project = 'youzan/zanphp'
config.dataUrl = 'https://raw.githubusercontent.com/{docProject}/master/{lang}/source/',
config.editUrl = 'https://github.com/{docProject}/blob/master/{lang}/source/',

config.authorPage = 'https://github.com/youzan'
config.authorName = 'youzan'

config.theme = 'paper'
config.codeTheme = 'github'
// config.catelogPage = 'SUMMARY.md'
config.catelogPage = '/books/zanphp-doc/catelog.md'
config.defaultPage = 'introduction.rst'
config.makeTOC = true
config.emptyData = 'No content to display!'

config.onContentWrited = function (contentDom) {
  contentDom.find('h2').first().remove()
  // contentDom.find('h1').first().prevAll().remove()
}
