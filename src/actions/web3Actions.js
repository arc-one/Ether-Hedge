import Web3 from 'web3'
import { isEmpty, isUndefined } from 'lodash';
import {smartContracts} from '../config'

export const FETCH_NETWORK = 'FETCH_NETWORK'
export const FETCH_NETWORK_FAIL = 'FETCH_NETWORK_FAIL'
export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS'
export const FETCH_ACCOUNTS_FAIL = 'FETCH_ACCOUNTS_FAIL'
export const ENABLE_METAMASK = 'ENABLE_METAMASK'
export const ENABLE_METAMASK_FAIL = 'ENABLE_METAMASK_FAIL'

export const GET_BALANCE = 'GET_BALANCE'
export const GET_BALANCE_ERROR = 'GET_BALANCE_ERROR'

export const GET_WALLET_BALANCE = 'GET_WALLET_BALANCE'

export const GET_POSITIONS = 'GET_POSITIONS'
export const GET_POSITIONS_ERROR = 'GET_POSITIONS_ERROR'

export const GET_STAKED_FUNDS = 'GET_STAKED_FUNDS'
export const GET_STAKED_FUNDS_ERROR = 'GET_STAKED_FUNDS_ERROR'

export const CALC_DIVIDENDS = 'CALC_DIVIDENDS'
export const CALC_DIVIDENDS_ERROR = 'CALC_DIVIDENDS_ERROR'

export const GET_FEE_LIMIT = 'GET_FEE_LIMIT'
export const GET_FEE_LIMIT_ERROR = 'GET_FEE_LIMIT_ERROR'

export const GET_FEE_MARKET = 'GET_FEE_MARKET'
export const GET_FEE_MARKET_ERROR = 'GET_FEE_MARKET_ERROR'

export const GET_MAX_LEVERAGE = 'GET_MAX_LEVERAGE'
export const GET_MAX_LEVERAGE_ERROR  = 'GET_MAX_LEVERAGE_ERROR'


export const GET_AVAILABLE_BALANCE = 'GET_AVAILABLE_BALANCE'
export const GET_AVAILABLE_BALANCE_ERROR  = 'GET_AVAILABLE_BALANCE_ERROR'

export const GET_LAST_PRICE = 'GET_LAST_PRICE'
export const GET_LAST_PRICE_ERROR  = 'GET_LAST_PRICE_ERROR'

export const GET_SPOT_PRICE = 'GET_SPOT_PRICE'
export const GET_SPOT_PRICE_ERROR  = 'GET_SPOT_PRICE_ERROR'


export const INIT_SMART_CONTRACTS = 'INIT_SMART_CONTRACTS'

export const enableMetamask = () => {
  	return (dispatch, enableMetamask) => {
	    if (window.ethereum) { 
	       try { 
	          window.ethereum.enable().then(function() {
	            dispatch({
				    type: ENABLE_METAMASK,
				    payload: true
				})
	          });
	       } catch(e) { 
	          // User has denied account access to DApp...
	          dispatch({ type: ENABLE_METAMASK_FAIL })
	       }
	    } else {
	    	alert('Please Install Metamask Extension.')
	    }
	}
};

export const fetchNetwork = () => {
  	return (dispatch, fetchNetwork) => {
	    const { web3 } = window;
	    web3 && web3.version && web3.version.getNetwork((err, response) => {
	      if (err) {
	        dispatch({ type: FETCH_NETWORK_FAIL })
	      } else {
	      	if(response==='1' || response==='42') {
	        	dispatch({
				    type: FETCH_NETWORK,
				    payload: response
				})
	      	} else {
	      		dispatch({ type: FETCH_NETWORK_FAIL })
	      	}
	      }
	    });
	}
};

export const fetchAccountsAsync = (response) => {
  return {
    type: FETCH_ACCOUNTS,
    payload: response
  }
}

export const fetchAccounts = () => {
  	return (dispatch, fetchAccounts) => {
	    const { web3 } = window;
	    const ethAccounts = getAccounts();

	    if (isEmpty(ethAccounts)) {
	      web3 && web3.eth && web3.eth.getAccounts((err, accounts) => {
	        if (err) {
	          dispatch({ type: FETCH_NETWORK_FAIL })
	        } else {
	          dispatch(fetchAccountsAsync(accounts))
	        }
	      });
	    } else {
	      dispatch(fetchAccountsAsync(ethAccounts))
	    }
	}
};

