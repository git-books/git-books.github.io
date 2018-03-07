
/***************************************************
 * helper function
 **************************************************/

const storage = {
  set: function (key, value) {
    localStorage.setItem(key, value)
  },
  get: function (key) {
    return localStorage.getItem(key)
  },
  sets: function (datas) {
    datas.forEach(data => this.set(data.key, data.value))
  },
  gets: function (keys) {
    return keys.map(key => this.get(key))
  },
  del: function (key) {
    return localStorage.removeItem(key)
  },
  key: function (index) {
    return localStorage.key(index)
  },
  has: function (key) {
    return this.get(key) !== null
  },
  len: function () {
    return localStorage.length
  },
  clear: function (keys) {
    if (keys) {
      keys.forEach(key => this.del(key))
    } else {
      localStorage.clear()
    }
  }
}

function merge(...args) {
  return [].concat(...args)
}

function in_array (arr, item) {
  return arr.indexOf(item) > -1
}

function isRemoteUrl(url) {
  return url.search(/^http[s]?/) > -1
}

function getUrlRequest(){
  let url = location.search //获取url中"?"符后的字串
  let theRequest = new Object()

  if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      if (str.indexOf("&") != -1) {
          strs = str.split("&");
          for (var i = 0; i < strs.length; i++) {
              theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
          }
      } else {
          var key = str.substring(0,str.indexOf("="));
          var value = str.substr(str.indexOf("=")+1);
          theRequest[key] = decodeURI(value);
      }
  }

  return theRequest
}

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function pushState (url, statObj, replace) {
  const history = window.history
  replace = replace || false
  statObj = statObj || null

  try {
    if (replace) {
      history.replaceState(statObj, '', url)
    } else {
      history.pushState(statObj, '', url)
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url)
  }
}

function replaceState (url, statObj) {
  pushState(url, statObj, true)
}

function genLinkId(str) {
  encoded = b64EncodeUnicode(str)

  return encoded.substr(0, encoded.length -2).toLowerCase()
}


function createContentTOC(contentBox, option) {
  let tocBox = $('#content-toc-box'),
    tocList = $("#content-toc"),
    hList = contentBox.find("h2,h3,h4,h5,h6")

  if (!hList[0]) {
    tocBox.hide()
    return
  }

  option = merge({
    anchorIcon: '#',
    anchorStyle: {
      opacity: 0.65,
      position: 'absolute',
      marginLeft: '-1em',
      paddingRight: '0.5em',
    }
  }, option)

  // let haStyle = {
  //   opacity: 0.65,
  //   position: 'absolute',
  //   marginLeft: '-1em',
  //   paddingRight: '0.5em',
  // }

  tocList.html('')
  hList.each(function(i,item){
    let hTag = $(item), title = hTag.text()
    let tag = hTag.get(0).localName
    let id = hTag.text().toLowerCase()
    let mgLeft = (tag[1] - 2) * 15
    /* £ $ & β ξ ψ ℘ § */
    let ha = $('<a class="anchor-link" data-anchor-icon="' + config.anchorIcon + '"></a>')
    let ta = $('<a data-tag="' + tag + '" href="#'+id+'">'+hTag.text()+'</a>')

    ha.attr('href', '#' + id).css(option.anchorStyle)
    hTag.attr('id', id).addClass('content-htag').prepend(ha)
    ta.attr('title', title).addClass('toc-'+tag).css({marginLeft: mgLeft, display: 'block'})
    tocList.append(ta)
  })

  tocBox.show()
}
