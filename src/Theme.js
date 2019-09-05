/* Copyright © Imesh Chamara 2019 */
import './Themes.css'
const ColorThemes = [ 'red','pink','purple','indeigo','blue','teal','yellow','orange','green','black' ]
const Theme = {
	set: a => [a = [a, a=>([a=parseInt(a).toString(16),a.length < 2 ? '0'+a:a])[1], '#'], new ic.icApp.e('#root').clr(...ColorThemes).cla(ColorThemes[typeof a[0] == 'number' ? a[0] : ColorThemes.indexOf(a[0])]), getComputedStyle(ic.icApp.qs('#root')).getPropertyValue('--ic-c-i4').match(/\d+/g).forEach(b=> a[2] += a[1](b)), ['theme-color', 'msapplication-navbutton-color', 'apple-mobile-web-app-status-bar-style'].forEach(b=> new ic.icApp.e(`[name=${b}`).sa('content', a[2]))]
}
const initTheme = a => {
	const icApp = a
	a = JSON.parse(localStorage.getItem('ICTech.Theme'))
	if(!a && a != false) a = window.matchMedia("(prefers-color-scheme: dark)").matches
	if(icApp.qs(`[href="${a ? '/dark.css' : '/light.css'}"`)) return
	new icApp.e('head').cha(new icApp.e(icApp.cE('link')).sa('rel', 'stylesheet').sa('href', a ? '/dark.css' : '/light.css').v)
	return a
}
export {ColorThemes, Theme, initTheme}
