import React from 'react'
import ReactDOM from 'react-dom'

import { ConnectedRouter as Router } from 'connected-react-router'
import { Provider } from 'react-redux'

import configureStore, { history } from './configureStore'
import App from './App'

import 'uswds/dist/js/uswds'
import './index.scss'


const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
