import Web3 from 'web3'
import React, { PureComponent } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import {ETH_DECIMALS} from '../../config'
import { isEmpty, isNull }  from 'lodash';
import { toggleModal } from '../../actions/toggleModalActions'


class ModalAddProposal extends PureComponent {
    constructor() {
        super();
        this.state = {
          type: "0",
          param: "0",
          title: '',
          description: '',
          value:'',
          contract:'',
          price:'',
          audit:'',



        };
        this.handleChangeType= this.handleChangeType.bind(this);
        this.handleChangeValue= this.handleChangeValue.bind(this);
        this.handleChangeParam= this.handleChangeParam.bind(this);
        this.sendCreate= this.sendCreate.bind(this);
        this.handleChangeContract= this.handleChangeContract.bind(this);



    }

    handleChangeValue = (event) => {
        this.setState({ value: event.target.value });
    }

    handleChangeType = (event) => {
        this.setState({ type: event.target.value });
    }

    handleChangeParam = (event) => {
        this.setState({ param: event.target.value });
    }

    handleChangeContract = (event) => {

        console.log('event.target.id', event.target.id)

        switch(event.target.id){
            case 'title':
                this.setState({title: event.target.value});
                break;
            case 'description':
                this.setState({description: event.target.value});
                break;
            case 'price':
                this.setState({price: event.target.value});
                break;
            case 'contract':
                this.setState({contract: event.target.value});
                break;
            case 'audit':
                this.setState({audit: event.target.value});
                break;
        }
       
    }

    sendCreate = () => {

        console.log(this.state)

/*        if(window.ethereum && (!(isEmpty(this.props.accounts) || isNull(this.props.network) || !this.props.enabledMetamask))) {
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
        }*/
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal==='add_proposal'} toggle={() => this.props.toggleModal(null)} unmountOnClose={true}>
                    <ModalHeader toggle={() => this.props.toggleModal(null)}>Create Voting Proposal</ModalHeader>
                    <ModalBody>
                      <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select value={this.state.type} className="form-control" id="amount" aria-describedby="amount" onChange={this.handleChangeType}>

                            <option value="0">Change Global Params</option>
                            <option value="1">New Future Contract</option>
                            <option value="2">New Project</option>

