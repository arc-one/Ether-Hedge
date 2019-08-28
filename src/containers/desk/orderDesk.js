import React, { PureComponent } from 'react'
import { Row, Form, FormGroup, Input, Label, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import { connect } from 'react-redux'
import { updateOrderForm } from '../../actions/orderFormActions'
import { ETH_DECIMALS, DECIMALS, LEVERAGE_DECIMALS, EXPIRES_IN } from '../../config'
//import { isNumber, isUndefined, isEmpty } from 'lodash'

class OrderDesk extends PureComponent {
  
  handleFocus = (event) => {
    event.target.select();
  }
      
  constructor() {
    super();
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
  }

  handlePlaceOrder() {
    if(this.props.orderForm.priceType === 'limit') {
      this.sendLimit();
    } 
    if(this.props.orderForm.priceType === 'market') {
      this.sendMarket();
    } 
  }

  sendLimit = () => {
    const price = this.props.orderForm.price*DECIMALS ;
    const amount = this.props.orderForm.amount*DECIMALS;
    const leverage = (this.props.orderForm.leverage*1).toFixed(2)*LEVERAGE_DECIMALS;

    const activeFuture = this.props.smartContracts.activeFuture;
    this.props.smartContracts.futures[activeFuture].inst.methods
      .placeLimitOrder(Math.round(price), Math.round(amount), this.props.orderForm.orderType*1, Math.round(leverage), EXPIRES_IN)
      .send({from: this.props.accounts[0]}); 
  }

  sendMarket = () => {
    const amount = this.props.orderForm.amount*DECIMALS;
    const leverage = (this.props.orderForm.leverage*1).toFixed(2)*LEVERAGE_DECIMALS;
    const activeFuture = this.props.smartContracts.activeFuture;

    this.props.smartContracts.futures[activeFuture].inst.methods
      .placeMarketOrder(this.props.orderForm.orderList, Math.round(amount), Math.round(leverage))
      .send({from: this.props.accounts[0]}); 
  }

  render () {
    return (  
      <div>
        <Row className="order_desk_cont border_bottom d-flex justify-content-between">
          <div className="info_row">
            <div className="float-right">Ξ {(this.props.userWalletBalance/ETH_DECIMALS).toFixed(6)}</div>
            <div className="float-left">Wallet:</div>
          </div>
          <div className="info_row">
            <div className="float-right">Ξ {(this.props.userBalance/ETH_DECIMALS).toFixed(6)}</div>
            <div className="float-left">Deposit:</div>
          </div>
          <div className="info_row">
            <div className="float-right">Ξ {(this.props.availableBalance/ETH_DECIMALS).toFixed(6)}</div>
            <div className="float-left">Available:</div>
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
                  disabled={this.props.accounts[0]?false:true}
                  value={ this.props.orderForm.amount}
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
                    value={this.props.orderForm.price}
                    disabled={this.props.accounts[0]?false:true}
                  />
                </InputGroup>
              </FormGroup>:null}

            {this.props.orderForm.priceType==='market'?
              <FormGroup>
                <Label for="limitPrice">Average Price:</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                  <Input 
                    className="order_desk_input" 
                    type="number" 
                    name="limitPrice" 
                    value={ this.props.orderForm.price.toFixed(2)}
                    disabled
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
                  disabled={this.props.accounts[0]?false:true}

                  value={ this.props.orderForm.leverage}
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

          <button className={this.props.orderForm.orderType==='1'?"green_bckgr btn btn-default active btn-block":"red_bckgr btn btn-default active btn-block"} disabled={!this.props.enabledMetamask} onClick={this.handlePlaceOrder} >Place Order</button>

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
    smartContracts: state.smartContracts,
    accounts: state.accounts,
    orders: state.orders,
    orderFills: state.orderFills
  }
})(OrderDesk)