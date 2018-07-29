/*
 * File: Start.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Start() {
    // The camera to view the scene
    this.kBack = "assets/start.png";
    this.mCamera = null;
    this.mMsg = null;
    this.mBack = null;
    this.mRestart = false;
}
gEngine.Core.inheritPrototype(Start, Scene);

Start.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        300,                        // width of camera
        [0, 0, 1280, 720],         // viewport (orgX, orgY, width, height)
        2
    );
    
    this.mBack = new SpriteRenderable(this.kBack);
    this.mBack.setColor([1, 1, 1, 0]);  // No tinting
    this.mBack.getXform().setPosition(-5, 20);
    this.mBack.getXform().setSize(290, 120);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Start.prototype.draw = function () {
    // Step A: clear the canvas
    //gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.mBack.draw(this.mCamera);
    
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Start.prototype.update = function () {
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
        this.mRestart = true;
        gEngine.GameLoop.stop();
    }
};

Start.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.kBack);
    if(this.mRestart){
        var mygame = new EvilComing();
        gEngine.Core.startScene(mygame,true);
    }
};

Start.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBack);
};
