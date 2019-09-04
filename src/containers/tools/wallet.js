import { Row, Col, Container } from 'reactstrap'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getEtherscanLink } from '../../utils/etherscan'
import { ETH_DECIMALS, PERCENT_MULTIPLYER, DECIMALS } from '../../config'
import { getSpotPrice } from '../../actions/web3Actions'
import ModalStake from '../modals/modalStake'
import ModalUnstake from '../modals/modalUnstake'
import ModalWithdraw from '../modals/modalWithdraw'
import ModalDeposit from '../modals/modalDeposit'
import ModalSend from '../modals/modalSend'

import { toggleModal } from '../../actions/toggleModalActions'

class Wallet extends Component {

	componentDidMount(){
		this.props.getSpotPrice();
	}

	getDividends(){
        if(window.ethereum && this.props.enabledMetamask) {
            this.props.smartContracts.depository.inst.methods.getDividends().send({
                from: this.props.accounts[0]
            }); 
            this.props.toggleModal(null);
        }
	}

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
								<div className="text_right">${(this.props.userWalletBalance/ETH_DECIMALS*this.props.spotPrice/DECIMALS).toFixed(2)}</div>
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

								<button className="sm sm_btn_tools margin_right_btn float_rigth" disabled={!this.props.enabledMetamask} onClick={() => this.props.toggleModal('send')} > Send </button>
							</Col>

						</Row>

					</Container>
				</Row>
				<Row className="bottom_border_light wallet_row ">
					<Col md={4} sm={6} className=" no_padding">
						<div>
							Deposit
						</div>
						<div className="wallet_digit_large">
							{this.props.userBalance>0?(this.props.userBalance/ETH_DECIMALS).toFixed(6):0} ETH
						</div>
						<div className="usd_bottom">
							${(this.props.userBalance/ETH_DECIMALS*this.props.spotPrice/DECIMALS).toFixed(2)}
						</div>
					</Col>
					<Col md={4}  sm={6} className=" no_padding">
						<div>
							Available for trading 
						</div>
						<div className="wallet_digit_large">
							{this.props.availableBalance>0?(this.props.availableBalance/ETH_DECIMALS).toFixed(6):0} ETH
						</div>
						<div className="usd_bottom">
							${(this.props.availableBalance/ETH_DECIMALS*this.props.spotPrice/DECIMALS).toFixed(2)}
						</div>
					</Col>
					<Col md={4} sm={12} className="no_padding">
						<button className="sm sm_btn_tools_light margin_right_btn float_rigth"  disabled={!this.props.enabledMetamask} onClick={() => this.props.toggleModal('withdraw')} > Withdraw </button>
						<button className="sm sm_btn_tools_light margin_right_btn float_rigth"  disabled={!this.props.enabledMetamask} onClick={() => this.props.toggleModal('deposit')} > Deposit</button>
					</Col>
				</Row>

				<Row className="bottom_border_light wallet_row ">
					<Col md={4} sm={6} className=" no_padding">
						<div>
							EHE Tokens
						</div>
						<div className="wallet_digit_large">
							{this.props.mainTokenBalanceOf>0?(this.props.mainTokenBalanceOf/ETH_DECIMALS).toFixed(6):0} EHE
						</div>
						<div className="usd_bottom">
							$0.00
						</div>
					</Col>
					<Col md={4} sm={6} className=" no_padding">
						<div>
							Staked
						</div>
						<div className="wallet_digit_large">
							{this.props.stakedFunds>0?(this.props.stakedFunds/ETH_DECIMALS).toFixed(6):0} EHE
						</div>
						<div className="usd_bottom">
							$0.00
						</div>
					</Col>
					<Col md={4} sm={12} className="no_padding">
						<button className="sm sm_btn_tools_light margin_right_btn float_rigth" disabled={!this.props.enabledMetamask} onClick={() => this.props.toggleModal('unstake')}> Unstake </button>
						<button className="sm sm_btn_tools_light margin_right_btn float_rigth" disabled={!this.props.enabledMetamask} onClick={() => this.props.toggleModal('stake')} > Stake</button>
					</Col>
				</Row>
				<Row className="bottom_border_light wallet_row ">
					<Col md={4} sm={6} className=" no_padding">
						<div>
							Unreleased Dividends 
						</div>
						<div className="wallet_digit_large">
							{this.props.userDividends?(this.props.userDividends/ETH_DECIMALS).toFixed(6):0} ETH
						</div>
						<div className="usd_bottom">
							${(this.props.userDividends/ETH_DECIMALS*this.props.spotPrice/DECIMALS).toFixed(2)}
						</div>
					</Col>
					<Col md={4} sm={6} className=" no_padding">
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
					<Col md={4} sm={12} className="no_padding">
						<button className="sm sm_btn_tools_light margin_right_btn float_rigth"  onClick={() => this.getDividends()} disabled={!this.props.enabledMetamask || this.props.userDividends===0 } > Get Dividend </button>
					</Col>
				</Row>



				<Row className="bottom_border_light wallet_row ">
					<Col md={4} sm={6} className=" no_padding">
						<div>
							REKT Tokens
						</div>
						<div className="wallet_digit_large">
							{this.props.rektTokenBalanceOf>0?(this.props.rektTokenBalanceOf/ETH_DECIMALS).toFixed(6):0} REKT
						</div>
						<div className="usd_bottom">
							${(this.props.rektTokenBalanceOf/ETH_DECIMALS*this.props.spotPrice/DECIMALS).toFixed(2)}
						</div>
					</Col>
					<Col md={4} sm={6} className=" no_padding">
						<div>
							Trading Discount 
						</div>
						<div className="wallet_digit_large">
							{this.props.userDiscount/PERCENT_MULTIPLYER} %
						</div>
						<div className="usd_bottom">
							${(this.props.userDiscount/ETH_DECIMALS*this.props.spotPrice/DECIMALS).toFixed(2)}
						</div>
					</Col>
				</Row>

				<ModalStake/>
				<ModalUnstake/>
				<ModalWithdraw/>
				<ModalDeposit/>
				<ModalSend/>
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
	userDiscount: state.userDiscount,
	spotPrice: state.spotPrice,


})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ getSpotPrice, toggleModal }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Wallet)

