import * as BABYLON from '@babylonjs/core';
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import 'babylonjs-loaders';

// Import stylesheets

const canvas = document.getElementById('renderCanvas');
var createScene = function(){
    
    var scene = new BABYLON.Scene(engine);
    // Default Environment
    var environment = scene.createDefaultEnvironment({ enableGroundShadow: true, groundYBias: 1 });
    var building = BABYLON.SceneLoader.Append("./", "casa_do_lago.gltf", scene, function (meshes) {    
      scene.createDefaultCameraOrLight(true, true, true); 
    }); 
    scene.debugLayer.show();
    return scene;
};
               
var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
var scene = createScene();

engine.runRenderLoop(function () {
            if (scene) {
                scene.render();
            }
        });

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });
