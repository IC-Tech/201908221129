/* Copyright © Imesh Chamara 2019 */
import './icApp.js'
import {Theme, initTheme} from './Theme.js'
import {dialogUI, inputUI} from './IC-UI.js'
import {IAR} from './icApp-render.js'
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
	}
	didMount() {
		this.winsize = a => [a = [matchMedia('(orientation:portrait),(min-height:480px)and(max-width:680px)').matches, new icApp.e('.Main>div>div.c1')], a[0] && a[1].v.offsetWidth != a[1].v.offsetHeight ? a[1].st.height = a[1].v.offsetWidth + 'px' : (!a[0] && a[1].st.height != '' ? a[1].st.height = null : 0)]
		window.addEventListener('resize', this.winsize)
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
			const _icons = [0,1,2,3,4,5,6,7,17,9,10,11,12,13,16,18,19]
			for(var a=0; a<_icons.length; a++) {
				if(!(icons[a] = localStorage.getItem('ic-tech:assets:v0:icon' + _icons[a]))) {
					icons[a] = await b(_icons[a])
					d += icons[a].length
					localStorage.setItem('ic-tech:assets:v0:icon' + _icons[a], icons[a])
				}
				_a.txt = `Downloading the page (${c(d)}) ${parseInt(a / _icons.length * 100)}%.`
			}
			_a.txt = 'Connecting to the IC-Tech server.'
			if(d = location.pathname.match(/\/user\/([^\/]+)/)) d = d[1]
			else {
				d = pram('id')
				if(d && !IC_DEV) history.pushState({IC_Nav: true}, document.title, '/user/' + d)
			}
			XHR(API + 'get?id=' + (d ? d : 1), user => getUser({f: a => {
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
			}}))
		}, defaultWait)
		var a = JSON.parse(localStorage.getItem('ICTech.Theme'))
		if(!a && a != false) a = window.matchMedia("(prefers-color-scheme: dark)").matches
		this.setTheme(a, 1)
	}
	didUpdate() {
		inputUI.checkAll()
		if(this.winsize) this.winsize()
		new icApp.e('.inputui.img').cla('s1')
	}
	logout() {
		setUser(null)
		location.reload()
	}
	submit(e) {
		e.preventDefault()
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
		dialogUI.create({name: 'Delete Account', msg: 'Deleting this account will remove all you data from IC-Tech Server. You will lost this Account and All the data forever. This Action Can not be undone.', but: ['DELETE', 'CANCEL'], f: a=> {
			if(a.b == 0) this.update({UI: 2, st: 0})
			dialogUI.remove(a.i)
		}})
	}
	cancelForm(e) {
		e.preventDefault()
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
		this.darkTheme = a
		if(!b) localStorage.setItem('ICTech.Theme', JSON.stringify(a))
		var c = icApp.qs(`[href="${a ? '/light.css' : '/dark.css'}"`)
		if(c) c.remove()
		if(icApp.qs(`[href="${a ? '/dark.css' : '/light.css'}"`)) return
		new icApp.e('head').cha(new icApp.e(icApp.cE('link')).sa('rel', 'stylesheet').sa('href', a ? '/dark.css' : '/light.css').v)
		this.update()
	}
	render() {
		const _a = {display: this.data.selfView ? 'block' : 'none'}
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
								{ t: 'a', at: [['href', '/']], html: icons[0] },
								{ t: 'a', s: _a, e: [['onclick', a => this.update({UI: 2, st: 1})]], html: icons[3] },
								{ t: 'a', s: {display: this.data.selfView || !this.user ? 'none' : 'block'}, at: [['href', this.user ? '/?id='+this.user.id : '/']], html: icons[2] },
								{ t: 'a', s: {display: this.user ? 'none' : 'block'}, at: [['href', '/signin.html']], html: icons[16] },
								{ t: 'a', s: _a, e: [['onclick', this.deleteDialog]], html: icons[1] },
								{ t: 'a', s: _a, e: [['onclick', this.logout]], html: icons[4] },
								{ t: 'a', cl: this.darkTheme ? 's1' : 's0', e: [['onclick', e => {this.setTheme(!this.darkTheme)}]], html: icons[15] }
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
