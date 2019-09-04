import settings  from './contracts/Settings.json'
import depository  from './contracts/Depository.json'
import token  from './contracts/Token.json'
import sale  from './contracts/Sale.json'
import splitter  from './contracts/PaymentSplitter.json'
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
export const BANCRUPCY_DIFF = 10;

//Contracts
export const smartContracts = {
	depository: {
		address: '0x5F2E006670953854C428F6489F89de9160184B4c',
		abi: depository.abi
	},
	settings: {
		address: '0x040e11589CFc09C645742a49418D46980bEF1C95',
		abi: settings.abi
	},
	
	main_token: {	
		address: '0x5F3C1d21Bebb7Abc35E2F69307d66Ff5446461b9',
		abi: token.abi
	},
	rekt_token: {
		address: '0xEc40D1270cBb454b14a13Fb2bb66F427650329aE',
		abi: token.abi
	},
	payment_splitter: {
		address: '0xB8fBB140e491747F331e6080fa56B169C7344E01',
		abi: splitter.abi
	},
	sale: {
		address: '0x031c29A119bf06AaA865a009cb9A5379BC8e40ac',
		abi: sale.abi
	},
	futures:[
		{
			address: '0xFBA6f62bF1B4C877eBed84C843Bb399DB47317C3',
			abi: futureContract_01.abi,
			ticker: 'ETHUSD_TST'
		},
	]
}


