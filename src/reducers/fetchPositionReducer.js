import {
  FETCH_POSITION,
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_POSITION:{
      return action.payload
    }
    default:
      return state
  }
}