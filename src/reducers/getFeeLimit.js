import {
  GET_FEE_LIMIT,
  GET_FEE_LIMIT_ERROR,
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case GET_FEE_LIMIT:{
      return action.payload
    }
    case GET_FEE_LIMIT_ERROR:{
      return state
    }
    default:
      return state
  }
}