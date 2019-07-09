import settingsABI  from './contracts/Settings.json'
import depositoryABI  from './contracts/Depository.json'
import tokenABI  from './contracts/Token.json'
//import metaABI  from './contracts/Meta.json'
import futureContractABI_01  from './contracts/FutureContract.json'

export const WEB3_POLL_INTERVAL = 300;
export const POLL_BLOCK_NUMBER_INTERVAL = 15000;

export const ORDERS_LIMIT_BLOCKS = 500000; //blocks
export const HISTORY_LIMIT_BLOCKS = 5000000; //blocks

export const ETH_DECIMALS = 1000000000000000000;
export const DECIMALS = 1000000000;
export const LEVERAGE_DECIMALS = 100;
export const EXPIRES_IN = 10000;
export const MAX_ORDER_LIST = 50;


export const INFURA_RPC_URL = 'https://kovan.infura.io/v3/28eae19dd0444340b4f9562e6813bad6';


// Liquidation
export const BANCRUPCY_DIFF = 10;


//Contracts
export const smartContracts = {
	depository: {
		address: '0x79be9687fdc23646141aacd465d10cbfc97cf2b3',
		abi: depositoryABI.abi
	},
	settings: {
		address: '0xe8a5edfc1ff784eddf037cc4f418e3612c452228',
		abi: settingsABI.abi
	},
	ehe_token: {	
		address: '0x655fb143569db35a161314222bbc2598d9601616',
		abi: tokenABI.abi
	},
	rekt_token: {
		address: '0xb420310256b5b83f3bdd10a4d24b1a8527da6b66',
		abi: tokenABI.abi
	},
/*	payment_splitter: {
		address: '0x1bcef293f3638d542a0a91bf4e30f0707a183048',
		abi: null
	},
	sale: {
		address: '0xd1fdd1b77e994a170f640223038b17fe3a6eb037',
		abi: null
	},
	redeployer: {
		address: '0xa2698ebae0054b4925066035bffe769b7b11d861',
		abi: null
	},*/
	futures:[
		{
			address: '0xd19a7ba6332ff6b8dbedef75fb0f6f562c6e42bf',
			abi: futureContractABI_01.abi,
			ticker: 'ETHUSD_TST'
		},
	]
}



 /*

export const smartContracts = {
	depository: {
		address: '0x758782d154e832952cdf6a64d410bd5abfac4680',
		abi: depositoryABI.abi
	},
	settings: {
		address: '0xec4dce8ca27f2fbd8180c2377f43a4ecf651ee21',
		abi: settingsABI.abi
	},
	ehe_token: {	
		address: '0x8f26e94406b604814fc1e4bbcac6f3d228c66808',
		abi: tokenABI.abi
	},
	rekt_token: {
		address: '0x8f26e94406b604814fc1e4bbcac6f3d228c66808',
		abi: tokenABI.abi
	},
	futures:[
		{
			address: '0x5b002b84226fe2788ee4ba10554d4bdc0f20c0a3',
			abi: futureContractABI_01,
			ticker: 'ETHUSD'
		},
		{
			address: '0x5b002b84226fe2788ee4ba10554d4bdc0f20c0a3',
			abi: futureContractABI_01,
			ticker: 'BTCUSD'
		},
	]
}

*/

 

