/* Copyright © Imesh Chamara 2019 */
import './style.scss'
import './icApp.js'
import './loading-ani.css'
import {Theme} from './Theme.js'
import {IAR} from './icApp-render.js'
import {XHR, Host} from './common.js'

ic.init = icApp => {
const __IC_DEV__ = JSON.parse(process.env.__IC_DEV__)
const API_Server = __IC_DEV__ == true ? 'http://192.168.8.20:3001/' : 'https://users.ic-tech.now.sh/'
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
		setTimeout(async a=> {
			icons = []
			var b = a=> new Promise(r => XHR(Host() + `assets/${a}.svg`, a => r(a), {raw:1}))
			for(var a=0; a<13; a++) icons[a] = await b(a)
			XHR(API_Server + 'get?id=' + 1, user => {
				this.update({UI: 1, icons: 1, user: user.response})
			})
		}, 1200)
	}
	didMount() {
		this.winsize = a => [a = [matchMedia('(orientation:portrait),(min-height:480px)and(max-width:680px)').matches, new icApp.e('.Main>div>div.c1')], a[0] && a[1].v.offsetWidth != a[1].v.offsetHeight ? a[1].st.height = a[1].v.offsetWidth + 'px' : (!a[0] && a[1].st.height != '' ? a[1].st.height = null : 0)]
		window.addEventListener('resize', this.winsize)
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
						!this.data.icons || !__IC_DEV__ ? undefined : { t: 'label', at: [['for', 'ic_i'+(idCounter++)]], ch: [
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
					{ t:'div', cl: 'loading-ani' }
				]},
				{ t: 'div', cl: ['ICPage', 'edit', 'c1'], s: {display: this.data.UI == 2 ? 'flex' : 'none'} }
			]}
		)
	}
}
new ICTech().mount(_root_.v)
}
