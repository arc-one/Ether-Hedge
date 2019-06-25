import { isEmpty }  from 'lodash';
import { Component } from 'react'
import { connect } from 'react-redux'
//import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import {  fetchNetwork, 
          fetchAccounts, 
          initSmartContracts, 
          getBalance,
          getWalletBalance,
          getStakedFunds,
          getAvailableBalance,
          getLastPrice,
          getSpotPrice,

        } from '../../actions/web3Actions'
import {WEB3_POLL_INTERVAL} from '../../config'

class Web3Provider extends Component {
  constructor(props) {
    super(props);
    this.dataLoaded = false;
  }

  componentDidMount() {
    var _this = this;

    this.loadData()
    if(window.ethereum) {
      window.ethereum.on('accountsChanged', function (accounts) {
        _this.props.fetchAccounts();
        _this.dataLoaded = false;
        _this.loadData();
      })

      window.ethereum.on('networkChanged', function (netId) {
        _this.props.fetchNetwork();
        _this.dataLoaded = false;
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
              this.fetchFutureData();
              this.isDataLoaded();
            }
            if(this.dataLoaded){
              clearInterval(interval);
            }
          }
      }
    }, WEB3_POLL_INTERVAL);
  }

  isDataLoaded(){
    this.dataLoaded = true;
  }

  fetchUserData() {
    this.props.getBalance();
    this.props.getWalletBalance();
    this.props.getStakedFunds();
    this.props.getAvailableBalance();
  }

  fetchFutureData() {
    this.props.getLastPrice();
    this.props.getSpotPrice();
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  accounts:state.accounts,
  network:state.network,
  enabledMetamask:state.enabledMetamask,
  smartContracts:state.smartContracts//,
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
    getSpotPrice
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Web3Provider)

