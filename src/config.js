import settings  from './contracts/Settings.json'


import depository  from './contracts/Depository.json'
import token  from './contracts/Token.json'
import sale  from './contracts/Sale.json'
import splitter  from './contracts/PaymentSplitter.json'

//import meta  from './contracts/Meta.json'
import futureContract_01  from './contracts/FutureContract.json'

export const POLL_BLOCK_NUMBER_INTERVAL = 15000;

export const ORDERS_LIMIT_BLOCKS = 500000; //blocks
export const HISTORY_LIMIT_BLOCKS = 5000000; //blocks

export const ETH_DECIMALS = 1000000000000000000;
export const DECIMALS = 1000000000;
export const LEVERAGE_DECIMALS = 100;
export const PERCENT_MULTIPLYER = 100;
export const EXPIRES_IN = 10000;
export const MAX_ORDER_LIST = 50;


export const INFURA_RPC_URL = 'https://kovan.infura.io/v3/28eae19dd0444340b4f9562e6813bad6';


// Liquidation
export const BANCRUPCY_DIFF = 10;


//Contracts
export const smartContracts = {
	depository: {
		address: '0xC0619001c07F59aECe0bDC7378EC9dFA83c26f7D',
		abi: depository.abi
	},
	settings: {
		address: '0x9dcf14AfDe3b2650686d1929B058D55f71Addd38',
		abi: settings.abi
	},
	
	main_token: {	
		address: '0x4D2C408630892fb2896723E7821761B84B70e0E6',
		abi: token.abi
	},
	rekt_token: {
		address: '0xfce3323856E0f4b02D03e224336C94e61A03f37e',
		abi: token.abi
	},
	payment_splitter: {
		address: '0x0b1d16475fDE8198ce031a218887dB9074D77D21',
		abi: splitter.abi
	},
	sale: {
		address: '0x1BAfbe594983273b5505723ed8147c5E44F1B010',
		abi: sale.abi
	},
	futures:[
		{
			address: '0x98E42203b9376Ef58Fe9498a95646927f9Be1760',
			abi: futureContract_01.abi,
			ticker: 'ETHUSD_TST'
		},
	]
}


