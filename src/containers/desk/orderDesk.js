import React, { PureComponent } from 'react'
import { Row, Form, FormGroup, Input, Label, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import { connect } from 'react-redux'
import { updateOrderForm } from '../../actions/orderFormActions'
import {ETH_DECIMALS, DECIMALS} from '../../config'
class OrderDesk extends PureComponent {
  
  handleFocus = (event) => {
    event.target.select();
  }
  
  render () {
    return (  
      <div>
        <Row className="order_desk_cont border_bottom d-flex justify-content-between">
          <div className="info_row">
            <div className="float-right">Ξ {(this.props.userWalletBalance/ETH_DECIMALS).toFixed(4)}</div>
            <div className="float-left">Wallet:</div>
          </div>
          <div className="info_row">
            <div className="float-right">Ξ {(this.props.stakedFunds/ETH_DECIMALS).toFixed(4)}</div>
            <div className="float-left">Stake:</div>
          </div>
          <div className="info_row">
            <div className="float-right">Ξ {(this.props.userBalance/ETH_DECIMALS).toFixed(4)}</div>
            <div className="float-left">Deposit:</div>
          </div>
          <div className="info_row">
            <div className="float-right">Ξ {(this.props.availableBalance/ETH_DECIMALS).toFixed(4)}</div>
            <div className="float-left">Available:</div>
          </div>
        </Row>

        <Row className="order_desk_cont border_bottom d-flex justify-content-between">
          <div className="info_row">
            <div className="float-right">Ξ {(this.props.lastPrice/DECIMALS).toFixed(4)}</div>
            <div className="float-left">Last Price:</div>
          </div>
          <div className="info_row">
            <div className="float-right">Ξ {(this.props.spotPrice/DECIMALS).toFixed(4)}</div>
            <div className="float-left">Spot Price:</div>
          </div>
        </Row>

        <Row className="order_desk_cont">
           <div data-toggle="buttons" className="btn-group btn-group-justified">
              <label type="button" id="longButton" className={this.props.orderForm.orderType==='1'?"green_bckgr btn btn-default active":"green_bckgr btn btn-default"}>
              <input name="options" type="radio" onClick={() => this.props.dispatch(updateOrderForm({fieldName:'orderType', value: '1'}))}/>
                Long
              </label>
              <label type="button" id="shortButton" className={this.props.orderForm.orderType==='0'?"red_bckgr btn btn-default active":"red_bckgr btn btn-default"} >
              <input name="options" type="radio" onClick={() => this.props.dispatch(updateOrderForm({fieldName:'orderType', value: '0'}))} />
                Short
              </label>
           </div>
        </Row>

        <div className="limit_market border_bottom">
          <ul className="nav nav-tabs">
            <li className="nav-item" >
              <a className={this.props.orderForm.priceType==='limit'?"nav-link active":"nav-link"}  href="#limit" onClick={() => this.props.dispatch(updateOrderForm({fieldName:'priceType', value: 'limit'}))}>&emsp;Limit</a>
            </li>
            <li className="nav-item">
              <a className={this.props.orderForm.priceType==='market'?"nav-link active":"nav-link"}  href="#market" onClick={() => this.props.dispatch(updateOrderForm({fieldName:'priceType', value: 'market'}))}>Market&emsp; </a>
            </li>
          </ul>
        </div>

        <Row className="order_desk_cont">
          <Form className="order_desk_form">
            <FormGroup>
              <Label for="amount">Amount:</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>$</InputGroupText>
                </InputGroupAddon>
                <Input 
                  min="0"
                  className="order_desk_input" 
                  type="number" 
                  name="amount" 
                  id="amount" 
                  placeholder="Amount" 
                  onFocus={this.handleFocus} 
                  onChange={event => this.props.dispatch(updateOrderForm({fieldName:'amount', value: event.target.value*1}))}
                />
              </InputGroup>
            </FormGroup>

            {this.props.orderForm.priceType==='limit'?
              <FormGroup>
                <Label for="limitPrice">Limit Price:</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                  <Input 
                    min="0"
                    className="order_desk_input" 
                    type="number" 
                    name="limitPrice" 
                    id="limitPrice" 
                    placeholder="Limit Price" 
                    onFocus={this.handleFocus} 
                    onChange={event => this.props.dispatch(updateOrderForm({fieldName:'price', value: event.target.value*1}))}
                  />
                </InputGroup>
              </FormGroup>:null
            }


            <FormGroup>
              <Label for="limitPrice">Leverage:</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>x</InputGroupText>
                </InputGroupAddon>
                <Input 
                  min="1"
                  className="order_desk_input" 
                  type="number" 
                  name="leverage" 
                  id="leverage" 
                  placeholder="Leverage" 
                  onFocus={this.handleFocus} 
                  onChange={event => this.props.dispatch(updateOrderForm({fieldName:'leverage', value: event.target.value*1}))}
                />
              </InputGroup>
            </FormGroup>
          </Form>


          <div className="info_row">
            <div className="float-right">Ξ {this.props.orderForm.cost}</div>
            <div className="float-left">Cost:</div>
          </div>
          <div className="info_row">
            <div className="float-right">Ξ {this.props.orderForm.orderValue}</div>
            <div className="float-left">Order Value:</div>
          </div>
          <div className="info_row">
            <div className="float-right">Ξ {this.props.orderForm.liquidation}</div>
            <div className="float-left">Liquidation:</div>
          </div>

          <button className={this.props.orderForm.orderType==='1'?"green_bckgr btn btn-default active btn-block":"red_bckgr btn btn-default active btn-block"} disabled={!this.props.enabledMetamask}>Place Order</button>

        </Row>
      </div>
    )
  }
}

export default connect(state => {
  return {
    enabledMetamask:state.enabledMetamask,
    orderForm:state.orderForm,
    userBalance:state.userBalance,
    userWalletBalance:state.userWalletBalance,
    stakedFunds:state.stakedFunds,
    availableBalance: state.availableBalance,
    lastPrice: state.lastPrice,
    spotPrice: state.spotPrice
  }
})(OrderDesk)