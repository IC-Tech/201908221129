class _a {
	constructor() {
		this.updater = {a: [],b:[]}
	}
	static get a() {
		return icAppUpdater.a.updater
	}
	static set a(v) {
		icAppUpdater.a.updater = v
	}
}
const icAppUpdater = {
	a: new _a(),
	b: 0,
	link: a => ([
		a = [a, 'ice_'+ (icAppUpdater.b++).toString(16)],
		a[0].forEach(b => [
			b = [b, _a.a.a.indexOf(b[0])],
			_a.a.a[b[1] = b[1] == -1 ? _a.a.a.length : b[1]] = b[0][0],
			_a.a.b[b[1]] ? 0 : _a.a.b[b[1]] = [],
			_a.a.b[b[1]].push([a[1], b[0][1]])
		]),
		a[1]
	])[2],
	update: a => Object.keys(a).forEach(b => 
		(b = [b, _a.a.a.indexOf(b)])[1] != -1 && (icAppUpdater.willUpdate ? icAppUpdater.willUpdate(a) != false : true) ? [ _a.a.b[b[1]].forEach(c => c[1]({i:[_a.a.a[b[1]], c[0]], e: new ic.icApp.e(`[data-iau="${c[0]}"]`), v:a[b[0]]})), icAppUpdater.didUpdate ? icAppUpdater.didUpdate() : 0] : 0),
	didUpdate: null,
	willUpdate: null
}
export default icAppUpdater
