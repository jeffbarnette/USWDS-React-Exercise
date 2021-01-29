import React from 'react'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'

import NavItem from './NavItem'

describe('NavItem', () => {
  it('should render a NavItem with usa-current', () => {
    const mockStore = configureStore([thunk])

    const store = mockStore()
    const wrapper = mount(
      <Provider store={store}>
        <ul className="usa-nav__primary">
          <NavItem pathname='/' tabTitle="Welcome" href="/" />
        </ul>
      </Provider>
    )
    
    const testTab = wrapper.find('#welcome')
    expect(testTab).toIncludeText('Welcome')
    expect(testTab.hasClass('usa-current')).toEqual(true)
  })

  it('should render a NavItem without usa-current', () => {
    const mockStore = configureStore([thunk])

    const store = mockStore()
    const wrapper = mount(
      <Provider store={store}>
        <ul className="usa-nav__primary">
          <NavItem pathname='/' tabTitle="Test" href="/Test" />
        </ul>
      </Provider>
    )
    
    const testTab = wrapper.find('#test')
    expect(testTab).toIncludeText('Test')
    expect(testTab.hasClass('usa-current')).toEqual(false)
  })
})
