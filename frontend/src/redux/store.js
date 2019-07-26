import { createStore, compose, applyMiddleware } from 'redux';// Importamos applyMidleware para crear la store 
import {save, load} from 'redux-localstorage-simple'; // Para crear persistencia en el local storage lo instalamos primero ( en el frontend): npm i -S redux-localstorage-simple
import reducers from'./reducers/index.js'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//para la extensión de chrome
// const store = createStore(userReducer,composeEnhancers());//creamos la store con el user que hemos dispatcheado en user.js. Si tuviesemos varios reducers habría que importarlos y combinarlos en un archivo a parte. El resultado es lo que pasamos al stores


const createStoreWithMiddleware = applyMiddleware(
    save(), // Saving done here
  )(createStore);

  const store = createStoreWithMiddleware(
    reducers,
    load({ preloadedState:{
      userReducer:{}
    } }), // Loading done here
    composeEnhancers(),
  );
  
export default store;

