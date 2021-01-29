import reducer from './gradeList'

const FETCH_GRADES = 'FETCH_GRADES'
const SET_GRADES = 'SET_GRADES'
const SET_GRADES_ERROR = 'SET_GRADES_ERROR'
const CLEAR_GRADES = 'CLEAR_GRADES'

describe('reducers/grades', () => {
  it('should return the initial state', () => {
    const numbers = Array(10).fill(1).map((x, y) => x + y)
    var grades = []

    numbers.forEach(grade => {
      grades.push({id: grade, name: grade.toString()})
    })

    expect(reducer(undefined, {})).toEqual({
      gradeList: grades,
      loading: false,
    })
  })

  it('should handle FETCH_GRADES', () => {
    const numbers = Array(10).fill(1).map((x, y) => x + y)
    var grades = []

    numbers.forEach(grade => {
      grades.push({id: grade, name: grade.toString()})
    })

    expect(
      reducer(undefined, {
        type: FETCH_GRADES,
      })
    ).toEqual({
      gradeList: grades,
      loading: true,
    })
  })

  it('should handle SET_GRADES', () => {
    expect(
      reducer(
        {
          gradeList: [],
          loading: true,
        },
        {
          type: SET_GRADES,
          payload: {
            data: [{ id: 1, name: '1' }],
          },
        }
      )
    ).toEqual({
      gradeList: [{ id: 1, name: '1' }],
      loading: false,
    })
  })

  it('should handle CLEAR_GRADES', () => {
    const numbers = Array(10).fill(1).map((x, y) => x + y)
    var grades = []

    numbers.forEach(grade => {
      grades.push({id: grade, name: grade.toString()})
    })

    expect(
      reducer(
        {
          gradeList: [{ value: 1, label: '1' }],
          loading: false,
        },
        {
          type: CLEAR_GRADES,
        }
      )
    ).toEqual({
      gradeList: [],
      loading: false,
    })
  })

  it('should handle SET_GRADES_ERROR', () => {
    const numbers = Array(10).fill(1).map((x, y) => x + y)
    var grades = []

    numbers.forEach(grade => {
      grades.push({id: grade, name: grade.toString()})
    })

    expect(
      reducer(undefined, {
        type: SET_GRADES_ERROR,
        payload: { error: 'something went wrong' },
      })
    ).toEqual({
      gradeList: grades,
      loading: false,
      error: 'something went wrong',
    })
  })
})
