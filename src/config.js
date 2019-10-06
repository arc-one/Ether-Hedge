import settings  from './contracts/Settings.json'
import depository  from './contracts/Depository.json'
import token  from './contracts/Token.json'
import sale  from './contracts/Sale.json'
import splitter  from './contracts/PaymentSplitter.json'
import futureContract_01  from './contracts/FutureContract.json'

export const POLL_BLOCK_NUMBER_INTERVAL = 15000;
export const ORDERS_LIMIT_BLOCKS = 10000; //blocks
export const HISTORY_LIMIT_BLOCKS = 5000000; //blocks
export const ETH_DECIMALS = 1000000000000000000;
export const DECIMALS = 1000000000;
export const LEVERAGE_DECIMALS = 100;
export const PERCENT_MULTIPLYER = 100;
export const MAX_ORDER_LIST = 50;
export const INFURA_RPC_URL = 'https://kovan.infura.io/v3/28eae19dd0444340b4f9562e6813bad6';
export const BANCRUPCY_DIFF = 10;

//Contracts
export const smartContracts = {
	depository: {
		address: '0xA22c9615a60Ce1aC36e0a49558d118c17AbF4705',
		abi: depository.abi
	},
	settings: {
		address: '0x9237Aa86f1bdE42896eC3e908877419b63ee0520',
		abi: settings.abi
	},
	
	main_token: {	
		address: '0x251659D1484Aa8B3f240208C1250c8B8979C1d80',
		abi: token.abi
	},
	rekt_token: {
		address: '0x144fC8801E8232755Cb0741C0e9f29BA47e82A8E',
		abi: token.abi
	},
	payment_splitter: {
		address: '0xe8ebdf0DE1eD20AeA5BEbb2D464c4398c4a79665',
		abi: splitter.abi
	},
	sale: {
		address: '0x2E8129338Ae26C9dF698220E50f9Fc43d2193770',
		abi: sale.abi
	},
	futures:[
		{
			address: '0xc7bc12b25c0Ff11EEF509894989e7b44643B78C6',
			abi: futureContract_01.abi,
			ticker: 'ETHUSD_TST'
		},
	]
}


