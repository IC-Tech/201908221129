/* Copyright © Imesh Chamara 2020 */
"use strict";
import '../../icApp/icApp.js'
import {IAR} from '../../icApp/icApp-render.js'
import './202002171833-s.scss'
import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

ic.init = icApp => {
var _root_ = new icApp.e('#root')
_root_.chr()

const defaultWait = 1200
window.ic = window.ic || []
window.ic.pageLoad = Date.now()

var icons = null
class ICTech extends IAR {
	constructor() {
		super()
		this.data = {
			UI: 0,
			fps: '...'
		}
	}
	didMount() {
var shadows = 1;
var camera, scene, renderer, orbitControl;
var geometry, material, ground, sun;
var keys = {}
var lastAnimate = 0, _animate = [], animate_id = 0
var sizeW = window.innerWidth, sizeH = window.innerHeight, mouseX = 0, mouseY = 0
var el = icApp.qs('#can')
var stats = new Stats();
el.parentElement.appendChild(stats.dom);
el.addEventListener('mousemove', _ => {
	mouseX = _.clientX
	mouseY = _.clientY
})
window.addEventListener('resize', _ => {
	sizeH = window.innerHeight;
	sizeW = window.innerWidth;
	renderer.setSize(sizeW, sizeH);
	camera.aspect = sizeW / sizeH;
	camera.updateProjectionMatrix();
})
window.addEventListener('keydown', _ => ['a', 'd', 's', 'w'].some(a => a == _.key ? (keys[a] = 1) : 0))
window.addEventListener('keyup', _ => ['a', 'd', 's', 'w'].some(a => !(a == _.key ? (keys[a] = 0) : 1)))
window.addEventListener('focus', _ => animate_id ? 0 : animate())
window.addEventListener('blur', _ => animate_id = cancelAnimationFrame(animate_id))
el.width = sizeW
el.height = sizeH

document.hasFocus() ? animate() : 0
function ani() {
	this._frames = []
	this.enabled = !0
	this.lastAnimate = 0
}
ani.prototype.update = function () {
	var now = Date.now()
	var d = (now - lastAnimate) / 1000
	this._frames.forEach((_, a) => {
		//if(_.t > now) return
		//this._frames[a].t = now + this._frames[a].d
		this._frames[a].fn(d)
	})
	lastAnimate = now
}
class mini {
	constructor(_) {
		var pixRatio = 1 / 32
		var texture = THREE.ImageUtils.loadTexture(_ ? _ : '/assets/texture/char.png')
		texture.magFilter	= THREE.NearestFilter;
		texture.minFilter	= THREE.NearestFilter;
		function mapUv(geometry, faceIdx, x1, y1, x2, y2){
			var tileUvW	= 1/64;
			var tileUvH	= 1/32;
			if( geometry.faces[faceIdx] instanceof THREE.Face3 ){
				var UVs = geometry.faceVertexUvs[0][faceIdx * 2];
				UVs[0].x = x1 * tileUvW;	UVs[0].y = y1 * tileUvH;
				UVs[1].x = x1 * tileUvW;	UVs[1].y = y2 * tileUvH;
				UVs[2].x = x2 * tileUvW;	UVs[2].y = y1 * tileUvH;
				var UVs = geometry.faceVertexUvs[0][faceIdx * 2 + 1];
				UVs[0].x = x1 * tileUvW;	UVs[0].y = y2 * tileUvH;
				UVs[1].x = x2 * tileUvW;	UVs[1].y = y2 * tileUvH;
				UVs[2].x = x2 * tileUvW;	UVs[2].y = y1 * tileUvH;
			}
			else if( geometry.faces[faceIdx] instanceof THREE.Face4 ){
				var UVs = geometry.faceVertexUvs[0][faceIdx];
				UVs[0].x = x1 * tileUvW;	UVs[0].y = y1 * tileUvH;
				UVs[1].x = x1 * tileUvW;	UVs[1].y = y2 * tileUvH;
				UVs[2].x = x2 * tileUvW;	UVs[2].y = y2 * tileUvH;
				UVs[3].x = x2 * tileUvW;	UVs[3].y = y1 * tileUvH;
			}
		}
		var mapUvs = _ => _.m.forEach((a, b) => a ? mapUv(_.g, b, a[0], a[1], a[2], a[3]) : 0) ? _ : _
		var material	= new THREE.MeshBasicMaterial({map	: texture})
		var _ = new THREE.Object3D()
		var head = new THREE.BoxGeometry(8 * pixRatio, 8 * pixRatio, 8 * pixRatio)
		head = new THREE.Mesh(mapUvs({ g: head, m: [ [16, 24, 24, 16], [ 0, 24,  8, 16], [ 8, 32, 16, 24], [16, 32, 24, 24], [ 8, 24, 16, 16], [24, 24, 32, 16] ]}).g, material)
		head.position.set(0, 28 * pixRatio, 0)

		var arml = new THREE.BoxGeometry(4 * pixRatio, 12 * pixRatio, 4 * pixRatio)
		arml.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -4 * pixRatio, 0))
		arml = new THREE.Mesh(mapUvs({ g: arml, m: [ [40, 12, 44, 0], [48, 12, 52, 0], [44, 16, 48,12], [48, 16, 52,12], [44, 12, 48, 0], [52, 12, 56, 0] ]}).g, material)
		arml.position.set(-6 * pixRatio, (18 + 4) * pixRatio, 0)

		var armr = new THREE.BoxGeometry(4 * pixRatio, 12 * pixRatio, 4 * pixRatio)
		armr.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -4 * pixRatio, 0))
		armr = new THREE.Mesh(mapUvs({ g: armr, m: [ [40, 12, 44, 0], [48, 12, 52, 0], [44, 16, 48,12], [48, 16, 52,12], [44, 12, 48, 0], [52, 12, 56, 0] ]}).g, material)
		armr.position.set(6 * pixRatio, (18 + 4) * pixRatio, 0)

		var legl = new THREE.BoxGeometry(4 * pixRatio, 12 * pixRatio, 4 * pixRatio)
		legl.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -4 * pixRatio, 0))
		legl = new THREE.Mesh(mapUvs({ g: legl, m: [ [8, 12, 12, 0], [ 0, 12, 4, 0], [4, 16, 8, 12], [8, 16, 12,12], [ 4, 12, 8, 0], [12,12, 16, 0] ]}).g, material)
		legl.position.set(-2 * pixRatio, (6 + 4) * pixRatio, 0)

		var legr = new THREE.BoxGeometry(4 * pixRatio, 12 * pixRatio, 4 * pixRatio)
		legr.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -4 * pixRatio, 0))
		legr = new THREE.Mesh(mapUvs({ g: legr, m: [ [8, 12, 12, 0], [ 0, 12, 4, 0], [4, 16, 8, 12], [8, 16, 12,12], [ 4, 12, 8, 0], [12,12, 16, 0] ]}).g, material)
		legr.position.set(2 * pixRatio, (6 + 4) * pixRatio, 0)

		var body = new THREE.BoxGeometry(8 * pixRatio, 12 * pixRatio, 4 * pixRatio)
		body = new THREE.Mesh(mapUvs({ g: body, m: [ [16, 12, 20, 0], [28, 12, 32, 0], [20, 16, 28,12], [28, 16, 36,12], [20, 12, 28, 0], [32, 12, 40, 0] ]}).g, material)
		body.position.set(0, 18 * pixRatio, 0)

		;[head, arml, armr, legl, legr, body].forEach(a => _.add(a))
		_.castShadow = !!shadows
		_.receiveShadow=false
		this.ob = _
		this.Mesh = {
			head: head,
			arml: arml,
			armr: armr,
			body: body,
			legl: legl,
			legr: legr
		}
		this._f = []
		console.log(this)
	}
	yes() {
		this._f.push(['yes', _ => {
			if(window._t == 0) return
			console.trace('yes', this);
			window._t = 0;
		}])
	}
	update() {
		this._f.forEach(_=> _[1](_[3]));
	}
}
console.log(mini, new mini())
function init() {

	camera = new THREE.PerspectiveCamera( 45, sizeW / sizeH, 1, 1000 );
	camera.position.set( 0, 4, 4 );
	camera.lookAt( 0, 0, 0 );
	window._ = THREE
	window._0 = camera
	scene = new THREE.Scene();
	
	/*material = new THREE.LineBasicMaterial({ color: 0x0000ff });var points = [];
	points.push( new THREE.Vector3(10, 0, 0));
	points.push( new THREE.Vector3(0, 0, 0));
	points.push( new THREE.Vector3(0, 10, 0));
	geometry = new THREE.BufferGeometry().setFromPoints( points );
	var line = new THREE.Line( geometry, material );
	scene.add( line );*/
	
	geometry = new THREE.PlaneGeometry( 10, 10, 1, 1 );
	material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
	ground = new THREE.Mesh( geometry, material );
	ground.receiveShadow = true;
	ground.castShadow=false;
	ground.rotation.x=-Math.PI/2;
	scene.add( ground );

	sun = new THREE.DirectionalLight( 0xffffff, 0.8);
	sun.position.set(0, 4, 1);
	sun.castShadow = !!shadows
	scene.add(sun);

	sun.shadow.mapSize.width = 256;
	sun.shadow.mapSize.height = 256;
	sun.shadow.camera.near = 0.5;
	sun.shadow.camera.far = 50;

	renderer = new THREE.WebGLRenderer({
		antialias: true,
		canvas: el,
		//alpha: true
	});
	renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setSize( sizeW, sizeH );
	renderer.setClearColor(0x140b33, 1);

	orbitControl = new OrbitControls(camera, el);//helper to rotate around in scene
	orbitControl.addEventListener('change', renderer);
	//orbitControl.enableDamping = true;
	//orbitControl.dampingFactor = 0.8;
	orbitControl.enableZoom = false;
	//orbitControl.enabled = false;
	//scene.background = new THREE.Color( 0xeeeeee );
	//var helper = new THREE.CameraHelper( sun.shadow.camera );
	//scene.add( helper );// enable to see the light cone

	/*var loader = new GLTFLoader();
	loader.load('/assets/little_witch_academia/scene.gltf', function ( gltf ) {
		scene.add( gltf.scene );
		window._1 = gltf
		renderer.render( scene, camera );
	}, undefined, function ( error ) {
		console.error(error);
	});*/

	var _mini = new mini('/assets/texture/superman.png')
	_mini.ob.position.x = 1
	scene.add(_mini.ob)
	_animate.push(_mini.update)
	var _mini2 = new mini('/assets/texture/flash.png')
	_mini2.ob.position.x = 2
	scene.add(_mini2.ob)
	var _mini2 = new mini('/assets/texture/mario.png')
	_mini2.ob.position.x = -1
	scene.add(_mini2.ob)
	scene.add(new mini().ob)

	setInterval(tmain, 1000 / 20)
}
function tmain() {
	var _ = _ => (_ >= 4 ? 4 : (_ <= -4 ? -4 : _))
	if(Object.keys(keys).some(_ => keys[_] == 1)) {
		ball.position.x = _(ball.position.x + (keys['d'] ? 0.1 : (keys['a'] ? -0.1 : 0)))
		ball.position.z = _(ball.position.z + (keys['s'] ? 0.1 : (keys['w'] ? -0.1 : 0)))
	}
}
_animate.push(_ => renderer.render(scene, camera))
function animate() {
	animate_id = requestAnimationFrame( animate );
	stats.begin();
	_animate.forEach(f => f())
	stats.end();
}
init();
	}
	didUpdate() { }
	render() {
		return (
			{ t: 'div', cl: 'ICApp', ch: [
				{ t: 'div', cl: 'c1', ch: [
					{t: 'canvas', at: [['id', 'can']]}
				]}
			]}
		)
	}
}
new ICTech().mount(_root_.v)
}
