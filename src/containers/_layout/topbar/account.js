import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getEtherscanLink } from '../../../utils/etherscan'
import { enableMetamask } from '../../../actions/web3Actions'

class Account extends Component {
	handleEnableMetamask = () => {
		this.props.enableMetamask()
	};

	render () {
		return (
			<div className="col subheader_right">
				{
					this.props.enabledMetamask && window.innerWidth > 1000?
					<span> Account: <a rel="noopener noreferrer" target="_blank" href={getEtherscanLink('address', this.props.accounts[0], null, this.props.network)}>{this.props.accounts[0] }</a> | {this.props.network===1?'Main':'Kovan'}</span>:null}

				{	(!this.props.enabledMetamask)?
					<button className="sm sm_btn_top"  onClick={this.handleEnableMetamask} > Enable Metamask </button>:null
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
  network:state.network,
  accounts:state.accounts,
  enabledMetamask:state.enabledMetamask
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ enableMetamask }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Account)

