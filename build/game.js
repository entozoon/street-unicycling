"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hero = function () {
  function Hero(props) {
    _classCallCheck(this, Hero);

    this.body = bodies.circle(canvas.width / 2, 20, 20, 20);
  }

  _createClass(Hero, [{
    key: "getBody",
    value: function getBody() {
      return this.body;
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
  engine: engine
}),
    world = Matter.World,
    bodies = Matter.Bodies,
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
    this.addHero();

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

      world.add(engine.world, [hero.body]);
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
