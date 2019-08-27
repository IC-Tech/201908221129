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
class ICTech extends IAR {
	constructor() {
		super()
		this.data = {
			UI: 0,
			state: 0
		}
		this.submit = this.submit.bind(this)
		this.cancel = this.cancel.bind(this)
		setTimeout(async a=> {
			this.update({UI: 1})
		}, defaultWait)
	}
	didMount() {
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
					this.update({state: a.response ? 1 : 2, UI: 1})
				})
			else if(this.data.state == 1)
				XHR(API_Server + encodeURI('signin?' + _a('email') + '&' + _a('password')), a=> {
					if(!a.success) return ServerErr(a.error)
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
					{ t:'div', cl: 'loading-ani' }
				]},
				{ t: 'div', cl: ['ICPage', 'Main'], s: {display: this.data.UI == 1 ? 'flex' : 'none'}, ch: [
					{ t: 'div', ch: [
						{ t: 'form', e: [['onsubmit', this.submit]], ch: [
							{ t: 'span', txt: 'Signin to IC-Tech' },
							inputUI({id: 'email', type: 'email', name: 'Email', readonly: this.data.state != 0}),
							inputUI({id: 'password', type: 'password', name: 'Password', s: {display: this.data.state != 0 ? 'block' : 'none'} }),
							inputUI({id: 'name', type: 'name', name: 'Name', s: {display: this.data.state == 2 ? 'block' : 'none'}}),
							{ t: 'span', cl: 'c1', s: {display: stateMsg[this.data.state] ? 'block' : 'none'}, txt: stateMsg[this.data.state] },
							{ t: 'div', cl: 'c1', s: {paddingTop: '12px'}, ch: [
								{ t: 'input', cl: ['ic-btn0', 's1'], at: [['type', 'submit'], ['value', 'NEXT']]},
								{ t: 'button', cl: 'ic-btn0', txt: 'CANCEL', e: [['onclick', this.cancel]], s: {display: this.data.state != 0 ? 'block' : 'none'} }
							]}
						]}
					]}
				]},
				{ t: 'div', cl: ['ICPage', 'c1'], s: {display: this.data.UI == 2 ? 'flex' : 'none'}, ch: [
					{ t:'span', txt: 'loading-ani' }
				]}
			]}
		)
	}
}
new ICTech().mount(_root_.v)
}
