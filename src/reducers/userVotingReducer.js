import {
  GET_USER_VOTING,
  GET_USER_VOTING_ERROR,
} from '../actions/web3VotingActions'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_USER_VOTING:{
      return action.payload
    }
    case GET_USER_VOTING_ERROR:{
      return state
    }
    default:
      return state
  }
}