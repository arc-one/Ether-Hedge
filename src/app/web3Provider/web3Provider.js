import { isEmpty, isNull }  from 'lodash';
import { Component } from 'react'
import { connect } from 'react-redux'
//import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { fetchNetwork, fetchAccounts } from '../../actions/web3Actions'
import {WEB3_POLL_INTERVAL} from '../../config'

class Web3Provider extends Component {
  constructor(props) {
    super(props);
    this.interval = null
    this.networkInterval = null
    this.dataLoaded = false

  }

  componentDidMount() {
    this.props.fetchAccounts()
    this.props.fetchNetwork()
    this.initPoll()
    this.initNetworkPoll()
    //this.initUserDataPoll()
  }

  initPoll() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.props.fetchAccounts()
/*        if(!this.dataLoaded) {

        }*/
      }, WEB3_POLL_INTERVAL);
    }
  }

  initNetworkPoll() {
    if (!this.networkInterval) {
      this.networkInterval = setInterval(() =>this.props.fetchNetwork(), WEB3_POLL_INTERVAL);
    }
  }

/*  initUserDataPoll() {
    if (!this.dataInterval && localStorage.connectionDenied!=='true' && !isEmpty(this.props.accounts)  && !isNull(this.props.network)) {
      //this.dataInterval = setInterval(() =>this.props.fetchUserData(), WEB3_POLL_INTERVAL);
    } else {
       //localStorage.setItem('isConnected', 'false')
      //this.dataInterval = setInterval(() =>this.props.fetchDataInfura(), WEB3_POLL_INTERVAL);
    }
  }
*/



  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  accounts:state.accounts,
  network:state.network,
  isConnected:state.isConnected
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ fetchAccounts, fetchNetwork }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Web3Provider)

