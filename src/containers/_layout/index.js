import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Topbar from './topbar/Topbar'
import { changeThemeToDark, changeThemeToLight } from '../../actions/themeActions'

class Layout extends Component {
  componentDidMount () {
  }

  changeToDark = () => {
    this.props.dispatch(changeThemeToDark())
  }

  changeToLight = () => {
    this.props.dispatch(changeThemeToLight())
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
