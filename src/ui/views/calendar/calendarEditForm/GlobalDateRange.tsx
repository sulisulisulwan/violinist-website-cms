import * as React from 'react'
import SelectMonth from '../../sharedComponents/dateTimeSelects/SelectMonth'
import SelectDay from '../../sharedComponents/dateTimeSelects/SelectDay'
import SelectYear from '../../sharedComponents/dateTimeSelects/SelectYear'
import { calendarFormFieldStateIF, initStateIF } from 'suli-violin-website-types/src'

const getSetStateCallback = (
  setState: React.Dispatch<React.SetStateAction<calendarFormFieldStateIF>>, 
  rangeBound: 'start' | 'end', 
  selectField: 'day' | 'month' | 'year'
) => {
  return (newValue: any) => {
    setState((prevState) => {
      return {
        ...prevState,
        dateRange: {
          ...prevState.dateRange,
          [rangeBound]: {
            ...prevState.dateRange[rangeBound],
            [selectField]: newValue
          }
        }
      }
    })
  }

}

interface globalDateRangePropsIF {
  state: initStateIF
  calendarFormValues: calendarFormFieldStateIF
  setCalendarFormValues: React.Dispatch<React.SetStateAction<calendarFormFieldStateIF>>
}

const GlobalDateRange = ({ state, calendarFormValues, setCalendarFormValues }: globalDateRangePropsIF) => {

  return (
    <div 
      id={'global-daterange-form'}
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <span>Global Date Range:</span>
      <label style={{
        paddingTop: 10,
        paddingLeft: 20
      }}>
        Start date: 
        <SelectMonth 
          state={state} 
          dateStateProps={calendarFormValues.dateRange.start as any} 
          setDateState={getSetStateCallback(setCalendarFormValues, 'start', 'month')}
        />
        <SelectDay 
          state={state} 
          dateStateProps={calendarFormValues.dateRange.start as any} 
          setDateState={getSetStateCallback(setCalendarFormValues, 'start', 'day')}
        />
        <SelectYear 
          state={state} 
          dateStateProps={calendarFormValues.dateRange.start} 
          setDateState={getSetStateCallback(setCalendarFormValues, 'start', 'year')}
        />
      </label>
      <label style={{
        paddingTop: 10,
        paddingLeft: 20
      }}>
        End date: 
        <SelectMonth 
          state={state}
          dateStateProps={calendarFormValues.dateRange.end as any} 
          setDateState={getSetStateCallback(setCalendarFormValues, 'end', 'month')}
        />
        <SelectDay 
          state={state}
          dateStateProps={calendarFormValues.dateRange.end as any} 
          setDateState={getSetStateCallback(setCalendarFormValues, 'end', 'day')} 
        />
        <SelectYear 
          state={state}
          dateStateProps={calendarFormValues.dateRange.end as any} 
          setDateState={getSetStateCallback(setCalendarFormValues, 'end', 'year')}/>
      </label>
    </div>
  )
}

export default GlobalDateRange