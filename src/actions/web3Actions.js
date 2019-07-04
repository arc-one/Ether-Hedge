import Web3 from 'web3'
import async from 'async'
import { isEmpty, isUndefined } from 'lodash';
import {smartContracts, INFURA_RPC_URL, ORDERS_LIMIT_BLOCKS, HISTORY_LIMIT_BLOCKS} from '../config'

export const FETCH_NETWORK = 'FETCH_NETWORK'
export const FETCH_NETWORK_FAIL = 'FETCH_NETWORK_FAIL'
export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS'
export const FETCH_ACCOUNTS_FAIL = 'FETCH_ACCOUNTS_FAIL'
export const ENABLE_METAMASK = 'ENABLE_METAMASK'
export const ENABLE_METAMASK_FAIL = 'ENABLE_METAMASK_FAIL'
export const GET_BALANCE = 'GET_BALANCE'
export const GET_BALANCE_ERROR = 'GET_BALANCE_ERROR'
export const GET_WALLET_BALANCE = 'GET_WALLET_BALANCE'
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
export const FETCH_ORDERS = 'FETCH_ORDERS'
export const FETCH_ORDERS_ERROR  = 'FETCH_ORDERS_ERROR'
export const FETCH_HISTORY = 'FETCH_HISTORY'
export const FETCH_HISTORY_ERROR  = 'FETCH_HISTORY_ERROR'
export const GET_CURRENT_BLOCK_NUMBER  = 'GET_CURRENT_BLOCK_NUMBER'
export const GET_CURRENT_BLOCK_NUMBER_ERROR  = 'GET_CURRENT_BLOCK_NUMBER_ERROR'
export const CHECK_IF_TRUSTED_FUTURE = 'CHECK_IF_TRUSTED_FUTURE'
export const CHECK_IF_TRUSTED_FUTURE_ERROR  = 'CHECK_IF_TRUSTED_FUTURE_ERROR'
export const INIT_SMART_CONTRACTS = 'INIT_SMART_CONTRACTS'
export const UPDATE_SMART_CONTRACTS = 'UPDATE_SMART_CONTRACTS'
export const FETCH_POSITIONS = 'FETCH_POSITIONS'
export const FETCH_POSITIONS_ERROR = 'FETCH_POSITIONS_ERROR'
export const GET_PNL = 'GET_PNL'
export const GET_PNL_ERROR = 'GET_PNL_ERROR'
export const GET_LIQUIDATION_PRICE = 'GET_LIQUIDATION_PRICE'
export const GET_LIQUIDATION_PRICE_ERROR = 'GET_LIQUIDATION_PRICE_ERROR'


export const ADD_FILLS = 'ADD_FILLS'
export const SET_FILLS = 'SET_FILLS'


const getWeb3 = () => {
	let provider = INFURA_RPC_URL;
	if(window.ethereum) provider = window.ethereum;
	return new Web3(provider);
}

const getAccounts = () => {
  try {
    const { web3 } = window;
    // throws if no account selected
    return web3.eth.accounts;
  } catch (e) {
    return [];
  }
}


