class Hero {
  constructor(props) {
    this.body = bodies.circle(canvas.width / 2, 20, 20, 20);
  }
  getBody() {
    return this.body;
  }
}
