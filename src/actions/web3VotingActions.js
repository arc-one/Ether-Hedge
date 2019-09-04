import async from 'async'

export const FETCH_PROPOSALS = 'FETCH_PROPOSALS'
export const FETCH_PROPOSALS_ERROR = 'FETCH_PROPOSALS_ERROR'
export const GET_USER_VOTING_ERROR = 'GET_USER_VOTING_ERROR'
export const GET_USER_VOTING = 'GET_USER_VOTING'

export const fetchProposals = (index) => {
	return (dispatch, state) => {

		let settings = state().smartContracts.settings.inst;
		settings.getPastEvents('ProposalLog', {
		  fromBlock: 0,
		  toBlock: 'latest'
		}).then(proposals_responce => {
				let all_proposals = [];
				async.each(proposals_responce, function(proposal, callback) {
					settings.methods.proposals(proposal.returnValues.hash).call( (err, response) => {
						if(err) {
						  callback(err);
						} else {	
							all_proposals.push(Object.assign(proposal.returnValues, response))
							callback(err);
						}
					});
				}, function(err, result) {
					if(err){
						dispatch({
							type: FETCH_PROPOSALS_ERROR
						})
					} else {
						dispatch({
						    type: FETCH_PROPOSALS,
						    payload: all_proposals
						});
					}
				});
		}).catch(err => {
			  dispatch({
			    type: FETCH_PROPOSALS_ERROR
			  })
    	});
  	}
}


export const listenProposalLog = () => {
	return (dispatch, state) => {
		let settings = state().smartContracts.settings.inst;
	    settings.events.ProposalLog({}, { 
	      fromBlock: state().currentBlockNumber, 
	      toBlock: 'latest' 
	    }).on('data', function(event) {
	      	let proposals = [...state().proposals];
            proposals.push(event);
			dispatch(  {
				type: FETCH_PROPOSALS,
				payload: proposals
			})
	    });
  	}
}


export const getUserVoting = (hash) => {
	return (dispatch, state) => {
		let settings = state().smartContracts.settings.inst;
		let address = state().accounts[0];
		settings.methods.voters(address, hash).call( (err, response) => {
			if(err) {
			  dispatch({
			    type: GET_USER_VOTING_ERROR
			  })
			} else {	
				dispatch({
				    type: GET_USER_VOTING,
				    payload: response
				});
			}
		});
  	}

}
