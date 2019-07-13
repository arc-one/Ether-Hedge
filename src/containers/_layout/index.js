import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Topbar from './topbar/Topbar'
import TopbarTools from './topbar/TopbarTools'
import { Route, Switch } from 'react-router-dom'
import { getWindowHeight } from '../../actions'

class Layout extends Component {

  constructor() {
    super();
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.props.dispatch(getWindowHeight());
  }

  render () {
    return (
      <div>
        <Route exact path='/' component={Topbar}/>
        <Route exact path='/desk' component={Topbar}/>
        <Route path='/tools' component={TopbarTools}/>
      </div>
    )
  }
}

export default withRouter(connect(state => ({
  customizer: state.customizer,
  theme: state.theme
}))(Layout))
