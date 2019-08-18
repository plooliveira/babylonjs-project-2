import { Engine, Scene, ArcRotateCamera, Vector3, CubeTexture, Color4 } from '@babylonjs/core'
import '@babylonjs/inspector'

export let canvas: HTMLCanvasElement
export let engine: Engine
export let scene: Scene
export let camera: ArcRotateCamera
let handleResize: any

export const createEngine = (hostCanvas: HTMLCanvasElement) => {
  canvas = hostCanvas
  engine = new Engine(canvas, true, {}, true)

  handleResize = () => engine.resize()
  window.addEventListener('resize', handleResize)

  return engine
}

export const createScene = () => {
  scene = new Scene(engine)

  scene.clearColor = new Color4(240, 240, 240, 1)

  scene.onKeyboardObservable.add(({ event }) => {
    if (event.ctrlKey && event.shiftKey && event.code === 'KeyI') {
      if (scene.debugLayer.isVisible()) {
        scene.debugLayer.hide()
      } else {
        scene.debugLayer.show()
      }
    }
  })

  return scene
}

export const createArcRotateCamera = () => {
    const camera = new ArcRotateCamera(name, -(Math.PI / 2), Math.PI / 2, 20, Vector3.Zero(), scene, true)
    scene.activeCamera = camera
    camera.attachControl(canvas, false)

    // Set some basic camera settings
    camera.panningAxis = new Vector3(1, 0, 1)
    camera.minZ = 0.1
    camera.allowUpsideDown = false
    camera.lowerRadiusLimit = 2
    camera.upperRadiusLimit = 100
    camera.upperBetaLimit = Math.PI / 2.2
    camera.panningSensibility = 1000
    camera.checkCollisions = true
    camera.collisionRadius = new Vector3(2, 2, 2)

    return camera
}

export const createPBRSkybox = () => {
  const environmentTexture = CubeTexture.CreateFromPrefilteredData(
    'https://assets.babylonjs.com/environments/environmentSpecular.env',
    scene,
  )
  
  const skyboxMesh = scene.createDefaultSkybox(environmentTexture, true, 1000, 0.5, true) as Mesh
  
  return skyboxMesh
}


// stackblitz cleanup for hmr
// remove if not on stackblitz
export const __unload = () => {
  engine.dispose()
  window.removeEventListener('resize', handleResize)
}