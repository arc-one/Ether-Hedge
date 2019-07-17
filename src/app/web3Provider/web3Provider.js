import { isEmpty }  from 'lodash';
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { WEB3_POLL_INTERVAL, POLL_BLOCK_NUMBER_INTERVAL } from '../../config'
import {  
          fetchNetwork, 
          fetchAccounts, 
          initSmartContracts, 
          getBalance,
          getWalletBalance,
          getStakedFunds,
          getAvailableBalance,
          fetchPosition,
          getBlockNumber,
          mainTokenBalanceOf,
          rektTokenBalanceOf,
          calcDividends,
          calcDiscount
        } from '../../actions/web3Actions'

class Web3Provider extends Component {

  componentDidUpdate(prevProps, prevState) {
    if (this.props.smartContracts.activeFuture !== prevProps.smartContracts.activeFuture) {
      this.props.getBlockNumber();
    }
    if(this.props.enabledMetamask!==prevProps.enabledMetamask) {
      this.props.fetchNetwork();
    }
    if(this.props.network!==prevProps.network) {
      this.props.fetchAccounts();
    }
    if(this.props.accounts!==prevProps.accounts) {
      this.fetchUserData();
    }
  }

  componentDidMount() {
    var _this = this;
    this.props.initSmartContracts();
    
    setInterval(() => {
      this.props.getBlockNumber();
    }, POLL_BLOCK_NUMBER_INTERVAL);

    if(window.ethereum) {
      window.ethereum.on('accountsChanged', accounts => {
        this.props.getBlockNumber();
        if(this.props.enabledMetamask) {
          this.props.fetchAccounts();
        }
      })
      window.ethereum.on('networkChanged', netId => {
        this.props.getBlockNumber();
        if(this.props.enabledMetamask) {
          this.props.fetchNetwork();
        }
      })
    }
  }

  fetchUserData() {
    this.props.getBalance();
    this.props.getWalletBalance();
    this.props.getStakedFunds();
    this.props.getAvailableBalance();
    this.props.fetchPosition();
    this.props.mainTokenBalanceOf();
    this.props.rektTokenBalanceOf();
    this.props.calcDividends();
    this.props.calcDiscount();
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
  trades: state.trades,
  currentBlockNumber: state.currentBlockNumber
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ 
    fetchNetwork, 
    fetchAccounts, 
    initSmartContracts, 
    getBalance,
    getWalletBalance,
    getStakedFunds,
    getAvailableBalance,
    fetchPosition,
    getBlockNumber,
    mainTokenBalanceOf,
    rektTokenBalanceOf,
    calcDividends,
    calcDiscount
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Web3Provider)

