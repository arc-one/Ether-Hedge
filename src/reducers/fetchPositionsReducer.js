import {
  FETCH_POSITIONS,
} from '../actions/web3Actions'

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_POSITIONS:{
      return action.payload
    }
    default:
      return state
  }
}