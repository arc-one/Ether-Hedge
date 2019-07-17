import { Row, Col, Container, ListGroup, ListGroupItem } from 'reactstrap'
import React, { Component } from 'react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import { isEmpty, isNull }  from 'lodash';
import Web3  from 'web3';
import {timeFormat} from  "d3-time-format";


import { ETH_DECIMALS } from '../../config'



var formatTime = timeFormat("%B %d, %Y");
var formatTimeCount = timeFormat("%Y-%m-%dT%H:%M:%S");

class Params extends Component {

	componentDidMount(){}

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
										<div className="float_rigth" > Ξ 222222 </div>
									</Col>
								</Row>
								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										Total Staked Funds:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" > Ξ 222222 </div>
									</Col>
								</Row>
								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										All Time Profit:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" > Ξ 222222 </div>
									</Col>
								</Row>
								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										24h Volume:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" > Ξ 222222 </div>
									</Col>
								</Row>
								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										24h Liquidated:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" > Ξ 222222 </div>
									</Col>
								</Row>
								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										Total Volume:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" > Ξ 222222 </div>
									</Col>
								</Row>
								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										Total Liquidated:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" > Ξ 222222 </div>
									</Col>
								</Row>
								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										Margin Bank:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" > Ξ 222222 </div>
									</Col>
								</Row>
								
								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										Total EHE Supply:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" > Ξ 222222 </div>
									</Col>
								</Row>
								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										Total REKT Supply:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" > Ξ 222222 </div>
									</Col>
								</Row>

							</Col>
						</Row>
					</Container>
				</Row>
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
										<div className="float_rigth" > Ξ 222222 </div>
									</Col>
								</Row>
								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										Activation In:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" > Ξ 222222 </div>
									</Col>
								</Row>
								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										Fee Limit Order:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" > Ξ 222222 </div>
									</Col>
								</Row>
								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										Fee Market Order:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" > Ξ 222222 </div>
									</Col>
								</Row>

								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										Max Leverage:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" > Ξ 222222 </div>
									</Col>
								</Row>

								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										Liquidation Profit:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" > Ξ 222222 </div>
									</Col>
								</Row>

								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										Minimum Voting Percent:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" > Ξ 222222 </div>
									</Col>
								</Row>

								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										Parameters Proposal Fee:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" > Ξ 222222 </div>
									</Col>
								</Row>
								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										Contract Proposal Fee:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" > Ξ 222222 </div>
									</Col>
								</Row>
								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										Discount Index:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" > Ξ 222222 </div>
									</Col>
								</Row>
								<Row className="bottom_border_light info_row_tools ">
									<Col className=" no_padding">
										Max Market Length:
									</Col>
									<Col className="no_padding">
										<div className="float_rigth" > Ξ 222222 </div>
									</Col>
								</Row>


			


						
							</Col>
				

						</Row>

					</Container>
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

	mainTokenBalanceOf: state.mainTokenBalanceOf,
	mainTokenTotalSupply: state.mainTokenTotalSupply
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Params)

