/* Copyright © Imesh Chamara 2019 */
"use strict";
import './verify.scss'
import '../icApp/icApp.js'
import './loading-ani.css'
import './inputui.scss'
import {Theme, initTheme} from './Theme.js'
import {IAR} from '../icApp/icApp-render.js'
import {inputUI} from './IC-UI.js'
import {XHR, Host, API, IC_DEV, pram} from './common.js'
import {ShowErr} from './error.js'

window.ic = window.ic || []
window.ic.pageLoad = Date.now()
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
		initTheme(icApp)
		gtag('event', 'screen_view', { 'screen_name': 'Reset Password'})
	}
	didMount() {
		var _a = new icApp.e('.load span')
		_a.txt = 'Reduce the loading impact.'
		setTimeout(async a=> {
			icons = []
			_a.txt = 'Downloading the page.'
			_a.txt = 'Receiving the page.'
			var b = JSON.parse(localStorage.getItem('ic-tech:assets:v1:reset'))
			icons = !b || b == 'null' ? (await new Promise(r => XHR(Host + `assets/reset.json`, a => r(a))))['IC-Tech.Assets'] : b
			if(!b || b == 'null') localStorage.setItem('ic-tech:assets:v1:reset', JSON.stringify(icons))
			_a.txt = 'Connecting to the IC-Tech server.'
			b = pram(location.search, 'eid')
			if(!b) location = Host
			XHR(API + 'can/reset?eid=' + b, a => {
				this.update({UI:  (a = a.success && a.response) ? 2 : 1, st:1})
				gtag('event', a ? 'Ready for Reset' : 'unable to reset with eid', {
					event_category: 'Account',
					event_label: 'Password reset'
				})
			})
			;(['page_mount_end', 'Reset Page Load']).forEach(a => gtag('event', a, {
  				'name': 'pageMount',
  				'value': Date.now() - window.ic.pageLoad,
  				'event_category': 'timing',
  				'event_label': 'IC App'
				}))
		}, defaultWait)
	}
	submit(e) {
		e.preventDefault()
		this.update({UI: 0})
		setTimeout(a => XHR(API + `reset?eid=${pram(location.search, 'eid')}&${this._a('password')}`, a=> {
			this.update({UI: 1, st: (a = a.success && a.response) ? 0 : 1})
			gtag('event', a ? 'Done Reset' : 'exception', a ? ({
				event_category: 'Account',
				event_label: 'Password reset'
			}) : ({'description': 'unable to reset password', 'fatal': true}))
		}), defaultWait)
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
						{t: 'span', cl: 'c3', txt: this.data.st == 0 ? `Your account password have been reseted.` : `Sorry, We can't complete your request. Please request for new link.`},
						{t: 'div', cl: 'c1', ch: [
							{t: 'a', cl: ['ic-btn0', 's1'], at: [['href', '/']], txt: 'IC-Tech'}
						]}
					]}
				]},
				{ t: 'div', cl: ['ICPage', 'Main', 'c1'], s: {display: this.data.UI == 2 ? 'flex' : 'none'}, ch: [
					{ t: 'div', ch: [
						{ t: 'form', e: [['onsubmit', this.submit]], ch: [
							{ t: 'span', cl: 'c1', txt: 'Reset Password' },
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
