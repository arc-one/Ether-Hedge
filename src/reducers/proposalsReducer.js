import {
  FETCH_PROPOSALS,
  FETCH_PROPOSALS_ERROR,
} from '../actions/web3VotingActions'

export default (state = [], action) => {



  switch (action.type) {
    case FETCH_PROPOSALS:{

      let proposals = [...state];

      proposals = proposals.concat(action.payload);

      const flags = new Set();
      const newProposals = proposals.filter(entry => {
          if (flags.has(entry.transactionHash)) {
              return false;
          }
          flags.add(entry.transactionHash);
          return true;
      });

      return newProposals
    }
    case FETCH_PROPOSALS_ERROR:{
      return state
    }
    default:
      return state
  }
}