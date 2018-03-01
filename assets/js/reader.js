const DEFAULT_CONFIG = {
  domId: '#book-wrapper',
  // use for cache prefix
  siteKey: 'beego-doc',
  siteName: 'beego doc',
  siteDes: 'the description text',
  // page title = baseTile + content title
  baseTitle: 'beego-doc',
  assetBasePath: '',
  logoUrl: location.pathname,

  lang: '', // zh-CN
  langs: [], // ["en", "zh-CN"],

  branch: 'master',
  version: 'master',
  versions: ['master'],

  docType: 'md', // 'rst'
  docProject: 'beego/beedoc',
  docUrl: 'https://github.com/{docProject}',
  // e.g https://raw.githubusercontent.com/{beego/beedoc}/master/{zh-CN}/{intro/README.md}
  dataUrl: 'https://raw.githubusercontent.com/{docProject}/master/{lang}/',
  // e.g https://github.com/{beego/beedoc}/edit/master/zh-CN/http.md
  // e.g https://github.com/{beego/beedoc}/blob/master/zh-CN/http.md
  editUrl: 'https://github.com/{docProject}/blob/master/{lang}/',
  docIssueUrl: 'https://github.com/{docProject}/issues',

  project: 'astaxie/beego',
  projectUrl: 'https://github.com/{project}',
  issueUrl: 'https://github.com/{project}/issues',

  authorName: 'astaxie',
  authorPage: 'https://github.com/astaxie',

  emptyData: 'No content to display!',
  catelogPage: 'SUMMARY.md',
  defaultPage: 'README.md',

  // assets/lib/bootswatch/{theme:paper}/bootstrap.min.css
  theme: 'paper',
  // assets/lib/highlight/styles/{codeTheme:github}.css
  codeTheme: 'github',
  makeTOC: true,
  /* £ $ & β ξ ψ ℘ § */
  anchorIcon: '℘',
  tableClass: 'table table-bordered table-striped',
  topLinks: ['<a href="/"><i class="fa fa-undo" aria-hidden="true"></i> back books list</a>'],
  // topLinks: null,
  bottomLinks: null,

  // some events
  onCatelogWrited: null,
  onCatelogHandled: null,
  onContentWrited: null,
  onContentHandled: null
}

const AOLLED_THEMES = {
  // theme name: nav height
  cerulean: 51,
  cyborg: 51,
  flatly: 61,
  journal: 61,
  readable: 66,
  simplex: 41,
  spacelab: 51,
  united: 51,
  cosmo: 51,
  // darkly: 61,
  lumen: 51,
  paper: 65,
  sandstone: 63,
  slate: 52,
  superhero: 40,
  yeti: 45
}

const TYPE_MD = ['md', 'markdown']
const TYPE_RST = ['rst', 'reStructuredText']

