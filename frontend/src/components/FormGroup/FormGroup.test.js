import React from 'react'
import { mount } from 'enzyme'

import FormGroup from './FormGroup'


describe('FormGroup', () => {
    it('should call handleBlur and handleChange on change of value in input', () => {
      const props = {
        handleBlur: jest.fn(),
        handleChange: jest.fn(),
        name: 'firstName',
        label: 'First Name'
      }
      const wrapper = mount(
        <FormGroup {...props}>
          <input value="" />
        </FormGroup>
      )
      const input = wrapper.find('#firstName')
  
      input.simulate('change', {
        target: {
          name: 'firstName',
          value: 'John',
        },
      })

      input.simulate('blur')
      
      expect(props.handleChange).toHaveBeenCalledTimes(1)
      expect(props.handleBlur).toHaveBeenCalledTimes(1)
    })

    it('should reflect updated value based on input', () => {
      const props = {
        handleBlur: jest.fn(),
        handleChange: jest.fn(),
        name: 'firstName',
        label: 'First Name'
      }
      
      const wrapper = mount(
        <FormGroup {...props}>
          <input value="" />
        </FormGroup>
      )
  
      const input = wrapper.find('#firstName')
  
      input.value = 'John'
  
      expect(input.value).toEqual('John')
    })
  })
  