import { Row, Col, Container } from 'reactstrap'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { isNull }  from 'lodash';

import { ETH_DECIMALS, PERCENT_MULTIPLYER, LEVERAGE_DECIMALS } from '../../config'

import {  
          getTotalBalance,
          getTotalSupplyMainToken,
          getTotalSupplyRektToken,
          getTotalProfit,
          getMarginBank,
          getTotalStaked,
          getTotalDividends,
          getFeeLimit,
          getFeeMarket,
          getParams

          

        } from '../../actions/web3Actions'


class Params extends Component {

	componentDidMount(){
		this.props.getTotalBalance();
		this.props.getTotalSupplyMainToken();
		this.props.getTotalSupplyRektToken();
		this.props.getTotalProfit();
		this.props.getMarginBank();
		this.props.getTotalStaked();
		this.props.getTotalDividends();

		this.props.getFeeLimit();
		this.props.getFeeMarket();
		this.props.getParams();
		
	}

	render () {
		return (
			
			<Col md={5} className="">
				<Row className="tools_data">
					<Container className="no_padding">
						<Row className="wallet_margin_top">
							<Col>
								<h3 className="title_large">Statistic</h3>
							</Col>
						</Row>
						<Row className="">
							<Col className="wallet_margin_top ">
								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										Total Balance:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" > {this.props.totalBalance>0?(this.props.totalBalance/ETH_DECIMALS).toFixed(6):0} ETH </div>
									</Col>
								</Row>
								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										Total Staked Funds:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" > {this.props.totalStaked>0?(this.props.totalStaked/ETH_DECIMALS).toFixed(6):0} EHE</div>
									</Col>
								</Row>
								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										Total Profit:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" >{this.props.totalProfit>0?(this.props.totalProfit/ETH_DECIMALS).toFixed(6):0} ETH</div>
									</Col>
								</Row>

								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										Total Dividends:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" >{this.props.totalDividends>0?(this.props.totalDividends/ETH_DECIMALS).toFixed(6):0} ETH</div>
									</Col>
								</Row>

								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										Margin Bank:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" > {this.props.marginBank>0?(this.props.marginBank/ETH_DECIMALS).toFixed(6):0} ETH </div>
									</Col>
								</Row>
								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										Total EHE Supply:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth">{this.props.mainTokenTotalSupply>0?(this.props.mainTokenTotalSupply/ETH_DECIMALS).toFixed(6):0} EHE</div>
									</Col>
								</Row>
								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										Total REKT Supply:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" > {this.props.rektTokenTotalSupply>0?(this.props.rektTokenTotalSupply/ETH_DECIMALS).toFixed(6):0} REKT</div>
									</Col>
								</Row>
							</Col>
						</Row>
					</Container>
				</Row>
				{	!isNull(this.props.params) ?
					<Row className="bottom_border_light tools_data">
						<Container className="no_padding">
							<Row className="wallet_margin_top">

								<Col>
									<h3 className="title_large">Parameters</h3>
								</Col>

							</Row>
							<Row className="">
								<Col className="wallet_margin_top">



									<Row className="bottom_border_light info_row_tools ">
										<Col className=" no_padding">
											Voting Time:
										</Col>
										<Col className="no_padding">
											<div className="float_rigth" > {this.props.params && this.props.params.votingTime && this.props.params.votingTime.value>0?this.props.params.votingTime.value:0} sec </div>
										</Col>
									</Row>
									<Row className="bottom_border_light info_row_tools ">
										<Col className=" no_padding">
											Activation In:
										</Col>
										<Col className="no_padding">
											<div className="float_rigth" > {this.props.params && this.props.params.activationTime && this.props.params.activationTime.value>0?this.props.params.activationTime.value:0} blocks </div>
										</Col>
									</Row>
									<Row className="bottom_border_light info_row_tools ">
										<Col className=" no_padding">
											Fee Limit Order:
										</Col>
										<Col className="no_padding">
											<div className="float_rigth" > {this.props.params && this.props.params.feeLimit && this.props.params.feeLimit.value>0?(this.props.params.feeLimit.value/PERCENT_MULTIPLYER).toFixed(2):0} % </div>
										</Col>
									</Row>
									<Row className="bottom_border_light info_row_tools ">
										<Col className=" no_padding">
											Fee Market Order:
										</Col>
										<Col className="no_padding">
											<div className="float_rigth" > {this.props.params && this.props.params.feeMarket && this.props.params.feeMarket.value>0?(this.props.params.feeMarket.value/PERCENT_MULTIPLYER).toFixed(2):0} % </div>
										</Col>
									</Row>

									<Row className="bottom_border_light info_row_tools ">
										<Col className=" no_padding">
											Max Leverage:
										</Col>
										<Col className="no_padding">
											<div className="float_rigth" >  {this.props.params && this.props.params.maxLeverage && this.props.params.maxLeverage.value>0?(this.props.params.maxLeverage.value/LEVERAGE_DECIMALS).toFixed(2):0} x </div>
										</Col>
									</Row>

									<Row className="bottom_border_light info_row_tools ">
										<Col className=" no_padding">
											Liquidation Profit:
										</Col>
										<Col className="no_padding">
											<div className="float_rigth" > {this.props.params && this.props.params.liquidationProfit && this.props.params.liquidationProfit.value>0?(this.props.params.liquidationProfit.value/PERCENT_MULTIPLYER).toFixed(2):0} % </div>
										</Col>
									</Row>

									<Row className="bottom_border_light info_row_tools ">
										<Col className=" no_padding">
											Minimum Voting Percent:
										</Col>
										<Col className="no_padding">	
											<div className="float_rigth" > {this.props.params && this.props.params.minVotingPercent && this.props.params.minVotingPercent.value>0?(this.props.params.minVotingPercent.value/PERCENT_MULTIPLYER).toFixed(2):0} % </div>
										</Col>
									</Row>

									<Row className="bottom_border_light info_row_tools ">
										<Col className=" no_padding">
											Parameters Proposal Fee:
										</Col>
										<Col className="no_padding">
											<div className="float_rigth" > {this.props.params && this.props.params.paramProposalFee && this.props.params.paramProposalFee.value>0?(this.props.params.paramProposalFee.value/ETH_DECIMALS).toFixed(6):0} ETH </div>
										</Col>
									</Row>
									<Row className="bottom_border_light info_row_tools ">
										<Col className=" no_padding">
											Contract Proposal Fee:
										</Col>
										<Col className="no_padding">
											<div className="float_rigth" > {this.props.params && this.props.params.contractProposalFee && this.props.params.contractProposalFee.value>0?(this.props.params.contractProposalFee.value/ETH_DECIMALS).toFixed(6):0} ETH </div>
										</Col>
									</Row>
									<Row className="bottom_border_light info_row_tools ">
										<Col className=" no_padding">
											Discount Index:
										</Col>
										<Col className="no_padding">
											<div className="float_rigth" > {this.props.params && this.props.params.feeDiscountIndex && this.props.params.feeDiscountIndex.value>0?this.props.params.feeDiscountIndex.value:0}</div>
										</Col>
									</Row>
									<Row className="bottom_border_light info_row_tools ">
										<Col className=" no_padding">
											Max Market Length:
										</Col>
										<Col className="no_padding">
											<div className="float_rigth" > {this.props.params && this.props.params.maxMarketLength && this.props.params.maxMarketLength.value>0?this.props.params.maxMarketLength.value:0} </div>
										</Col>
									</Row>


				


							
								</Col>
					

							</Row>

						</Container>
					</Row>:null
				}



			</Col>
			
		)
	}
}

const mapStateToProps = (state) => ({
	accounts:state.accounts,
	network: state.network,
	enabledMetamask: state.enabledMetamask,
	smartContracts: state.smartContracts,
	totalBalance: state.totalBalance,
	mainTokenTotalSupply: state.mainTokenTotalSupply,
	rektTokenTotalSupply: state.rektTokenTotalSupply,
	totalProfit: state.totalProfit,
	marginBank: state.marginBank,
	totalStaked: state.totalStaked,
	totalDividends: state.totalDividends,
	feeMarket:state.feeMarket,
	feeLimit:state.feeLimit,
	params: state.params

})

const mapDispatchToProps = dispatch => (
  	bindActionCreators({ 
	  	getTotalBalance, 
	  	getTotalSupplyMainToken, 
	  	getTotalSupplyRektToken,
	  	getTotalProfit,
	  	getMarginBank,
	  	getTotalStaked,
	  	getTotalDividends,
	  	getFeeLimit,
	  	getFeeMarket,
	  	getParams

  	}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Params)

