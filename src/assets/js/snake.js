import * as PIXI from 'pixi.js';
import Food from './food';
import ee from './event';

class Snake extends PIXI.Container {
  constructor({
    container,
    x,
    y,
    alpha
  }) {
    super();
    this.x = x;
    this.y = y;
    this.amount = 4;
    this.size = 20;
    this.color = 0X2FC650;
    this.direction = 'left';
    this.coords = [];
    this.alpha = alpha;
    this.container = container;

  }
  set snakeActive(bool) {
    if (bool) {
      this.addItems();
      this.container.addChild(this);
    } else {
      this.alpha = 0
    }
  }

  set snakeDirection(direction) {
    if (direction) {
      this.direction = direction;
    }
  }
  set snakeSize(size) {
    this.size = size
  }
  set snakeColor(color) {
    this.color = color
  }
  set snakeCoords(coords) {
    this.coords = coords;
  }

  addItems() {
    let startX = game.view.width / 2;
    let startY = game.view.height / 2;

    for (let i = 0; i <= this.amount; i++) {
      let x = startX + this.size * i;
      let y = startY;
      this.drawItem(x, y);
      this.coords.push([x, y]);
    }
  }

  drawItem(x, y) {
    let item = new PIXI.Graphics();
    item.beginFill(this.color);
    item.drawRect(0, 0, this.size, this.size);
    item.endFill;
    item.x = x;
    item.y = y;
    this.addChild(item);
  }

  move() {
    let oldX = this.coords[0][0];
    let oldY = this.coords[0][1];
    switch (this.direction) {
      case 'left':
        oldX -= this.size;
        break;
      case 'right':
        oldX += this.size;
        break;
      case 'up':
        oldY -= this.size;
        break;
      case 'down':
        oldY += this.size;
        break;
    }

    game.checkCollision([oldX, oldY]);
    game.shouldEat([oldX, oldY]);

    this.coords.unshift([oldX, oldY])
    this.coords.pop();

    let len = this.children.length;

    for (let i = 0; i < len; i++) {
      this.children[i].x = this.coords[i][0];
      this.children[i].y = this.coords[i][1];

    }
  }

  countNewCoord() {
    let lastCoordX = this.coords[this.coords.length - 1][0];
    let lastCoordY = this.coords[this.coords.length - 1][1];
    switch (this.direction) {
      case 'left':
        lastCoordX += this.size;
        break;
      case 'right':
        lastCoordX -= this.size;
        break;
      case 'up':
        lastCoordY += this.size;
        break;
      case 'down':
        lastCoordY -= this.size;
        break;
    }
    this.coords.push([lastCoordX, lastCoordY]);
  }

  isCannibal(arr) {
    return this.coords.filter((coord) => {
      return coord[0] == arr[0] && coord[1] == arr[1];
    }).length > 0 ? true : false;
  }
}

export default Snake;