/* Copyright © Imesh Chamara 2019 */
import {dialogUI} from './IC-UI.js'
import {Host} from './common.js'
import {setUser} from './user.js'

var ShowErr = (b,a) => {
	if(b == 0) dialogUI.create({name: 'Server Error', msg: `Error detected in server. ${a ? '' : 'No '}Error information${a ? (b => [a.forEach((a,c) => b += (c == 0 ? '' : ', ') + a), b])(': ')[1] : ' Provided'}.`, but: ['RELOAD', 'CANCEL'], f: a=> {
		if(a.b == 0) location.reload()
		else window.close()
	}})
	else if(b == 1) dialogUI.create({name: 'Account Error', msg: `You have created account, but your email isn't verified yet. please verify your email.`, but: ['VERIFY', 'CANCEL'], f: a=> {
		if(a.b == 0) location = Host() + 'signin.html'
		else window.close()
	}})
	else if(b == 2) dialogUI.create({name: 'Account Security Update', msg: `Your account's security have been updated on another browser. You have to resign to the page. if you don't you can't use the App.`, but: ['OK', 'CANCEL'], f: a=> {
		if(a.b == 0) {
			setUser(null)
			location.reload()
		}
		else window.close()
	}})
}
export {ShowErr}
