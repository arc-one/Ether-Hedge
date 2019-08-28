import React, { PureComponent } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import {ETH_DECIMALS} from '../../config'
import { isEmpty, isNull }  from 'lodash';
import { toggleModal } from '../../actions/toggleModalActions'
import { listenMainTokenApproval } from '../../actions/web3Actions'
import Web3 from 'web3'
import { INFURA_RPC_URL } from '../../config'

const getWeb3 = () => {
  let provider = INFURA_RPC_URL;
  if(window.ethereum) provider = window.ethereum;
  return new Web3(provider);
}

class ModalStake extends PureComponent {
    constructor() {
        super();
        this.state = {
          amount:0,
        };
        this.handleChange= this.handleChange.bind(this);
        this.sendApproval= this.sendApproval.bind(this);
    }

    componentDidMount(){
        this.props.listenMainTokenApproval();
    }
    
    componentDidUpdate(prevProps, prevState){
        if(this.props.mainTokenApproval !== prevProps.mainTokenApproval){
            if(isNull(prevProps.mainTokenApproval)){
                this.sendStake();
            } else if(!isNull(prevProps.mainTokenApproval) && this.props.mainTokenApproval.returnValues.value !== prevProps.mainTokenApproval.returnValues.value && this.props.mainTokenApproval.returnValues.value!=='0') {
                this.sendStake();
            }
        }
    }

    handleChange(event) {
        this.setState({ amount: event.target.value });
    }

    sendStake = async () => {
        if(window.ethereum && (!(isEmpty(this.props.accounts) || isNull(this.props.network) || !this.props.enabledMetamask))) {
            if(this.state.amount>0) {
                let web3 = getWeb3();

                this.props.smartContracts.depository.inst.methods.stake(web3.utils.toWei(this.state.amount.toString(), 'ether')).send({
                    from: this.props.accounts[0]
                }); 
               // this.props.toggleModal(null);
            } else {
                alert("Please stake more than 0 ETH");
            }
        }
    }

    sendApproval = async () => {
        if(window.ethereum && (!(isEmpty(this.props.accounts) || isNull(this.props.network) || !this.props.enabledMetamask))) {
            if(this.state.amount>0) {
                let web3 = getWeb3();
                this.props.smartContracts.main_token.inst.methods.approve(this.props.smartContracts.depository.address, web3.utils.toWei(this.state.amount.toString(), 'ether')).send({
                    from: this.props.accounts[0]
                }); 
                this.props.toggleModal(null);
            } else {
                alert("Please stake more than 0 ETH");
            }
        }
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal==='stake'} toggle={() => this.props.toggleModal(null)} unmountOnClose={true}>
                    <ModalHeader toggle={() => this.props.toggleModal(null)}>Stake</ModalHeader>
                    <ModalBody>
                      <div className="modal_descr">
                        Anybody can stake funds and get dividends from all fees and liquidations. No stake limit, then bigger stake then higher dividends. No centralized owners, all stake holders get 100% of the profit. After Approval, please wait second popup to stake your funds.
                      </div>
                      <div className="form-group">
                        <label htmlFor="amount">ETH Amount</label>
                        <input type="number" min="0" autoComplete="off" className="form-control" id="amount" aria-describedby="amount" placeholder="Amount" onChange={this.handleChange}/>
                        <div id="amountWithdraw" className="form-text">Your Stake Balance: Ξ{this.props.stakedFunds/ETH_DECIMALS}</div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.sendApproval} >Stake</Button>{' '}
                        <Button color="secondary" onClick={() => this.props.toggleModal(null)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    modal:state.modal,
    network:state.network,
    accounts:state.accounts,
    enabledMetamask:state.enabledMetamask,
    stakedFunds:state.stakedFunds,
    smartContracts:state.smartContracts,
    mainTokenApproval: state.mainTokenApproval
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ toggleModal, listenMainTokenApproval }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ModalStake)

