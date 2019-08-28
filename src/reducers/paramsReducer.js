import {
  GET_PARAMS,
  GET_PARAMS_ERROR,
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case GET_PARAMS:{
      return action.payload
    }
    case GET_PARAMS_ERROR:{
      return state
    }
    default:
      return state
  }
}