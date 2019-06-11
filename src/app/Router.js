import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MainWrapper from './MainWrapper'
import Layout from '../containers/_layout'
import Tools from '../containers/tools'
import Desk from '../containers/desk'


const wrappedRoutes = () => (
  <div>
    <Layout/>
    <div className='container__wrap'>
      <Route exact path='/' component={Desk}/>
      <Route exact path='/home' component={Desk}/>
      <Route path='/tools' component={Tools}/>
    </div>
  </div>
)

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route path='/' component={wrappedRoutes}/>
      </Switch>
    </main>
  </MainWrapper>
)

export default Router