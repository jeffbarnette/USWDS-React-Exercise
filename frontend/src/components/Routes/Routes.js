import React from 'react'
import { Switch, Route } from 'react-router-dom'
import RequestAccess from '../RequestAccess'


const Routes = () => {
  return (
    <Switch>
      <Route path="/">
        <div className="grid-container margin-top-3">
          <h1 className="font-serif-2xl margin-bottom-0 text-normal">Request Access</h1>
            <RequestAccess />
          </div>
      </Route>
    </Switch>
  )
}

export default Routes
