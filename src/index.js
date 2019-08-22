import './style.scss'
import './icApp.js'
import IAC from './icApp-creator.js'

ic.init = icApp => {
	var _root_ = new icApp.e('#root')
	_root_.chr()
	IAC.create(icApp, _root_, [
		{
			t: 'div',
			cl: 'Main',
			ch: []
		}
	])
}
