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

    this.doStuff();

    // Run engine
    this.engineClass.run(this.engine);

    // Run renderer
    this.renderClass.run(this.render);

    this.setGameDimensions();

    window.addEventListener('resize', this.setGameDimensions.bind(this), false);
  }

  _createClass(Game, [{
    key: 'doStuff',
    value: function doStuff() {
      var boxA = this.bodies.rectangle(400, 200, 80, 80);
      var boxB = this.bodies.rectangle(450, 50, 100, 100);
      var ground = this.bodies.rectangle(400, 610, 810, 60, { isStatic: true });

      // Add bodies to the world
      this.world.add(this.engine.world, [boxA, boxB, ground]);
    }
  }, {
    key: 'setGameDimensions',
    value: function setGameDimensions() {
      this.canvas.width = document.body.clientWidth;
      // Use innerHeight or clientHeight, whichever is less (*more! overflow hidden means we coo)
      this.canvas.height = window.innerHeight > document.body.clientHeight ? window.innerHeight : document.body.clientHeight;
    }
  }]);

  return Game;
}();

var game = new Game({
  matter: Matter
});
