
config.baseTitle = 'google gRpc'
config.siteName = 'google gRpc'
config.siteDes = 'google gRpc developer documentation'
config.siteKey = 'google-grpc'
config.assetBasePath = '/'

// https://github.com/youzan/php-co-koa
config.docProject = 'grpc/grpc.github.io'
config.project = 'grpc/grpc'

config.authorPage = 'https://github.com/grpc'
config.authorName = 'google-grpc'

config.theme = 'paper'
config.codeTheme = 'github'
// config.catelogPage = 'SUMMARY.md'
config.catelogPage = '/books/google-grpc/catelog.md'
config.defaultPage = 'docs/quickstart/index.md'
config.makeTOC = true
config.emptyData = 'No content to display!'

config.onContentWrited = function (contentDom) {
  contentDom.find('h2').first().remove()
  // contentDom.find('h1').first().prevAll().remove()
}