                        </select>
                       {
                           this.state.type === '0'?
                           <div className="form_block">
                               



                                <div className="form-group">
                                  <label htmlFor="amount">ETH Amount</label>
                                    <select value={this.state.param} className="form-control" id="amount" aria-describedby="amount" onChange={this.handleChangeParam}>

                                        <option value="0">Limit order fee</option>
                                        <option value="1">Market order fee</option>
                                        <option value="2">Activation Changes Timeout</option>
                                        <option value="3">Voting Time</option>
                                        <option value="4">Fee Discount Index</option>
                                        <option value="5">Proposal Fee</option>
                                        <option value="6">Min Voting Percent</option>
                                        <option value="5">Future Contract Proposal Fee</option>
                       

                                    </select>
                                </div>

                                {
                                    this.state.param === '0'?
                                        <div className="form-group">
                                          <label htmlFor="amount">New Limit Order Fee</label>
                                          <input type="number" min="0" autoComplete="off" className="form-control" id="amount" value={this.state.value} onChange={this.handleChangeValue}  aria-describedby="amount" placeholder="Number"/>
                                          <div id="amountWithdraw" className="form-text">Enter a number from 0 to 100. Example: "0.3"</div>
                                        </div>:null
                                }

                                {

                                    this.state.param === '1'?
                                        <div className="form-group">
                                          <label htmlFor="amount">New Market Order Fee</label>
                                          <input type="number" min="0" autoComplete="off" className="form-control" id="amount" value={this.state.value} onChange={this.handleChangeValue}  aria-describedby="amount" placeholder="Number"/>
                                          <div id="amountWithdraw" className="form-text">Enter a number from 0 to 100. Example: "0.3"</div>
                                        </div>:null

                                }

                                {

                                    this.state.param === '2'?
                                        <div className="form-group">
                                          <label htmlFor="amount">Activation of Changes Timeout</label>
                                          <input type="number" min="0" autoComplete="off" className="form-control" id="amount" value={this.state.value} onChange={this.handleChangeValue}  aria-describedby="amount" placeholder="Number"/>
                                          <div id="amountWithdraw" className="form-text">Type time in a seconds. Example: "86400" - 1 day</div>
                                        </div>:null

                                }

                                {

                                    this.state.param === '3'?
                                        <div className="form-group">
                                          <label htmlFor="amount">Voting Time</label>
                                          <input type="number" min="0" autoComplete="off" className="form-control" id="amount" value={this.state.value} onChange={this.handleChangeValue}  aria-describedby="amount" placeholder="Number"/>
                                          <div id="amountWithdraw" className="form-text">Type time in a seconds. Example: "86400" - 1 day</div>
                                        </div>:null

                                }

                                {

                                    this.state.param === '4'?
                                        <div className="form-group">
                                          <label htmlFor="amount">Fee Discount Index</label>
                                          <input type="number" min="0" autoComplete="off" className="form-control" id="amount" value={this.state.value} onChange={this.handleChangeValue}  aria-describedby="amount" placeholder="Number"/>
                                          <div id="amountWithdraw" className="form-text">Enter a number from 0 to 100. The discount index affects on trade discount if a trader holds REKT tokens.  </div>
                                        </div>:null

                                }

                                {

                                    this.state.param === '5'?
                                        <div className="form-group">
                                          <label htmlFor="amount">Proposal Fee</label>
                                          <input type="number" min="0" autoComplete="off" className="form-control" id="amount" value={this.state.value} onChange={this.handleChangeValue}  aria-describedby="amount" placeholder="Number"/>
                                          <div id="amountWithdraw" className="form-text">Enter a number from 0 to 100. Example: "0.3".</div>
                                        </div>:null

                                }

                                {

                                    this.state.param === '6'?
                                        <div className="form-group">
                                          <label htmlFor="amount">Min Voting Percent</label>
                                          <input type="number" min="0" autoComplete="off" className="form-control" id="amount" value={this.state.value} onChange={this.handleChangeValue}  aria-describedby="amount" placeholder="Number"/>
                                          <div id="amountWithdraw" className="form-text">Enter a number from 0 to 100. Example: "0.3".</div>
                                        </div>:null

                                }




                           </div>:null





                       }
                       {
                           this.state.type === '1'?
                           <div className="form_block">
                                
                                <div className="form-group">
                                  <label htmlFor="title">Title</label>
                                  <input type="text" autoComplete="off" className="form-control" id="title" value={this.state.title} onChange={this.handleChangeContract}  aria-describedby="title" placeholder="Title"/>
                                  <div id="title" className="form-text">Type title less then 150 symbols.</div>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="contract">Contract Address</label>
                                  <input type="text" autoComplete="off" className="form-control" id="contract" value={this.state.contract} onChange={this.handleChangeContract}  aria-describedby="contract" placeholder="Address"/>
                                  <div id="contract" className="form-text">Enter the contract address.</div>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="description">Description</label>
                                  <textarea type="text"  autoComplete="off" className="form-control" id="description" value={this.state.description} onChange={this.handleChangeContract}  aria-describedby="description" placeholder="Description"/>
                                  <div id="description" className="form-text">Please type description of the contract.</div>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="price">Price</label>
                                  <input type="number"  autoComplete="off" className="form-control" id="price" value={this.state.price} onChange={this.handleChangeContract}  aria-describedby="price" placeholder="Number"/>
                                  <div id="price" className="form-text">Enter amount of ETHER. Example: "1".</div>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="audit">Audit</label>
                                  <input type="text" autoComplete="off" className="form-control" id="audit" value={this.state.audit} onChange={this.handleChangeContract}  aria-describedby="audit" placeholder="URL"/>
                                  <div id="audit" className="form-text">Enter the link with audit of the contract.</div>
                                </div>



                           </div>:null
                       }
                       {
                           this.state.type === '2'?
                           <div>
                               Project

                           </div>:null
                       }




                      
                      </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.sendCreate} >Create</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddProposal)

