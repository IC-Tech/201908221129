'use strict';
import './icApp.js'
const icApp = ic.icApp
const _a = a => Object.keys(a[0]).forEach(b=>a[1](b))
const _b = a => typeof a == 'object' ? a : [a]
const _ce = a => _elm({e: new icApp.e(icApp.cE(a.t)), d: a})
const _elm = a => [
a.d.t ? [a.e.v.tagName != a.d.t.toUpperCase() ? (a.e = new icApp.e(([a.t = icApp.cE(a.d.t), a.e.v.parentNode ? a.e.v.parentNode.replaceChild(a.t) : 0, a.t])[2])) : 0] : 0,
a.d.s ? [_a([a.e.st, b => [a.e.st[b = a.e.st[b]] = a.d.s[b] ? a.d.s[b] : null, a.d.s[b] ? delete a.d.s[b] : 0]]), _a([a.d.s, b => a.e.st[b] = a.d.s[b]])] : 0,
a.d.cl ? [a.d.cl = _b(a.d.cl), _a([a.e.cl, b => [(b = [b = a.e.cl[b], a.d.cl.indexOf(a.e.cl[b])])[1] == -1 ? a.e.clr(b[0]) : delete a.d.cl[b[0]]]]), _a([a.d.cl, b => a.e.cla(a.d.cl[b])])] : 0,
a.d.at ? a.d.at.forEach((b,c) => a.e.v.getAttribute(b[0]) == b[1].toString() ? delete a.d.at[c] : a.e.v.setAttribute(b[0], b[1])) : 0,
a.d.html ? [a.e.html != a.d.html ? a.e.html = a.d.html : 0] : 0, 
a.d.txt ? [a.e.txt != a.d.txt ? a.e.txt = a.d.txt : 0] : 0,
a.d.ch ? a.d.ch.forEach((b,c) => b ? (a.e.ch[c] ? _elem({e: a.e.ch[c], d: b}) : a.e.ap(_ce(b)[7].e.v)) : 0) : 0,
a
]
class icAppRender {
	constructor() {
		this._data = {}
		this._elm = _elm.bind(this)
		this._ce = _ce.bind(this)
	}
	setData() {
	}
	get data() { return data }
	update() {
		if(!this.render) return
		this._elm({e: this.e, d: {ch: [this.render()]}})
	}
	mount(e) {
		this.e = e
		this.update()
	}
}
export {icAppRender as IAR}
