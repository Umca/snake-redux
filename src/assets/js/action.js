const startGame = () => {
    return {
        type: 'START_GAME'
    }
}

export const endGame = () => {
    return{
        type: 'END_GAME'
    }
}

export const addScore = (score) => {
    return {
        type: 'ADD_SCORE',
        score
    }
}

const changeDirection = (direction) => {
    return{
        type: 'CHANGE_DIRECTION',
        direction: direction
    }
}

export const userAction = (keyPressed) => {
    return (dispatch, getState)=>{
        let store = getState();
         let inverseDirection = {
            'up':'down',
            'left':'right',
            'right':'left',
            'down':'up'
        };
        if(['up','right','down','left'].indexOf(keyPressed) >=0 && keyPressed !== inverseDirection[store.snakeDirection]) {
            dispatch(changeDirection(keyPressed))
        } else if(['start_game'].indexOf(keyPressed) >=0 ){       
            dispatch(startGame())
        }
    }
}
   
const snakeInit = (coords) => {
    return{
        type: 'SNAKE_INIT',
        coords
    }
}

const setFood = () => {
    return{
        type: 'SET_FOOD'
    }
}

