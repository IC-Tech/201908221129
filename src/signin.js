/* Copyright © Imesh Chamara 2019 */
import './signin.scss'
import './icApp.js'
import './loading-ani.css'
import {Theme} from './Theme.js'
import {IAR} from './icApp-render.js'
import {XHR, Host} from './common.js'

ic.init = icApp => {
const API_Server = JSON.parse(process.env.__IC_DEV__) == true ? 'http://192.168.8.20:3001/' : 'https://users.ic-tech.now.sh/'
var _root_ = new icApp.e('#root')
_root_.chr()
Theme.set('red')

class ICTech extends IAR {
	constructor() {
		super()
		this.data = {
			UI: 0
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
				{ t: 'div', cl: ['ICPage', 'load', 'c1'], s: {display: this.data.UI == 0 ? 'flex' : 'none'}, ch: [
					{ t:'div', cl: 'loading-ani' }
				]},
				{ t: 'div', cl: ['ICPage', 'Main', 'c1'], s: {display: this.data.UI == 1 ? 'flex' : 'none'} }
			]}
		)
	}
}
new ICTech().mount(_root_.v)
}
