import { isEmpty }  from 'lodash';
import { Component } from 'react'
import { connect } from 'react-redux'
//import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { fetchNetwork, fetchAccounts, initSmartContracts } from '../../actions/web3Actions'
import {WEB3_POLL_INTERVAL} from '../../config'

class Web3Provider extends Component {
  constructor(props) {
    super(props);

    this.dataLoaded = false;

  }

  componentDidMount() {

    var _this = this;
    this.loadData()

    window.ethereum.on('accountsChanged', function (accounts) {
      this.dataLoaded = false;
      _this.loadData();
    })

    window.ethereum.on('networkChanged', function (netId) {
      this.dataLoaded = false;
      _this.loadData();
    })


  }

  loadData() {

    let interval = setInterval(() => {
      if(this.props.enabledMetamask) {
        this.props.fetchAccounts();
        this.props.fetchNetwork();

        if(this.props.accounts.length>0 && this.props.network) {
          
          if(isEmpty(this.props.smartContracts)){
            this.props.initSmartContracts();


           // this.fetchUserData();

            this.dataLoaded = true;

          }


          if(this.dataLoaded){
            clearInterval(interval);
          }
        }
      }

    }, 1000);
  }



  fetchUserData() {

  }

  initSmartContracts() {

  }


  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  accounts:state.accounts,
  network:state.network,
  enabledMetamask:state.enabledMetamask,
  smartContracts:state.smartContracts,
  userData: state.userdata
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ fetchAccounts, fetchNetwork, initSmartContracts }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Web3Provider)

