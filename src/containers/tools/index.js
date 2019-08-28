import React, { PureComponent } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import Sale from './sale'
import Voting from './voting'
import Data from './data'
import About from './about'




class Tools extends PureComponent {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (event) => {
    let url = event.target.getAttribute('url');

    this.props.history.push(url);
  }

  getPath(url){
    let urlArr = url.split('/');
    return '/'+urlArr[1]+'/'+urlArr[2];
  }

  render () {
    return (
      <Container className="page" >
        <Row style={  (this.props.windowSize.width>575)?this.props.windowSize:null}>
          <Col className="left_side bottom_border" lg={2} md={3} sm={3} xs={12}>
            <Row className={window.location.pathname==="/tools/home"?"active_tool tools_item":"tools_item" } onClick={this.handleClick} url="/tools/home">Dashboard</Row>
            <Row className={window.location.pathname==="/tools/voting"?"active_tool tools_item":"tools_item" } onClick={this.handleClick} url="/tools/voting">Governance</Row>
            <Row className={this.getPath(window.location.pathname)==="/tools/about"?"active_tool tools_item":"tools_item" } onClick={this.handleClick} url="/tools/about">About The Project</Row>
            <Row className={window.location.pathname==="/tools/sale"?"active_tool tools_item":"tools_item" } onClick={this.handleClick} url="/tools/sale">Token Sale</Row>
          </Col>
          <Col className="right_side left_border" lg={10} md={9} sm={9} xs={12}>
            <Route exact path='/tools/' component={Data}/>    
            <Route exact path='/tools/home' component={Data}/>    
            <Route exact path='/tools/sale' component={Sale}/> 
            <Route exact path='/tools/voting' component={Voting}/> 
            <Route path='/tools/about' component={About}/> 
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
