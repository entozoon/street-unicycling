let engineClass = Matter.Engine,
  engine = engineClass.create(),
  renderClass = Matter.Render,
  render = renderClass.create({
    element: document.body,
    engine: engine
  }),
  world = Matter.World,
  bodies = Matter.Bodies,
  canvas = document.querySelector('canvas');

class Game {
  constructor(props) {
    // Run engine
    engineClass.run(engine);

    // Run renderer
    renderClass.run(render);

    this.setGameDimensions();

    this.addFloor();
    this.addJunk();
    this.addHero();

    window.addEventListener('resize', this.setGameDimensions.bind(this), false);
  }

  addFloor() {
    let width = canvas.width,
      height = 10,
      x = 0 + width / 2,
      y = canvas.height - height / 2;

    const ground = bodies.rectangle(x, y, width, height, {
      isStatic: true
    });

    world.add(engine.world, [ground]);
  }

  addJunk() {
    let boxA = bodies.rectangle(400, 200, 80, 80);
    let boxB = bodies.rectangle(450, 50, 100, 100);

    world.add(engine.world, [boxA, boxB]);
  }

  addHero() {
    const hero = new Hero();

    world.add(engine.world, [hero.body]);
  }

  setGameDimensions() {
    canvas.width = document.body.clientWidth;
    // Use innerHeight or clientHeight, whichever is less
    canvas.height =
      window.innerHeight < document.body.clientHeight
        ? window.innerHeight
        : document.body.clientHeight;
  }
}

let game = new Game();