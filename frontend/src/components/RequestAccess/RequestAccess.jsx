import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'

import Button from '../Button'
import FormGroup from '../FormGroup'
import ComboBox from '../ComboBox'


export const validation = (fieldName, fieldValue) => {
  let field
  switch (fieldName) {
    case 'firstName':
      field = 'First Name'
      break
    case 'lastName':
      field = 'Last Name'
      break
    case 'grade':
      field = 'Grade'
      break
    default:
      field = ''
  }
  if (typeof fieldValue === 'string' && fieldValue.trim() === '') {
    return `${field} is required`
  }
  return null
}


function RequestAccess() {
  const errorRef = useRef(null)
  const gradeList = useSelector((state) => state.grades.gradeList)

  const [profileInfo, setProfileInfo] = useState({
    firstName: '',
    lastName: '',
    grade: '',
  })

  const [errors, setErrors] = useState({})

  const [touched, setTouched] = useState({})

  const setGrade = (gradeName) => {
    let selectedGrade = gradeList.find((grade) => gradeName === grade.name)
    if (!selectedGrade) selectedGrade = ''
    setProfileInfo({ ...profileInfo, grade: selectedGrade.name })
  }

  const handleChange = ({ name, value }) => {
    setProfileInfo({ ...profileInfo, [name]: value })
  }

  const handleBlur = (evt) => {
    const { name, value } = evt.target

    const { [name]: removedError, ...rest } = errors

    const error = validation(name, value)

    setErrors({
      ...rest,
      ...(error && { [name]: touched[name] && error }),
    })
  }
  const handleSubmit = (evt) => {
    evt.preventDefault()

    // validate the form
    const formValidation = Object.keys(profileInfo).reduce(
      (acc, key) => {
        const newError = validation(key, profileInfo[key])
        const newTouched = { [key]: true }
        return {
          errors: {
            ...acc.errors,
            ...(newError && { [key]: newError }),
          },
          touched: {
            ...acc.touched,
            ...newTouched,
          },
        }
      },
      {
        errors: { ...errors },
        touched: { ...touched },
      }
    )
    setErrors(formValidation.errors)
    setTouched(formValidation.touched)

    // if no errors output profileInfo to console
    if (!Object.values(formValidation.errors).length) {
      console.log(profileInfo)
    }
    return setTimeout(() => errorRef.current.focus(), 0)
  }

  return (
    <>
      <p className="margin-top-1 margin-bottom-4">
        Please enter your information to request access from an OFA
        administrator
      </p>
      <form className="usa-form" onSubmit={handleSubmit}>
        <div
          className={`usa-error-message ${
            !!Object.keys(errors).length && !!Object.keys(touched).length
              ? 'display-block'
              : 'display-none'
          }`}
          ref={errorRef}
          tabIndex="-1"
          role="alert"
        >
          There are {Object.keys(errors).length} errors in this form
        </div>
        <FormGroup
          error={errors.firstName}
          name="firstName"
          label="First Name"
          inputValue={profileInfo.firstName}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <FormGroup
          error={errors.lastName}
          name="lastName"
          label="Last Name"
          inputValue={profileInfo.lastName}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <div
          className={`usa-form-group ${
            errors.grade ? 'usa-form-group--error' : ''
          }`}
          ref={errorRef}
          tabIndex="-1"
          role="alert"
        >
          <ComboBox
            name="grade"
            error={errors.grade}
            handleSelect={setGrade}
            selected={
              profileInfo.grade
            }
            handleBlur={handleBlur}
            placeholder="- Select or Search -"
          >
            <option value="">Select a grade</option>
            {gradeList.map((grade) => (
              <option
                className="gradeOption"
                key={grade.id}
                value={grade.name}
              >
                {grade.name}
              </option>
            ))}
          </ComboBox>
        </div>
        <Button type="submit" className="width-full request-access-button">
          Request Access
        </Button>
      </form>
    </>
  )
}

export default RequestAccess
