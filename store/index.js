import { createStore, combineReducers , compose , applyMiddleware} from 'redux';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';


//как создать свой миддлевейр , вместо dispatch обычно все пишут next так как данный диспетч передаст свой action from next middleware и будет вызываться след функиця из middleware
const stringMiddlewares = ({dispatch , getState})=>(dispatch)=>(action)=>{ 
   if (typeof action === "string"){ 
      return dispatch({ 
         type: action
      })
   }
   return dispatch(action)
}


const enchancer = (createStore)=>(...arg)=>{ 
   const store = createStore(...arg)
   const oldDispatch = store.dispatch

   store.dispatch =(action)=>{ 
      if (typeof action === "string"){ 
         return oldDispatch({ 
            type: action
         })
      }
      return oldDispatch(action)
   }
   return store
}

// const store = createStore( combineReducers({heroes, filters}),
//    compose(enchancer , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//     );

//создаем стор добавляем разные редьюсеры потом объединяем с помощью компосе группу миддлевайров (через запятую скок угодно внутрь applyMid) и включение devtools
const store = createStore( combineReducers({heroes, filters}),
   compose(applyMiddleware(stringMiddlewares) , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    );

export default store;

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()