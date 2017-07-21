import * as PIXI from 'pixi.js';
import Food from './food';
import ee from './event';

class Snake extends PIXI.Container{
  constructor({
    container,
    x,
    y,
    alpha
  }){
    super();
    this.x = x;
    this.y = y;
    this.amount = 4;
    this.size = 20;
    this.color = 0X2FC650;
    this.direction = 'left';
    this.coords=[];
    this.alpha = alpha;

  }





  addItems(){
    let startX = game.view.width / 2 ;
    let startY = game.view.height / 2;
    
    for (let i = 0 ; i <= this.amount ; i++){
      let x = startX + this.size * i;
      let y = startY;
      this.drawItem(x, y);
      this.coords.push([x, y]);
    }
  }
  
  drawItem(x, y){
    let item = new PIXI.Graphics();
      item.beginFill(this.color);
      item.drawRect(0,0, this.size, this.size);
      item.endFill;
      item.x = x;
      item.y = y;
      this.addChild(item);
  }
  
  move(){
     let oldX = this.coords[0][0];
     let oldY = this.coords[0][1];
      switch(this.direction){
        case 'left': oldX -=this.size; break;
        case 'right': oldX +=this.size; break;
        case 'up': oldY -=this.size; break;
        case 'down': oldY +=this.size; break;
      }
    this.checkCollision([oldX, oldY]);
    this.shouldEat([oldX, oldY]);
    this.coords.unshift([oldX, oldY])
    this.coords.pop();
    
    let len = this.children.length;
    for(let i = 0; i < len ; i++){
      this.children[i].x = this.coords[i][0];
      this.children[i].y = this.coords[i][1];
      
    }
  }
  
  checkCollision(arr){
      let [x, y] = arr;
      if(x > game.view.width - this.size || y > game.view.height - this.size || x < 0 || y < 0 || this.isCannibal([x,y])){
        game.stopGame();
      }
    }
  
  countNewCoord(){
    let lastCoordX = this.coords[this.coords.length - 1][0];
    let lastCoordY = this.coords[this.coords.length - 1][1];
    switch(this.direction){
        case 'left': lastCoordX +=this.size; break;
        case 'right': lastCoordX -=this.size; break;
        case 'up': lastCoordY+=this.size; break;
        case 'down': lastCoordY -=this.size; break;
      }
    this.coords.push([lastCoordX , lastCoordY]);
  }
  
  checkCollisionwithFood(arr){
    let headX = arr[0],
        headY = arr[1];
    let headCenterX = headX + this.size / 2;
    let headCenterY = headY + this.size / 2;
    let foodCenterX = game.food.x + game.food.size / 2;
    let foodCenterY = game.food.y + game.food.size / 2;
    
    let vx = headCenterX - foodCenterX ;
    let vy = headCenterY - foodCenterY ; 
    
    if(Math.abs(vx) < this.size){
      if(Math.abs(vy) < this.size){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  
  shouldEat(arr){
    if( this.checkCollisionwithFood(arr)){
      game.score++;
      if(game.score % 5 === 0 && game.score <=20 ){
        game.speed -= 100;
      }
      game.score++;
      ee.emit('scoreChanged', [game.score]);
      game.food.set();
      this.countNewCoord();
      this.drawItem(this.coords[this.coords.length - 1][0], this.coords[this.coords.length - 1][1]);
    }
  }
  
  isCannibal(arr){
    return this.coords.filter((coord) => {
      return coord[0] == arr[0] && coord[1] == arr[1];
    }).length > 0 ? true : false;  
  }
  
}

export default Snake;