import {
  FETCH_HISTORY,
  ADD_TRADE
} from '../actions/web3Actions'

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_HISTORY:{
      return action.payload
    }
    case ADD_TRADE:{
      return action.payload
    }
    default:
      return state
  }
}