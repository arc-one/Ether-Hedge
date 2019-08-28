import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { isEmpty, isNull }  from 'lodash';
import { Row, Col, Progress, Button } from 'reactstrap'
import {timeFormat} from  "d3-time-format"
import { ETH_DECIMALS, PERCENT_MULTIPLYER, LEVERAGE_DECIMALS } from '../../config'
import { getEtherscanLink } from '../../utils/etherscan'
import ModalStake from '../modals/modalStake'
import { toggleModal } from '../../actions/toggleModalActions'

var formatTime = timeFormat("%B %d, %Y, %H:%M:%S");

class ParamProposalContent extends Component {

	constructor(props) {
		super(props);
		this.getVotingPercenResult = this.getVotingPercenResult.bind(this);
		this.sendParamVote= this.sendParamVote.bind(this);
		this.sendActivateParam= this.sendActivateParam.bind(this);
		this.getProposalStatus= this.getProposalStatus.bind(this);
		this.getField = this.getField.bind(this);
	}

	getVotingPercenResult(vote) {
		if(this.props.paramProposalResults[this.props.proposal.hash]){
			let result = this.props.paramProposalResults[this.props.proposal.hash];
			if(result.yes*1+result.yes*1>0){
				if(vote === 'yes'){
					return result.yes*100/(result.yes*1+result.no*1)
				} else {
					return result.no*100/(result.yes*1+result.no*1)
				}
			} else {
				return 0;
			}
		} else return 0;
	}

	getVotingResult(vote) {
		if(this.props.paramProposalResults[this.props.proposal.hash]){
			let result = this.props.paramProposalResults[this.props.proposal.hash];
			if(vote === 'yes'){
				return result.yes
			} else {
				return result.no
			}
		} else return 0;
	}

	getTotalVotedAccounts() {
		if(this.props.paramProposalResults[this.props.proposal.hash]){
			return this.props.paramProposalResults[this.props.proposal.hash].totalAccounts;
		} else return 0;
	}

	getTotalVoted() {
		let proposal = this.props.proposal;
		if(this.props.paramProposalResults[proposal.hash]){
			let result = this.props.paramProposalResults[proposal.hash];
			return result.no*1 + result.yes*1;
		} else return 0;
	}

	getProposalStatus(){

			if(Object.values(this.props.params)[this.props.proposal.param*1].proposalHash === this.props.proposal.hash) {
				return 'active';
			} else if(new Date(this.props.proposal.endDate*1000 + this.props.params.activationTime.value*1000) > new Date()){
				return 'opened';
			} else if(this.getTotalVoted()*100/this.props.mainTokenTotalSupply<=this.props.params.minVotingPercent.value/PERCENT_MULTIPLYER) {
				return 'threshold';
			} else if(this.props.proposal.activated==='true') {
				return 'old';
			} else if(this.getVotingPercenResult('yes')>this.getVotingPercenResult('no')) {
				return 'closedSuccess';
			} else {
				return 'closedFail'
			}

	}


    sendParamVote = (event) => {
        let vote = event.target.getAttribute('data-vote');
        let param = event.target.getAttribute('data-param');
        let hash = event.target.getAttribute('data-hash');

        if(window.ethereum && (!(isEmpty(this.props.accounts) || isNull(this.props.network) || !this.props.enabledMetamask))) {
            this.props.smartContracts.settings.inst.methods.voteParamProposal(vote==='true', param, hash).send({
                from: this.props.accounts[0]
            }); 
        }
    }

