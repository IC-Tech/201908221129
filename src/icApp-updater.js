if(!window.ic) {
	window.ic = { icApp: {}}
}
window.ic.icApp.updater = {a: 0,b:[]}
const icAppUpdater = {
	link: a => ([a = [a, ic.icApp.updater.a++], ic.icApp.updater.b[a[1]] ? ic.icApp.updater.b[a[1]][ic.icApp.updater.b[a[1]].length] = a[0] : ic.icApp.updater.b[a[1]] = [a[0]], a[1]])[2]
}
export default icAppUpdater
