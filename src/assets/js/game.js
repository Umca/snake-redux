import * as PIXI from 'pixi.js';
import Message from './message';
import Food from './food';
import ee from './event';
import Snake from './snake';
import {Model} from './model';
import Score from './score';
import {
  userAction
} from './action';

class Game extends PIXI.Application {
  constructor({
    width,
    height,
    options,
    store
  }) {
    super(width, height, options);
    this.keys = {
      up: [38, 75, 87],
      down: [40, 74, 83],
      left: [37, 65, 72],
      right: [39, 68, 76],
      start_game: [13, 32]
    };
    this.width = width;
    this.height = height;
    this.over = store.game.gameOver;
    this.speedCounter = 0;
    this.speed = store.game.gameSpeed;
    this.message = new Message({
      container: this.stage,
      text: store.message.messageText,
      alpha: 1,
      x: this.view.width / 2,
      y: this.view.height / 2

    });
    this.score = new Score({
      container: this.stage,
      text: store.score.score,
      x: this.view.width / 2,
      y: this.view.height / 2 - 275,
      fontSize: 500,
      alpha: 0.2
    });
     this.snake = new Snake({
      x: store.snake.snakeCoords[0][0],
      y: store.snake.snakeCoords[0][1],
      alpha: 1
    });
    this.food = new Food({
      alpha: 1
    });

    this.binding(store);
    this.addGameToPage();
    this.addKeysListener();
    //this.score.listenToScoreChanging();
  }

  tickerFn() {
    if (this.speedCounter < this.speed) {
      this.speedCounter++;
      return;
    } else {
      this.snake.move();
      this.speedCounter = 0;
    }
  }
  binding(store){
    store.bindToComponent(this.message, 'message');
    store.bindToComponent(this.snake, 'snake');
    store.bindToComponent(this.food, 'food');
    store.bindToComponent(this.score, 'score');
    store.bindToComponent(this, 'game');
  }

  addKeysListener() {
    window.addEventListener('keydown', (e) => {
      let lastKey = this.getKey(this.keys, e.keyCode);
      store.dispatch(userAction(lastKey));

      // if(['up','right','down','left'].indexOf(lastKey) >=0
      //   && lastKey !== this.inverseDirection[store.snakeDirection]
      //   ){

      //   this.snake.direction = lastKey;
      // } else if(['start_game'].indexOf(lastKey) >=0 ){
      //   this.startGame();        
      //   this.ticker.add(this.tickerFn, this)
      // }
    })
  }
  getKey(obj, value) {
    for (var key in obj) {
      if (obj[key] instanceof Array && obj[key].indexOf(value) >= 0) {
        return key;
      }
    }
    return null;
  }

  startGame() {
    this.over = false;
    this.startMessage.alpha = 0;
    if (this.endMessage) {
      this.endMessage.alpha = 0;
    }
    this.addSnake();
    this.addFood();
  }
  addGameToPage() {
    let windowW = window.innerWidth;
    let windowH = window.innerHeight;
    document.body.appendChild(this.view);
    this.view.style.position = 'absolute';
    this.view.style.left = `${windowW * 0.5 - this.view.width * 0.5}px`;
  }
  addSnake() {
    this.snake = new Snake({
      container: this.stage,
      x: 0,
      y: 0,
      alpha: 1
    })
  }
  addFood() {
    this.food = new Food({
      container: this.stage,
      alpha: 1
    })
  }
  reset() {
    this.stage.removeChild(this.food);
    this.stage.removeChild(this.snake);
  }
  stopGame() {
    this.ticker.remove(this.tickerFn, this);
    this.reset();
    this.over = true;
    this.score = 0;
    ee.emit('scoreChanged', [game.score]);
    this.endMessage.alpha = 1;
    this.endMessage.appear();
    this.startMessage.alpha = 1;
  }
}

export default Game;