export const FETCH_PROPOSALS = 'FETCH_PROPOSALS'
export const FETCH_PROPOSALS_ERROR = 'FETCH_PROPOSALS_ERROR'
export const FETCH_PARAM_PROPOSALS_RESULTS_ERROR = 'FETCH_PARAM_PROPOSALS_RESULTS_ERROR'
export const FETCH_PARAM_PROPOSALS_RESULTS = 'FETCH_PARAM_PROPOSALS_RESULTS'
export const GET_USER_VOTING_ERROR = 'GET_USER_VOTING_ERROR'
export const GET_USER_VOTING = 'GET_USER_VOTING'

export const fetchContractProposal = (index) => {
	return (dispatch, state) => {

		let settings = state().smartContracts.settings.inst;
		settings.getPastEvents('AddContractProposalLog', {
		  fromBlock: 0,
		  toBlock: 'latest'
		}).then(response => {
			dispatch({
			    type: FETCH_PROPOSALS,
			    payload: response
			});
		}).catch(err => {
			  dispatch({
			    type: FETCH_PROPOSALS_ERROR
			  })
    	});
  	}
}

export const fetchParamProposal = (index) => {
	return (dispatch, state) => {
		let settings = state().smartContracts.settings.inst;
		settings.getPastEvents('paramProposaLog', {
		  fromBlock: 0,
		  toBlock: 'latest'
		}).then(response => {
			dispatch({
			    type: FETCH_PROPOSALS,
			    payload: response
			});
		}).catch(err => {
			  dispatch({
			    type: FETCH_PROPOSALS_ERROR
			  })
    	});
  	}
}

export const listenCreateContractProposalLog = () => {
	return (dispatch, state) => {
		let settings = state().smartContracts.settings.inst;
	    settings.events.AddContractProposalLog({}, { 
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

export const listenCreateParamProposalLog = () => {
	return (dispatch, state) => {
		let settings = state().smartContracts.settings.inst;
	    settings.events.paramProposaLog({}, { 
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

export const fetchProposals = (hash) => {
	return (dispatch, state) => {
		let settings = state().smartContracts.settings.inst;
		settings.methods.proposals(hash).call( (err, response) => {
			if(err) {
			  dispatch({
			    type: FETCH_PARAM_PROPOSALS_RESULTS_ERROR
			  })
			} else {	
				let newParamProposalResults = {...state().paramProposalResults};
				newParamProposalResults[hash] = response;
				dispatch({
				    type: FETCH_PARAM_PROPOSALS_RESULTS,
				    payload: newParamProposalResults
				});
			}
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
/*
export const getUserParamsVoting = (param, hash) => {
	return (dispatch, state) => {
		let settings = state().smartContracts.settings.inst;
		let address = state().accounts[0];
		settings.methods.voters(address, param, hash).call( (err, response) => {
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

export const getUserContractsVoting = (addr) => {
	return (dispatch, state) => {
		let settings = state().smartContracts.settings.inst;
		let address = state().accounts[0];
		settings.methods.voters(address, addr).call((err, response) => {
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
*/