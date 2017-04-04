console.log("cube.js loaded");

const config = {
	active: true
}

// initialization
var scene = new THREE.Scene();

// create camera with a position
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 500 );

// create a renderer (the canvas)
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

// actually add it to the DOM
if (document.getElementById("webgl-background")) {
	var div = document.getElementById("webgl-background");
}

if (config.active && div) {
	div.appendChild( renderer.domElement ); // disabled while developping the rest of the site
} else {
	console.warn("cube.js is disabled on this page.");
}

/* ------------------------------------------------------- */
// Adding window resize support
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
var mouse = new THREE.Vector2();
var mouseX = 0;
var mouseY = 0;
var intersected;
var impactPoint;

// adding window tilt !
window.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener( 'mouseover', onDocumentMouseMove, false );
document.addEventListener( 'touchstart', onDocumentTouchStart, false );
document.addEventListener( 'touchmove', onDocumentTouchMove, false );

function onDocumentTouchStart( event ) {
	if ( event.touches.length == 1 ) {
		//event.preventDefault();

		mouseX = ( event.touches[0].pageX - (window.innerWidth / 2) ) / 10;
		mouseY = ( event.touches[0].pageY - (window.innerWidth / 2) ) / 10;

		mouse.x = ( event.touches[0].pageX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.touches[0].pageY / window.innerHeight ) * 2 + 1;
	}
}

function onDocumentTouchMove( event ) {
	if ( event.touches.length == 1 ) {
		//event.preventDefault();

		mouseX = ( event.touches[0].pageX - (window.innerWidth / 2) ) / 10;
		mouseY = ( event.touches[0].pageY - (window.innerWidth / 2) ) / 10;

		mouse.x = ( event.touches[0].pageX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.touches[0].pageY / window.innerHeight ) * 2 + 1;
	}
}

function onDocumentMouseMove( event ) {
	mouseX = ( event.clientX - window.innerWidth / 2 ) / 10; // [ -innerWidth/ 4, +innerWidth/ 4 ]
	mouseY = ( event.clientY - window.innerHeight / 2 ) / 10;

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1; // [ -1, +1 ]
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

/* ------------------------------------------------------- */

// create a light
var light = new THREE.DirectionalLight( 0x3d3d3d);
light.position.set( camera.position.x, camera.position.y, camera.position.z ).normalize();

// add it to the scene
scene.add(light);

var ambientLight = new THREE.AmbientLight( 0xffffff );
ambientLight.intensity = 0.25
scene.add(ambientLight);

/* ------------------------------------------------------- */
// create invisible "plane" for raytracing / collision detection with precise coordinates

var wallGeo = new THREE.BoxGeometry( 1500, 1500, 1 );
var wallMaterial = new THREE.MeshBasicMaterial({
	color: 0xfff000
})
var wall = new THREE.Mesh( wallGeo, wallMaterial );
wall.material.visible = false;
scene.add(wall);

// create a cube
var plane = new THREE.Object3D();

function createBlock( positionX, positionY ){
	var material = new THREE.MeshPhongMaterial( {
		color : 0x333333, // 0xb20000
		emissive : 0x000000,
		specular: 0x777777, //eb6012
		shininess: 20,
		fog: false,
		vertexColors : THREE.NoColors,
		shading: THREE.SmoothShading,
		side: THREE.FrontSide,
		depthTest: true,
		depthWrite: true,

	} );
	var geometry =  new THREE.BoxGeometry( 50, 50, 50 );

	var cube = new THREE.Mesh( geometry, material );
	cube.position.x = positionX;
	cube.position.y = positionY;

	plane.add( cube );
}

createBlock( 0,0 );

for ( var y = 0; y < 20; y++ ) {  // make a new row
	for ( var x = 0; x < 40; x++ ) { // make a line
		createBlock( x*55, y*55 );
	}
}

plane.position.x = -40 * 55 / 2;
plane.position.y = -20 * 55 / 2;
scene.add( plane );

/* ------------------- INTERACTIVITY ------------------------------ */

var raycaster = new THREE.Raycaster();

/* ------------------------------------------------------- */

/* === trying to decrease all scales of all cubes function of distance to raytraced impact point */

function render() {
	requestAnimationFrame( render );

	camera.position.x += ( mouseX - camera.position.x ) * 0.5;
	camera.position.y += ( -mouseY - camera.position.y ) * 0.5;
	camera.lookAt( scene.position );

	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObject( wall, false );

	if ( intersects.length > 0 ) { // if ray intersects anything
		intersected = intersects[ 0 ].object;
		impactPoint = intersects[ 0 ].point;

		plane.children.forEach( function ( cube ) {
			var distanceToImpact = cube.getWorldPosition().distanceTo( impactPoint );
			if ( distanceToImpact > 400 )
			distanceToImpact = 400;


			cube.scale.x = Math.sqrt( distanceToImpact / 400 );
			cube.scale.y = Math.sqrt( distanceToImpact / 400 );
			cube.scale.z = Math.sqrt( distanceToImpact / 400 );
		} );

	}

	light.position.x = mouse.x;
	light.position.y = mouse.y;
	renderer.render( scene, camera );
}
render();
