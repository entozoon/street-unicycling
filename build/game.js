'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hero = function () {
  function Hero() {
    _classCallCheck(this, Hero);

    this.size = 40;
    this.acceleration = 0.6;
    this.forceFactor = 0.03;
    this.wheelFrictionAir = 0.003;
    this.jumpForce = 0.02;

    this.wheel = bodies.circle(canvas.width / 2, canvas.height / 2, this.size, {
      density: 0.002,
      frictionAir: this.wheelFrictionAir,
      // friction
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

    world.add(engine.world, constraint.create({
      bodyA: this.man,
      bodyB: this.wheel
    }));
  }

  _createClass(Hero, [{
    key: 'getBody',
    value: function getBody() {
      return this.wheel;
    }
  }, {
    key: 'movement',
    value: function movement() {
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
        //this.man.force.y = -this.jumpForce;
        //this.wheel.force.y = -this.jumpForce;
        //Matter.Body.setAngularVelocity(this.wheel,
        //Matter.Body.applyForce(
        //  this.man,
        //  { x: this.wheel.x, y: this.wheel.y },
        //  {
        //    x: 0.0000000005,
        //    y: 0.0000000005
        //  }
        //);
        this.wheel.force = {
          // this.man.force = {
          x: Math.cos(this.angleBetweenWheelAndMan) * this.jumpForce,
          y: Math.sin(this.angleBetweenWheelAndMan) * this.jumpForce
        };
      }

      /*} else {
        this.body.force.x = 0;
      }*/

      this.setManPosition();
    }
  }, {
    key: 'setManPosition',
    value: function setManPosition() {
      this.angleBetweenWheelAndMan = Matter.Vector.angle(this.wheel.position, this.man.position);
      //this.man.angle = this.angleBetweenWheelAndMan;
      Matter.Body.setAngle(this.man, this.angleBetweenWheelAndMan); // more.. stronger

      this.man.frictionAir = this.wheelFrictionAir;
      this.man.frictionAir *= Math.abs(this.man.angle / (Math.PI * 2) * 360 + 90);
      //console.log(Math.abs(this.man.angle / (Math.PI * 2) * 360 + 90));
    }
  }, {
    key: 'update',
    value: function update(input) {
      this.keys = input.keys;
      this.movement();
    }
  }]);

  return Hero;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var engineClass = Matter.Engine,
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

var Game = function () {
  function Game(props) {
    _classCallCheck(this, Game);

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

  _createClass(Game, [{
    key: 'addFloor',
    value: function addFloor() {
      var width = canvas.width,
          height = 10,
          x = 0 + width / 2,
          y = canvas.height - height / 2;

      var ground = bodies.rectangle(x, y, width, height, {
        isStatic: true
      });

      var ramp = bodies.rectangle(x + 200, y - 50, width, height, {
        isStatic: true
      });

      Matter.Body.rotate(ramp, Math.PI * 2 / 360 * -30);

      world.add(engine.world, [ground, ramp]);
    }
  }, {
    key: 'addJunk',
    value: function addJunk() {
      var boxA = bodies.rectangle(400, 200, 80, 80);
      var boxB = bodies.rectangle(450, 50, 100, 100);

      world.add(engine.world, [boxA, boxB]);
    }
  }, {
    key: 'addHero',
    value: function addHero() {
      var hero = new Hero();

      return hero;
    }
  }, {
    key: 'keyboard',
    value: function keyboard() {
      var _this = this;

      this.keys = {};
      document.body.addEventListener('keyup', function (e) {
        delete _this.keys[e.keyCode];
      });
      document.body.addEventListener('keydown', function (e) {
        _this.keys[e.keyCode] = true;
      });
    }
  }, {
    key: 'update',
    value: function update() {
      //console.log(this.keys);
      this.hero.update({
        keys: this.keys
      });
    }
  }, {
    key: 'setGameDimensions',
    value: function setGameDimensions() {
      canvas.width = document.body.clientWidth;
      // Use innerHeight or clientHeight, whichever is less
      canvas.height = window.innerHeight < document.body.clientHeight ? window.innerHeight : document.body.clientHeight;
    }
  }]);

  return Game;
}();

var game = new Game();

var loop = function loop() {
  game.update();
  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);
