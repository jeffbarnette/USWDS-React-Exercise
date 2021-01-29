import React from 'react'
import { mount } from 'enzyme'
import { render } from '@testing-library/react'

import ComboBox from './ComboBox'

describe('ComboBox', () => {
  it('should call handleBlur on change of selection in combo box', () => {
    const props = {
      handleBlur: jest.fn(),
      handleSelect: jest.fn(),
      name: 'grade',
    }
    const grades = [
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
      {
        id: 4,
        name: '4',
      },
      {
        id: 5,
        name: '5',
      },
    ]
    const wrapper = mount(
      <ComboBox {...props}>
        <option value="" />
        {grades.map((grade) => (
          <option
            className="gradeOption"
            key={grade.id}
            value={grade.name}
          >
            {grade.name}
          </option>
        ))}
      </ComboBox>
    )
    const select = wrapper.find('.usa-select')

    select.simulate('change', {
      target: {
        name: 'grade',
        value: '1',
      },
      detail: {
        value: '1',
      },
    })

    expect(props.handleBlur).toHaveBeenCalledTimes(1)
    expect(props.handleSelect).toHaveBeenCalledTimes(1)
    expect(props.handleSelect).toHaveBeenCalledWith('1')
  })

  it('should call handleSelect with selected value on change of selection in combo box', () => {
    const props = {
      handleBlur: jest.fn(),
      handleSelect: jest.fn(),
      name: 'grade',
    }

    const grades = [
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
      {
        id: 4,
        name: '4',
      },
      {
        id: 5,
        name: '5',
      },
    ]

    const wrapper = mount(
      <ComboBox {...props}>
        {grades.map((grade) => (
          <option
            className="gradeOption"
            key={grade.id}
            value={grade.name}
          >
            {grade.name}
          </option>
        ))}
      </ComboBox>
    )

    const select = wrapper.find('.usa-select')

    select.simulate('change', {
      target: {
        name: 'grade',
        value: '5',
      },
    })

    expect(props.handleSelect).toHaveBeenCalledTimes(1)
    expect(props.handleSelect).toHaveBeenCalledWith('5')
  })

  it('should add class of `usa-combo-box__input--error` if error is passed to ComboBox', () => {
    const props = {
      handleBlur: jest.fn(),
      handleSelect: jest.fn(),
      error: 'There is an error',
      name: 'grade',
    }

    const grades = [
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
      {
        id: 4,
        name: '4',
      },
      {
        id: 5,
        name: '5',
      },
    ]

    const { container } = render(
      <ComboBox {...props}>
        {grades.map((grade) => (
          <option
            className="gradeOption"
            key={grade.id}
            value={grade.name}
          >
            {grade.name}
          </option>
        ))}
      </ComboBox>
    )
    const input = container.querySelector('.usa-combo-box__input--error')
    expect(input).toBeInTheDocument()
  })

  it('should NOT add class of `usa-combo-box__input--error` if NO error is passed to ComboBox', () => {
    const props = {
      handleBlur: jest.fn(),
      handleSelect: jest.fn(),
      name: 'grade',
    }
    const grades = [
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
      {
        id: 4,
        name: '4',
      },
      {
        id: 5,
        name: '5',
      },
    ]
    const { container } = render(
      <ComboBox {...props}>
        {grades.map((grade) => (
          <option
            className="gradeOption"
            key={grade.id}
            value={grade.name}
          >
            {grade.name}
          </option>
        ))}
      </ComboBox>
    )
    const input = container.querySelector('.usa-combo-box__input--error')
    expect(input).not.toBeInTheDocument()
  })
})
