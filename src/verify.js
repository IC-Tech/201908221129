/* Copyright © Imesh Chamara 2019 */
"use strict";
import './verify.scss'
import '../icApp/icApp.js'
import './loading-ani.css'
import {Theme, initTheme} from './Theme.js'
import {IAR} from '../icApp/icApp-render.js'
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

class Verify extends IAR {
	constructor() {
		super()
		this.data = {
			UI: 0,
			st: 0
		}
		initTheme(icApp)
		gtag('event', 'screen_view', { 'screen_name': 'Verify Account'})
	}
	didMount() {
		var _a = new icApp.e('.load span')
		_a.txt = 'Reduce the loading impact.'
		setTimeout(async a=> {
			icons = []
			_a.txt = 'Receiving the page.'
			var b = JSON.parse(localStorage.getItem('ic-tech:assets:v1:verify'))
			icons = !b || b == 'null' ? (await new Promise(r => XHR(Host + `assets/verify.json`, a => r(a))))['IC-Tech.Assets'] : b
			if(!b || b == 'null') localStorage.setItem('ic-tech:assets:v1:verify', JSON.stringify(icons))
			_a.txt = 'Connecting to the IC-Tech server.'
			b = pram(location.search, 'eid')
			if(!b) location = Host
			XHR(API + 'verify?eid=' + b, a => {
				this.update({UI: 1, st: (a = a.success && a.response) ? 0 : 1})
				gtag('event', a ? 'Done Verify' : 'unable to verify with eid', {
					event_category: 'Account',
					event_label: 'Account verify'
				})
			})
			;(['page_mount_end', 'Verify Page Load']).forEach(a => gtag('event', a, {
  				'name': 'pageMount',
  				'value': Date.now() - window.ic.pageLoad,
  				'event_category': 'timing',
  				'event_label': 'IC App'
				}))
		}, defaultWait)
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
						{t: 'div', cl: 'ico', html: icons ? icons[this.data.st] : null },
						{t: 'span', cl: 'c3', txt: this.data.st == 0 ? `Your account have been activated.` : `Sorry, We can't complete your request. Please request for new link.`},
						{t: 'div', cl: 'c1', ch: [
							{t: 'a', cl: ['ic-btn0', 's1'], at: [['href', '/']], txt: 'IC-Tech'}
						]}
					]}
				]}
			]}
		)
	}
}
new Verify().mount(_root_.v)
}
