function loadRoot() {
  var str = document.URL;
  var pos = 0;
  var ind = str.indexOf('/', pos);
  while (ind < str.length && ind >= 0) {
    pos = ind + 1;
    if (str.substr(ind - 1, 1) != ':' && str.substr(ind - 1, 1) != '/') {
      str = str.substr(0, ind) + '/';
      ind = -1;
    }
    else  {ind = str.indexOf('/', pos);}
  }
  return str;
}

const ReloadError = (e, f) => (f ? f : alert)(e)
const XHR = (url, call, err, data) => {
   // eslint-disable-next-line no-undef
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
  xhr.open(data ? 'POST' : 'GET', url + ((url.indexOf('?') >= 0 ? '&' : '?') + 't=' + new Date().getTime()))
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status != 0) {
      if(xhr.response) {
        try {
          call(JSON.parse(xhr.response))
        } catch(e) {
          ReloadError('Server response error. (EC: 0xA2 >>> ' + e + ' <)', err)
        }
      }
      else
        ReloadError('Server response error. (EC: 0xA1)', err)
    }
  }
  xhr.onerror = function (e) {
    if(e.target.status == 0) ReloadError("The Webpage can't connect to the server. Try again in a few moments.", err)
  }
  xhr.send(data)
}
const pram = (a, b) => {
  var c = a.indexOf(b += '='),
  d = a.indexOf('&', c)
  c = c == -1 ? null : a.substring(c + b.length, d == -1 ? a.length : d)
  return c
}
const mobile = a => ([a = [navigator.userAgent.toLowerCase(), 0], ['android','webos','iphone','ipad','ipod','blackberry','iemobile','opera mini'].forEach(b=> a[1] == 0 && a[0].indexOf(b) >= 0 ? (a[1] = 1) : 0)])[0][1] == 1

export {XHR, pram, mobile}