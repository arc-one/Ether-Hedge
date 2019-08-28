import React, { PureComponent } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import {ETH_DECIMALS} from '../../config'
import { isEmpty, isNull }  from 'lodash';
import Web3 from 'web3'
import { toggleModal } from '../../actions/toggleModalActions'
import { getWalletBalance } from '../../actions/web3Actions'


class ModalSend extends PureComponent {
    constructor() {
        super();
        this.state = {
          amount:0,
          address:''
        };
        this.handleChange= this.handleChange.bind(this);
    }

    handleChange(event) {
        let input = event.target.getAttribute('id');
        if(input === 'amount') this.setState({ amount: event.target.value });
        if(input === 'address') this.setState({ address: event.target.value });
    }

    send = async () => {
        var _this = this;
        if(window.ethereum && (!(isEmpty(this.props.accounts) || isNull(this.props.network) || !this.props.enabledMetamask))) {
            const web3 = new Web3(window.ethereum);
            if(this.state.amount>0 && this.state.address !== '') {
                web3.eth.sendTransaction({from:this.props.accounts[0], to:this.state.address, value:this.state.amount*ETH_DECIMALS}, function(err, trans_hash){
                    let i = 0;
                    let _timeout = setTimeout(() => {
                        _this.props.getWalletBalance();
                        i++;
                        if (i===5) clearTimeout(_timeout);
                    }, 20000);
                });
                this.props.toggleModal(null);
            } else {
                alert("Amount or address is wrong");
            }
        }
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal==='send'} toggle={() => this.props.toggleModal(null)} unmountOnClose={true}>
                    <ModalHeader toggle={() => this.props.toggleModal(null)}>Send</ModalHeader>
                    <ModalBody>
                      <div className="form-group">
                        <label htmlFor="amount">ETH Amount</label>
                        <input type="number" min="0" autoComplete="off" className="form-control modal_inp" id="amount" aria-describedby="amount" placeholder="Amount" onChange={this.handleChange}/>
                        <input type="text" min="0" autoComplete="off" className="form-control modal_inp" id="address" aria-describedby="address" placeholder="Address" onChange={this.handleChange}/>

                        <div className="form-text">Your Wallet Balance: Ξ{this.props.userWalletBalance/ETH_DECIMALS}</div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.send} >Send</Button>{' '}
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
    userWalletBalance: state.userWalletBalance
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ toggleModal, getWalletBalance }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ModalSend)

