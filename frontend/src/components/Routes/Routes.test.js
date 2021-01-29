import React from 'react'
import { mount } from 'enzyme'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'

import Routes from './Routes'
import RequestAccess from '../RequestAccess'

describe('Routes.js', () => {
  const mockStore = configureStore([thunk])

  it('routes "/" to the Request Access page', () => {
    const store = mockStore({
      grades: { gradeList: [], loading: false },
    })
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Routes />
        </MemoryRouter>
      </Provider>
    )

    expect(wrapper.find(RequestAccess)).toExist()
  })
})
