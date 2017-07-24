import * as PIXI from 'pixi.js';
import Message from './message';
import Food from './food';
import ee from './event';
import Snake from './snake';
import {Model} from './model';
import Score from './score';
import {
  userAction,
  addScore,
  endGame,
  setFood
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
      alpha: 1,
      container: this.stage
    });
    this.food = new Food({
      alpha: 1,
      container: this.stage
    });

    this.binding(store);
    this.addGameToPage();
    this.addKeysListener();

  }
  set gameOver(bool){
    if (!bool){
      this.ticker.add(this.tickerFn, this);
    } else {
      this.stopGame();
    }
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

  addGameToPage() {
    let windowW = window.innerWidth;
    let windowH = window.innerHeight;
    document.body.appendChild(this.view);
    this.view.style.position = 'absolute';
    this.view.style.left = `${windowW * 0.5 - this.view.width * 0.5}px`;
  }
  reset() {
    this.stage.removeChild(this.food);
    this.stage.removeChild(this.snake);
  }
  stopGame() {
    this.ticker.remove(this.tickerFn, this);
    this.reset();
  }

  checkCollision(arr){
      let [x, y] = arr;
      if(x > this.view.width - this.snake.size || y > this.view.height - this.snake.size || x < 0 || y < 0 || this.snake.isCannibal([x,y])){
        store.dispatch(endGame())
      }
  }

  checkCollisionwithFood(arr){
    let headX = arr[0],
        headY = arr[1];
    let headCenterX = headX + this.snake.size / 2;
    let headCenterY = headY + this.snake.size / 2;
    let foodCenterX = this.food.x + this.food.size / 2;
    let foodCenterY = this.food.y + this.food.size / 2;
    
    let vx = headCenterX - foodCenterX ;
    let vy = headCenterY - foodCenterY ; 
    
    if(Math.abs(vx) < this.snake.size){
      if(Math.abs(vy) < this.snake.size){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  
  shouldEat(arr){
    if(this.checkCollisionwithFood(arr)){
      let score = parseInt(this.score.text) + 1;
      store.dispatch(addScore(score));
      if(this.score % 5 === 0 && this.score <=20 ){
        this.speed -= 100;
      }
      this.food.setFood();
      //store.dispatch(setFood())
      this.snake.countNewCoord();
      this.snake.drawItem(this.snake.coords[this.snake.coords.length - 1][0], this.snake.coords[this.snake.coords.length - 1][1]);
    }
  }
  
  
}

export default Game;