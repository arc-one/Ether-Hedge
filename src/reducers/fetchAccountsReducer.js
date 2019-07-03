import {
  FETCH_ACCOUNTS
} from '../actions/web3Actions'

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ACCOUNTS:{
      return action.payload
    }
    default:
      return state
  }
}