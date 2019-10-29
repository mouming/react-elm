import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Manage from './pages/manages'
import Login from './pages/login'

import './App.scss'

function App() {
  return (
    <Switch>
      <Route path="/manage" component={Manage}></Route>
      <Route path="/" component={Login}></Route>
    </Switch>
  )
}

export default App
