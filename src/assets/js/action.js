const startGame = () => {
    return {
        type: 'START_GAME'
    }
}

const endGame = () => {
    return{
        type: 'END_GAME'
    }
}

const addScore = (foodCoords, speed) => {
    return {
        type: 'ADD_SCORE',
        foodCoords,
        speed
    }
}

const changeDirection = (direction) => {
    return{
        type: 'CHANGE_DIRECTION',
        direction
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

const foodSet = (coords) => {
    return{
        type: 'FOOD_SET',
        coords
    }
}

