/***************************************************
 * begin logic
 **************************************************/

const CACHE_KEY_LANG = config.siteKey + '_lang'
const CACHE_KEY_THEME = config.siteKey + '_theme'
const CACHE_KEY_WITH_SIDEBAR = config.siteKey + '_with_sidebar'

const TYPE_MD = ['md', 'markdown']
const TYPE_RST = ['rst', 'reStructuredText']

const theBook = $(config.domId)
// const theBook = $('div.book')
const loading = $('#loading-layer')
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

const MSR = {
  cacheKeyCatelog: null,
  cachePagePrefix: null,
  run() {
    this.prepareConfig()
    this.prepareInit()
    this.createBookDom()

    // const that = this

    // begin logic
    this.start()
  },
  start() {
    this.settingBookInfo()
    this.bindEvents()

    // load catelog
    showDocCatelog()

    // load fist page
    let page = request.p ? request.p : config.defaultPage
    loadPageContent(page, null, false, function () {
      theBook.fadeIn()
      loading.hide()
      highlightCatelogLink(sidebar.find('a[data-id=' + genLinkId(page) + ']'))

      let hash = window.location.hash.substr(1)
      if (hTag = document.getElementById(hash)) {
        hTag.scrollIntoView()
      }
    })

    //
    this.doSomething()
  }
}

MSR.prepareConfig = function () {
  // theme
  let theme = storage.get(CACHE_KEY_THEME)
  theme = theme ? theme : config.theme

  if (config.themes[theme]) {
    config.navHeight = config.themes[theme]
  } else {
    // reset to default
    theme = 'paper'
    config.navHeight = config.themes.paper
  }

  config.theme = theme

  // lang
  let lang = storage.get(CACHE_KEY_LANG)

  if (lang && config.langs.indexOf(lang) > -1) {
    config.lang = lang
  } else if (!config.lang && config.langs.length > 0) {
    config.lang = config.langs[0]
  }

  if (config.lang) {
    this.cacheKeyCatelog = config.siteKey + ':' + config.lang + '_catelog'
    this.cachePagePrefix = config.siteKey + ':' + config.lang + '_page:'
  } else {
    this.cacheKeyCatelog = config.siteKey + '_catelog'
    this.cachePagePrefix = config.siteKey + '_page:'
  }

  // other
  config.withSidebar = storage.get(CACHE_KEY_WITH_SIDEBAR)

  // project config
  config.docUrl = config.docUrl.replace('{docProject}', config.docProject)
  config.dataUrl = config.dataUrl.replace('{docProject}', config.docProject)
  config.editUrl = config.editUrl.replace('{docProject}', config.docProject)

  let char = config.lang ? '{lang}' : '{lang}/'

  config.dataUrl = config.dataUrl.replace(char, config.lang)
  config.editUrl = config.editUrl.replace(char, config.lang)

  config.docIssueUrl = config.docIssueUrl.replace('{docProject}', config.docProject)

  config.issueUrl = config.issueUrl.replace('{project}', config.project)
  config.projectUrl = config.projectUrl.replace('{project}', config.project)
}

MSR.prepareInit = function () {
  if ($(window).width() < 769) {
    config.makeTOC = false
    theBook.removeClass('with-sidebar')
  } else if (config.withSidebar == 0) {
    theBook.removeClass('with-sidebar')
  }

  // load theme css
  $('#bts-style-link').attr({
    'date-theme': config.theme,
    'href': config.assetBasePath + 'assets/lib/bootswatch/' + config.theme + '/bootstrap.min.css'
  })

  $('#code-style-link').attr({
    'date-theme': config.codeTheme,
    'href': config.assetBasePath + 'assets/lib/highlight/styles/' + config.codeTheme + '.css'
  })
}

MSR.settingBookInfo = function () {
  // prepare some info to page
  $('body').addClass('theme-' + config.theme)
  $('#sidebar-box').css({'top': config.navHeight + 'px'})
  $('#content-box').css({'top': config.navHeight + 'px'})
  $('#top-logo').attr('href', config.logoUrl).html(config.siteName)
  $('.site-des').text(config.siteDes)
  $('.site-name').text(config.siteName)
  $('.project-url').attr('href', config.projectUrl)
  $('.doc-url').attr('href', config.docUrl)
  $('.issue-url').attr('href', config.issueUrl)
  $('.author-page').attr('href', config.authorPage)
  $('.author-name').text(config.authorName)
}

