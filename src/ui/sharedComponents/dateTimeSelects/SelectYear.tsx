import * as React from 'react'


const getYearOptions = (min: number, max: number) => {
  const options = []
  for (let i = min; i <= max; i++) {
    options.push(<option key={'dayOption---' + i} value={'' + i}>{i}</option>)
  }
  return options
}

interface selectYearPropsIF {
  state: any
  dateStateProps: any
  setDateState: React.Dispatch<React.SetStateAction<any>>
}

const SelectYear = ({ state, dateStateProps, setDateState, }: selectYearPropsIF) => {
  
  const min = 1987
  const max = 2100

  const options = getYearOptions(min, max)
  
  return (
    <select 
      disabled={!state.editFieldsEnabled}
      onChange={ (e) => { setDateState(e.target.value)}}
      defaultValue={dateStateProps.year}
    >
      { options.map(option => {
          return option
        })
      }
    </select>
  )
}

export default SelectYear