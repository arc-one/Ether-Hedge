import { Row, Col, Container, ListGroup, ListGroupItem } from 'reactstrap'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
//import { Button } from 'reactstrap'
//import { isEmpty, isNull }  from 'lodash';
import Web3  from 'web3';
import { getEtherscanLink } from '../../utils/etherscan'
import { ETH_DECIMALS, PERCENT_MULTIPLYER } from '../../config'

//var formatTime = timeFormat("%B %d, %Y");
//var formatTimeCount = timeFormat("%Y-%m-%dT%H:%M:%S");

class Wallet extends Component {

	componentDidMount(){}


	render () {
		return (
			<Col className='right_border wallet_cont' md={7} >
				<Row className="bottom_border_light wallet_top">
					<Container className="no_padding">
						<Row className="wallet_margin_top">

							<Col>
								<h3 className="title_large">Wallet</h3>
							</Col>
							<Col  md={4}>
								<div className="title_large text_right">Ξ {(this.props.userWalletBalance/ETH_DECIMALS).toFixed(6)}</div>
								<div className="text_right">$3245.23</div>
							</Col>
						</Row>
						<Row className="">
							<Col className="wallet_margin_top">
								<div>
									{(this.props.network && this.props.accounts[0] && this.props.enabledMetamask)?<span>{(this.props.network===1?'Main Network':'Kovan Test Network')}</span>:<span>No Connection to the wallet.</span>}
								</div>
								<div className="" md={3}>
									{(this.props.accounts[0])?<a rel="noopener noreferrer" className="tools_addr_user" target="_blank" href={getEtherscanLink('address', this.props.accounts[0], null, this.props.network)}>{this.props.accounts[0] }</a>:'Please Enable Metamask.'}
								</div>
							</Col>
							<Col className="">
								<button className="sm sm_btn_tools margin_right_btn float_rigth" disabled={!this.props.enabledMetamask}  > Receive </button>
								<button className="sm sm_btn_tools margin_right_btn float_rigth" disabled={!this.props.enabledMetamask}  > Send </button>
							</Col>

						</Row>

					</Container>
				</Row>
				<Row className="bottom_border_light wallet_row ">
					<Col className=" no_padding">
						<div>
							Deposit
						</div>
						<div className="wallet_digit_large">
							{this.props.userBalance>0?(this.props.userBalance/ETH_DECIMALS).toFixed(6):0} ETH
						</div>
						<div className="usd_bottom">
							$3245.23
						</div>
					</Col>
					<Col className="no_padding">
						<button className="sm sm_btn_tools_light margin_right_btn float_rigth"  disabled={!this.props.enabledMetamask} > Withdraw </button>
						<button className="sm sm_btn_tools_light margin_right_btn float_rigth"  disabled={!this.props.enabledMetamask} > Deposit</button>
					</Col>
				</Row>
				<Row className="bottom_border_light wallet_row ">
					<Col className=" no_padding">
						<div>
							EHE Tokens
						</div>
						<div className="wallet_digit_large">
							{this.props.mainTokenBalanceOf>0?(this.props.mainTokenBalanceOf/ETH_DECIMALS).toFixed(6):0} EHE
						</div>
						<div className="usd_bottom">
							$3245.23
						</div>
					</Col>
					<Col className="no_padding">
						<button className="sm sm_btn_tools_light margin_right_btn float_rigth" disabled={!this.props.enabledMetamask}  > Receive </button>
						<button className="sm sm_btn_tools_light margin_right_btn float_rigth" disabled={!this.props.enabledMetamask} > Send </button>
					</Col>
				</Row>
				<Row className="bottom_border_light wallet_row ">
					<Col className=" no_padding">
						<div>
							EHE Tokens Stake
						</div>
						<div className="wallet_digit_large">
							{this.props.stakedFunds>0?(this.props.stakedFunds/ETH_DECIMALS).toFixed(6):0} EHE
						</div>
						<div className="usd_bottom">
							$3245.23
						</div>
					</Col>
					<Col className="no_padding">
						<button className="sm sm_btn_tools_light margin_right_btn float_rigth" disabled={!this.props.enabledMetamask}  > Unstake </button>
						<button className="sm sm_btn_tools_light margin_right_btn float_rigth" disabled={!this.props.enabledMetamask}  > Stake</button>
					</Col>
				</Row>
				<Row className="bottom_border_light wallet_row ">
					<Col className=" no_padding">
						<div>
							REKT Tokens
						</div>
						<div className="wallet_digit_large">
							{this.props.rektTokenBalanceOf?(this.props.rektTokenBalanceOf/ETH_DECIMALS).toFixed(6):0} REKT
						</div>
						<div className="usd_bottom">
							$3245.23
						</div>
					</Col>
					<Col className="no_padding">
						<button className="sm sm_btn_tools_light margin_right_btn float_rigth" disabled={!this.props.enabledMetamask}  > Receive </button>
						<button className="sm sm_btn_tools_light margin_right_btn float_rigth" disabled={!this.props.enabledMetamask}  > Send </button>
					</Col>
				</Row>
				<Row className="bottom_border_light wallet_row ">
					<Col className=" no_padding">
						<div>
							Unreleased Dividends 
						</div>
						<div className="wallet_digit_large">
							{this.props.userDividends?(this.props.userDividends/ETH_DECIMALS).toFixed(6):0} ETH
						</div>
						<div className="usd_bottom">
							$3245.23
						</div>
					</Col>
					<Col className="no_padding">
						<button className="sm sm_btn_tools_light margin_right_btn float_rigth" disabled={!this.props.enabledMetamask || !this.props.userDividends>0 } > Get Dividend </button>
						
					</Col>
				</Row>

				<Row className=" wallet_row ">
					<Col md={4} className=" no_padding">
						<div>
							Available for trading 
						</div>
						<div className="wallet_digit_large">
							{(this.props.availableBalance/ETH_DECIMALS).toFixed(6)} ETH
						</div>
						<div className="usd_bottom">
							$3245.23
						</div>
					</Col>
					<Col md={4} className=" no_padding">
						<div>
							Released Dividends 
						</div>
						<div className="wallet_digit_large">
							0 EEE
						</div>
						<div className="usd_bottom">
							$3245.23
						</div>
					</Col>
					<Col md={4} className=" no_padding">
						<div>
							Trading Discount 
						</div>
						<div className="wallet_digit_large">
							{this.props.userDiscount/PERCENT_MULTIPLYER} %
						</div>
						<div className="usd_bottom">
							$3245.23
						</div>
					</Col>

				</Row>
			</Col>
		)
	}
}

const mapStateToProps = (state) => ({
	accounts:state.accounts,
	network: state.network,
	enabledMetamask: state.enabledMetamask,
	smartContracts: state.smartContracts,
	userWalletBalance: state.userWalletBalance,
	mainTokenBalanceOf: state.mainTokenBalanceOf,
	rektTokenBalanceOf: state.rektTokenBalanceOf,
	userDividends: state.userDividends,
	stakedFunds:state.stakedFunds,
	userBalance:state.userBalance,
	availableBalance:state.availableBalance,
	userDiscount: state.userDiscount

})

const mapDispatchToProps = dispatch => (
  bindActionCreators({}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Wallet)

