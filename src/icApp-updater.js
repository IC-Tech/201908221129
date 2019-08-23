if(!window.ic) {
	window.ic = { icApp: {}}
}
window.ic.icApp.updater = {a: [],b:[]}
class _a{
static get a() {
return window.ic.icApp.updater
}
static set a(v) {
window.ic.icApp.updater = v
}
}
const icAppUpdater = {
	link: (a, b) => ([a = [a, _a.a.a.indexOf(a)], _a.a.a[a[1] = a[1] == -1 ? _a.a.a.length : a[1]] = a[0], _a.a.b[a[1]] ? _a.a.b[a[1]].push(b) : _a.a.b[a[1]] = [b], a[1] +','+ (_a.a.b[a[1]].length - 1)])[3],
	update: (a, b) => (a = _a.a.a.indexOf(a)) != -1 ? _a.a.b[a].forEach((c,d)=> c({i:[a,d], e: new ic.icApp.e(`[data-iau="${a},${d}"]`), v:b})) : 0
}
export default icAppUpdater
