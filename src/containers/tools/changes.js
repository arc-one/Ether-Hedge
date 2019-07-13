import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Row, Col, Container, ButtonDropdown, Nav, NavItem, NavLink, ListGroup, ListGroupItem, Progress, Button } from 'reactstrap'
import {timeFormat} from  "d3-time-format"
import { ETH_DECIMALS } from '../../config'
import ModalAddProposal from './addProposalModal'
import { toggleModal } from '../../actions/toggleModalActions'


var formatTime = timeFormat("%B %d, %Y");



class Changes extends Component {

	constructor() {
		super();
		this.state = {
			active:0,
		  	voting:[
				{
					type: 'changes',
					title: 'Change Fee Limit from 0.3% to 0.5%',
					description: 'lorem lorem lorem',
					start: 1234,
					end: 22333,
					yes: 13,
					no: 26,
					creator: '23232323232',
					creator_stake: 223333233333333323,
					tx:'2323232332323'

				},
				{
					type: 'changes',
					title: 'Change Fee Limit osalfrom 0.3% to 0.5%',
					description: 'lorem lorem lorem',
					start: 1234,
					end: 22333,
					yes: 34,
					no: 246,
					creator: '23232323232',
					creator_stake: 223333233333333323,
					tx:'2323222232332323'
				},
				{
					type: 'changes',
					title: 'Change Fee Limit from 0.3% to 0.5%',
					description: 'lorem lorem lorem',
					start: 1234,
					end: 22333,
					yes: 345,
					no: 246,
					creator: '23232323232',
					creator_stake: 223333233333333323,
					tx:'2323222222232332323'
				},



			]
		};
		this.selectProposal = this.selectProposal.bind(this);

	}



  selectProposal(obj, index) {
     //console.log(index)
     this.setState({active:index})
  }


	tabClick(){
	//	console.log(33)
	}

	render () {
		return (
			<Row className="tools_changes_proposals ">
				<Col className='right_border ' md={4} >
					<Row >
						<Nav tabs className="proposal_tabs">
				          <NavItem>
				            <NavLink onClick={this.tabClick} href="#" active>Pending</NavLink>
				          </NavItem>

				          <NavItem>
				            <NavLink href="#">Voted</NavLink>
				          </NavItem>
				        </Nav>	
					</Row>
			        <Row className="bottom_border">
			        	<Col className="add_btn"><a href="#" onClick={() => this.props.toggleModal('add_proposal') }>Add New Proposal</a></Col>
			        </Row>

					<Row>
						<Container className="proposal_container">
							<ListGroup flush >

								{
									this.state.voting.map((obj, index) => {
										return (
											<ListGroupItem className={(this.state.active == index? 'selected':'')} onClick={() => this.selectProposal(obj, index)} data-index={obj.tx}  key={obj.tx}>
												<div><h5 className="title_proposal">{obj.title}</h5></div>
												<div>Voting by {formatTime(obj.end*1000)}</div>
												<div>Proposal from staker with {(obj.creator_stake/ETH_DECIMALS).toFixed(6)} of EHE</div>
												<Progress multi>
													<Progress bar color="primary" value={obj.yes*100/(obj.yes+obj.no)} />
													<Progress bar color="danger" value={obj.no*100/(obj.yes+obj.no)} />
												</Progress>
											</ListGroupItem>

										)
									})
								}

							</ListGroup>
						</Container>
					</Row>
				</Col>
				<Col md={8} className="proposal_cont">
					
						<h4 className="title_proposal_big">{this.state.voting[this.state.active].title}</h4>
						<div className="text-left ">Yes: 25%, EHE 1234</div>
      					<Progress className="progress_big" color="primary" value={this.state.voting[this.state.active].yes*100/(this.state.voting[this.state.active].yes+this.state.voting[this.state.active].no)} />
						<div className="text-left">No: 25%, EHE 1234</div>
      					<Progress className="progress_big"  color="danger" value={this.state.voting[this.state.active].no*100/(this.state.voting[this.state.active].yes+this.state.voting[this.state.active].no)} />

      					<div>
      						Total Accounts Voted: 34234 (15%), EHE: 232 (25%)
      					</div>
      					<div>
      						Quit Voting Accounts: 232(25%), EHE: 4534545(23%)
      					</div>



      					<div className="proposal_block">
      						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      					</div>
      					<div className="proposal_block">
      						{

      							(this.props.enabledMetamask)?
		      						<Row>
			      						<Col>
					      					<div>
					      						Wallet EHE Balance: 233.8434
					      					</div>
					      					<div>
					      						Staked EHE Amount: 233.8434
					      					</div>
				      					</Col>
				      					<Col>
				      						<Button className="stake_big_btn " color="default" size="lg">Stake</Button>
				      					</Col>
			      					</Row>:
			      					<div>Please Enable Metamask</div>
      						}

      					</div>



      					<center>
							<Button disabled={!this.props.enabledMetamask} className="vote_button" color="primary" size="lg">Yes</Button>
							<Button disabled={!this.props.enabledMetamask} className="vote_button" color="danger" size="lg">No</Button>

      					</center>
						
				

				

				</Col>
				<ModalAddProposal/>
			</Row>

		)
	}
}

/*export default withRouter(connect(state => ({
	voting: state.voting,
	enabledMetamask: state.enabledMetamask
}))(Changes))*/

const mapStateToProps = (state) => ({
	voting: state.voting,
	enabledMetamask: state.enabledMetamask
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ toggleModal }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Changes)