export const enableMetamask = () => {
  	return (dispatch, enableMetamask) => {
	    if (window.ethereum) { 
	       try { 
	          window.ethereum.enable().then(() => {
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

export const initSmartContracts = () => {
  	return (dispatch, state) => {

  		let web3 = getWeb3();

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
				    		address: smartContracts[key][i].address,
				    		ticker: smartContracts[key][i].ticker
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

		depository.methods.getBalance(address).call( (err, response) => {
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

export const checkIfTrustedFuture = () => {
	return (dispatch, state) => {
		let settings = state().smartContracts.settings.inst;
		let activeFuture = state().smartContracts.activeFuture;
		let futureAddress = state().smartContracts.futures[activeFuture].address;

        settings.methods.trustedContracts(futureAddress).call( (err, response) => {
			if(err) {
			  	dispatch({
			    	type: CHECK_IF_TRUSTED_FUTURE_ERROR
			  	})
			} else {
				dispatch({
				    type: CHECK_IF_TRUSTED_FUTURE,
				    payload: response
				});
			}
        });

  	}
}

export const getStakedFunds = () => {
	return (dispatch, state) => {
		let address = state().accounts[0];
		let depository = state().smartContracts.depository.inst;

		depository.methods.getStakedFundsOf(address).call( (err, response) => {
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
		let depository = state().smartContracts.depository.inst;

		depository.methods.getAvailableBalance(address).call((err, response) => {
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
		
		future.methods.lastPrice().call((err, response) => {
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

const fetchPositionAsync = async (future, address, callbackPosition) =>{
	async.parallel([
	    function(callback) {
			future.inst.methods.positions(address).call((err, response) => {
				callback(err, response);
			});
	    },
	    function(callback) {
			future.inst.methods.getCurrentPositionPNL(address).call((err, response) => {
				callback(err, response);
			});
	    },
	    function(callback) {
			future.inst.methods.getPositionLiquidationPrice(address).call((err, response) => {
				callback(err, response);
			});
	    }
	],
	function(err, results) {
		if(err){
			callbackPosition(err, null);
		} else {
			callbackPosition (null, {
				ticker:future.ticker,
				amount:results[0].amount*1,
				price:results[0].price*1,
				leverage:results[0].leverage*1,
				positionType:results[0].positionType*1,
				pnl:(results[1].prefix)?results[1].pnl*1:('-'+results[1].pnl)*1,
				liquidationPrice:results[2][1]*1
			});
		}


	});
}

const fetchPositionsAsync = async (futures, address, callbackPositions) => {
	let  positions = [];
	async.each(futures, function(future, callback) {
		fetchPositionAsync(future, address, (err, position) => {
			if(position){
				positions.push(position);
			}
			callback();
		});
	}, function(err) {
	    callbackPositions(err, positions);
	});
	
}

export const fetchPositions = () => {
	return (dispatch, state) => {
		fetchPositionsAsync(state().smartContracts.futures, state().accounts[0], (err, positions) => {
			if(err){
				dispatch({
				    type: FETCH_POSITIONS_ERROR
				});
			} else {
				dispatch({
				    type: FETCH_POSITIONS,
				    payload: positions
				});
			}
		});
  	}
}

export const getSpotPrice = () => {
	return (dispatch, state) => {
		let depository = state().smartContracts.depository.inst;
		depository.methods.getUSDETHPrice().call((err, response) => {
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

export const changeActiveFuture = (index) => {
	return (dispatch, state) => {
		let newSmartContracts = {...state().smartContracts};
		newSmartContracts.activeFuture = index;
		dispatch({
		    type: UPDATE_SMART_CONTRACTS,
		    payload: newSmartContracts
		});
  	}
}

export const fetchOrders = (index) => {
	return (dispatch, state) => {

		let activeFuture = state().smartContracts.activeFuture;
		let future = state().smartContracts.futures[activeFuture].inst;

		let web3 = getWeb3();

		if(web3 && web3.eth) {
	    	web3.eth.getBlockNumber().then(fromBlock => { 
				future.getPastEvents('LimitOrderLog', {
				  fromBlock: fromBlock - ORDERS_LIMIT_BLOCKS,
				  toBlock: 'latest'
				}).then(response => {
					dispatch({
					    type: FETCH_ORDERS,
					    payload: response
					});
				}).catch(err => {
					  dispatch({
					    type: FETCH_ORDERS_ERROR
					  })
		    	});
	    	})
	    	.catch(err => {
				dispatch({
					type: GET_CURRENT_BLOCK_NUMBER_ERROR
				})
	    	})

		}
  	}
}


export const fetchHistory = (index) => {
	return (dispatch, state) => {

		let activeFuture = state().smartContracts.activeFuture;
		let future = state().smartContracts.futures[activeFuture].inst;

		let web3 = getWeb3();

		if(web3 && web3.eth) {
	    	web3.eth.getBlockNumber().then(fromBlock => {
				future.getPastEvents('MarketOrderLog', {
				  fromBlock: fromBlock - HISTORY_LIMIT_BLOCKS,
				  toBlock: 'latest'
				}).then(response => {
					dispatch({
					    type: FETCH_HISTORY,
					    payload: response
					});
				}).catch(err => {
					  dispatch({
					    type: FETCH_HISTORY_ERROR
					  })
		    	});
	    	})
	    	.catch(err => {
				dispatch({
					type: GET_CURRENT_BLOCK_NUMBER_ERROR
				})
	    	})

		}
  	}
}

export const setFills = (fills) => {
  	return (dispatch) => {
		dispatch(  {
			type: SET_FILLS,
			payload: fills
		})
	}
};


export const listenMarketOrderLog = () => {
	return (dispatch, state) => {
		let activeFuture = state().smartContracts.activeFuture;
		let future = state().smartContracts.futures[activeFuture].inst;
		let web3 = getWeb3();

		if(web3 && web3.eth) {
	    	web3.eth.getBlockNumber().then(fromBlock => {
			    future.events.MarketOrderLog({}, { 
			      fromBlock: fromBlock, 
			      toBlock: 'latest' 
			    }).on('data', function(event) {
			      	console.log('MarketOrderLog:', event);
			      	
			  		let orderFills = {...state().orderFills};
				    let orderHash = event.returnValues.orderHash;

				    if(isUndefined(orderFills[orderHash])) {
				      orderFills[orderHash] = 0;
				    }
				    
				    orderFills[orderHash] += event.returnValues.amount*1;

				    dispatch(  {
						type: ADD_FILLS,
						payload: orderFills
					})
			    });
	    	})
	    	.catch(err => {
				dispatch({
					type: GET_CURRENT_BLOCK_NUMBER_ERROR
				})
	    	})
		}
  	}
}


