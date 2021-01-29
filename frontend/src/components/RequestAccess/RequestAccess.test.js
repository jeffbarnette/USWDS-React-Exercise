import React from 'react'
import thunk from 'redux-thunk'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react'

import RequestAccess, { validation, profileInfo } from './RequestAccess'

describe('RequestAccess', () => {
  const initialState = {
    grades: { gradeList: [], loading: false },
  }
  const mockStore = configureStore([thunk])

  it('should have a first name input', () => {
    const store = mockStore(initialState)
    const wrapper = mount(
      <Provider store={store}>
        <RequestAccess />
      </Provider>
    )

    const nameInput = wrapper.find('#firstName')

    expect(nameInput).toExist()
  })

  it('should have a last name input', () => {
    const store = mockStore(initialState)
    const wrapper = mount(
      <Provider store={store}>
        <RequestAccess />
      </Provider>
    )

    const nameInput = wrapper.find('#lastName')

    expect(nameInput).toExist()
  })

  it('should set firstName state value to equal the input value', () => {
    const store = mockStore(initialState)
    const { container } = render(
      <Provider store={store}>
        <RequestAccess />
      </Provider>
    )

    const input = container.querySelector('input[name="firstName"]')

    fireEvent.change(input, {
      target: { value: 'John' },
    })

    expect(input.value).toEqual('John')
  })

  it('should set lastName state value to equal the input value', () => {
    const store = mockStore(initialState)
    const { container } = render(
      <Provider store={store}>
        <RequestAccess />
      </Provider>
    )

    const input = container.querySelector('input[name="lastName"]')

    fireEvent.change(input, {
      target: { value: 'Smith' },
    })

    expect(input.value).toEqual('Smith')
  })

  it('should have a submit button', () => {
    const store = mockStore(initialState)
    const wrapper = mount(
      <Provider store={store}>
        <RequestAccess />
      </Provider>
    )

    const submitBtn = wrapper.find('button[type="submit"]')

    expect(submitBtn).toExist()
  })

  it('should mount a list of options based on grades from the store', () => {
    const store = mockStore({
      ...initialState,
      grades: {
        gradeList: [
          {
            id: 1,
            name: '1',
          },
          {
            id: 2,
            name: '2',
          },
          {
            id: 3,
            name: '3',
          },
        ],
      },
    })
    const wrapper = mount(
      <Provider store={store}>
        <RequestAccess />
      </Provider>
    )

    const options = wrapper.find('option')

    expect(options.length).toEqual(4)
  })

  it('should have errors when you try to submit and first name does not have at least 1 character', () => {
    const store = mockStore({
      ...initialState,
      grades: {
        gradeList: [
          {
            id: 1,
            name: '1',
          },
          {
            id: 2,
            name: '2',
          },
          {
            id: 3,
            name: '3',
          },
        ],
      },
    })
    const wrapper = mount(
      <Provider store={store}>
        <RequestAccess />
      </Provider>
    )

    const form = wrapper.find('.usa-form').hostNodes()

    form.simulate('submit', {
      preventDefault: () => {},
    })

    const errorMessages = wrapper.find('.usa-error-message')

    expect(errorMessages.length).toEqual(4)
    expect(errorMessages.at(1).text()).toEqual('First Name is required')
    expect(errorMessages.at(2).text()).toEqual('Last Name is required')
    expect(errorMessages.last().text()).toEqual('Grade is required')
  })

  it('should remove error message when you add a character and blur out of input', () => {
    const store = mockStore({
      ...initialState,
      grades: {
        gradeList: [
          {
            id: 1,
            name: '1',
          },
          {
            id: 2,
            name: '2',
          },
          {
            id: 3,
            name: '3',
          },
        ],
      },
    })
    const wrapper = mount(
      <Provider store={store}>
        <RequestAccess />
      </Provider>
    )

    const form = wrapper.find('.usa-form').hostNodes()

    form.simulate('submit', {
      preventDefault: () => {},
    })

    let errorMessages = wrapper.find('.usa-error-message')

    expect(errorMessages.length).toEqual(4)

    const firstNameInput = wrapper.find('#firstName')

    firstNameInput.simulate('change', {
      target: {
        value: 'J',
        name: 'firstName',
      },
    })

    firstNameInput.simulate('blur')

    errorMessages = wrapper.find('.usa-error-message')

    expect(errorMessages.length).toEqual(3)

    const lastNameInput = wrapper.find('#lastName')

    lastNameInput.simulate('change', {
      target: {
        value: 'S',
        name: 'lastName',
      },
    })

    lastNameInput.simulate('blur')

    errorMessages = wrapper.find('.usa-error-message')

    expect(errorMessages.length).toEqual(2)
    expect(errorMessages.first().hasClass('display-none')).toEqual(false)

    const select = wrapper.find('.usa-select')

    select.simulate('change', {
      target: {
        value: '2',
        name: 'grade',
      },
    })

    errorMessages = wrapper.find('.usa-error-message')

    expect(errorMessages.length).toEqual(1)
    expect(errorMessages.first().hasClass('display-none')).toEqual(true)
  })

  it("should return 'First Name is required' if fieldName is firstName and fieldValue is empty", () => {
    const error = validation('firstName', '')

    expect(error).toEqual('First Name is required')
  })

  it("should return 'Last Name is required' if fieldName is lastName and fieldValue is empty", () => {
    const error = validation('lastName', '')

    expect(error).toEqual('Last Name is required')
  })

  it("should return 'Grade is required' if fieldName is firstName and fieldValue is empty", () => {
    const error = validation('grade', '')

    expect(error).toEqual('Grade is required')
  })

  it("should return ' is required' if fieldName is not passed in and fieldValue is empty", () => {
    const error = validation('', '')

    expect(error).toEqual(' is required')
  })

  it('should return null if fieldValue is not empty', () => {
    const error = validation('firstName', 'Sam')

    expect(error).toEqual(null)
  })

  it('should display an error message when the input has been touched', () => {
    const store = mockStore({
      ...initialState,
      grades: {
        gradeList: [
          {
            id: 1,
            name: '1',
          },
          {
            id: 2,
            name: '2',
          },
          {
            id: 3,
            name: '3',
          },
        ],
      },
    })
    const wrapper = mount(
      <Provider store={store}>
        <RequestAccess />
      </Provider>
    )

    const form = wrapper.find('.usa-form').hostNodes()

    form.simulate('submit', {
      preventDefault: () => {},
    })

    let errorMessages = wrapper.find('.usa-error-message')

    expect(errorMessages.length).toEqual(4)

    const firstNameInput = wrapper.find('#firstName')

    firstNameInput.simulate('change', {
      target: {
        name: 'firstName',
        value: 'J',
      },
    })

    firstNameInput.simulate('blur')

    errorMessages = wrapper.find('.usa-error-message')

    expect(errorMessages.length).toEqual(3)

    firstNameInput.simulate('change', {
      target: {
        name: 'firstName',
        value: '',
      },
    })

    firstNameInput.simulate('blur')

    errorMessages = wrapper.find('.usa-error-message')

    expect(errorMessages.length).toEqual(4)
  })

  it('should set the Select element value to the value of the event when there is a selected grade', () => {
    const store = mockStore({
      ...initialState,
      grades: {
        gradeList: [
          {
            id: 1,
            name: '1',
          },
          {
            id: 2,
            name: '2',
          },
          {
            id: 3,
            name: '3',
          },
        ],
      },
    })
    const wrapper = mount(
      <Provider store={store}>
        <RequestAccess />
      </Provider>
    )

    const select = wrapper.find('.usa-select')

    select.simulate('change', {
      target: { value: '1' },
    })

    expect(select.instance().value).toEqual('1')
  })

  it('should reset Select element value to an empty string when there is no selected grade', () => {
    const store = mockStore({
      ...initialState,
      grades: {
        gradeList: [
          {
            id: 1,
            name: '1',
          },
          {
            id: 2,
            name: '2',
          },
          {
            id: 3,
            name: '3',
          },
        ],
      },
    })
    const wrapper = mount(
      <Provider store={store}>
        <RequestAccess />
      </Provider>
    )

    const select = wrapper.find('.usa-select')

    select.simulate('change', {
      target: { value: '' },
    })

    expect(select.instance().value).toEqual('')
  })

  it('should reset Select element value to an empty string when there is no grade that matches the value passed in', () => {
    const store = mockStore({
      ...initialState,
      grades: {
        gradeList: [
          {
            id: 1,
            name: '1',
          },
          {
            id: 2,
            name: '2',
          },
          {
            id: 3,
            name: '3',
          },
        ],
      },
    })
    const wrapper = mount(
      <Provider store={store}>
        <RequestAccess />
      </Provider>
    )

    const select = wrapper.find('.usa-select')

    select.simulate('change', {
      target: { value: '5' },
    })

    expect(select.instance().value).toEqual('')
  })

  it('console.log should display the profileInfo', () => {
    console.log = jest.fn()

    const store = mockStore({
      ...initialState,
      grades: {
        gradeList: [
          {
            id: 1,
            name: '1',
          },
          {
            id: 2,
            name: '2',
          },
          {
            id: 3,
            name: '3',
          },
        ],
      },
    })
    
    const { container } = render(
      <Provider store={store}>
        <RequestAccess />
      </Provider>
    )

    const input = container.querySelector('input[name="firstName"]')
    

    fireEvent.change(input, {
      target: { value: 'John' },
    })

    expect(input.value).toEqual('John')

    const input2 = container.querySelector('input[name="lastName"]')

    fireEvent.change(input2, {
      target: { value: 'Smith' },
    })

    expect(input2.value).toEqual('Smith')

    const select = container.querySelector('.usa-select')

    fireEvent.change(select, {
      target: {
        value: '2',
        name: 'grade',
      },
    })

    // setProfileInfo({ ...profileInfo, firstName: input.value })
    // setProfileInfo({ ...profileInfo, lastName: input2.value })
    // setProfileInfo({ ...profileInfo, grade: select.name })

    const form = container.querySelector('.usa-form')

    fireEvent.submit(form, {
      preventDefault: () => {},
    })
    
    console.log(profileInfo)

    expect(console.log).toHaveBeenCalledWith(profileInfo);
  })
})
