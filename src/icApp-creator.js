const icAppCreator = {
	create: (icApp, e, d) => d.forEach(a => icAppCreator._n.c([icApp, e, a])),
	_n: {
		c: a=> [a.a = new a[0].e(a[0].cE(a[2].t)), a[2].cl ? a.a.cla(a[2].cl) : 0, a[2].at ? a[2].at.forEach(b=>a.a.sa(b[0], b[1])) : 0, a[2].e ? a[2].e.forEach(b=>a.a.ae(a[2].e[0],a[2].e[1])) : 0, a[2].html ? a.a.html = a[2].html : 0, a[2].txt ? a.a.txt = a[2].txt : 0, a[2].ch ? a[2].ch.forEach(b => icAppCreator._n.c([a[0], a.a, b])) : 0, a[1].cha(a.a.v)]
	}
}
export default icAppCreator
