import {
  ADD_FILLS,
  SET_FILLS
} from '../actions/web3Actions'

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_FILLS:{
      return action.payload
    }
    case SET_FILLS:{
      return action.payload
    }
    default:
      return state
  }
}