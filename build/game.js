'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(props) {
    _classCallCheck(this, Game);

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

  _createClass(Game, [{
    key: 'addFloor',
    value: function addFloor() {
      var width = this.canvas.width,
          height = 10,
          x = 0 + width / 2,
          y = this.canvas.height - height / 2;

      var ground = this.bodies.rectangle(x, y, width, height, {
        isStatic: true
      });

      this.world.add(this.engine.world, [ground]);
    }
  }, {
    key: 'addJunk',
    value: function addJunk() {
      var boxA = this.bodies.rectangle(400, 200, 80, 80);
      var boxB = this.bodies.rectangle(450, 50, 100, 100);

      this.world.add(this.engine.world, [boxA, boxB]);
    }
  }, {
    key: 'addHero',
    value: function addHero() {
      var hero = this.bodies.circle(this.canvas.width / 2, 20, 20, 20);

      this.world.add(this.engine.world, [hero]);
    }
  }, {
    key: 'setGameDimensions',
    value: function setGameDimensions() {
      this.canvas.width = document.body.clientWidth;
      // Use innerHeight or clientHeight, whichever is less
      this.canvas.height = window.innerHeight < document.body.clientHeight ? window.innerHeight : document.body.clientHeight;
    }
  }]);

  return Game;
}();

var game = new Game({
  matter: Matter
});
