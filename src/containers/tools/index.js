import React, { PureComponent } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import Sale from './sale'
import Voting from './voting'
import Data from './data'

class Tools extends PureComponent {
  render () {
    return (
      <Container className="page" >
        <Row style={  (this.props.windowSize.width>575)?this.props.windowSize:null}>
          <Col className="left_side bottom_border" lg={2} md={3} sm={3} xs={12}>
            <div><Link to="/tools/home">Home</Link></div>
            <div><Link to="/tools/sale">Equity Sale</Link></div>
            <div><Link to="/tools/voting">Voting</Link></div>
            <div><Link to="/tools/home">Parameters</Link></div>
            <div><Link to="/tools/home">Contracts</Link></div>
          </Col>
          <Col className="right_side left_border" lg={10} md={9} sm={9} xs={12}>
            <Route exact path='/tools/' component={Data}/>    
            <Route exact path='/tools/home' component={Data}/>    
            <Route exact path='/tools/sale' component={Sale}/> 
            <Route exact path='/tools/voting' component={Voting}/> 
           
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
