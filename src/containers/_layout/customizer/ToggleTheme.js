import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { changeThemeToDark, changeThemeToLight } from '../../../actions/themeActions'

class ToggleTheme extends PureComponent {
  handleClick = () => {
    if (this.props.theme.className === 'theme-dark') {
      this.props.dispatch(changeThemeToLight())
      localStorage.setItem('theme-dark', 'false')
    } else {
      this.props.dispatch(changeThemeToDark())
      localStorage.setItem('theme-dark', 'true')
    }
  };

  render () {
    return (
/*      <label className='toggle-btn customizer__toggle'>
        <input className='toggle-btn__input' type='checkbox' name='theme_toggle'
          checked={this.props.theme.className === 'theme-dark'} onChange={() => {}} />
        <label className='toggle-btn__input-label' htmlFor='theme_toggle'
          onClick={this.handleClick}>Toggle</label>
      </label>*/

<div class="center">
  <input type="checkbox" id="cbx" style="display:none"/>
  <label for="cbx" class="toggle"><span></span></label>    
</div>
    )
  }
}

export default connect(state => {
  return {
    theme: state.theme
  }
})(ToggleTheme)