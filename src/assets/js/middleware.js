import Game from './game';

const getKey = (obj, value) => {
    for(var key in obj){
      if(obj[key] instanceof Array && obj[key].indexOf(value) >= 0){
        return key;
      }
    }
    return null;
  }

export const addSnakeFoodAtStart = store => next => action =>{
    console.log('game starting....');


}