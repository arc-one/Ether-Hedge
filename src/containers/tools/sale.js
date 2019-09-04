import { Row, Col } from 'reactstrap'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { isEmpty, isNull }  from 'lodash'
import {timeFormat} from  "d3-time-format"
import Countdown from './countdown'
import { ETH_DECIMALS, DECIMALS } from '../../config'
import { getData } from "../../utils/barChartUtils"
import LineAndScatterChartGrid from './linearChart'
import { TypeChooser } from "react-stockcharts/lib/helper";
import {
	getTotalSupplyMainToken, 
	getReisedETH, 
	getSaleOpeningTime, 
	getSaleClosingTime, 
	getSaleInitialRate, 
	getSaleCurrentRate, 
	getSaleFinalRate,
	getSpotPrice,
	listenTokensPurchased

} from '../../actions/web3Actions'


var formatTimeCount = timeFormat("%Y-%m-%dT%H:%M:%S");
let startedListning = false;

class Sale extends Component {

	constructor(){
		super();
		this.state = {
			data:null,
			amount:''
		}
        this.handleChange= this.handleChange.bind(this);
    }

	componentDidMount(){

		this.props.getTotalSupplyMainToken();
	  	this.props.getSaleOpeningTime();
	  	this.props.getSaleClosingTime();
	  	this.props.getSaleInitialRate();
	  	this.props.getSaleCurrentRate();
	  	this.props.getSaleFinalRate();
	  	this.props.getReisedETH();
	  	this.props.getSpotPrice();

		if(!this.state.data && this.props.saleOpening && this.props.saleClosingTime){
			this.setState({data:getData(this.props.saleOpening, this.props.saleClosingTime)})
		}

	}	

    handleChange(event) {
        this.setState({ amount: event.target.value });
    }

	componentDidUpdate(prevProps, prevState){
		if(this.props.saleOpening && this.props.saleClosingTime && !this.state.data){
			this.setState({data:getData(this.props.saleOpening, this.props.saleClosingTime)})
		}

		if(this.props.currentBlockNumber!==prevProps.currentBlockNumber && !startedListning) {
	        this.props.listenTokensPurchased();
	        startedListning = true;
	   }
	}

    buyTokens = async () => {
        if(window.ethereum && (!(isEmpty(this.props.accounts) || isNull(this.props.network) || !this.props.enabledMetamask))) {
			
			this.props.smartContracts.sale.inst.methods.buyTokens(this.props.accounts[0]).send({
                from: this.props.accounts[0],
                value:this.state.amount*ETH_DECIMALS
            });

        }
    }

