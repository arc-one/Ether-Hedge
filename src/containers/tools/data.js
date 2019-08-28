import { Row } from 'reactstrap'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import Wallet from './wallet'	
import Params from './params'
import { listenDepositedLogs, listenWithdrawLogs, listenStakedLogs, listenUnstakedLogs, listenDividendsLog } from '../../actions/web3Actions'

let startedListning = false;

class Data extends Component {

	componentDidUpdate(prevProps, prevState){
	    if(this.props.currentBlockNumber!==prevProps.currentBlockNumber && !startedListning) {
	        this.props.listenDepositedLogs();
	        this.props.listenWithdrawLogs();
	        this.props.listenStakedLogs();
	        this.props.listenUnstakedLogs();
	        this.props.listenDividendsLog();
	        startedListning = true;
	   }
	}

	render () {
		return (
			<Row className="tools_changes_proposals ">
				<Wallet/>
				<Params/>
			</Row>
		)
	}
}

const mapStateToProps = (state) => ({
	currentBlockNumber: state.currentBlockNumber
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ listenDepositedLogs, listenWithdrawLogs, listenStakedLogs, listenUnstakedLogs, listenDividendsLog }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Data)

