/* Copyright © Imesh Chamara 2019 */
import './signin.scss'
import './icApp.js'
import './loading-ani.css'
import './Dialog.css'
import './inputui.scss'
import {Theme} from './Theme.js'
import {IAR} from './icApp-render.js'
import {inputUI, dialogUI} from './IC-UI.js'
import {XHR, Host} from './common.js'

ic.init = icApp => {
const __IC_DEV__ = JSON.parse(process.env.__IC_DEV__)
if(__IC_DEV__) window.__IC_DEV__ = {}
const API_Server = JSON.parse(process.env.__IC_DEV__) == true ? 'http://192.168.8.20:3001/' : 'https://users.ic-tech.now.sh/'
var _root_ = new icApp.e('#root')
_root_.chr()
Theme.set('red')

const stateMsg = [
	`Enter your email to signin. If you don't have one, you can create new account by submit your email.`,
	`Enter your password to signin. If this isn't your account click cancel button.`
]
const ServerErr = a => dialogUI.create({name: 'Server Error', msg: `Error detected in server. ${a ? '' : 'No '}Error information${a ? (b => [a.forEach((a,c) => b += (c == 0 ? '' : ', ') + a), b])(': ')[1] : ' Provided'}.`, but: ['RELOAD', 'CANCEL'], f: a=> {
	if(a.b == 0) location.reload()
	else window.close()
}})
const defaultWait = 1200

var icons = null

class SignIn extends IAR {
	constructor() {
		super()
		this.data = {
			UI: 0,
			state: 0
		}
		this.submit = this.submit.bind(this)
		this.cancel = this.cancel.bind(this)
		if(__IC_DEV__) window.__IC_DEV__.SignIn = this
	}
	didMount() {
		var _a = new icApp.e('.load span')
		_a.txt = 'Reduce the loading impact.'
		setTimeout(async a=> {
			icons = []
			_a.txt = 'Downloading the page.'
			var b = a=> new Promise(r => XHR(Host() + `assets/${a}.svg`, a => r(a), {raw:1}))
			var c = a=> {
				a = [a, 0]
				while(a[0] >= 1024) {
					a[1]++;
					a[0] = a[0] / 1024
				}
				return parseInt(a[0]) + ([' bytes', 'KB', 'MB', 'GB'])[a[1]]
			}
			var d = 0
			const _icons = [13, 14]
			for(var a=0; a<_icons.length; a++) {
				if(!(icons[a] = localStorage.getItem('ic-tech:assets:v0:icon' + _icons[a]))) {
					icons[a] = await b(_icons[a])
					d += icons[a].length
					localStorage.setItem('ic-tech:assets:v0:icon' + _icons[a], icons[a])
				}
				_a.txt = `Downloading the page (${c(d)}) ${parseInt(a / _icons.length * 100)}%.`
			}
			_a.txt = 'Building the Page'
			this.update({UI: 1})
		}, defaultWait)
	}
	didUpdate() {
		icApp.qsa('.inputui input').forEach(a=> inputUI.check({target: a}))
	}
	submit(e) {
		e.preventDefault()
		this.update({UI: 0})
		const _a = a => a + '=' + icApp.qs('#' + a).value
		setTimeout(a => {
			if(this.data.state == 0)
				XHR(API_Server + encodeURI('exists?' + _a('email')), a=> {
					if(!a.success) return ServerErr(a.error)
					this.update({state: 1, UI: a.response ? 1 : 2})
				})
			else if(this.data.state == 1)
				XHR(API_Server + encodeURI('signin?' + _a('email') + '&' + _a('password')), a=> {
					if(!a.success) {
						if(a.error.indexOf('wrong password') >= 0) this.update({UI: 3})
						else ServerErr(a.error)
						return 
					}
					localStorage.setItem('IC-Tech.User', JSON.stringify(a.response))
					location = Host()
				})
			else if(this.data.state == 2)
				XHR(API_Server + encodeURI('signup?' + _a('email') + '&' + _a('password') + '&' + _a('name')), a=> {
					if(!a.success) return ServerErr(a.error)
				})
		}, defaultWait)
		return false
	}
	cancel(e) {
		e.preventDefault()
		this.update({UI: 0})
		setTimeout(a => this.update({state: 0, UI: 1}), defaultWait)
		return false
	}
	render() {
		return (
			{ t: 'div', cl: 'ICApp', ch: [
				{ t: 'div', cl: ['ICPage', 'load'], s: {display: this.data.UI == 0 ? 'flex' : 'none'}, ch: [
					{ t:'div', cl: 'loading-ani' },
					{ t:'span', cl: 'c2', txt: ' ' }
				]},
				{ t: 'div', cl: ['ICPage', 'Main', 'c1'], s: {display: this.data.UI == 1 ? 'flex' : 'none'}, ch: [
					{ t: 'div', ch: [
						{ t: 'form', e: [['onsubmit', this.submit]], ch: [
							{ t: 'span', cl: 'c1', txt: 'Signin to IC-Tech' },
							inputUI({id: 'email', type: 'email', name: 'Email', readonly: this.data.state != 0}),
							inputUI({id: 'password', type: 'password', name: 'Password', s: {display: this.data.state != 0 ? 'block' : 'none'} }),
							inputUI({id: 'name', type: 'name', name: 'Name', s: {display: this.data.state == 2 ? 'block' : 'none'}}),
							{ t: 'span', cl: ['c2', 'cont'], s: {display: stateMsg[this.data.state] ? 'block' : 'none'}, txt: stateMsg[this.data.state] },
							{ t: 'div', cl: 'c1', s: {paddingTop: '12px'}, ch: [
								{ t: 'input', cl: ['ic-btn0', 's1'], at: [['type', 'submit'], ['value', 'NEXT']]},
								{ t: 'button', cl: 'ic-btn0', txt: 'CANCEL', e: [['onclick', this.cancel]], s: {display: this.data.state != 0 ? 'block' : 'none'} }
							]}
						]}
					]}
				]},
				{ t: 'div', cl: ['ICPage', 'c1', 'c2'], s: {display: this.data.UI == 2 ? 'flex' : 'none'}, ch: [
					{ t:'div', ch: [
						{ t:'span', cl: 'c3', txt: `We don't have account for that email address. You can create new account for that email. If your have submit a wrong email, you can correct and try again.` },
						{ t:'div', ch: [
							{t: 'button', cl: 'ic-btn0', e: [['onclick', a=> this.update({UI: 1, state: 2})]], txt: 'Create New Account'},
							{t: 'button', cl: 'ic-btn0', e: [['onclick', a=> this.update({UI: 1, state: 0})]], txt: 'Change Email'}
						]}
					]}
				]},
				{ t: 'div', cl: ['ICPage', 'c1', 'c2'], s: {display: this.data.UI == 3 ? 'flex' : 'none'}, ch: [
					{ t:'div', ch: [
						{ t: 'span', cl: 'c1', txt: 'Signin to IC-Tech' },
						{t: 'div', cl: 'ico', html: icons ? icons[0] : undefined},
						{t: 'span', cl: 'c2', txt: 'Wrong Password'},
						{ t:'div', ch: [
							{t: 'button', cl: 'ic-btn0', e: [['onclick', a=> this.update({UI: 1, state: 2})]], txt: 'Reset Password'},
							{t: 'button', cl: 'ic-btn0', e: [['onclick', a=> this.update({UI: 1, state: 0})]], txt: 'Retry'}
						]}
					]}
				]}
			]}
		)
	}
}
new SignIn().mount(_root_.v)
}
