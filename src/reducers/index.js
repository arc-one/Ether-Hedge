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
import modalReducer from './modalReducer'



const rootReducer = combineReducers({
  theme: themeReducer,
  height: getWindowHeightReducer,
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
  userPositions:fetchPositionsReducer,
  modal:modalReducer
})

export default rootReducer
