import settingsABI  from './contracts/Settings.json'
import depositoryABI  from './contracts/Depository.json'
import tokenABI  from './contracts/Token.json'
//import metaABI  from './contracts/Meta.json'
import futureContractABI_01  from './contracts/FutureContract.json'

export const WEB3_POLL_INTERVAL = 3000;
export const ETH_DECIMALS = 1000000000000000000;
export const DECIMALS = 1000000000;

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
			address: '0x758782d154e832952cdf6a64d410bd5abfac4680',
			inst: futureContractABI_01
		},
	]

	
}



 

