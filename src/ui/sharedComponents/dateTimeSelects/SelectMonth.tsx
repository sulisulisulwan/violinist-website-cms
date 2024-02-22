import * as React from 'react'
import { numToMonth } from '../../../utils/dateFunctions'
import { paddedMonthNumbers, threeLetterMonths } from 'suli-violin-website-types/src'

const months = new Array(12)
.fill(1)
.map((month, idx) => idx + 1)
.map((month: number) => numToMonth((month < 10 ? ('0' + month) : month) as paddedMonthNumbers))

interface selectMonthPropsIF {
  state: any
  dateStateProps: {
    day: string
    month: threeLetterMonths
    year: string
  }
  setDateState: React.Dispatch<React.SetStateAction<any>>
}

const SelectMonth = ({ state, dateStateProps, setDateState }: selectMonthPropsIF) => {

  return (
    <select
      disabled={!state.editFieldsEnabled}
      onChange={ (e) => { setDateState(e.target.value)}}
      value={dateStateProps.month}
    >
      {months.map((monthOption, idx) => {
        return <option 
          key={'editSelect' + monthOption}
        >{monthOption}</option>
      })}
    </select>
  )
}

export default SelectMonth