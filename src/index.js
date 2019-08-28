/* Copyright © Imesh Chamara 2019 */
import './style.scss'
import './icApp.js'
import './loading-ani.css'
import {Theme} from './Theme.js'
import {IAR} from './icApp-render.js'
import {XHR, Host, API, IC_DEV} from './common.js'
import {getUser} from './user.js'

ic.init = icApp => {
var _root_ = new icApp.e('#root')
_root_.chr()
Theme.set('red')
var idCounter = 0
var id_col = []
var icons = null
class ICTech extends IAR {
	constructor() {
		super()
		this.data = {
			UI: 0,
			icons: false,
			user: null,
			selfView: true
		}
		if(IC_DEV) window.__IC_DEV__.ICTech = this
	}
	didMount() {
		this.winsize = a => [a = [matchMedia('(orientation:portrait),(min-height:480px)and(max-width:680px)').matches, new icApp.e('.Main>div>div.c1')], a[0] && a[1].v.offsetWidth != a[1].v.offsetHeight ? a[1].st.height = a[1].v.offsetWidth + 'px' : (!a[0] && a[1].st.height != '' ? a[1].st.height = null : 0)]
		window.addEventListener('resize', this.winsize)
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
			for(var a=0; a<13; a++) {
				if(!(icons[a] = localStorage.getItem('ic-tech:assets:v0:icon' + a))) {
					icons[a] = await b(a)
					d += icons[a].length
					localStorage.setItem('ic-tech:assets:v0:icon' + a, icons[a])
				}
				_a.txt = `Downloading the page (${c(d)}) ${parseInt(a / 13 * 100)}%.`
			}
			_a.txt = 'Connecting to the IC-Tech server.'
			XHR(API + 'get?id=' + 1, user => {
				_a.txt = 'Building the Page.'
				this.update({UI: 1, icons: 1, user: user.response})
			})
		}, 1200)
	}
	didUpdate() {
		if(this.winsize) this.winsize()
	}
	render() {
		return (
			{ t: 'div', cl: 'ICApp', ch: [
				{ t: 'div', cl: ['ICPage', 'Main', 'c1'], s: {display: this.data.UI == 1 ? 'flex' : 'none'}, ch: [
					{ t: 'div', ch: [
						{ t: 'div', cl: 'c1', s: {backgroundImage: `url(${this.data.user && this.data.user.image ? this.data.user.image : ''})`} },
						{ t: 'div', cl: 'c2', ch: [
							{ t: 'span', cl: 'c1', txt: this.data.user ? this.data.user.name : '' },
							{ t: 'span', cl: 'c3', at: [['id', 'ic_i' + (id_col[0] = idCounter++)]], ch: this.data.user ? [{t: 'span', txt: this.data.user.about}, ...this.data.user.links.map(a => ({ t:'a', at: [['target','_blank'],['rel','noopener noreferrer'],['href', a[0]]], html: icons[a[1]]}))] : undefined }
						]},
						!this.data.icons || !IC_DEV ? undefined : { t: 'label', at: [['for', 'ic_i'+(idCounter++)]], ch: [
							{ t: 'input', at: [['type','checkbox'], ['id', 'ic_i' + --idCounter]]},
							{ t: 'div', cl: 'c1', ch: [
								{ t: 'div' },
								{ t: 'div' },
								{ t: 'div' }
							]},
							{ t: 'div', cl: 'c2', ch: [
								{ t: 'a', at: [['href', '/']], html: icons[0] },
								{ t: 'a', s: {display: this.data.selfView ? 'block' : 'none'}, e: [['onclick', a => this.update({UI: 1})]], html: icons[3] },
								{ t: 'a', s: {display: this.data.selfView ? 'none' : 'block'}, at: [['href', '/']], html: icons[2] },
								{ t: 'a', e: [['onclick', a => console.log(a)]], html: icons[1] },
								{ t: 'a', e: [['onclick', a => console.log(a)]], html: icons[4] }
							]}
						]},
					]}
				]},
				{ t: 'div', cl: ['ICPage', 'load', 'c1'], s: {display: this.data.UI == 0 ? 'flex' : 'none'}, ch: [
					{ t:'div', cl: 'loading-ani' },
					{ t:'span', txt: '' }
				]},
				{ t: 'div', cl: ['ICPage', 'edit', 'c1'], s: {display: this.data.UI == 2 ? 'flex' : 'none'} }
			]}
		)
	}
}
new ICTech().mount(_root_.v)
}
