import { combineReducers } from 'redux'
import themeReducer from './themeReducer'
import getWindowHeightReducer from './getWindowHeightReducer'
import fetchAccountsReducer from './fetchAccountsReducer'
import fetchNetworkReducer from './fetchNetworkReducer'
import enableMetamaskReducer from './enableMetamaskReducer'
import orderFormReducer from './orderFormReducer'
import smartContractsReducer from './smartContractsReducer'
import getBalanceReducer from './getBalanceReducer'
import getWalletBalanceReducer from './getWalletBalanceReducer'
import getStakedFundsReducer from './getStakedFundsReducer'
import getAvailableBalanceReducer from './getAvailableBalanceReducer'
import getLastPriceReducer from './getLastPriceReducer'
import getSpotPriceReducer from './getSpotPriceReducer'
import ordersReducer from './ordersReducer'
import trustedFutureReducer from './trustedFutureReducer'
import tradesReducer from './tradesReducer'
import orderFillsReducer from './orderFillsReducer'
import fetchPositionsReducer from './fetchPositionsReducer'
import fetchPositionReducer from './fetchPositionReducer'
import modalReducer from './modalReducer'
import getBlockNumberReducer from './getBlockNumberReducer'
import sizeUpdateReducer from './sizeUpdateReducer'
import getMaxLeverageReducer from './getMaxLeverageReducer'
import getFeeLimit from './getFeeLimit'
import getFeeMarket from './getFeeMarket'
import saleFinalRateReducer from './saleFinalRateReducer'
import saleInitialRateReducer from './saleInitialRateReducer'
import saleClosingTimeReducer from './saleClosingTimeReducer'
import saleCurrentRateReducer from './saleCurrentRateReducer'
import saleOpeningReducer from './saleOpeningReducer'
import reisedETHReducer from './reisedETHReducer'
import mainTokenTotalSupplyReducer from './mainTokenTotalSupplyReducer'
import rektTokenBalanceOfReducer from './rektTokenBalanceOfReducer'
import rektTokenTotalSupplyReducer from './rektTokenTotalSupplyReducer'
import mainTokenBalanceOfReducer from './mainTokenBalanceOfReducer'
import calcDividendsReducer from './calcDividendsReducer'
import calcDiscountReducer from './calcDiscountReducer'
import totalBalanceReducer from './totalBalanceReducer'
import getTotalProfitReducer from './getTotalProfitReducer'
import marginBankReducer from './marginBankReducer'
import totalStakedReducer from './totalStakedReducer'
import totalDividendsReducer from './totalDividendsReducer'
import paramsReducer from './paramsReducer'
import proposalsReducer from './proposalsReducer'
import userVotingReducer from './userVotingReducer'
import mainTokenApprovalReducer from './mainTokenApprovalReducer'





const rootReducer = combineReducers({
	theme: themeReducer,
	windowSize: getWindowHeightReducer,
	accounts: fetchAccountsReducer,
	network: fetchNetworkReducer,
	enabledMetamask: enableMetamaskReducer,
	orderForm: orderFormReducer,
	smartContracts: smartContractsReducer,
	userBalance: getBalanceReducer,
	userWalletBalance: getWalletBalanceReducer,
	stakedFunds: getStakedFundsReducer,
	availableBalance: getAvailableBalanceReducer,
	lastPrice: getLastPriceReducer,
	spotPrice: getSpotPriceReducer,
	orders: ordersReducer,
	isTrustedActiveFuture: trustedFutureReducer,
	trades: tradesReducer,
	orderFills: orderFillsReducer,
	userPositions: fetchPositionsReducer,
	userPosition: fetchPositionReducer,
	modal:modalReducer,
	currentBlockNumber: getBlockNumberReducer,
	chartSize: sizeUpdateReducer,
	maxLeverageReducer: getMaxLeverageReducer,
	feeLimit: getFeeLimit,
	feeMarket: getFeeMarket,
	saleFinalRate: saleFinalRateReducer,
	saleInitialRate: saleInitialRateReducer,
	saleClosingTime: saleClosingTimeReducer,
	saleCurrentRate: saleCurrentRateReducer,
	saleOpening: saleOpeningReducer,
	reisedETH: reisedETHReducer,
	rektTokenBalanceOf: rektTokenBalanceOfReducer,
	rektTokenTotalSupply: rektTokenTotalSupplyReducer,
	mainTokenBalanceOf: mainTokenBalanceOfReducer,
	mainTokenTotalSupply: mainTokenTotalSupplyReducer,
	userDividends: calcDividendsReducer,
	userDiscount: calcDiscountReducer,
	totalBalance: totalBalanceReducer,
	totalProfit: getTotalProfitReducer,
	marginBank: marginBankReducer,
	totalStaked: totalStakedReducer,
	totalDividends: totalDividendsReducer,
	params: paramsReducer,
	proposals: proposalsReducer,
	userVoting: userVotingReducer,
	mainTokenApproval: mainTokenApprovalReducer

})

export default rootReducer

