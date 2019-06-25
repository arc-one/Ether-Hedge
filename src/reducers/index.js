import { combineReducers } from 'redux'
import themeReducer from './themeReducer'
import getWindowHeightReducer from './getWindowHeightReducer'
import fetchAccountsReducer from './fetchAccountsReducer'
import fetchNetworkReducer from './fetchNetworkReducer'
import enableMetamaskReducer from './enableMetamaskReducer'
import orderFormReducer from './orderFormReducer'
import initSmartContractsReducer from './initSmartContractsReducer'
import getBalanceReducer from './getBalanceReducer'
import getWalletBalanceReducer from './getWalletBalanceReducer'
import getStakedFundsReducer from './getStakedFundsReducer'
import getAvailableBalanceReducer from './getAvailableBalanceReducer'
import getLastPriceReducer from './getLastPriceReducer'
import getSpotPriceReducer from './getSpotPriceReducer'





const rootReducer = combineReducers({
  theme: themeReducer,
  height: getWindowHeightReducer,
  accounts: fetchAccountsReducer,
  network: fetchNetworkReducer,
  enabledMetamask: enableMetamaskReducer,
  orderForm: orderFormReducer,
  smartContracts: initSmartContractsReducer,
  userBalance: getBalanceReducer,
  userWalletBalance: getWalletBalanceReducer,
  stakedFunds: getStakedFundsReducer,
  availableBalance: getAvailableBalanceReducer,
  lastPrice: getLastPriceReducer,
  spotPrice: getSpotPriceReducer

})

export default rootReducer
