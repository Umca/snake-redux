import * as PIXI from 'pixi.js';
import {TweenMax} from 'gsap';
import ee from './event';

class Message extends PIXI.Text{
  constructor({
    container,
    text,
    alpha,
    x = 600 * 0.5 - 245,
    y = 600 * 0.5 - 80,
    fontSize = 70,
    style = {
      fill: 0xFFFFFF, 
      fontFamily: 'Arial',
      fontSize: fontSize,
      fontWeight: 'bold',
      align:'center',
      wordWrap : true,
      wordWrapWidth: 600
    }
  }){
    super(text,style);
    this.x = x;
    this.y = y;
    this.currentText = text;
    this.container = container;
    this.alpha = alpha;
    this.pivot.x = this.width / 2;
    this.container.addChild(this);
  }
  
  listenToScoreChanging(){
    ee.on('scoreChanged', this.setScore.bind(this));
  }
  
  setScore(){
    let val = arguments[0]
    console.log(0, this.x)
    switch(val.length){  
      case 2 : debugger; this.x= game.view.width * 0.258; break;
      default: this.x =  game.view.width / 2; console.log(1, this.x)  ; break;  
      console.log(1, this.x)  
    }
    this.tween = TweenMax.to(this, 0.3, {
      onStart:()=>{
        console.log(this)
      },
      currentText: val,
      onComplete: ()=>{
        this.text = val;
      }
    })
  }
  
  appear(){
    TweenMax.from(this, 0.5, {
      x: -200,
    })
  }
}

export default Message;