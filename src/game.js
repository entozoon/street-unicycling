class Game {
  constructor(props) {
    this.engineClass = props.matter.Engine;
    this.engine = this.engineClass.create();
    this.renderClass = props.matter.Render;
    this.render = this.renderClass.create({
      element: document.body,
      engine: this.engine
    });
    this.world = props.matter.World;
    this.bodies = props.matter.Bodies;
    this.canvas = document.querySelector('canvas');

    // Run engine
    this.engineClass.run(this.engine);

    // Run renderer
    this.renderClass.run(this.render);

    this.setGameDimensions();

    this.addFloor();
    this.addJunk();
    this.addHero();

    window.addEventListener('resize', this.setGameDimensions.bind(this), false);
  }

  addFloor() {
    let width = this.canvas.width,
      height = 10,
      x = 0 + width / 2,
      y = this.canvas.height - height / 2;

    const ground = this.bodies.rectangle(x, y, width, height, {
      isStatic: true
    });

    this.world.add(this.engine.world, [ground]);
  }

  addJunk() {
    let boxA = this.bodies.rectangle(400, 200, 80, 80);
    let boxB = this.bodies.rectangle(450, 50, 100, 100);

    this.world.add(this.engine.world, [boxA, boxB]);
  }

  addHero() {
    const hero = this.bodies.circle(this.canvas.width / 2, 20, 20, 20);

    this.world.add(this.engine.world, [hero]);
  }

  setGameDimensions() {
    this.canvas.width = document.body.clientWidth;
    // Use innerHeight or clientHeight, whichever is less
    this.canvas.height =
      window.innerHeight < document.body.clientHeight
        ? window.innerHeight
        : document.body.clientHeight;
  }
}

let game = new Game({
  matter: Matter
});
