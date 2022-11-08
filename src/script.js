import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene()
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

// sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)

})

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (e) => {
    cursor.x = -(e.clientX / sizes.width - 0.5)
    cursor.y = e.clientY / sizes.height - 0.5
})

window.addEventListener('dblclick', (e) => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if (!fullscreenElement) {

        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        }
        else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
    }
    else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }
    // console.log('document.fullscreenElement');
    // console.log(document.fullscreenElement);
})



mesh.rotation.reorder('YXZ')

scene.add(mesh)

const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)


camera.position.z = 3
scene.add.camera

const canvas = document.querySelector('canvas.webgl')

// Controls

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    // update controls
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true

})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


tick()