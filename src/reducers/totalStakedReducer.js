import {
  GET_TOTAL_STAKED,
  GET_TOTAL_STAKED_ERROR,
} from '../actions/web3Actions'

export default (state = null, action) => {
  switch (action.type) {
    case GET_TOTAL_STAKED:{
      return action.payload*1
    }
    case GET_TOTAL_STAKED_ERROR:{
      return state
    }
    default:
      return state
  }
}