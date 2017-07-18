const initialState = {
    game:{
        over: false,
        score: 0,
        speed: 500,
        message:'PRESS SPACE TO START',
    },
    snake:{
        direction:'left',
        coords:[],
        color:0X2FC650,
        size: 20,
        amount: 4
    },
    food:{
        coords:[],
        color:0xEEDF2F,
        size: 20
    }
}

const reducer = (state = initialState, action) => {
    return state;
}

export default reducer;