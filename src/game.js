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

    this.doStuff();

    window.addEventListener('resize', this.setGameDimensions.bind(this), false);
  }

  doStuff() {
    let boxA = this.bodies.rectangle(400, 200, 80, 80);
    let boxB = this.bodies.rectangle(450, 50, 100, 100);
    let width = this.canvas.width,
      height = 10;

    let ground = this.bodies.rectangle(
      0 + width / 2,
      this.canvas.height - height / 2,
      width,
      height,
      {
        isStatic: true
      }
    );

    // Add bodies to the world
    this.world.add(this.engine.world, [boxA, boxB, ground]);
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
