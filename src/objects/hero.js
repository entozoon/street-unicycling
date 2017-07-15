class Hero {
  constructor() {
    this.size = 40;
    this.acceleration = 1;
    this.wheel = bodies.circle(canvas.width / 2, canvas.height / 2, this.size, {
      density: 0.001,
      frictionAir: 0.005
    });

    world.add(engine.world, [this.wheel]);

    world.add(
      engine.world,
      constraint.create({
        pointA: { x: 300, y: 100 },
        bodyB: this.wheel
      })
    );
  }

  getBody() {
    return this.wheel;
  }

  movement() {
    if (this.keys[38]) {
      console.log('up');
      //this.wheel.force.x = 0.005;
      this.wheel.torque = this.acceleration;
    }
    if (this.keys[40]) {
      console.log('down');
      this.wheel.torque = -this.acceleration;
    }
    if (this.keys[37]) {
      console.log('left');
    }
    if (this.keys[39]) {
      console.log('right');
    }

    /*} else {
      this.body.force.x = 0;
    }*/
  }

  update(input) {
    this.keys = input.keys;
    console.log(this.keys);
    this.movement();
  }
}
