import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

class AboutStructure extends PureComponent {

	handleClick = (event) => {
		let url = event.target.getAttribute('url');
		this.props.history.push(url);
	}

	render () {
		return (
			<div className=" ">
				Structure
			</div>
		)
	}
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = dispatch => (
  bindActionCreators({}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AboutStructure)

