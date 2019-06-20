import { combineReducers } from 'redux'
import themeReducer from './themeReducer'
import getWindowHeightReducer from './getWindowHeightReducer'
import fetchAccountsReducer from './fetchAccountsReducer'
import fetchNetworkReducer from './fetchNetworkReducer'
import enableMetamaskReducer from './enableMetamaskReducer'
import orderFormReducer from './orderFormReducer'
import initSmartContractsReducer from './initSmartContractsReducer'



const rootReducer = combineReducers({
  theme: themeReducer,
  height: getWindowHeightReducer,
  accounts: fetchAccountsReducer,
  network: fetchNetworkReducer,
  enabledMetamask: enableMetamaskReducer,
  orderForm: orderFormReducer,
  smartContracts: initSmartContractsReducer,
  userData:{}
})

export default rootReducer
