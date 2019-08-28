import React, { PureComponent } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import {ETH_DECIMALS} from '../../config'
import { isEmpty, isNull }  from 'lodash';
import { toggleModal } from '../../actions/toggleModalActions'

class ModalUnstake extends PureComponent {
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

    sendUnstake = async () => {
        if(window.ethereum && (!(isEmpty(this.props.accounts) || isNull(this.props.network) || !this.props.enabledMetamask))) {
            if(this.state.amount>0) {
                this.props.smartContracts.depository.inst.methods.unstake((this.state.amount*ETH_DECIMALS).toString()).send({
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
                <Modal isOpen={this.props.modal==='unstake'} toggle={() => this.props.toggleModal(null)} unmountOnClose={true}>
                    <ModalHeader toggle={() => this.props.toggleModal(null)}>Unstake</ModalHeader>
                    <ModalBody>
                      <div className="form-group">
                        <label htmlFor="amount">ETH Amount</label>
                        <input type="number" min="0" autoComplete="off" className="form-control" id="amount" aria-describedby="amount" placeholder="Amount" onChange={this.handleChange}/>
                        <div className="form-text">Your Stake Balance: Ξ{this.props.stakedFunds/ETH_DECIMALS}</div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.sendUnstake} >Unstake</Button>{' '}
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
  bindActionCreators({ toggleModal }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ModalUnstake)

