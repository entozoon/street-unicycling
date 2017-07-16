class Hero {
  constructor() {
    this.size = 40;
    this.acceleration = 0.6;
    this.forceFactor = 0.03;
    this.wheelFrictionAir = 0.003;
    this.jumpForce = 0.02;

    this.wheel = bodies.circle(canvas.width / 2, canvas.height / 2, this.size, {
      density: 0.002,
      frictionAir: this.wheelFrictionAir,
      friction: 2000, // no effect
      // restitution

      render: {
        sprite: {
          texture: './build/images/wheel.png',
          xScale: 0.5,
          yScale: 0.5
        }
      }
    });

    this.man = bodies.rectangle(canvas.width / 2, canvas.height / 2 - 120, 50, 30, {
      density: 0.001,
      frictionAir: 0.04 // loads, to stay up
    });

    world.add(engine.world, [this.wheel, this.man]);

    world.add(
      engine.world,
      constraint.create({
        bodyA: this.man,
        bodyB: this.wheel
      })
    );
  }

  getBody() {
    return this.wheel;
  }

  movement() {
    //console.log(this.keys);
    // Right
    if (this.keys[39]) {
      // Rotation AND force, or it's unplayable haha!
      this.wheel.torque = this.acceleration;
      this.wheel.force.x = this.acceleration * this.forceFactor;
    }
    // Left
    if (this.keys[37]) {
      this.wheel.torque = -this.acceleration;
      this.wheel.force.x = -this.acceleration * this.forceFactor;
    }
    //if (this.keys[40]) { // down
    //if (this.keys[38]) { // up
    if (this.keys[32]) {
      // space
      this.wheel.force = {
        x: Math.cos(this.angleBetweenWheelAndMan) * this.jumpForce,
        y: Math.sin(this.angleBetweenWheelAndMan) * this.jumpForce
      };
    }

    this.setManPosition();
  }

  setManPosition() {
    this.angleBetweenWheelAndMan = Matter.Vector.angle(this.wheel.position, this.man.position);
    //this.man.angle = this.angleBetweenWheelAndMan;
    Matter.Body.setAngle(this.man, this.angleBetweenWheelAndMan); // more.. stronger

    this.man.frictionAir = this.wheelFrictionAir;
    this.man.frictionAir *= Math.abs(this.man.angle / (Math.PI * 2) * 360 + 90);
    //console.log(Math.abs(this.man.angle / (Math.PI * 2) * 360 + 90));
  }

  update(input) {
    this.keys = input.keys;
    this.movement();
  }
}
