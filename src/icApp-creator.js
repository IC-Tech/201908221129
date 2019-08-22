const icAppCreator = {
	create: (icApp, e, d) => d.forEach(a => icAppCreator._n.c([icApp, e, a])),
	_n: {
		c: a=> [a.a = new a[0].e(a[0].cE(a[2].t)), a[2].cl ? a.a.cla(a[2].cl) : 0, a[2].ch ? a[2].ch.forEach(b => icAppCreator._n.c([a[0], a.a, b])) : 0, a[1].cha(a.a.v)]
	}
}
export default icAppCreator
