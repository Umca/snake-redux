const startGame = (snakeCoords, foodCoords) => {
    return {
        type: 'START_GAME',
        snakeCoords,
        foodCoords
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

const userAction = (keyPressed) => {
    
}