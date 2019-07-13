import React, { PureComponent } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import Sale from './sale'
import Changes from './changes'



class Tools extends PureComponent {

  render () {
    return (
      <Container className="page" >
        <Row style={  (this.props.windowSize.width>575)?this.props.windowSize:null}>
          <Col className="left_side bottom_border" lg={2} md={3} sm={3} xs={12}>
            
            <div><Link to="/tools/sale">---Equity Sale</Link></div>
            <div>---Gouvernance</div>
            <div><Link to="/tools/changes">Changes</Link></div>
            <div>Projects</div>
            <div>Future Contracts</div>
            <div>---Data</div>
            <div>ETH Deposited</div>
            <div>EHE Staked</div>
            <div>EHE Tokens Amount</div>
            <div>REKT Tokens Amount</div>
            <div>Total Volume</div>
            <div>24 Volume</div>
            <div>Liquidated</div>
            <div>Margin Bank</div>
            <div>Projects budget</div>


          </Col>
          <Col className="right_side left_border" lg={10} md={9} sm={9} xs={12}>
            
            <Route exact path='/tools/' component={Sale}/>             
            <Route exact path='/tools/sale' component={Sale}/> 
            <Route exact path='/tools/changes' component={Changes}/> 
           
          </Col>
        </Row>
      </Container>
    )
  }
}


export default connect(state => {
  return {
    windowSize: state.windowSize
  }
})(Tools)
