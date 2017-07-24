import * as PIXI from 'pixi.js';
import {
    TweenMax
} from 'gsap';
import ee from './event';
import Message from './message';

class Score extends PIXI.Text {
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
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 600
        }
    }) {
        super(text, style);
        this.x = x;
        this.y = y;
        this.currentText = text;
        this.alpha = alpha;
        this.pivot.x = this.width / 2;
        container.addChild(this);
    }

    set score(val) {
        switch (String(val).length) {
            case 2:
                debugger;
                this.x = game.view.width * 0.258;
                break;
            default:
                this.x = game.view.width / 2;
                break;
        }
        this.tween = TweenMax.to(this, 0.3, {
            currentText: val,
            onComplete: () => {
                this.text = val;
            }
        })
    }
}
export default Score;