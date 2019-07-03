import {
  FETCH_HISTORY
} from '../actions/web3Actions'

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_HISTORY:{
      return action.payload
    }
    default:
      return state
  }
}