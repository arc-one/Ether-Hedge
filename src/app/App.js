import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/theme-light.css'
import Router from './Router'


class App extends Component {

  constructor () {
    super()
    this.state = {
      loading: true,
      loaded: false,
    }
  }

  componentDidMount () {
    window.addEventListener('load', () => {
      this.setState({ loading: false })
      setTimeout(() => this.setState({ loaded: true }), 500)
    })
  }

  render () {

    const loaded = this.state.loaded
    return (
      <div>
        {!loaded && <div className={`load${this.state.loading ? '' : ' loaded'}`}>
          <div className="loader"></div>
        </div>}
        {loaded ?<div>
          <Router/>
        </div>:null}
      </div>
    )
  }
}

export default App