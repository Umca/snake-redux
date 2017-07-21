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
    this.alpha = alpha;
    this.pivot.x = this.width / 2;
    container.addChild(this);

    ee.on('message', () => {
      let val = arguments[0]
      this.text = val
    })
  }

  set messageText(newMes){
    this.text = newMes
  }

  set messageActive(bool){
    if(bool){
      this.alpha = 1;
    } else {
      this.alpha = 0;
    }
  }


  listenToScoreChanging(){
    ee.on('scoreChanged', this.setScore.bind(this));
  }
  
  
  appear(){
    TweenMax.from(this, 0.5, {
      x: -200,
    })
  }
}

export default Message;