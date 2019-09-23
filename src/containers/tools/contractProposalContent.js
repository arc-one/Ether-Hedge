import React, { Component } from 'react'
import bs58 from "bs58"
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

const toIPFSHash = str => {
    // remove leading 0x
    const remove0x = str.slice(2, str.length);
    // add back the multihash id
    const bytes = Buffer.from(`1220${remove0x}`, "hex");
    const hash = bs58.encode(bytes);
    return hash;
};

class ContractProposalContent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			trusted:null
		}
		this.getVotingPercenResult = this.getVotingPercenResult.bind(this);
		this.sendParamVote= this.sendParamVote.bind(this);
		this.sendActivateParam= this.sendActivateParam.bind(this);
		this.getProposalStatus= this.getProposalStatus.bind(this);
	}

	componentDidMount(){
		this.checkTrustedFuture();
	}


	getVotingPercenResult(vote) {
		if(this.props.proposal.yes*1+this.props.proposal.no*1>0){
			if(vote === 'yes'){
				return (this.props.proposal.yes*100/(this.props.proposal.yes*1+this.props.proposal.no*1)).toFixed(2);
			} else {
				return (this.props.proposal.no*100/(this.props.proposal.yes*1+this.props.proposal.no*1)).toFixed(2);
			}
		} else {
			return 0;
		}
	}

	getVotingResult(vote) {
		if(vote === 'yes'){
			return (this.props.proposal.yes/ETH_DECIMALS).toFixed(6)
		} else {
			return (this.props.proposal.no/ETH_DECIMALS).toFixed(6)
		}
	}

	getTotalVotedAccounts() {
		return this.props.proposal.totalAccounts;
	}

	getTotalVoted() {
		return this.props.proposal.no*1 + this.props.proposal.yes*1;
	}

	checkTrustedFuture() {
		let settings = this.props.smartContracts.settings.inst;
        settings.methods.trustedContracts(this.props.proposal.futureContract).call( (err, response) => {
        	this.setState({trusted:response.trusted});
        });
	}

	getProposalStatus(){
			if(this.state.trusted) {
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
            this.props.smartContracts.settings.inst.methods.voteProposal(vote==='true', hash).send({
                from: this.props.accounts[0]
            }); 
        }
    }

    sendActivateParam = (event) => {

        let hash = event.target.getAttribute('data-hash');

        if(window.ethereum && (!(isEmpty(this.props.accounts) || isNull(this.props.network) || !this.props.enabledMetamask))) {
            this.props.smartContracts.settings.inst.methods.activateProposal(hash).send({
                from: this.props.accounts[0]
            }); 

        } else {
        	alert('Please Enable Metamask.')
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


	render () {
		return (
			<Col md={8} className="proposal_cont">
				<h4 className="title_proposal_big">{ this.props.proposal.title}</h4>
				<div className="text-left "><strong>Yes:</strong> {this.getVotingPercenResult('yes')}%, {this.getVotingResult('yes')} EHE </div>
					<Progress className="progress_big" color="primary" value={this.getVotingPercenResult('yes')} />
					
					<div className="text-left"><strong>No:</strong> 	{this.getVotingPercenResult('no')}%, {this.getVotingResult('no')} EHE</div>
					<Progress className="progress_big" color="danger" value={this.getVotingPercenResult('no')} />
					<div>
						<strong>Total Accounts Voted:</strong> {this.getTotalVotedAccounts()}
					</div>
					<div>
						<strong>Total Voted Value:</strong> {(this.getTotalVoted()/ETH_DECIMALS).toFixed(6)} EHE ({(this.getTotalVoted()*100/this.props.mainTokenTotalSupply || 0).toFixed(2) }% of the supply)
					</div>
					<div className="border_bottom padding_bottom">
						<strong>Voting Threshold:</strong> {this.props.params.minVotingPercent.value/PERCENT_MULTIPLYER}% of the supply.
					</div>
					<div className="proposal_block">
						<div><strong>Contract Address:</strong> <a rel="noopener noreferrer" target="_blank" href={getEtherscanLink('address', this.props.proposal.futureContract, 'contracts', this.props.network)} > {this.props.proposal.futureContract}  </a></div>
						<div>
							<strong>Creator:</strong> 
							<a rel="noopener noreferrer" target="_blank" href={getEtherscanLink('address', this.props.proposal.creator, 'url', this.props.network)} > {this.props.proposal.creator}  </a>
						</div>
						<div>
							<strong>Duration: </strong> {this.props.proposal.value_2*1} sec
						</div>
							{	this.props.proposal.url!==''?
								<div><strong>Audit:</strong> {this.props.proposal.url}</div>:null
							}
						<div>
							<strong>Payment Required: </strong> {this.props.proposal.value_1*1} EHE
						</div>
						<div>
							<strong>IPFS: </strong> {toIPFSHash(this.props.proposal.ipfs)} 
						</div>
						<div className="margin_top">
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
			      						<Button className="stake_big_btn " color="default" size="lg" onClick={() => this.props.toggleModal('stake')} >Stake</Button>
			      					</Col>
		      					</Row>:
		      					<div className="proposal_block voting_result green_text">Please Enable Metamask</div>
  						}
      					{

      						this.props.userVoting.amount*1===0 && this.props.enabledMetamask?
		      					<center>
									<Button 
										disabled={!this.props.enabledMetamask} 
										data-vote = {true}
										data-param = {this.props.proposal.value_2}
										data-hash = {this.props.proposal.hash}
										onClick={this.sendParamVote} 
										className="vote_button" 
										color="primary" 
										size="lg">Yes</Button>
									<Button 
										disabled={!this.props.enabledMetamask} 
										data-vote = {false}
										data-param = {this.props.proposal.value_2}
										data-hash = {this.props.proposal.hash}
										onClick={this.sendParamVote} 
										className="vote_button" 
										color="danger" 
										size="lg">No</Button>
		      					</center>:null
	      				}
      					{	
	      					this.props.userVoting.amount*1>0 && this.props.enabledMetamask?<center className="user_vote">
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
	proposals: state.proposals,
	userVoting: state.userVoting,
	accounts: state.accounts,
	smartContracts: state.smartContracts,
	network: state.network
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ toggleModal }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ContractProposalContent)

