import { isEmpty }  from 'lodash';
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { WEB3_POLL_INTERVAL, POLL_BLOCK_NUMBER_INTERVAL } from '../../config'
import {  fetchNetwork, 
          fetchAccounts, 
          initSmartContracts, 
          getBalance,
          getWalletBalance,
          getStakedFunds,
          getAvailableBalance,
          getLastPrice,
          getSpotPrice,
          fetchOrders,
          checkIfTrustedFuture,
          fetchHistory,
          listenMarketOrderLog,
          listenLimitOrderLog,
          fetchPosition,
          getBlockNumber,
          getMaxLeverage,
          getFeeLimit,
          getFeeMarket
        } from '../../actions/web3Actions'


class Web3Provider extends Component {

  componentDidUpdate(prevProps, prevState) {
    let activeFuture = this.props.smartContracts.activeFuture;
    if (activeFuture !== prevProps.smartContracts.activeFuture) {
      this.fetchFutureData();
    }
    if(this.props.enabledMetamask) {
      if(this.props.trades.length !== prevProps.trades.length){
        this.props.fetchPosition();
      }  
    }
  }

  componentDidMount() {
    var _this = this;
    this.props.initSmartContracts();
    this.loadData();
    this.startEventsListener();

    if(window.ethereum) {
      window.ethereum.on('accountsChanged', accounts => {
        _this.props.fetchAccounts();
        _this.loadData();
      })
      window.ethereum.on('networkChanged', netId => {
        _this.props.fetchNetwork();
        _this.loadData();
      })
    }
  }

  loadData() {
    let interval = setInterval(() => {

      if(this.props.enabledMetamask) {
          this.props.fetchAccounts();
          this.props.fetchNetwork();
          if(this.props.accounts.length>0 && this.props.network) {
            if(isEmpty(this.props.smartContracts)){
              this.props.initSmartContracts();
            } else {
              this.fetchUserData();
              clearInterval(interval);
            }
          }
      }
    }, WEB3_POLL_INTERVAL);
    
    this.props.getBlockNumber();
    setInterval(() => {
      this.props.getBlockNumber();
    }, POLL_BLOCK_NUMBER_INTERVAL);
  }

  fetchUserData() {
    this.props.getBalance();
    this.props.getWalletBalance();
    this.props.getStakedFunds();
    this.props.getAvailableBalance();
    this.props.fetchPosition();
  }

  fetchFutureData() {
    this.props.getLastPrice();
    this.props.getSpotPrice();
    this.props.fetchHistory();
    this.props.fetchOrders();
    this.props.checkIfTrustedFuture();
    this.props.getMaxLeverage();
    this.props.getFeeLimit();
    this.props.getFeeMarket();
  }

  startEventsListener(){
    this.props.listenMarketOrderLog();
    this.props.listenLimitOrderLog();
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  accounts: state.accounts,
  network: state.network,
  enabledMetamask: state.enabledMetamask,
  smartContracts: state.smartContracts,
  trades: state.trades
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ 
    fetchAccounts, 
    fetchNetwork, 
    initSmartContracts, 
    getBalance,
    getWalletBalance,
    getStakedFunds,
    getAvailableBalance,      
    getLastPrice,
    getSpotPrice,
    fetchOrders,
    checkIfTrustedFuture,
    fetchHistory,
    listenMarketOrderLog,
    listenLimitOrderLog,
    fetchPosition,
    getBlockNumber,
    getMaxLeverage,
    getFeeLimit,
    getFeeMarket
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Web3Provider)

