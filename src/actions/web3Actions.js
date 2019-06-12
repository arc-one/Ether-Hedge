import isEmpty from 'lodash/isEmpty';

export const FETCH_NETWORK = 'FETCH_NETWORK'
export const FETCH_NETWORK_FAIL = 'FETCH_NETWORK_FAIL'
export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS'
export const FETCH_ACCOUNTS_FAIL = 'FETCH_ACCOUNTS_FAIL'
export const ENABLE_METAMASK = 'ENABLE_METAMASK'
export const ENABLE_METAMASK_FAIL = 'ENABLE_METAMASK_FAIL'



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