    sendActivateParam = (event) => {

        let param = event.target.getAttribute('data-param');
        let hash = event.target.getAttribute('data-hash');

        if(window.ethereum && (!(isEmpty(this.props.accounts) || isNull(this.props.network) || !this.props.enabledMetamask))) {

            this.props.smartContracts.settings.inst.methods.activateParamProposal(param, hash).send({
                from: this.props.accounts[0]
            }); 

        }
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

	getField(field) {
		
		if(this.props.proposal){
			switch (field) {
				case "title":
					switch (this.props.proposal.param) {
						case '0':
							return 'Change proposal voting time to '+ this.getValue(this.props.proposal.param, this.props.proposal.value) +' sec'
						case '1':
							return 'Change proposal activation timeout after successfull voting to '+ this.getValue(this.props.proposal.param, this.props.proposal.value) +' sec'
						case '2':
							return 'Change limit order Fee to '+ this.getValue(this.props.proposal.param, this.props.proposal.value) +'%'
						case '3':
							return 'Change market order Fee to '+ this.getValue(this.props.proposal.param, this.props.proposal.value) +'%'
						case '4':
							return 'Change maximum leverage to '+ this.getValue(this.props.proposal.param, this.props.proposal.value) +'%'
						case '5':
							return 'Change liquidation profit to '+ this.getValue(this.props.proposal.param, this.props.proposal.value) +'%'
						case '6':
							return 'Change minimum voting threshold to '+ this.getValue(this.props.proposal.param, this.props.proposal.value) +'%'
						case '7':
							return 'Change parameters proposal fee to '+ this.getValue(this.props.proposal.param, this.props.proposal.value) +'%'
						case '8':
							return 'Change contracts proposal fee to '+ this.getValue(this.props.proposal.param, this.props.proposal.value) +'%'
						case '9':
							return 'Change trading fee discount index to '+ this.getValue(this.props.proposal.param, this.props.proposal.value) +'%'
						default:
							break;
					}
					break;
				case "start":
					return 'Started: '+formatTime(this.props.proposal.startDate*1000);
				case "end":
					return 'Ends: '+formatTime(this.props.proposal.endDate*1000);
				default: 
					break;
			}
		}
	}
	render () {
		return (
			<Col md={8} className="proposal_cont">
			
				<h4 className="title_proposal_big">{ this.getField('title')}</h4>
				
				<div className="text-left ">Yes: {this.getVotingPercenResult('yes')}%, {this.getVotingResult('yes')} EHE </div>
					<Progress className="progress_big" color="primary" value={this.getVotingPercenResult('yes')} />
					
					<div className="text-left">No: 	{this.getVotingPercenResult('no')}%, {this.getVotingResult('no')} EHE</div>
					<Progress className="progress_big" color="danger" value={this.getVotingPercenResult('no')} />



					<div>
						<strong>Total Accounts Voted:</strong> {this.getTotalVotedAccounts()}
					</div>
					<div>
						<strong>Total Voted Value:</strong> {this.getTotalVoted()} EHE ({(this.getTotalVoted()*100/this.props.mainTokenTotalSupply || 0).toFixed(2)}% of the supply)
					</div>
					<div className="border_bottom padding_bottom">
						<strong>Voting Threshold:</strong> {this.props.params.minVotingPercent.value/PERCENT_MULTIPLYER}% of the supply.
					</div>

					<div className="proposal_block">
						<div>
							<strong>Creator:</strong> <a rel="noopener noreferrer" target="_blank" href={getEtherscanLink('address', this.props.proposal.creator, 'contracts', this.props.network)} > {this.props.proposal.creator}  </a>
						</div>						
						<div  className="">	
							<strong>Description:</strong> {this.props.proposal.description}
						</div>
					</div>
					<div className="proposal_block ">
						<Row>
	      					<Col>
	      						<strong>Voting Start:</strong> {formatTime(this.props.proposal.startDate*1000)}
	      					</Col>
	      					<Col className="text_right">
	      						<strong>Voting End:</strong> {formatTime(this.props.proposal.endDate*1000)}
	      					</Col>
  						</Row>
					</div>		   



				{this.getProposalStatus()==='active'?
					<div className="proposal_block voting_result">
						<span className="green_text">The proposal is active now.</span>
					</div>:null
				}
				{this.getProposalStatus()==='opened'?
					<div className="">
						
						{

  							(this.props.enabledMetamask )?
	      						<Row className="proposal_block">
		      						<Col>
				      					<div>
				      						EHE Balance: {(this.props.mainTokenBalanceOf/ETH_DECIMALS).toFixed(6)} EHE
				      					</div>
				      					<div>
				      						Staked Amount: {(this.props.stakedFunds/ETH_DECIMALS).toFixed(6) } EHE
				      					</div>
			      					</Col>
			      					<Col>
			      						<Button className="stake_big_btn " color="default" size="lg" onClick={() => this.props.toggleModal('stake')}>Stake</Button>
			      					</Col>
		      					</Row>:
		      					<div className="proposal_block voting_result green_text">Please Enable Metamask</div>
  						}

      					{

      						this.props.userVoting.amount*1===0?
		      					<center>
									<Button 
										disabled={!this.props.enabledMetamask} 
										data-vote = {true}
										data-param = {this.props.proposal.param}
										data-hash = {this.props.proposal.hash}
										onClick={this.sendParamVote} 
										className="vote_button" 
										color="primary" 
										size="lg">Yes</Button>
									<Button 
										disabled={!this.props.enabledMetamask} 
										data-vote = {false}
										data-param = {this.props.proposal.param}
										data-hash = {this.props.proposal.hash}
										onClick={this.sendParamVote} 
										className="vote_button" 
										color="danger" 
										size="lg">No</Button>
									
		      					</center>:
		      					this.props.userVoting.vote?
		      					<center className="user_vote">
		      						You voted: {this.props.userVoting.vote?<span className="green_text">Yes</span>:<span className="red_text">No</span>}
		      					</center>:null
			      				
      					}
	      				

					</div>:null
				}
				{this.getProposalStatus()==='threshold'?
					<div className="proposal_block voting_result">
						<span className="red_text">The proposal is closed. Didn't pass {this.props.params.minVotingPercent.value/PERCENT_MULTIPLYER}% threshold.</span>
					</div>:null
				}
				{this.getProposalStatus()==='old'?
					<div className="proposal_block voting_result">
						<span className="red_text">The proposal is old and can't be activated any more.</span>
					</div>:null
				}
				{this.getProposalStatus()==='closedSuccess'?
					<div className="">
						<div className="proposal_block voting_result green_text">Voting is closed. The proposal accepted and can be activated after {formatTime(this.props.proposal.endDate*1000+this.props.params.activationTime.value*1000)}</div>

						<Button  
      							className="vote_button" 
								data-param = {this.props.proposal.param}
								data-hash = {this.props.proposal.hash}
								onClick={this.sendActivateParam} 
      							color="primary" 
      							size="lg">Activate</Button>

					</div>:null
				}
				{this.getProposalStatus()==='closedFail'?
					<div className="proposal_block voting_result">
						<span className="green_text">Voting is closed. The proposal was rejected.</span>
					</div>:null
				}

				<ModalStake/>
			</Col>		

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
	paramProposalResults: state.paramProposalResults,
	userVoting: state.userVoting,
	accounts: state.accounts,
	smartContracts: state.smartContracts
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ toggleModal }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ParamProposalContent)

