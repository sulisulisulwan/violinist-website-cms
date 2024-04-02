import * as React from 'react'
import { threeLetterMonths } from 'suli-violin-website-types/src'

const getDaysInMonth = (month: threeLetterMonths, isLeapYear: boolean) => {
  const daysInMonth = {
    'Jan': 31,
    'Feb': isLeapYear ? 29 : 28,
    'Mar': 31,
    'Apr': 30,
    'May': 31,
    'Jun': 30,
    'Jul': 31,
    'Aug': 31,
    'Sep': 30,
    'Oct': 31,
    'Nov': 30,
    'Dec': 31,
  }
  return daysInMonth[month]
}

const getIsLeapYear = (year: number) => {
  let isLeapYear = true
  if (year % 4 !== 0) {
    isLeapYear = false
  }

  const asString = year.toString()
  if (asString[asString.length - 1] === '0' && asString[asString.length - 2] === '0') {
    if (year % 400 !== 0) {
      isLeapYear = false
    }
  }

  return isLeapYear
}

const getDayOptions = (max: number) => {
  const options = []
  for (let i = 0; i < max; i++) {
    options.push(<option key={'dayOption---' + i} value={i + 1 + ''}>{i + 1}</option>)
  }
  return options
}

const getUnpadded = (numAsString: string) => {
  let unpadded = ''
  let isZeroPrefix = true
  for (let i = 0; i < numAsString.length; i++) {
    if (isZeroPrefix && numAsString[i] === '0') {
      continue
    }

    if (numAsString[i] !== '0' && isZeroPrefix) {
      isZeroPrefix = false
    }

    unpadded += numAsString[i]
  }
  return unpadded
}

interface selectDayPropsIF {
  state: any
  dateStateProps: {
    year: number
    month: threeLetterMonths
    day: string
  }
  setDateState: React.Dispatch<React.SetStateAction<any>>
}

const SelectDay = ({ 
  state, 
  dateStateProps,
  setDateState, 
}: selectDayPropsIF) => {

  const isLeapYear = getIsLeapYear(dateStateProps.year)
  const max = getDaysInMonth(dateStateProps.month, isLeapYear)
  const options = getDayOptions(max)
  const dayUnpadded = getUnpadded(dateStateProps.day)

  return (
    <select 
      disabled={!state.editFieldsEnabled}
      onChange={ (e) => { setDateState(e.target.value)}}
      value={dayUnpadded}
    >
      { options.map(option => {
          return option
        })
      }
    </select>
  )
}

export default SelectDay