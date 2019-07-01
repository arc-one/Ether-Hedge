import settingsABI  from './contracts/Settings.json'
import depositoryABI  from './contracts/Depository.json'
import tokenABI  from './contracts/Token.json'
//import metaABI  from './contracts/Meta.json'
import futureContractABI_01  from './contracts/FutureContract.json'

export const WEB3_POLL_INTERVAL = 300;
export const ORDERS_LIMIT_BLOCKS = 500000; //blocks
export const HISTORY_LIMIT_BLOCKS = 5000000; //blocks

export const ETH_DECIMALS = 1000000000000000000;
export const DECIMALS = 1000000000;
export const INFURA_RPC_URL = 'https://kovan.infura.io/v3/28eae19dd0444340b4f9562e6813bad6';




// Liquidation
export const BANCRUPCY_DIFF = 10;


//Contracts
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



 