function BookReader(config) {
  this.config = config = $.extend(DEFAULT_CONFIG, config)

  // local storage cache key
  const CACHE_KEY_LANG = config.siteKey + '_lang'
  const CACHE_KEY_THEME = config.siteKey + '_theme'
  const CACHE_KEY_WITH_SIDEBAR = config.siteKey + '_with_sidebar'

  const request = getUrlRequest()
  const titleEl = $('head>title')
  const sidebar = $('#sidebar')
  const md = window.markdownit({
    html: true,
    breaks: true,
    linkify: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code class="language-' + lang + '">' +
                 hljs.highlight(lang, str, true).value +
                 '</code></pre>'
        } catch (__) {}
      }

      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    }
  })

  // const theBook = $('div.book')
  const theBook = $(config.domId)
  // const loading = $('#loading-layer')
  const loading = $('
  <div id="loading-layer">
    <div class="loading text-primary">
      <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
      <div>Loading</div>
    </div>
  </div>
  ')

  // create html
  this.createBookLayout()

  this.init()

  // createBookLayout
  function createBookLayout() {
    let book = []

    // top menu
    book[0] = `
    <nav id="top-menu" class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
       <div class="navbar-header">
         <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
           <span class="sr-only">Toggle navigation</span>
           <span class="icon-bar"></span>
           <span class="icon-bar"></span>
           <span class="icon-bar"></span>
         </button>
         <a class="navbar-brand" id="top-logo" href="${config.logoUrl}">${config.siteName}</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <p class="navbar-text site-des"></p>
          <ul class="nav navbar-nav navbar-right">
            <li><a class="project-url" href="${config.projectUrl}" target="_blank"><i class="fa fa-code-fork" aria-hidden="true"></i> Fork It</a></li>
            <li><a class="project-url" href="${config.projectUrl}" target="_blank"><i class="fa fa-star" aria-hidden="true"></i> Star It</a></li>
          </ul>
        </div>
    </nav>
    `

    // render theme list
    let themeList = []
    Object.keys(AOLLED_THEMES).forEach(function (name) {
      if (config.theme === name) {
        themeList[] = `<option value="${name}" selected>${name}</option>`
      } else {
        themeList[] = `<option value="${name}">${name}</option>`
      }
    })

    let themeStr = themeList.join('')

    // render lang list
    let langList = ''
    config.langs.forEach(function (lang, idx) {
      if (config.lang === lang) {
        langList += `<option value="${lang}" selected>${lang}</option>`
      } else {
        langList += `<option value="${lang}">${lang}</option>`
      }
    })

    if (!langList) {
      langList = '<option>no ...</option>'
    }

    // sidebar
    book[1] = `
    <!-- #sidebar-box -->
    <aside id="sidebar-box">
        <div id="search-box">
          <div class="form-group has-feedback">
            <input type="text" class="form-control" id="search-input" placeholder="Search catelog ...">
            <span id="clear-search-input" class="fa fa-remove form-control-feedback" aria-hidden="true"></span>
          </div>
        </div>
        <div id="sidebar">
          <span id="sidebar-refresh-btn" class="fa fa-refresh"></span>
          <div class="catelog">
            <!-- catelog list will render at there -->
          </div>
        </div>
        <div id="book-setting">
          <label for="lang-list">Lang </label>
          <select id="lang-list" style="min-width: 60px;">${themeStr}</select>
          <label for="theme-list">Theme </label>
          <select id="theme-list">${themeList}</select>
        </div>
    </aside>
    `

    // content box(content,footer,goto-links)
    book[2] = `
    <!-- #content-box -->
    <div id="content-box">
      <div id="sidebar-ctrl"> <i class="fa fa-exchange"></i> </div>
      <div class="content-wrapper">
        <div class="row">
          <div class="col-xs-12">
              <div class="content-bar clearfix">
                <p class="pull-left text-muted">
                  <i class="fa fa-book" aria-hidden="true"></i>
                  <span class="site-name"></span> &bull;&nbsp;
                  <i class="fa fa-file-text-o" aria-hidden="true"></i>
                  <span id="doc-url"></span>
                </p>

                <div class="pull-right">
                  <div class="btn-group btn-group-xs" role="group" aria-label="...">
                    <a id="edit-btn" href="" class="btn btn-primary">
                      <i class="fa fa-edit" aria-hidden="true"></i> Edit
                    </a>
                    <a id="refresh-btn" href="javascript:void(0);" class="btn btn-info">
                      <i class="fa fa-refresh" aria-hidden="true"></i> Refresh
                    </a>
                    <a class="issue-url btn btn-warning">
                      <i class="fa fa-bug" aria-hidden="true"></i> Report
                    </a>
                  </div>
                </div>
              </div>
              <div id="content-toc-box">
                <div class="title"><a id="content-toc-ctrl" href="javascript:void(0);"><i class="fa fa-list"></i></a> TOC</div>
                <div id="content-toc"></div>
              </div>
              <div id="content" class=""></div>
          </div>
        </div>
      </div>
      <!-- end.content-wrapper -->

      <div class="page-footer">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-xs-12">
              <ul class="nav nav-pills">
                <li>
                  <a class="project-url" target="_blank"><i class="fa fa-github" aria-hidden="true"></i> Project(Github)</a>
                </li>
                <li>
                  <a class="doc-url" target="_blank"><i class="fa fa-github" aria-hidden="true"></i> Document(Github)</a>
                </li>
              </ul>
              <div class="info-box">
                <div class="info-item">
                  Project by
                  <a class="author-page" href="${config.authorPage}" target="_blank">
                    <i class="fa fa-github" aria-hidden="true"></i> <span class="author-name">${config.authorName}</span>
                  </a>
                </div>
                <div class="info-item">
                  Site rendered by
                  <a href="https://github.com/inhere/md-site-reader" target="_blank"><i class="fa fa-github" aria-hidden="true"></i> inhere/md-site-reader</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end.page-footer -->

      <div id="goto-btns">
        <a class="goto-top" href="javascript:void(0);" title="goto top"><i class="fa fa-arrow-circle-up" aria-hidden="true"></i></a>
        <a class="goto-bottom" href="javascript:void(0);" title="goto bottom"><i class="fa fa-arrow-circle-down" aria-hidden="true"></i></a>
      </div>
    </div>
    <!-- end#content-box -->
    `

    // append to dom
    this.theBook.append(book.join(''))
    $(body).append(this.loading)
  }

  // catelogSearch
  function catelogSearch(kw) {
    kw = kw.trim()
    sidebar.find('li').removeClass('hide')
    sidebar.find('i').addClass('hide')

    if (!kw) {
      return
    }

    kw = kw.toLowerCase()
    sidebar.find('a').each(function(i, el) {
      let elDom = $(el)
      let href = elDom.attr('href').toLowerCase()
      let text = elDom.text().toLowerCase()

      console.log(kw, href, text)

      // is parent li subLi > 0
      let subLi = elDom.next('ul').find('li')
      let isParent = subLi.length > 0
      let showSubLiNum = 0

      if (isParent) {
        showSubLiNum = subLi.find(':not(.hide)').length
      }

      // not match
      if (text.indexOf(kw) < 0 && href.indexOf(kw) < 0) {
        if (isParent && showSubLiNum === 0) {
          elDom.parent('li').addClass('hide')

          // is last sub li
        } else if (!isParent && showSubLiNum === 1) {
          elDom.parents('li').addClass('hide')
        } else {
          elDom.parent('li').addClass('hide')
        }
      } else {
        // open icon
        elDom.find('i').removeClass('hide')

        if (!isParent) {
          elDom.parents('li').removeClass('hide')
        }
      }
    })
  }
}

BookReader.prototype.init = () => {
  console.log('test')
}

const bReader = new BookReader('hello')
