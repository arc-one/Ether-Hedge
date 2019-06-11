import { combineReducers } from 'redux'
import themeReducer from './themeReducer'
import getWindowHeightReducer from './getWindowHeightReducer'

const rootReducer = combineReducers({
  theme: themeReducer,
  height: getWindowHeightReducer
})

export default rootReducer
