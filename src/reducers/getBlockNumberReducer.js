import {
  GET_CURRENT_BLOCK_NUMBER,
  GET_CURRENT_BLOCK_NUMBER_ERROR
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case GET_CURRENT_BLOCK_NUMBER:{
      return action.payload
    }
    case GET_CURRENT_BLOCK_NUMBER_ERROR:{
      return state;
    }
    default:
      return state
  }
}