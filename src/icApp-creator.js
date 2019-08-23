const icAppCreator = {
	create: (icApp, e, d) => d.forEach(a => icAppCreator._n.c([icApp, e, a])),
	render: (icApp, e, d) => icAppCreator._n.c1(([d = [icApp, null, d], d.a = e, d])[2]),
	_n: {
		c: a=> a && a[2] ? [a.a = new a[0].e(a[0].cE(a[2].t)), icAppCreator._n.c1(a), a[1].ap(a.a.v)] : a,
		c1: a=> [a[2].cl ? a.a.cla(a[2].cl) : 0, a[2].at ? a[2].at.forEach(b=>a.a.sa(b[0], b[1])) : 0, a[2].e ? a[2].e.forEach(b=>a.a.ae(b[0], b[1])) : 0, a[2].s ? Object.keys(a[2].s).forEach(b=>a.a.st[b] = a[2].s[b]) : 0, a[2].d ? Object.keys(a[2].d).forEach(b=>a.a.d[b] = a[2].d[b]) : 0, a[2].html ? a.a.html = a[2].html : 0, a[2].txt ? a.a.txt = a[2].txt : 0, a[2].ch ? a[2].ch.forEach(b => icAppCreator._n.c([a[0], a.a, b])) : 0]
	}
}
export default icAppCreator
