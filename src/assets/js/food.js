import * as PIXI from 'pixi.js';
import ee from './event';

class Food extends PIXI.Graphics{
  constructor({
    container,
    alpha,    
  }){
    super();
    this.container = container;
    this.container.addChild(this);
    this.size = 20;
    this.alpha = alpha;
    this.beginFill(0xEEDF2F);
    this.drawRect(
      0,
      0,
      this.size,
      this.size);
    this.endFill();
    this.x = Math.floor(Math.random() * (((game.view.width-this.size)/this.size) +1)) * this.size;
    this.y = Math.floor(Math.random() * (((game.view.height-this.size)/this.size) +1)) * this.size;
    console.log(this.x, this.y)
  }
  
  set(){
    let x = this.getNewCoords(), y = this.getNewCoords();
    while(this.isIncluded([x, y])){
      x = this. getNewCoords();
      y = this. getNewCoords();
    }
    this.x = x;
    this.y = y;
    console.log(this.x, this.y)
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