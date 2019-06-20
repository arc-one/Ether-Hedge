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
export const GET_WALLET_BALANCE = 'GET_WALLET_BALANCE'
export const GET_POSITIONS = 'GET_POSITIONS'
export const GET_STAKED_FUNDS = 'GET_STAKED_FUNDS'
export const CALC_DIVIDENDS = 'CALC_DIVIDENDS'
export const GET_FEE_LIMIT = 'GET_FEE_LIMIT'
export const GET_FEE_MARKET = 'GET_FEE_MARKET'
export const GET_MAX_LEVERAGE = 'GET_MAX_LEVERAGE'
export const GET_AVAILABLE_BALANCE = 'GET_AVAILABLE_BALANCE'

export const INIT_SMART_CONTRACTS = 'INIT_SMART_CONTRACTS'


export function enableMetamaskAsync (response) {
  return {
    type: ENABLE_METAMASK,
    payload: response
  }
}

export const enableMetamask = () => {
  	return (dispatch, enableMetamask) => {
	    if (window.ethereum) { 
	       try { 
	          window.ethereum.enable().then(function() {
	             dispatch(enableMetamaskAsync(true))
	          });
	       } catch(e) { 
	          // User has denied account access to DApp...
	          dispatch({ type: ENABLE_METAMASK_FAIL })
	       }
	    }
	}
};

export const fetchNetworkAsync = (response) => {
  return {
    type: FETCH_NETWORK,
    payload: response
  }
}

export const fetchNetwork = () => {
  	return (dispatch, fetchNetwork) => {
	    const { web3 } = window;
	    web3 && web3.version && web3.version.getNetwork((err, response) => {
	      if (err) {
	        dispatch({ type: FETCH_NETWORK_FAIL })
	      } else {
	      	if(response==='1' || response==='42') {
	        	dispatch(fetchNetworkAsync(response))
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
	    let smartContractsInst = {};
	    if(web3 && web3.eth) {
		    for(let key in smartContracts) {
		    	if(key==='futures') {
		    		for (var i = 0; i < smartContracts[key].length; i++) {
		    			if(isUndefined(smartContractsInst[key])) smartContractsInst[key] = [];
		    			smartContractsInst[key].push({
				    		inst: new web3.eth.Contract(smartContracts[key][i].abi, smartContracts[key][i].address),
				    		address: smartContracts[key][i].address
				    	});
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




export const getBalanceAsync = (response) => {
  return {
    type: GET_BALANCE,
    payload: response
  }
}

export const getBalance = () => {
	return (dispatch, getBalance) => {
		
/*		_this.depositoryContract.methods.getBalance(_this.state.address).call( function(error, result){
			_this.setState({balance: result||0});
		});*/
  	
/*    fetch('/api/v1/stats')
      .then(e => e.json())
      .then(response => {
        dispatch(getBalanceAsync(response))
      }).catch((error) => {
        dispatch({ type: FETCH_RESOURCES_FAIL, payload: error })
      })
*/

  }
}