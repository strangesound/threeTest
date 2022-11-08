import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene()
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
const sizes = {
    width: 800,
    height: 800
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (e) => {
    cursor.x = -(e.clientX / sizes.width - 0.5)
    cursor.y = e.clientY / sizes.height - 0.5
    // console.log(cursor.x);
})


// mesh.position.set(.7, -.6, 1)
// mesh.scale.set(2, .5, .5)
mesh.rotation.reorder('YXZ')

// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * .3
// mesh.rotation.z = Math.PI * 2

scene.add(mesh)

const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)


camera.position.z = 3
// camera.position.x = 1
// camera.position.y = 1
scene.add.camera

const canvas = document.querySelector('canvas.webgl')

// Controls

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()
    // console.log(elapsedTime)
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 5
    // camera.lookAt(mesh.position)

    // update controls
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

// console.log(mesh.position.distanceTo(camera.position));

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias:true

})
renderer.setSize(sizes.width, sizes.height)
tick()