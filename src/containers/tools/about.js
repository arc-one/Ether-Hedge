import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import AboutIntroduction from './aboutIntroduction'
import AboutStructure from './aboutStructure'
import { Row, Col, ListGroupItem, ListGroup } from 'reactstrap'
import { Route } from 'react-router-dom'

class About extends Component {

	handleClick = (event) => {
		let url = event.target.getAttribute('data-url');
		this.props.history.push(url);
	}

	render () {
		return (
			<Row className="about_list ">
				<Col className='right_border item_list' md={4} >
					<ListGroup flush >
						<ListGroupItem className={window.location.pathname==="/tools/about/introduction" || window.location.pathname==="/tools/about"?"active_tool title_item ":"title_item" } onClick={this.handleClick} data-url="/tools/about/introduction" >
							Introduction
						</ListGroupItem>
						<ListGroupItem className={window.location.pathname==="/tools/about/structure"?"active_tool title_item ":"title_item" } onClick={this.handleClick} data-url="/tools/about/structure" >
							Structure
						</ListGroupItem>
						<ListGroupItem className={window.location.pathname==="/tools/about/depository"?"active_tool title_item ":"title_item" } onClick={this.handleClick} data-url="/tools/about/depository" >
							Depository
						</ListGroupItem>
						<ListGroupItem className={window.location.pathname==="/tools/about/trading"?"active_tool title_item ":"title_item" } onClick={this.handleClick} data-url="/tools/about/trading" >
							Trading Platform
						</ListGroupItem>
						<ListGroupItem className={window.location.pathname==="/tools/about/governance"?"active_tool title_item ":"title_item" } onClick={this.handleClick} data-url="/tools/about/governance" >
							Governance
						</ListGroupItem>
						<ListGroupItem className={window.location.pathname==="/tools/about/contracts"?"active_tool title_item ":"title_item" } onClick={this.handleClick} data-url="/tools/about/contracts" >
							Smart Contracts
						</ListGroupItem>
						<ListGroupItem className={window.location.pathname==="/tools/about/sale"?"active_tool title_item ":"title_item" } onClick={this.handleClick} data-url="/tools/about/sale" >
							Token Sale
						</ListGroupItem>
						<ListGroupItem className={window.location.pathname==="/tools/about/roadmap"?"active_tool title_item ":"title_item" } onClick={this.handleClick} data-url="/tools/about/roadmap" >
							Road Map
						</ListGroupItem>

					</ListGroup>
				</Col>
				<Col md={8} className="proposal_cont">
					<Route  exact path='/tools/about' component={AboutIntroduction}/>
					<Route  exact path='/tools/about/introduction' component={AboutIntroduction}/>
					<Route  exact path='/tools/about/structure' component={AboutStructure}/>
				</Col>
			</Row>
		)
	}
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = dispatch => (
  bindActionCreators({}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(About)

