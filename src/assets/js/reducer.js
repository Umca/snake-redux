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
        console.log(12)
            let res = {...state, gameOver: false, snakeCoords:[20, 20]};
            console.log(res);
            return res;
        case 'END_GAME':
            return {...state, gameOver: true};
        case 'ADD_SCORE':
            break;
        case "CHANGE_DIRECTION":
            return{...state, snakeDirection: action.direction}
        default:
            return state;
    }
}

export default reducer;