import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

class MainWrapper extends PureComponent {
  render () {
    const { theme } = this.props

    const wrapperClass = classNames({
      wrapper: true
    })

    return (
      <div className={theme.className}>
        <div className={wrapperClass}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  theme: state.theme
}))(MainWrapper)
