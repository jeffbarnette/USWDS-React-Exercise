import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import grades from './gradeList'


 // Combines all store reducers
const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    grades,
  })

export default rootReducer
