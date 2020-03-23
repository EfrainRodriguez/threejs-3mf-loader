import * as THREE from '/modules/threejs/three.module.js';
import { ThreeMFLoader } from '/modules/3mfloader/3MFLoader.js';
import { OrbitControls } from '/modules/orbitcontrols/OrbitControls.js';
import Plot from '/modules/plotting/load.js';

let manager = new THREE.LoadingManager();
let loader = new ThreeMFLoader(manager);

let camera = new THREE.PerspectiveCamera( 1, window.innerWidth / window.innerHeight, 0.01, 1000000 );
camera.position.set( 0, 0, 50000 );

let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer( { antialias: true } );
let controls = new OrbitControls( camera, renderer.domElement );

console.log('load axis')
Plot.load(
    '/public/3dmodels/x-axis.3mf',
    loader,
    (data) => {
        data.quaternion.setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0)); // z-up conversion
        scene.add(data);
        scene.background = new THREE.Color(0xa0a0a0);
        loadExtruder();
    }
);

let extruder = null;

function loadExtruder(){
    console.log('load extruder')
    Plot.load(
        '/public/3dmodels/x-axis.3mf',
        loader,
        (data) => {
            extruder = data;
            extruder.quaternion.setFromEuler( new THREE.Euler( - Math.PI / 2, 0, 0 ) ); 	// z-up conversion
            extruder.position.set(0,-25,25);
            scene.add(extruder);
            
            manager.onLoad = function () {
                render();
            };

            renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.gammaOutput = true;
			renderer.gammaFactor = 2.2;
			renderer.shadowMap.enabled = true;
			renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            document.body.appendChild( renderer.domElement );
            
            controls.addEventListener( 'change', render );

            window.addEventListener( 'resize', onWindowResize, false );
			render();
        }
    );
}

function render() {
    extruder.position.set(200,-25,25);
    renderer.render( scene, camera );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
}
