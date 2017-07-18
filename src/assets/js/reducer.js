const initialState = {
    gameOver: false,
    gameScore: 0,
    gameSpeed: 300,

    snakeDirection:'left',
    snakeCoords:[],
    snakeColor:0X2FC650,
    snakeSize: 20,
    snakeAmount: 4,

    foodCoords:[],
    foodColor:0xEEDF2F,
    foodSize: 20
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'START_GAME':
            return {...state, gameOver: false};
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