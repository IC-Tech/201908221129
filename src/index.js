/* Copyright © Imesh Chamara 2019 */
"use strict";
import '../icApp/icApp.js'
import {Theme, initTheme, setTheme} from './Theme.js'
import {dialogUI, inputUI} from './IC-UI.js'
import {IAR} from '../icApp/icApp-render.js'
import {XHR, Host, API, IC_DEV, pram} from './common.js'
import {getUser, setUser} from './user.js'
import {ShowErr} from './error.js'
import './style.scss'
import './Dialog.scss'
import './inputui.scss'
import './loading-ani.css'

ic.init = icApp => {
var _root_ = new icApp.e('#root')
_root_.chr()
Theme.set('red')

const defaultWait = 1200
window.ic = window.ic || []
window.ic.pageLoad = Date.now()

var icons = null

class ICTech extends IAR {
	constructor() {
		super()
		this.data = {
			UI: 0,
			icons: false,
			user: null,
			selfView: true,
			st: 0,
			newImg: null
		}
		this.imgUpdate = '';
		this.user = null
		this.image = null
		this.submit = this.submit.bind(this)
		this.setTheme = this.setTheme.bind(this)
		this.loadImage = this.loadImage.bind(this)
		this.cancelForm = this.cancelForm.bind(this)
		this.deleteDialog = this.deleteDialog.bind(this)
		this._a = (a => a + '=' + icApp.qs('#' + a).value).bind(this)
		this._b = []
		this.darkTheme = initTheme(icApp)
		gtag('event', 'screen_view', { 'screen_name': 'Home'})
	}
	didMount() {
		this.winsize = a => [a = [matchMedia('(orientation:portrait),(min-height:480px)and(max-width:680px)').matches, new icApp.e('.Main>div>div.c1')], a[0] && a[1].v.offsetWidth != a[1].v.offsetHeight ? a[1].st.height = a[1].v.offsetWidth + 'px' : (!a[0] && a[1].st.height != '' ? a[1].st.height = null : 0)]
		window.addEventListener('resize', this.winsize)
		var _a = new icApp.e('.load span')
		_a.txt = 'Reduce the loading impact.'
		setTimeout(async a=> {
			_a.txt = 'Receiving the page.'
			var b = JSON.parse(localStorage.getItem('ic-tech:assets:v1:index'))
			icons = !b || b == 'null' ? (await new Promise(r => XHR(Host + `assets/index.json`, a => r(a))))['IC-Tech.Assets'] : b
			if(!b || b == 'null') localStorage.setItem('ic-tech:assets:v1:index', JSON.stringify(icons))
			_a.txt = 'Connecting to the IC-Tech server.'
			if(b = location.pathname.match(/\/user\/([^\/]+)/)) b = b[1]
			else {
				b = pram('id')
				if(b && !IC_DEV) history.pushState({IC_Nav: true}, document.title, '/user/' + b)
			}
			XHR(API + 'get?id=' + (b ? b : 1), user => getUser({f: a => {
				this.user = a
				if(!user.success) ShowErr(0, user.error)
				_a.txt = 'Building the Page.'
				if(a) {
					this.data.newImg = a.image
					icApp.qs('form #name').value = a.name
					icApp.qs('form #about').value = a.about
				}
				this._b = a ? a.links : null
				this.update({UI: 1, icons: 1, user: (user = user.response), selfView: a && a.id == user.id })
				;(['page_mount_end', 'Home Page Load']).forEach(a => gtag('event', a, {
  				'name': 'pageMount',
  				'value': Date.now() - window.ic.pageLoad,
  				'event_category': 'timing',
  				'event_label': 'IC App'
				}))
			}}))
		}, defaultWait)
	}
	didUpdate() {
		inputUI.checkAll()
		if(this.winsize) this.winsize()
		new icApp.e('.inputui.img').cla('s1')
	}
	logout() {
		gtag('event', 'Logout', {
			event_category: 'Account',
			event_label: 'Profile'
		})
		setUser(null)
		location.reload()
	}
	submit(e) {
		e.preventDefault()
		gtag('event', `Profile ${this.data.st == 1 ? 'Change' : 'delete'}`, {
			event_category: 'Account',
			event_label: 'Profile'
		})
		var c = []
		icApp.qsa('.edit .link > div:not(.c1)').forEach(a => (a = a.children[0].value) != "" && c.push(a))
		this.update({UI: 0})
		var a = a => XHR(API + (this.data.st == 1 ? 'set' : `delete?id=${this.user.id}&${this._a('password')}`), a=> {
			if(!a.success) ShowErr(0, a.error)
			else if(this.data.st == 0) this.logout()
			else {
				Object.assign(this.user, a.response)
				setUser(this.user)
				this.imgUpdate = '?_t=' + Date.now()
				this._b = this.user.links
				this.update({UI: 1, user: this.user})
			}
		}, undefined, this.data.st == 0 ? undefined : JSON.stringify({
			id: this.user.id,
			AToken: this.user.AToken,
			name: icApp.qs('#name').value,
			about: icApp.qs('#about').value,
			image: this.image ? a : this.user.image,
			links: c
		}))
		setTimeout(b => {
			if(this.data.st == 0) a()
			else {
				if(!this.image) return a(this.user.image)
				var f = new FileReader()
				f.onload = e => a(e.target.result)
				f.readAsDataURL(this.image)
			}
		}, defaultWait)
		return false
	}
	deleteDialog() {
		gtag('event', 'Try Delete', {
			event_category: 'Account',
			event_label: 'Profile'
		})
		dialogUI.create({name: 'Delete Account', msg: 'Deleting this account will remove all you data from IC-Tech Server. You will lost this Account and All the data forever. This Action Can not be undone.', but: ['DELETE', 'CANCEL'], f: a=> {
			if(a.b == 0) this.update({UI: 2, st: 0})
			dialogUI.remove(a.i)
		}})
	}
	cancelForm(e) {
		e.preventDefault()
		gtag('event', 'Cancel Edit', {
			event_category: 'Account',
			event_label: 'Profile Edit'
		})
		this.update({UI: 1})
		return false
	}
	loadImage(e) {
		var t = e.target.files[0]
		if(!FileReader) return
		var f = new FileReader()
		f.onload = e => this.update({newImg: URL.createObjectURL(this.image = new Blob([e.target.result], {type: t.type}))})
		f.readAsArrayBuffer(t)
	}
	checkLink(a) {
		if(a.startsWith('mailto:')) return 5
		else if(a.startsWith('http://') || a.startsWith('https://'))
			a = a.replace('https', 'http').replace('http://', '')
		a = a.replace('www.', '')
		var b = [
			['twitter.', 6],
			['github.', 7],
			['youtube.', 9],
			['youtu.be', 9],
			['discord.', 10],
			['plus.google.', 11],
			['instagram.', 12],
			['facebook.', 14]
		]
		for(var c=0; c<b.length; c++)
			if(a.startsWith(b[c][0])) return b[c][1]
		return 8
	}
	setTheme(a, b) {
		gtag('event', `Set ${!this.darkTheme ? 'Dark' : 'Light'} Theme`, {
			event_category: 'UI',
			event_label: 'Change Theme'
		})
		this.darkTheme = a
		localStorage.setItem('ICTech.Theme', JSON.stringify(a))
		setTheme(icApp, a)
		this.update()
	}
	render() {
		return (
			{ t: 'div', cl: 'ICApp', ch: [
				{ t: 'div', cl: ['ICPage', 'Main', 'c1'], s: {display: this.data.UI == 1 ? 'flex' : 'none'}, ch: [
					{ t: 'div', ch: [
						{ t: 'div', cl: 'c1', s: {'background-image': `url(${this.data.user && this.data.user.image ? this.data.user.image + this.imgUpdate : ''})`} },
						{ t: 'div', cl: 'c2', ch: [
							{ t: 'span', cl: 'c1', txt: this.data.user ? this.data.user.name : '' },
							{ t: 'span', cl: 'c3', ch: this.data.user ? [{t: 'span', txt: this.data.user.about + '\n'}, ...(this.data.user.links ? this.data.user.links.map(a => ({ t:'a', at: [['target','_blank'],['rel','noopener noreferrer'],['href', a]], html: icons[this.checkLink(a)]})) : [])] : undefined }
						]},
						!this.data.icons ? undefined : { t: 'label', ch: [
							{ t: 'input', at: [['type','checkbox']]},
							{ t: 'div', cl: 'c1', ch: [
								{ t: 'div' },
								{ t: 'div' },
								{ t: 'div' }
							]},
							{ t: 'div', cl: 'c2', ch: [
								{ t: 'a', at: [['href', '/'], ['title', 'Homepage']], html: icons[0] },
								{ t: 'a', s: {display: this.data.selfView ? 'block' : 'none'}, at: [['title', 'Profile Edit']], e: [['onclick', a => {
									this.update({UI: 2, st: 1})
									gtag('event', 'screen_view', { 'screen_name': 'Edit'})
								}]], html: icons[3] },
								{ t: 'a', s: {display: this.data.selfView || !this.user ? 'none' : 'block'}, at: [['href', this.user ? '/?id='+this.user.id : '/'], ['title', 'Your Profile']], html: icons[2] },
								{ t: 'a', s: {display: this.user ? 'none' : 'block'}, at: [['href', '/signin.html'], ['title', 'Signin']], html: icons[16] },
								{ t: 'a', s: {display: this.data.selfView ? 'block' : 'none'}, at: [['title', 'Delete Account']], e: [['onclick', this.deleteDialog]], html: icons[1] },
								{ t: 'a', s: {display: this.data.selfView ? 'block' : 'none'}, at: [['title', 'Logout']], e: [['onclick', this.logout]], html: icons[4] },
								{ t: 'a', cl: this.darkTheme ? 's1' : 's0', at: [['title', 'Dark Theme']], e: [['onclick', e => {this.setTheme(!this.darkTheme)}]], html: icons[15] }
							]}
						]},
					]}
				]},
				{ t: 'div', cl: ['ICPage', 'load', 'c1'], s: {display: this.data.UI == 0 ? 'flex' : 'none'}, ch: [
					{ t:'div', cl: 'loading-ani' },
					{ t:'span', txt: ' ' }
				]},
				{ t: 'div', cl: ['ICPage', 'edit', 'c1'], s: {display: this.data.UI == 2 ? 'flex' : 'none'}, ch: [
					{t: 'div', ch: [
						{ t: 'form', e: [['onsubmit', this.submit]], ch: [
							{ t: 'span', cl: 'c1', txt: this.data.st == 0 ? 'Account Delete' : 'Change Information' },
							inputUI({id: 'password', type: 'password', name: 'Password', s: {display: this.data.st == 0 ? 'block' : 'none'} }),
							inputUI({id: 'name', type: 'text', name: 'Name', s: {display: this.data.st == 1 ? 'block' : 'none'}}),
							inputUI({id: 'about', type: 'text', name: 'About', s: {display: this.data.st == 1 ? 'block' : 'none'}, multi: 1}),
							{ t: 'div', cl: ['inputui', 's1', 'no', 'img'], s: {display: this.data.st == 1 ? 'block' : 'none'}, ch: [
								{ t:'input', at: [['type', 'file'], ['id', 'image'], ['name', 'image']], s: {display: 'none'}, e: [['onchange', this.loadImage]]},
								{ t:'label', at: [['for', 'image']], txt: 'Image' },
								{ t: 'div', s: {'background-image': `url("${this.data.newImg}")` }},
								{ t:'label', at: [['for', 'image']], txt: 'Browser', cl: ['ic-btn0', 'c1'] }
							]},
							{ t: 'div', cl: ['inputui', 's1', 'no', 'link'], s: {display: this.data.st == 1 ? 'flex' : 'none'}, ch: [
								{ t:'label', txt: 'Links' },
								...(this._b ? this._b.map((a, b) => ({ t:'div', ch: [{ t: 'input', at:[['type','text'], ['value', a]]}, {t:'button', e: [['onclick', e=> e.preventDefault() != 1 && ((e = new icApp.e(e.target).p).tag == 'BUTTON' ? e.p : (e.tag == 'DIV' ? e : e.p.p)).cla('c1')]], html: icons ? icons[13] : null}]})) : []),
								{ t: 'button', cl: 'ic-btn0', txt: 'New Link', e: [['onclick', a => a.preventDefault() != 1 && (this._b ? this._b.push('') : this._b = ['']) != 'a' && this.update()]] }
							]},
							{ t: 'span', cl: 'c2', txt: 'Please submit your new password for delete your account.', s: {display: this.data.st == 0 ? 'block' : 'none'} },
							{ t: 'div', cl: 'c1', s: {paddingTop: '12px'}, ch: [
								{ t: 'input', cl: 'ic-btn0', at: [['type', 'submit'], ['value', 'NEXT']]},
								{ t: 'button', cl: ['ic-btn0', 's1'], txt: 'CANCEL', e: [['onclick', this.cancelForm]] }
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
