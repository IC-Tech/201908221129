/* Copyright © Imesh Chamara 2019 */
import './signin.scss'
import './icApp.js'
import './loading-ani.css'
import './inputui.scss'
import {Theme} from './Theme.js'
import {IAR} from './icApp-render.js'
import {XHR, Host} from './common.js'

ic.init = icApp => {
const API_Server = JSON.parse(process.env.__IC_DEV__) == true ? 'http://192.168.8.20:3001/' : 'https://users.ic-tech.now.sh/'
var _root_ = new icApp.e('#root')
_root_.chr()
Theme.set('red')

var inputUI = a => (
	{t: 'div', cl: 'inputui', s: a.s, ch: [
		{t:'label', at: [['for', a.id]], txt: a.name},
		{t: a.multi ? 'textarea' : 'input', at: [['readonly', a.readonly], ['type', a.type], ['type', a.id], ['id', a.id]], e: [['onfocus', inputUI.check], ['onblur', inputUI.check], ['onchange', inputUI.check], ['oninput', inputUI.check]]}
]})
inputUI.check = a => new icApp.e(a = a.target).p[icApp.d.activeElement == a || a.value != '' ? 'cla' : 'clr']('s1')
const stateMsg = [
	`Enter your email to signin. If you don't have one, you can create new account by submit your email.`
]
class ICTech extends IAR {
	constructor() {
		super()
		this.data = {
			UI: 0,
			state: 0
		}
		setTimeout(async a=> {
			this.update({UI: 1})
		}, 1200)
	}
	didMount() {
	}
	didUpdate() {
	}
	render() {
		return (
			{ t: 'div', cl: 'ICApp', ch: [
				{ t: 'div', cl: ['ICPage', 'load'], s: {display: this.data.UI == 0 ? 'flex' : 'none'}, ch: [
					{ t:'div', cl: 'loading-ani' }
				]},
				{ t: 'div', cl: ['ICPage', 'Main'], s: {display: this.data.UI == 1 ? 'flex' : 'none'}, ch: [
					{ t: 'div', ch: [
						{ t: 'form', ch: [
							{ t: 'span', txt: 'Signin to IC-Tech' },
							inputUI({id: 'email', type: 'email', name: 'Email', readonly: this.data.state != 0}),
							inputUI({id: 'password', type: 'password', name: 'Password', s: {display: this.data.state != 0 ? 'block' : 'none'} }),
							inputUI({id: 'name', type: 'name', name: 'Name', s: {display: this.data.state == 2 ? 'block' : 'none'}}),
							inputUI({id: 'about', type: 'about', name: 'About', s: {display: this.data.state == 2 ? 'block' : 'none'}, multi: 1}),
							{ t: 'span', cl: 'c1', s: {display: stateMsg[this.data.state] ? 'block' : 'none'}, txt: stateMsg[this.data.state] },
							{ t: 'div', cl: 'c1', s: {paddingTop: '12px'}, ch: [
								{ t: 'input', cl: ['ic-btn0', 's1'], at: [['type', 'submit'],['value', 'NEXT']]},
								{ t: 'button', cl: 'ic-btn0', txt: 'CANCEL' }
							]}
						]}
					]}
				]}
			]}
		)
	}
}
new ICTech().mount(_root_.v)
}
