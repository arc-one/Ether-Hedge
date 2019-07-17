import Web3 from 'web3'
import async from 'async'
import { isEmpty, isUndefined, isObject } from 'lodash';
import {smartContracts, INFURA_RPC_URL, ORDERS_LIMIT_BLOCKS, HISTORY_LIMIT_BLOCKS} from '../config'

export const FETCH_NETWORK = 'FETCH_NETWORK'
export const FETCH_NETWORK_FAIL = 'FETCH_NETWORK_FAIL'


export const fetchOrders = (index) => {
	return (dispatch, state) => {

		let settings = state().smartContracts.settingsNew.inst;



		settings.getPastEvents('createParamProposalLog', {
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


		
  	}
}