	render () {

		return (

			<Row className="tools_changes_proposals ">
				<Col className='right_border sale_countdown' md={7} >
					<Row className="token_sale_row bottom_border_light">
						<h3 className="title_large">Token Sale</h3>
					</Row>
					<Row className="token_sale_row bottom_border_light">
						<Col md={4} sm={6} xs={6} className=" no_padding">
							<div>
								Raised 
							</div>
							<div className="wallet_digit_large">
								{this.props.reisedETH>0?(this.props.reisedETH/ETH_DECIMALS).toFixed(6):0} ETH
							</div>
							<div className="usd_bottom">
								${(this.props.reisedETH/ETH_DECIMALS*this.props.spotPrice/DECIMALS).toFixed(2) }
							</div>
						</Col>
						<Col md={4} sm={6} xs={6} className=" no_padding">
							<div>
								Total supply 
							</div>
							<div className="wallet_digit_large">
								{this.props.mainTokenTotalSupply>0?(this.props.mainTokenTotalSupply/ETH_DECIMALS).toFixed(6):0} EHE
							</div>
							<div className="usd_bottom">
								
							</div>
						</Col>
						<Col md={4} sm={12}  className="d-none d-sm-block no_padding">
							<div>
								You Purchesed
							</div>
							<div className="wallet_digit_large">
								{this.props.mainTokenBalanceOf>0?(this.props.mainTokenBalanceOf/ETH_DECIMALS).toFixed(6):0} EHE
							</div>
							<div className="usd_bottom">
							
							</div>
						</Col>
					</Row>
					<Row className="countdown_block">
						<Col>
							{new Date(this.props.saleOpening*1000) > new Date()? 
								<center className="margin_top">
									<div className="countdown_price">Start in:</div>
									<Countdown date={formatTimeCount(this.props.saleOpening*1000)}/>
									<div className="">Initial Price: {1/this.props.saleInitialRate} ETH</div>
									<form className="form-inline justify-content-center margin_top">
										<div className="form-group mx-sm-3 mb-2">
											<input name="number" type="text" className="form-control buy_token_inp" disabled placeholder="ETH Amount"/>
										</div>
										<Button  className="btn btn-primary buy_token_btn mb-2" color="primary" disabled>Buy Tokens</Button>
									</form>
								</center>:null}


							{new Date(this.props.saleClosingTime*1000) > new Date() && new Date(this.props.saleOpening*1000) <= new Date()? 
								<center className="margin_top">
									<div className="countdown_price">Current Price: {this.props.saleCurrentRate>0?(1/this.props.saleCurrentRate).toFixed(9):0} ETH</div>
									<Countdown  date={formatTimeCount(this.props.saleClosingTime*1000)}/>


									{this.props.enabledMetamask && this.props.saleCurrentRate>0?

										<form className="form-inline justify-content-center margin_top">
										  <div className="form-group mx-sm-3 mb-2">
										    <input name="number" type="text" className="form-control buy_token_inp" onChange={this.handleChange} placeholder="ETH Amount"/>
										  </div>
										  <Button  className="btn btn-primary buy_token_btn mb-2" color="primary" onClick={this.buyTokens}>Buy Tokens</Button>
										</form>
										:
										<div>
											<form className="form-inline justify-content-center margin_top">
											  <div className="form-group mx-sm-3 mb-2">
											    <input name="number" type="text" className="form-control buy_token_inp" disabled placeholder="ETH Amount"/>
											  </div>
											  <Button  className="btn btn-primary buy_token_btn mb-2" color="primary" disabled>Buy Tokens</Button>
											  
											</form>
											<div className="my-3">Please enable Metamask to activate the button.</div>
										</div>
									}
								</center>:null}

							{this.props.saleClosingTime && new Date(this.props.saleClosingTime*1000) <= new Date()? 
								<center className="margin_top">
									<div className="sale_closed">Token Sale is Closed!</div>
								</center>:null}
						</Col>
					</Row>
				</Col>
				<Col className='right_border sale_chart' md={5} >
					<Row  className="chart_sale_price_top">
						<Col>
							<Row className="title_large margin_bottom">Price Growth Chart</Row>
							<Row>
								<Col>
									<Row className="chart_text">Initial Price: {1/this.props.saleInitialRate || 0} ETH</Row>
									<Row className="chart_text">Final Price: {1/this.props.saleFinalRate || 0} ETH</Row>
									<Row className="chart_text">Current Price: {this.props.saleCurrentRate>0?(1/this.props.saleCurrentRate).toFixed(9):0} ETH</Row>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row className="chart_sale_price" id="chart_sale_price">
						{
							this.state.data?<TypeChooser>
								{type => <LineAndScatterChartGrid type={type} data={this.state.data} currentPrice={this.props.saleCurrentRate>0?1/this.props.saleCurrentRate:0} width = {document.getElementById("chart_sale_price").offsetWidth} />}
							</TypeChooser>:null
						}
					</Row>
				</Col>
			</Row>
		)
	}
}


const mapStateToProps = (state) => ({
	accounts:state.accounts,
	network: state.network,
	enabledMetamask: state.enabledMetamask,
	smartContracts: state.smartContracts,
	saleFinalRate: state.saleFinalRate,
	saleInitialRate: state.saleInitialRate,
	saleClosingTime: state.saleClosingTime,
	saleCurrentRate: state.saleCurrentRate,
	saleOpening: state.saleOpening,
	reisedETH: state.reisedETH,
	mainTokenBalanceOf: state.mainTokenBalanceOf,
	mainTokenTotalSupply: state.mainTokenTotalSupply,
	windowSize: state.windowSize,
	spotPrice: state.spotPrice,
	currentBlockNumber: state.currentBlockNumber
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ 
	  	getTotalSupplyMainToken, 
	  	getReisedETH, 
	  	getSaleOpeningTime, 
	  	getSaleClosingTime, 
	  	getSaleInitialRate, 
	  	getSaleCurrentRate, 
	  	getSaleFinalRate,
	  	getSpotPrice,
	  	listenTokensPurchased
  	}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Sale)

