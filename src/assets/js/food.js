import * as PIXI from 'pixi.js';
import ee from './event';

class Food extends PIXI.Graphics{
  constructor({
    alpha,
    container    
  }){
    super();
    this.size = 20;
    this.alpha = alpha;
    this.beginFill(0xEEDF2F);
    this.drawRect(
      0,
      0,
      this.size,
      this.size);
    this.endFill();
    this.container = container;
  }

  set foodColor(newVal){
    this.color = newVal;
  }
  set foodSize(newVal){
    this.width = newVal;
    this.height = newVal;
  }
  set foodCoords(newVal){
    this.x = newVal[0];
    this.y = newVal[1];
  }
  set foodActive(bool){
    this.container.addChild(this);
  }
  
  set(){
    let x = this.getNewCoords(),
        y = this.getNewCoords();
    while(this.isIncluded([x, y])){
      x = this. getNewCoords();
      y = this. getNewCoords();
    }
    this.x = x;
    this.y = y;
  }
  
  getNewCoords(){
    return Math.floor(Math.random() * ((game.view.width/this.size) +1)) * this.size;
  }
  
  isIncluded(arr){
    return game.snake.coords.filter((coord) => {
      return coord[0] == arr[0] && coord[1] == arr[1];
    }).length > 0 ? true : false;  
  }
}

export default Food;