function getAccounts() {
  try {
    const { web3 } = window;
    // throws if no account selected
    return web3.eth.accounts;
  } catch (e) {
    return [];
  }
}


export const initSmartContracts = () => {
  	return (dispatch, fetchAccounts) => {
	    const web3 = new Web3(window.ethereum);
	    let smartContractsInst = {
	    	activeFuture:null
	    };
	    if(web3 && web3.eth) {
		    for(let key in smartContracts) {
		    	if(key==='futures') {
		    		for (var i = 0; i < smartContracts[key].length; i++) {
		    			if(isUndefined(smartContractsInst[key])) smartContractsInst[key] = [];
		    			smartContractsInst[key].push({
				    		inst: new web3.eth.Contract(smartContracts[key][i].abi, smartContracts[key][i].address),
				    		address: smartContracts[key][i].address
				    	});
				    	if (i===0) smartContractsInst.activeFuture = i;
		    		}
		    	} else {
			    	smartContractsInst[key] = {
			    		inst: new web3.eth.Contract(smartContracts[key].abi, smartContracts[key].address),
			    		address: smartContracts[key].address
			    	}	
		    	}
		    }
			dispatch({
				type: INIT_SMART_CONTRACTS,
				payload: smartContractsInst
			});
	    }
	}
};

export const getBalance = () => {
	return (dispatch, state, getBalance) => {
		let depository = state().smartContracts.depository.inst;
		let address = state().accounts[0];

		depository.methods.getBalance(address).call( function(err, response){
			if(err) {
			  dispatch({
			    type: GET_BALANCE_ERROR
			  })
			} else {
				dispatch({
				    type: GET_BALANCE,
				    payload: response
				});
			}
		});
  	}
}

export const getWalletBalance = () => {
	return (dispatch, state) => {
	    const web3 = new Web3(window.ethereum);
		let address = state().accounts[0];

	    if(web3 && web3.eth) {
			web3.eth.getBalance(address).then(response => {
	        	dispatch({
				    type: GET_WALLET_BALANCE,
				    payload: response
				});
	        })
	    }
  }
}

export const getStakedFunds = () => {
	return (dispatch, state) => {
		let address = state().accounts[0];
		let depository = state().smartContracts.depository.inst;

		depository.methods.getStakedFundsOf(address).call( function(err, response){
			if(err) {
			  dispatch({
			    type: GET_STAKED_FUNDS_ERROR
			  })
			} else {
				dispatch({
				    type: GET_STAKED_FUNDS,
				    payload: response
				});
			}
		});
  	}
}


export const getAvailableBalance = () => {
	return (dispatch, state) => {
		let address = state().accounts[0];
		let activeFuture = state().smartContracts.activeFuture;
		let future = state().smartContracts.futures[activeFuture].inst;

		future.methods.getAvailableBalance(address, 140000000000, 1000).call( function(err, response){
			if(err) {
			  dispatch({
			    type: GET_AVAILABLE_BALANCE_ERROR
			  })
			} else {
				dispatch({
				    type: GET_AVAILABLE_BALANCE,
				    payload: response
				});
			}
		});
  	}
}


export const getLastPrice = () => {
	return (dispatch, state) => {
		let activeFuture = state().smartContracts.activeFuture;
		let future = state().smartContracts.futures[activeFuture].inst;
		
		future.methods.lastPrice().call( function(err, response){
			if(err) {
			  dispatch({
			    type: GET_LAST_PRICE_ERROR
			  })
			} else {
				dispatch({
				    type: GET_LAST_PRICE,
				    payload: response
				});
			}
		});
  	}
}

export const getSpotPrice = () => {
	return (dispatch, state) => {
		//let depository = state().smartContracts.depository.inst;
		let depository = state().smartContracts.settings.inst;

		depository.methods.getUSDETHPrice().call( function(err, response){
			if(err) {
			  dispatch({
			    type: GET_SPOT_PRICE_ERROR
			  })
			} else {
				dispatch({
				    type: GET_SPOT_PRICE,
				    payload: response
				});
			}
		});
  	}
}

