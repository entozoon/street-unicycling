'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hero = function () {
  function Hero() {
    _classCallCheck(this, Hero);

    this.size = 40;
    this.acceleration = 1;
    this.wheel = bodies.circle(canvas.width / 2, canvas.height / 2, this.size, {
      density: 0.001,
      frictionAir: 0.005
    });

    world.add(engine.world, [this.wheel]);

    world.add(engine.world, constraint.create({
      pointA: { x: 300, y: 100 },
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
  }, {
    key: 'update',
    value: function update(input) {
      this.keys = input.keys;
      console.log(this.keys);
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
    showAngleIndicator: true,
    background: '#f00' // not working?
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

      world.add(engine.world, [ground]);
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
