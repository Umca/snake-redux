import Game from './assets/js/game';
import store from './assets/js/store';


window.store = store;

window.game = new Game({
  width: 600,
  height: 600,
  options: {
    backgroundColor: 0x000000
  },
  store: store.getState()
})

