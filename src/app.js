let Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

// Engine
let engine = Engine.create();

// Renderer
let render = Render.create({
  element: document.body,
  engine: engine
});

window.addEventListener('resize', resizeCanvas, false);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let boxA = Bodies.rectangle(400, 200, 80, 80);
let boxB = Bodies.rectangle(450, 50, 100, 100);
let ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// Add bodies to the world
World.add(engine.world, [boxA, boxB, ground]);

// Run engine
Engine.run(engine);

// Run renderer
Render.run(render);
