import Web3 from 'web3'
import React, { PureComponent } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import {ETH_DECIMALS} from '../../../config'
import { isEmpty, isNull }  from 'lodash';
import { toggleModal } from '../../../actions/toggleModalActions'


class ModalWithdraw extends PureComponent {
    constructor() {
        super();
        this.state = {
          amount:0,
        };
        this.handleChange= this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ amount: event.target.value });
    }

    sendDeposit = async () => {
        if(window.ethereum && (!(isEmpty(this.props.accounts) || isNull(this.props.network) || !this.props.enabledMetamask))) {
            let provider = window.ethereum;
            const web3 = new Web3(provider);
            if(this.state.amount>0) {
                this.props.smartContracts.depository.inst.methods.deposit().send({
                    from: this.props.accounts[0],
                    value:web3.utils.toWei(this.state.amount, 'ether')
                }); 
                this.props.toggleModal(null);
            } else {
                alert("Please deposit more than 0 ETH");
            }
        }
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal==='deposit'} toggle={() => this.props.toggleModal(null)} unmountOnClose={true}>
                    <ModalHeader toggle={() => this.props.toggleModal(null)}>Deposit</ModalHeader>
                    <ModalBody>
                      <div className="form-group">
                        <label htmlFor="amount">ETH Amount</label>
                        <input type="number" min="0" autoComplete="off" className="form-control" id="amount" aria-describedby="amount" placeholder="Amount" onChange={this.handleChange}/>
                        <div id="amountDeposit" className="form-text">Your wallet balance: Ξ{(this.props.userWalletBalance/ETH_DECIMALS).toFixed(6)}. Please, double check before deposit.</div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.sendDeposit} >Deposit</Button>{' '}
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
    userWalletBalance:state.userWalletBalance,
    smartContracts:state.smartContracts
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ toggleModal }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ModalWithdraw)

