/* Copyright © Imesh Chamara 2019 */
import {XHR, Host, API} from './common.js'
import {ShowErr} from './error.js'
var user;
const getUser = _a => {
	if(user && !_a.force) return _a.f(user)
	user = JSON.parse(localStorage.getItem('IC-Tech.User'))
	if(!user) return _a.f(null)
	var b = a => a.b + '=' + a.a[a.b]
	var c = a => {
		if(!a.success) {
			if(a.error.indexOf('account not found') >= 0) {
				setUser(null)
				location.reload()
			}
			else if(a.error.indexOf('Email not verified') >= 0) {
				if(_a.signin) _a.f({error: 1})
				else ShowErr(1)
			}
			else ShowErr(0, a.error)
		}
		return !a.success
	}
	XHR(API + `update?${b({a:user, b:'id'})}`, a => {
		if(c(a)) return
		if(a.response != user.update) {
			XHR(API + `get/update?${b({a:user, b:'id'})}&${b({a:user, b:'AToken'})}`, a => {
				if(c(a)) return
				if((a = a.response).action == 'resign') return ShowErr(2)
				else Object.assign(user, a.data)
				_a.f(user)
			})
		}
		else _a.f(user)
	})
}
const setUser = a => localStorage.setItem('IC-Tech.User', a ? JSON.stringify(a) : null)

export {getUser, setUser}
