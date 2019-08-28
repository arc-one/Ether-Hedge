import {
  FETCH_PARAM_PROPOSALS_RESULTS,
  FETCH_PARAM_PROPOSALS_RESULTS_ERROR,
} from '../actions/web3VotingActions'

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PARAM_PROPOSALS_RESULTS:{
      return action.payload
    }
    case FETCH_PARAM_PROPOSALS_RESULTS_ERROR:{
      return state
    }
    default:
      return state
  }
}