MSR.bindEvents = function () {
  // 在HTML5History中添加对修改浏览器地址栏URL的监听(前进和后退)
  window.addEventListener('popstate', function (e) {
    // console.log("location: ", window.location, "state: ",event.state);
    let page = getUrlRequest().p

    if (!page) {
      return
    }

    // 前进或者后退 && 有 state 信息(点击锚点时没有它)
    if (event.state) {
      let title = event.state ? event.state.title : null
      loadPageContent(page, title, false, function() {
        highlightCatelogLink(sidebar.find('a[data-id=' + genLinkId(page) + ']'))
        loading.hide()
      })
    } else if (location.hash) {
      // console.log(location.hash)
      document.getElementById(location.hash.substr(1)).scrollIntoView()
    }
  })

  // render theme list
  let list = ''
  Object.keys(config.themes).forEach(function (name) {
    if (config.theme === name) {
      list += `<option value="${name}" selected>${name}</option>`
    } else {
      list += `<option value="${name}">${name}</option>`
    }
  })
  $('#theme-list').html(list).on('change', function () {
    let newTheme = $(this).val()
    storage.set(CACHE_KEY_THEME, newTheme)
    window.location.reload()
  })

  // render lang list
  let langList = ''
  config.langs.forEach(function (lang, idx) {
    if (config.lang === lang) {
      langList += `<option value="${lang}" selected>${lang}</option>`
    } else {
      langList += `<option value="${lang}">${lang}</option>`
    }
  })

  if (langList) {
    $('#lang-list').html(langList).on('change', function () {
      let newLang = $(this).val()
      storage.set(CACHE_KEY_LANG, newLang)
      window.location.reload()
    })
  // } else {
  //   $('#lang-list').hide()
  }

  // catelog refresh
  $('#sidebar-refresh-btn').on('click', function() {
    showDocCatelog(true)
  })

  $('#search-input').on('keyup', function(e) {
    catelogSearch($(this).val())
  })

  $('#clear-search-input').on('click', function(e) {
    let kw = $('#search-input').val()

    if (kw) {
      $('#search-input').val('')
      catelogSearch('')
    }
  })

  $('#sidebar-ctrl').on('click', function () {
    theBook.toggleClass('with-sidebar')
    storage.set(CACHE_KEY_WITH_SIDEBAR, theBook.hasClass('with-sidebar') ? 1 : 0)
  })

  // content refresh
  $('#refresh-btn').on('click', function() {
    let pageUrl = $('#content').attr('data-url')

    loadPageContent(pageUrl, null, true)
  })

  $('#content-toc-ctrl').on('click', function() {
    $('#content-toc').slideToggle('slow')
  })

  // goto-top
  $('#goto-btns .goto-top ').on('click', function() {
    $('#content-box').animate({scrollTop:0}, 'slow')
  })
  // goto-bottom
  $('#goto-btns .goto-bottom ').on('click', function() {
    $('#content-box').animate({scrollTop: $('#content').height() }, 'slow')
  })
}

MSR.doSomething = function () {
  if (config.topLinks) {
    let list = ''

    config.topLinks.forEach(function(link, index) {
      list += '<li>' + link + '</li>'
    })

    $('#top-menu .navbar-right').prepend(list)
  }
}

function parseFetchedText(text, url) {
  if (!text) {
    return text
  }

  let ext = url.split('.').pop()

  // is reStructuredText doc
  if (in_array(TYPE_RST, ext)) {
    text = rst2mdown(text)
  }

  return md.render(text)
}

function showDocCatelog(refresh) {
  let res = storage.get(MSR.cacheKeyCatelog)
  refresh = refresh === undefined ? false : refresh

  if (refresh || !res) {
    let url = config.dataUrl + config.catelogPage

    if (config.catelogPage[0] === '/' || isRemoteUrl(config.catelogPage)) {
      url = config.catelogPage
    }

    $.get(url, renderDocCatelog, 'text');
  } else {
    renderDocCatelog(res)
  }
}

function renderDocCatelog(res) {
  // console.log(res);
  if (!res) {
    sidebar.append('ERROR: No catelog data')
    return
  }

  storage.set(MSR.cacheKeyCatelog, res)

  // let html = md.render(res)
  let html = parseFetchedText(res, config.catelogPage)
  let icon = ' <i class="fa fa-check search-matched hide"></i>'

  // sidebar.find('div.catelog').html(html).find('a').append(icon).on('click', catelogLinksHandler)
  sidebar.find('div.catelog').html(html).find('a').each(function () {
    let href = decodeURIComponent($(this).attr('href'))
    let id = genLinkId(href)

    $(this).attr({
      'data-id': id,
      href: href,
      title: $(this).text()
    }).append(icon).on('click', catelogLinksHandler)
  })
}

