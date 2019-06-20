import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Topbar from './topbar/Topbar'

class Layout extends Component {
  componentDidMount () {
  }

  render () {
    return (
      <div>
        <Topbar/>
      </div>
    )
  }
}

export default withRouter(connect(state => ({
  customizer: state.customizer,
  theme: state.theme
}))(Layout))
