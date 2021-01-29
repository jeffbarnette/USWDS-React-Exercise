const FETCH_GRADES = 'FETCH_GRADES'
const SET_GRADES = 'SET_GRADES'
const SET_GRADES_ERROR = 'SET_GRADES_ERROR'
const CLEAR_GRADES = 'CLEAR_GRADES'

const numbers = Array(10).fill(1).map((x, y) => x + y)
var grades = []

numbers.forEach(grade => {
  grades.push({id: grade, name: grade.toString()})
})

const initialState = {
  gradeList: grades,
  loading: false,
}

const gradeList = (state = initialState, action) => {
  const { type, payload = {} } = action
  switch (type) {
    case FETCH_GRADES:
      return { ...state, loading: true }
    case SET_GRADES: {
      const { data } = payload
      return {
        ...state,
        loading: false,
        gradeList: data,
      }
    }
    case SET_GRADES_ERROR: {
      const { error } = payload
      return {
        ...initialState,
        error,
      }
    }
    case CLEAR_GRADES:
      return {
        ...initialState, gradeList: []
      }
      
    default:
      return state
  }
}

export default gradeList
