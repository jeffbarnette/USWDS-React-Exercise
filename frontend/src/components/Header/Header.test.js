import React from 'react'
import thunk from 'redux-thunk'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import Header from './Header'

describe('Header', () => {
  let initialState = {
    router: { location: { pathname: '/' } },
  }
  const mockStore = configureStore([thunk])

  it('should have a title link', () => {
    const store = mockStore(initialState)
    const wrapper = mount(
      <Provider store={store}>
        <Header />
      </Provider>
    )

    const title = wrapper.find('a[title="Home"]')
    expect(title).toExist()
    expect(title).toIncludeText('TANF Data Portal')
  })

  it('should have a navigation link for Welcome', () => {
    const store = mockStore(initialState)
    const wrapper = mount(
      <Provider store={store}>
        <Header />
      </Provider>
    )
    const welcomeLink = wrapper.find('#welcome')
    expect(welcomeLink).toExist()
    expect(welcomeLink).toIncludeText('Welcome')
  })

  it('should find menu button', () => {
    const store = mockStore(initialState)
    const wrapper = mount(
      <Provider store={store}>
        <Header />
      </Provider>
    )
    const menuBtn = wrapper.find('.usa-menu-btn')
    expect(menuBtn).toExist()
  })

  it("should add usa-current class to Welcome tab when on '/'", () => {
    const store = mockStore({
      ...initialState,
      router: { location: { pathname: '/' } },
    })
    const wrapper = mount(
      <Provider store={store}>
        <Header />
      </Provider>
    )

    const welcomeTab = wrapper.find('#welcome')

    expect(welcomeTab.hasClass('usa-current')).toEqual(true)
  })

  it('should have secondaryItems when user is logged in', () => {
    const store = mockStore(initialState)
    const wrapper = mount(
      <Provider store={store}>
        <Header />
      </Provider>
    )

    const secondaryLinks = wrapper.find('.usa-nav__secondary-item')

    expect(secondaryLinks.length).toEqual(2)
    expect(secondaryLinks.first().text()).toEqual('user@testsite.com')
    expect(secondaryLinks.last().text()).toEqual('Sign Out')
  })
})
