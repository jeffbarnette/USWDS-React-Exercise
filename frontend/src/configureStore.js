import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import thunkMiddleware from 'redux-thunk'
import createRootReducer from './reducers'

export const history = createBrowserHistory()


 // Sets up the Redux store
export default function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware]
  const composedEnhancers = composeWithDevTools(applyMiddleware(...middlewares))
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composedEnhancers
  )
  return store
}
