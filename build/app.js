'use strict';

var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// Engine
var engine = Engine.create();

// Renderer
var render = Render.create({
  element: document.body,
  engine: engine
});

var setGameDimensions = function setGameDimensions() {
  console.log('setGameDimensions');
  canvas.width = document.body.clientWidth;
  // Use the innerHeight or clientHeight, whichever is least
  canvas.height = window.innerHeight < document.body.clientHeight ? window.innerHeight : document.body.clientHeight;
};

var canvas = document.querySelector('canvas');
window.addEventListener('resize', setGameDimensions, false);

var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 100, 100);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// Add bodies to the world
World.add(engine.world, [boxA, boxB, ground]);

// Run engine
Engine.run(engine);

// Run renderer
Render.run(render);

setGameDimensions();
