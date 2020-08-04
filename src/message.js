/* Copyright © 2020, Imesh Chamara. All rights reserved. */
import {IAR, icApp, pram, xhr} from 'ic-app'
import './message.scss'

class site extends IAR {
	constructor() {
		super()
		this.data = {
			ui: 0
		}
		var a = new icApp('script',1)
		a.v.src = "https://www.google.com/recaptcha/api.js?onload=_fn_recaptcha&render=explicit"
		//a.ae('load', this.recaptcha)
		a.v.async = !0
		a.v.defer = !0
		new icApp('head').ap(a)
		this.recaptcha = a => {
			if(this.ready && !this._recaptcha && typeof grecaptcha != 'undefined') {
				try {
					this.robotkey = grecaptcha.render(new icApp('#robot').v, {
						sitekey : '6LfEUboZAAAAADpNOLN9-sTi6_fx5hh9dGuJWLTV',
						theme: 'dark'
					})
					this._recaptcha = 1
				} catch(e) {console.error(e)}
			}
		}
		;['resEnd', 'submit', 'recaptcha', 'again'].forEach(a => this[a] = this[a].bind(this))
		window._fn_recaptcha = this.recaptcha
	}
	didMount() {
		try {
			var arg = pram()
			;['product', 'type', /*'title', */'message'].forEach(a => {
				if(!arg[a]) return
				var b = new icApp(`[name="${a}"]`)
				if(b.tag.match(/input/i)) b.val = arg[a]
				else b.txt = arg[a]
			})
			new icApp('.sec .mess').v.focus()
		} catch (e) {console.error(e)}
		this.ready = 1
		this.recaptcha()
		this.update({ui: 1})
	}
	didUpdate() {
		Array.from(icApp.qsa('.sec input') || []).map(a => this.secWatch({target: a}))
		var target = new icApp('.sec .mess').v
		this.contWatch({target})
		target.contentEditable = !0
	}
	secWatch(a) {
		a = new icApp(a.target)
		if(a.ga('comm') == '2') return
		var b = a.val ? '' : `Leaving this field blank means that your message is not related with "${a.prev.prev.txt}"`
		if(a.next.txt != b) a.next.txt = b
	}
	contWatch(a) {
		a = new icApp(a.target)
		var b = a.txt ? '' : `This field is required, write us what you want to say.`
		if(a.next.txt != b) a.next.txt = b
	}
	resEnd(a) {
		if(!a) return
		this.error = (!a.success && a.error && a.error.message) || 'Internal Server Error'
		if(a.success) delete this.error
		this.update({ui: 3})
	}
	submit(a) {
		a.preventDefault()
		var b = {}
		;['product', 'type', 'name', 'email', 'title', 'message'].forEach(a => {
			var c = new icApp(`[name="${a}"]`)
			if(!c.v) return
			if(!(c = c.tag.match(/input/i) ? c.val : c.txt)) return
			b[a] = c.trim()
		})
		try {
			b.recaptcha = grecaptcha.getResponse(this.robotkey)
		}catch (e) {console.error(e)}
		if(!b.message) return
		xhr('https://api.ic-tech.now.sh/message', 0, JSON.stringify(b)).then(this.resEnd)
		this.update({ui: 2})
		return !1
	}
	again() {
		if(!this.error) return
		delete this.error
		this.update({ui: 1})
	}
	render() {
		var sec = a => ({t: 'div', cl: 'sec', ch: [
			{t: 'span', cl: 'title', txt: a.title},
			{t: 'span', cl: 'des', txt: a.des},
			a.input || {t: 'input', at: {type: a.type || 'text', placeholder: a.def, comm: a.noComm ? 2 : 1, name: (a.name || a.title || '').toLowerCase()}, e: {oninput: this.secWatch}},
			{t: 'span', cl: 'comm'},
		]})
		return ([
			{s: {display: this.data.ui == 0 ? 'flex' : 'none'}},
			{s: {display: this.data.ui != 0 ? 'block' : 'none'}, t:'div', cl: 'main', ch: [
				{t: 'div', cl: 'content-c', ch: [
					{t: 'div', cl: 'content', ch: [
						{t: 'span', cl: 'title-main', txt: 'Contact IC-Tech'},
						{t: 'span', cl: 'des-main', txt: 'Questions, Comments, or Concerns?'},
						{s: {display: this.data.ui == 1 ? 'block' : 'none'}, t: 'form', at: {method: 'post', action: location.pathname, target: '_self'}, e: {onsubmit: this.submit}, ch: [
							sec({title: 'Product', des: 'Name the Product.\nGive us the name of our App / website for get better respond.', def: 'Product name'}),
							sec({title: 'Type', des: 'What kind of Contact do you expect?\nWhat is your message about, is it about Suggestions, Complaints, Information Request, Partnership, Other..', def: 'Contact Type'}),
							sec({title: 'Name', des: 'Tell us who are you', def: 'Name'}),
							sec({title: 'Email', des: 'Give us your contact email to receive our respond', def: 'Email Address', type: 'email'}),
							//sec({title: 'Title', des: 'Title of your message', def: 'Message Title', noComm: 1}),
							sec({title: 'Message', des: 'Content of the message', noComm: 1, input: {t: 'span', cl: 'mess', at: {name: 'message'}, e: {oninput: this.contWatch}}}),
							{t: 'div', at: {id: 'robot'}},
							{t: 'span', cl: 'warn'},
							{t:'div', cl:'sub',ch: [
								{t: 'input', at: {type: 'submit', value: 'Submit'}}
							]}
						]},
						{s: {display: this.data.ui == 2 ? 'block' : 'none'}, t: 'div', cl: 'load', ch: [
							{t: 'div'}
						]},
						{s: {display: this.data.ui == 3 ? 'block' : 'none'}, t: 'div', cl: 'done', ch: [
							{t: 'span', cl: 'title', txt: this.error ? 'Error' : 'Done'},
							{t: 'div', cl: 'ico', html: this.error ? `<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path></svg>` : `<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>`},
							{t: 'span', txt: this.error || 'Your message has been sent to IC-Tech.'},
							{t: 'div', cl: 'but-c', ch: [
								{t: 'button', s: {display: this.error ? 'block' : 'none'}, e: {onclick: this.again}, txt: 'Try Again'}
							]}
						]},
					]}
				]}
			]}
		])
	}
}
new site().mount('#root')
