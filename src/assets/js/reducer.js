import Reactive from './reactivity';
const initialState = {
    game: {
        gameOver: false,
        gameSpeed: 20,
    },
    message:{
        messageText: 'PRESS SPACE TO START',
        messageActive: true
    },
    snake:{
        snakeDirection:'left',
        snakeCoords:[[0,0]],
        snakeColor:0X2FC650,
        snakeSize: 20,
        snakeAmount: 4,
        snakeActive: false
    },
    food:{
        foodCoords:undefined,
        foodColor:0xEEDF2F,
        foodSize: 20,
        foodActive: false
    },
    score:{
        score: 0,
    }
}

const reducer = (state = new Reactive(initialState), action) => {
    switch(action.type){
        case 'START_GAME':
            state = {...state}
            state.game.gameOver = false;
            state.message.messageActive = false;
            state.snake.snakeActive = true;
            state.food.foodActive = true;
            state.score.score = 0;
            return state;
        case 'END_GAME':
            state = {...state};
            state.game.gameOver = true;
            state.message.messageActive = true;
            state.message.messageText = 'GAME OVER! PRESS SPACE TO START';
            state.snake.snakeActive = false;
            state.food.foodActive = false;
            state.score.score = 0;
            return state;
        case 'ADD_SCORE':
            state = {...state};
            state.score.score = action.score;
            return state;
        case "CHANGE_DIRECTION":
            state = {...state}
            state.snake.snakeDirection = action.direction;
            console.log(action.direction);
            return state;
        default:
            return state;
    }
}

export default reducer;