function catelogLinksHandler(e) {
  let href = $(this).attr('href')
  let title = $(this).text()

  if (isRemoteUrl(href)) {
    $(this).attr('target', '_blank')
    return;
  }

  e.preventDefault() // 默认事件
  e.stopPropagation() // 事件冒泡

  highlightCatelogLink($(this))

  // 将地址栏URL加入历史 并 改变地址栏URL
  pushState(location.pathname + '?p=' + href, {
    title: title,
    url: href
  })
  // 通过替换方式 改变地址栏URL
  // replaceState(location.pathname + '?p=' + href, {title: title})

  loadPageContent(href, title)
}

function highlightCatelogLink(link) {
  sidebar.find('a').removeClass('active')
  link.addClass('active')
}

/**
 * show Page Content
 * @param  {string}   pageUrl
 * @param  {string}   title
 * @param  {boolean}   refresh
 * @param  {Function} onRendered
 * @return {Void}
 */
function loadPageContent(pageUrl, title, refresh, onRendered) {
  refresh = refresh === undefined ? false : refresh
  $('#edit-btn').attr('href', config.editUrl + pageUrl)

  loading.show()

  let cacheKey = MSR.cachePagePrefix + pageUrl
  let cacheData = storage.get(cacheKey)

  if (refresh || !cacheData) {
    $.ajax({
      url: config.dataUrl + pageUrl,
      type: 'GET',
      dataType: 'text',
      success: function (res) {
        renderPageContent(res, pageUrl, title, cacheKey, onRendered)
      },
      error: function(xhr){
        loading.hide()

        if (xhr.status === 404) {
            $('#content').html('<h2 class="text-muted">' + config.emptyData + '</h2>')
        } else {
          alert("ERROR: (" + xhr.status + ") " + xhr.statusText);
        }
      }
    })
  } else {
    renderPageContent(cacheData, pageUrl, title, cacheKey, onRendered)
  }
}

function renderPageContent(res, pageUrl, title, cacheKey, onRendered) {
  // console.log(res);
  let html = ''
  let content = $('#content')

  if (res) {
    // add cache
    storage.set(cacheKey, res)
    // html = md.render(res)
    html = parseFetchedText(res, pageUrl)
  } else {
    html = '<h1 class="text-muted">' + config.emptyData + '</h1>'
  }

  // has image tag
  if (html.indexOf('<img src="') > 0) {
    // html = html.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, '<img class="img-responsive" src="' + config.dataUrl + '$1">')
    html = html.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function(item, $1) {
      if (isRemoteUrl($1)) {
        return '<img class="img-responsive" src="' + $1 + '">'
      }

      // console.log( $1, $1.indexOf('../'))
      let newSrc = config.dataUrl + ($1.indexOf('../') === 0 ? $1.replace(/\.\.\//g, '') : $1)
      return '<img class="img-responsive" src="' + newSrc + '">'
    })
  }

  content.attr('data-url', pageUrl).html(html)

  if (typeof config.onContentWrited === 'function') {
    config.onContentWrited(content)
  }

  // make toc
  if (config.makeTOC) {
    createContentTOC(content)
  }

  // get title
  if (!title) {
    title = content.find('h1').first().text()
  }

  let tableClass = config.tableClass
  if (tableClass) {
    content.find('table').addClass(tableClass)
  }

  content.find('a').each(function() {
    let href = $(this).attr('href')

    // empyt OR is a anchor
    if (!href || href[0] === '#') {
      return
    }

    // outside link
    if (isRemoteUrl(href)) {
      $(this).attr('target', '_blank')

      // inside link
    } else {
      if (href.indexOf('../') === 0) {
        $(this).attr('href', href.replace(/\.\.\//g, ''))
      }

      $(this).on('click', catelogLinksHandler)
    }
  })

  $('#content-box').scrollTop(0)
  $('#doc-url').text(decodeURI(pageUrl))
  // show title
  titleEl.text(title + ' - ' + config.baseTitle)

  if (typeof config.onContentHandled === 'function') {
    config.onContentHandled(content, config)
  }

  if (typeof onRendered === 'function') {
    onRendered(content)
  } else {
    loading.hide()
  }
}

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


// running
$(function () {
  MSR.run()
})

