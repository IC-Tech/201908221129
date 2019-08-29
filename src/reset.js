/* Copyright © Imesh Chamara 2019 */
import './verify.scss'
import './icApp.js'
import './loading-ani.css'
import './inputui.scss'
import {Theme} from './Theme.js'
import {IAR} from './icApp-render.js'
import {inputUI} from './IC-UI.js'
import {XHR, Host, API, IC_DEV, pram} from './common.js'
import {ShowErr} from './error.js'

ic.init = icApp => {
var _root_ = new icApp.e('#root')
_root_.chr()
Theme.set('red')

const defaultWait = 1200
var icons = null

class Reset extends IAR {
	constructor() {
		super()
		this.data = {
			UI: 0,
			st: 0
		}
		this.submit = this.submit.bind(this)
		this._a = (a => a + '=' + icApp.qs('#' + a).value).bind(this)
		if(IC_DEV) window.__IC_DEV__.Reset = this
	}
	didMount() {
		var _a = new icApp.e('.load span')
		_a.txt = 'Reduce the loading impact.'
		setTimeout(async a=> {
			icons = []
			_a.txt = 'Downloading the page.'
			var b = a=> new Promise(r => XHR(Host + `assets/${a}.svg`, a => r(a), {raw:1}))
			var c = a=> {
				a = [a, 0]
				while(a[0] >= 1024) {
					a[1]++;
					a[0] = a[0] / 1024
				}
				return parseInt(a[0]) + ([' bytes', 'KB', 'MB', 'GB'])[a[1]]
			}
			var d = 0
			const _icons = [15, 13]
			for(var a=0; a<_icons.length; a++) {
				if(!(icons[a] = localStorage.getItem('ic-tech:assets:v0:icon' + _icons[a]))) {
					icons[a] = await b(_icons[a])
					d += icons[a].length
					localStorage.setItem('ic-tech:assets:v0:icon' + _icons[a], icons[a])
				}
				_a.txt = `Downloading the page (${c(d)}) ${parseInt(a / _icons.length * 100)}%.`
			}
			_a.txt = 'Connecting to the IC-Tech server.'
			d = pram(location.search, 'eid')
			if(!d) location = Host
			XHR(API + 'can/reset?eid=' + d, a => {
				this.update({UI:  a.success && a.response ? 2 : 1, st:1})
			})
		}, defaultWait)
	}
	submit(e) {
		e.preventDefault()
		this.update({UI: 0})
		setTimeout(a => XHR(API + `reset?eid=${pram(location.search, 'eid')}&${this._a('password')}`, a=> this.update({UI: 1, st: a.success && a.response ? 0 : 1})), defaultWait)
		return false
	}
	didUpdate() {
		inputUI.checkAll()
	}
	render() {
		return (
			{ t: 'div', cl: 'ICApp', ch: [
				{ t: 'div', cl: ['ICPage', 'load'], s: {display: this.data.UI == 0 ? 'flex' : 'none'}, ch: [
					{ t:'div', cl: 'loading-ani' },
					{ t:'span', cl: 'c2', txt: ' ' }
				]},
				{ t: 'div', cl: ['ICPage', 'Res', 'c1'], s: {display: this.data.UI == 1 ? 'flex' : 'none'}, ch: [
					{ t: 'div', ch: [
						{t: 'div', cl: 'ico', html: icons ? icons[this.data.st] : null },
						{t: 'span', cl: 'c3', txt: this.data.st == 0 ? `Your account have been activated.` : `Sorry, We can't complete your request. Please request for new link.`},
						{t: 'div', cl: 'c1', ch: [
							{t: 'a', cl: ['ic-btn0', 's1'], at: [['href', '/']], txt: 'IC-Tech'}
						]}
					]}
				]},
				{ t: 'div', cl: ['ICPage', 'Main', 'c1'], s: {display: this.data.UI == 2 ? 'flex' : 'none'}, ch: [
					{ t: 'div', ch: [
						{ t: 'form', e: [['onsubmit', this.submit]], ch: [
							{ t: 'span', cl: 'c1', txt: 'Reset Passwrod' },
							inputUI({id: 'password', type: 'password', name: 'Password', s: {display: this.data.state != 0 ? 'block' : 'none'} }),
							{ t: 'span', cl: 'c2', txt: 'Please submit your new password for your account.' },
							{ t: 'div', cl: 'c1', s: {paddingTop: '12px'}, ch: [
								{ t: 'input', cl: ['ic-btn0', 's1'], at: [['type', 'submit'], ['value', 'NEXT']]}
							]}
						]}
					]}
				]}
			]}
		)
	}
}
new Reset().mount(_root_.v)
}
