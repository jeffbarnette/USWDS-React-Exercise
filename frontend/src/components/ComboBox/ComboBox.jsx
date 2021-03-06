import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import comboBox from 'uswds/src/js/components/combo-box'


const ComboBox = ({
  children,
  handleSelect,
  selected,
  handleBlur,
  error,
  name,
  placeholder,
}) => {
  useEffect(() => {
    comboBox.init()

    const input = document.querySelector('.usa-combo-box__input')
    if (input) {
      if (error) {
        input.classList.add('usa-combo-box__input--error')
      }

      if (!error) {
        input.classList.remove('usa-combo-box__input--error')
      }
    }
  })

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        className={`usa-label text-bold ${error ? 'usa-label--error' : ''}`}
        htmlFor={name}
      >
        Grade (required)
      </label>
      {error && (
        <span className="usa-error-message" id={`${name}-error-message`}>
          {error}
        </span>
      )}
      <div className="usa-combo-box" data-placeholder={placeholder}>
        {/* eslint-disable-next-line jsx-a11y/no-onchange */}
        <select
          className="usa-select"
          name={name}
          id={name}
          onChange={(e) => {
            handleSelect(e.target.value)
            handleBlur(e)
          }}
          value={selected}
        >
          {children}
        </select>
      </div>
    </>
  )
}

ComboBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  handleSelect: PropTypes.func.isRequired,
  selected: PropTypes.string,
  handleBlur: PropTypes.func.isRequired,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
}

ComboBox.defaultProps = {
  selected: '',
  error: '',
  placeholder: '',
}

export default ComboBox
