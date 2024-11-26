import { useEffect, useState } from 'react'
import './App.css'
import * as THREE from "three"
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DragControls } from 'three/addons/controls/DragControls.js';
import { FlyControls } from 'three/addons/controls/FlyControls.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

function App() {

  useEffect(() => {
    const scene = new THREE.Scene();
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({color: "red"})
    const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cubeMesh);


    let x = 2;
    for  (let i = 0; i < 10; i++) {
      const newcubemesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
      scene.add(newcubemesh)
      newcubemesh.position.x = x
      x = x + 2;
    }
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30);
    camera.position.z = 5;
    camera.aspect = window.innerWidth / window.innerHeight;

    const canvas = document.querySelector(".threejs")

    const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true})
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera)

    const maxPixelRatio = Math.min(window.devicePixelRatio, 2); 
    renderer.setPixelRatio(maxPixelRatio); 

    const orbitControls = new OrbitControls(camera, canvas)
    orbitControls.enableDamping = true;
    orbitControls.autoRotate = true;
    orbitControls.update();

    // const control = new TrackballControls(camera, canvas)
    // control.rotateSpeed = 1.0;
    // control.zoomSpeed = 1.2;
    // control.panSpeed = 0.8;


    const MeshArray = []
    scene.children.forEach((child) => {
      MeshArray.push(child)
    })

    const dragControls = new DragControls(MeshArray, camera, canvas);
      dragControls.addEventListener('dragstart', () => {
        orbitControls.enabled = false;
    });

    dragControls.addEventListener('dragend', () => {
        orbitControls.enabled = true;
    });
    dragControls.update();

    // const controls = new FlyControls(camera, canvas);
    // controls.movementSpeed = 100;
    // controls.rollSpeed = Math.PI / 24;
    // controls.autoForward = false;
    // controls.dragToLook = false;


    // const pointerLockControls = new PointerLockControls(camera, canvas)



    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    })

    const clock = new THREE.Clock();

    const renderLoop = () => {
      orbitControls.update()
      dragControls.update();



      const delta = clock.getDelta();
      renderer.render(scene, camera)
      requestAnimationFrame(renderLoop)
    }
    renderLoop();
  }, [])

  return (
    <div><canvas className='threejs'></canvas></div>
  )
}

export default App
