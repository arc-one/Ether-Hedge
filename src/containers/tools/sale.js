import { Row, Col, Container, ListGroup, ListGroupItem } from 'reactstrap'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { isEmpty, isNull }  from 'lodash';
import Web3  from 'web3';
import {timeFormat} from  "d3-time-format";

import Countdown from './countdown'
import { ETH_DECIMALS } from '../../config'
import {
	getTotalSupplyMainToken, 
	getReisedETH, 
	getSaleOpeningTime, 
	getSaleClosingTime, 
	getSaleInitialRate, 
	getSaleCurrentRate, 
	getSaleFinalRate 

} from '../../actions/web3Actions'

var formatTime = timeFormat("%B %d, %Y");
var formatTimeCount = timeFormat("%Y-%m-%dT%H:%M:%S");

class Sale extends Component {

	componentDidMount(){
		this.props.getTotalSupplyMainToken();
	  	this.props.getSaleOpeningTime();
	  	this.props.getSaleClosingTime();
	  	this.props.getSaleInitialRate();
	  	this.props.getSaleCurrentRate();
	  	this.props.getSaleFinalRate();

	  	this.props.getReisedETH();
	}


    buyTokens = async () => {
        if(window.ethereum && (!(isEmpty(this.props.accounts) || isNull(this.props.network) || !this.props.enabledMetamask))) {
            
            let provider = window.ethereum;
            const web3 = new Web3(provider);
			
			this.props.smartContracts.sale.inst.methods.buyTokens(this.props.accounts[0]).send({
                from: this.props.accounts[0],
                value:50000000000000000
            });

        }
    }

	render () {
		return (


			<div>
			
					<Row className="bottom_border top_chart_cont">
						sds
						
					</Row>
					<Row>
						<Col>
					      <ListGroup>
					        <ListGroupItem>Final Price: {1/this.props.saleFinalRate || 0}</ListGroupItem>
					        <ListGroupItem>Initial Price: {1/this.props.saleInitialRate || 0}</ListGroupItem>
					        <ListGroupItem>Current Price; {1/this.props.saleCurrentRate || 0}</ListGroupItem>
					        <ListGroupItem>Sale Closing: {formatTimeCount(this.props.saleClosingTime*1000)}</ListGroupItem>
					        
					        <ListGroupItem>Sale Opening: {formatTime(this.props.saleOpening*1000)}</ListGroupItem>
					        <ListGroupItem>Raised ETH: {this.props.reisedETH/ETH_DECIMALS || 0}</ListGroupItem>
					        <ListGroupItem>EHE tokens Purchesed: {this.props.mainTokenBalanceOf/ETH_DECIMALS || 0}</ListGroupItem>
					        <ListGroupItem>EHE tokens total supply: {this.props.mainTokenTotalSupply/ETH_DECIMALS || 0}</ListGroupItem>

					      </ListGroup>

							
						</Col>
						<Col>
								<div>

								<Countdown date={formatTimeCount(this.props.saleClosingTime*1000)}/>
								
									<Button color="primary" onClick={this.buyTokens}  size="xs"> Buy Tokens </Button>
									
								</div>
											
						</Col>
						
					</Row>
			




			</div>







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
	mainTokenTotalSupply: state.mainTokenTotalSupply
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ 
	  	getTotalSupplyMainToken, 
	  	getReisedETH, 
	  	getSaleOpeningTime, 
	  	getSaleClosingTime, 
	  	getSaleInitialRate, 
	  	getSaleCurrentRate, 
	  	getSaleFinalRate 
  	}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Sale)

