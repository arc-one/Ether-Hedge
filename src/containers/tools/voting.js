import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Row, Col, Container, Nav, NavItem, NavLink, ListGroup, ListGroupItem, Progress, Badge } from 'reactstrap'
import {timeFormat} from  "d3-time-format"
import { ETH_DECIMALS, PERCENT_MULTIPLYER, LEVERAGE_DECIMALS } from '../../config'
import ModalAddProposal from './addProposalModal'
import { toggleModal } from '../../actions/toggleModalActions'
import { 
	
	fetchProposals, 	
	getUserVoting, 
	listenProposalLog
} from '../../actions/web3VotingActions'
import { getParams, getTotalSupplyMainToken } from '../../actions/web3Actions'
import ParamProposalContent from './paramProposalContent'
import ContractProposalContent from './contractProposalContent'

var formatTime = timeFormat("%B %d, %Y, %H:%M:%S");

class Voting extends Component {

	constructor() {
		super();
		this.state = {
			active:null,
			activeTab:'voted',
			activeProposal: null,
		};

		this.getField = this.getField.bind(this);
		this.getVotingPercenResult = this.getVotingPercenResult.bind(this);
		this.tabClick = this.tabClick.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.accounts !== prevProps.accounts){
			if(this.props.accounts[0]){
				this.getUserVoting();
			}
		}
	}	

	componentDidMount() {
		this.props.fetchProposals();
		this.props.getParams();
		this.props.getTotalSupplyMainToken();
		this.props.listenProposalLog();
		
	}

	selectProposal(obj, index) {
		this.setState({active:index});
		this.setState({activeProposal:obj});
	}

	getVotingPercenResult(proposal, vote) {
		if(proposal.yes*1+proposal.no*1>0){
			if(vote === 'yes'){
				return proposal.yes*100/(proposal.yes*1+proposal.no*1)
			} else {
				return proposal.no*100/(proposal.yes*1+proposal.no*1)
			}
		} else {
			return 0;
		}
	}

	backBtn(){
		this.setState({activeProposal:null});
		this.setState({active:null});
	}

	getUserVoting() {
		if(this.state.activeProposal && this.props.enabledMetamask) {
			let proposal = this.state.activeProposal;
			this.props.getUserVoting(proposal.hash);

		} else return null;
	}

	getValue(param, val){

        if(param === '2' || param === '3' || param === '4' || param === '5' || param === '6') {
            val /= PERCENT_MULTIPLYER;
        }
        if(param === '4') {
            val /= LEVERAGE_DECIMALS;
        }
        if(param === '7' || param === '8') {
            val /= ETH_DECIMALS;
        }

        return val;
	}

	getField(obj, field) {
		
		if(obj){
			switch (field) {
				case "title":
					switch (obj.value_2) {
						case '0':
							return 'Change proposal voting time to '+ this.getValue(obj.value_2, obj.value_1) +' sec'
						case '1':
							return 'Change proposal activation timeout after successfull voting to '+ this.getValue(obj.value_2, obj.value_1) +' sec'
						case '2':
							return 'Change limit order Fee to '+ this.getValue(obj.value_2, obj.value_1) +'%'
						case '3':
							return 'Change market order Fee to '+ this.getValue(obj.value_2, obj.value_1) +'%'
						case '4':
							return 'Change maximum leverage to '+ this.getValue(obj.value_2, obj.value_1) +'%'
						case '5':
							return 'Change liquidation profit to '+ this.getValue(obj.value_2, obj.value_1) +'%'
						case '6':
							return 'Change minimum voting threshold to '+ this.getValue(obj.value_2, obj.value_1) +'%'
						case '7':
							return 'Change parameters proposal fee to '+ this.getValue(obj.value_2, obj.value_1) +'%'
						case '8':
							return 'Change contracts proposal fee to '+ this.getValue(obj.value_2, obj.value_1) +'%'
						case '9':
							return 'Change trading fee discount index to '+ this.getValue(obj.value_2, obj.value_1) +'%'
						default:
							break;
					}
					break;
				case "start":
					return 'Started: '+formatTime(obj.startDate*1000);
				case "end":
					return 'Ends: '+formatTime(obj.endDate*1000);
				default: 
					break;
			}
			

		}

	}

	tabClick(event){
		let tab = event.target.getAttribute('data-tab');
		this.setState({activeTab: tab});
		this.setState({activeProposal: null});
		this.setState({active: null});
	}

	render () {
		let list = (this.props.params)?this.props.proposals.filter(obj => {
			let _now = new Date().getTime();
			if(this.state.activeTab === 'pending') {
				return _now < (obj.startDate*1 + this.props.params.activationTime.value*1 + this.props.params.votingTime.value*1)*1000;
			}
			if(this.state.activeTab === 'voted') {
				return _now > (obj.startDate*1 + this.props.params.activationTime.value*1 + this.props.params.votingTime.value*1)*1000;
			}
		}).sort((a, b) => {
			return b.startDate - a.startDate;
		}).map((obj, index, arr) => 
			<ListGroupItem className={(this.state.active === index? 'selected':'')} onClick={() => this.selectProposal(obj, index)} data-index={obj.transactionHash}  key={obj.hash}>
				{obj.propType === '2'?
					<h5 className="title_proposal"> {this.getField(obj, 'title')}</h5>
				:null}
				{obj.propType === '0'?
					<h5 className="title_proposal"><Badge color="primary">Contract</Badge> { obj.title }</h5>
				:null}
				<div>{this.getField(obj, 'start')}</div>
				<div>{this.getField(obj, 'end')}</div>
					{
						<Progress multi>
							<Progress bar color="primary" value={this.getVotingPercenResult(obj, 'yes')} />
							<Progress bar color="danger" value={this.getVotingPercenResult(obj, 'no')} />
						</Progress>
					}
			</ListGroupItem>
		):[];

		return (
			<Row className="tools_changes_proposals ">
				<Col className= {this.state.activeProposal && window.innerWidth < 768?'':'right_border proposal_list'}   md={4} >
					<Row>
						<Nav tabs className="proposal_tabs">
				          <NavItem>
				            <NavLink onClick={this.tabClick} data-tab="voted" href="#" active={this.state.activeTab === 'voted'}>Finished </NavLink>
				          </NavItem>
				          <NavItem>
				            <NavLink onClick={this.tabClick} data-tab="pending" href="#" active={this.state.activeTab === 'pending'}>Opened</NavLink>
				          </NavItem>
				        </Nav>	
					</Row>
			        <Row className="bottom_border">
			        	{window.innerWidth < 768 && this.state.activeProposal?<Col className="back_btn">
			        		<div className="href" onClick={() => this.backBtn() }>Back</div>
			        	</Col>:null}
			        	<Col className="add_btn">
			        		<div className="href" onClick={() => this.props.toggleModal('add_proposal') }>+ Add New Proposal</div>
			        	</Col>
			        </Row>

					{this.state.activeProposal && window.innerWidth < 768?null:
						<Row className="proposal_container">
							<Container className="nopadding">
								{
									list.length?<ListGroup flush >{list}</ListGroup>:
									 	this.state.activeTab === 'voted'?
											<div id="parent" className="text_large lightcolor">
												<div id="child">No Proposals</div>
											</div>:
											<div id="parent" className="text_large lightcolor">
												<div id="child">No Opened Proposals.<br/>Click Add New Proposal.</div>
											</div>
								}
							</Container>
						</Row>}
				</Col>

				{this.state.activeProposal && this.state.activeProposal.propType === '2'?
					<ParamProposalContent proposal={this.state.activeProposal} />:null}
				{this.state.activeProposal &&  this.state.activeProposal.propType === '0'?
					<ContractProposalContent proposal={this.state.activeProposal} />:null
				}
				{
					!this.state.activeProposal && window.innerWidth > 768?
					<div id="parent" className=" proposal_cont col-md-8 text_large lightcolor">
					  <div id="child">No Proposal Selected</div>
					</div>:null
				}

				<ModalAddProposal/>
			</Row>

		)
	}
}


const mapStateToProps = (state) => ({
	proposals: state.proposals,
	enabledMetamask: state.enabledMetamask,
	params: state.params,
	stakedFunds: state.stakedFunds,
	mainTokenBalanceOf: state.mainTokenBalanceOf,
	mainTokenTotalSupply: state.mainTokenTotalSupply,
	proposalResults: state.proposalResults,
	userVoting: state.userVoting,
	accounts: state.accounts,
	smartContracts: state.smartContracts
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ 
	  	toggleModal, 
	  	fetchProposals,
	  	getParams,
	  	getTotalSupplyMainToken,
	  	getUserVoting,
	  	listenProposalLog
  	}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Voting)

