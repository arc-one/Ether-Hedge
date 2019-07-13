export const getEtherscanLink = (type, hash, _code, network) => {
	let code = '';
	if(_code==='contracts') code = '#'+_code;
	if (network === 'main'){
		return 'https://etherscan.io/'+type+'/'+hash+code;
	} else {
		return 'https://kovan.etherscan.io/'+type+'/'+hash+code;
	}
}