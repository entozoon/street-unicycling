let engineClass = Matter.Engine,
  engine = engineClass.create(),
  renderClass = Matter.Render,
  render = renderClass.create({
    element: document.body,
    engine: engine,
    options: {
      width: 1024,
      height: 800,
      showAngleIndicator: false,
      wireframes: false // IMPORTANT AS HECK
      //background: '#445'
    }
  }),
  world = Matter.World,
  bodies = Matter.Bodies,
  constraint = Matter.Constraint,
  canvas = document.querySelector('canvas');

class Game {
  constructor(props) {
    // Run engine
    engineClass.run(engine);

    // Run renderer
    renderClass.run(render);

    this.setGameDimensions();

    /*
    renderClass.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 1440, y: 900 }
    });
    */

    this.addFloor();
    this.addJunk();
    this.hero = this.addHero();

    this.keyboard();

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

    const ramp = bodies.rectangle(x + 200, y - 50, width, height, {
      isStatic: true
    });

    Matter.Body.rotate(ramp, Math.PI * 2 / 360 * -30);

    world.add(engine.world, [ground, ramp]);
  }

  addJunk() {
    let boxA = bodies.rectangle(400, 200, 80, 80);
    let boxB = bodies.rectangle(450, 50, 100, 100);

    world.add(engine.world, [boxA, boxB]);
  }

  addHero() {
    let hero = new Hero();

    return hero;
  }

  keyboard() {
    this.keys = {};
    document.body.addEventListener('keyup', e => {
      delete this.keys[e.keyCode];
    });
    document.body.addEventListener('keydown', e => {
      this.keys[e.keyCode] = true;
    });
  }

  update() {
    //console.log(this.keys);
    this.hero.update({
      keys: this.keys
    });
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

const loop = () => {
  game.update();
  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);
