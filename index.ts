import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, MeshBuilder, PBRMetallicRoughnessMaterial, Color3 } from '@babylonjs/core';
import { createEngine, createScene, createPBRSkybox, createArcRotateCamera } from './babylon';

// Import stylesheets
import './style.css';

const canvas: HTMLCanvasElement = document.getElementById('root') as HTMLCanvasElement;
const engine = createEngine(canvas);
const scene = createScene();
createPBRSkybox()

createArcRotateCamera();


const light = new HemisphericLight(name, Vector3.Zero(), scene);
light.intensity = 1;


// add ground
const groundMesh = MeshBuilder.CreatePlane('ground', { size: 100 }, scene)
const groundMat = new PBRMetallicRoughnessMaterial('ground-material', scene)
groundMat.baseColor = Color3.FromHexString('#333333')
groundMat.metallic = 0.3
groundMat.roughness = 0.6
groundMat.backFaceCulling = false
groundMesh.material = groundMat
groundMesh.rotation = new Vector3(Math.PI / 2, 0, 0)


// add cube
const cubeMesh = MeshBuilder.CreateBox('cube', { size: 2 }, scene)
const cubeMat = new PBRMetallicRoughnessMaterial('cube-material', scene)
cubeMat.baseColor = Color3.FromHexString('#ffcc44')
cubeMat.metallic = 0.8
cubeMat.roughness = 0.2
cubeMesh.material = cubeMat
cubeMesh.position = new Vector3(0, 2, 0)


engine.runRenderLoop(() => {
  if (scene.activeCamera) {
    scene.render();
  }
})

// stackblitz cleanup for hmr
// remove if not on stackblitz
export const __unload = () => {
  // delete old engine
  engine.dispose();
}