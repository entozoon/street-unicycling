class Hero {
  constructor(props) {
    this.body = bodies.circle(canvas.width / 2, 20, 20, 20);
  }
  getBody() {
    return this.body;
  }
  movement() {
    if (this.keys[38]) {
      console.log('forward');
      this.body.force.x = 0.005;
    } else {
      this.body.force.x = 0;
    }
  }
  update(input) {
    this.keys = input.keys;
    this.movement();
  }
}
