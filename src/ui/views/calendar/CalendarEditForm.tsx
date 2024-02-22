import * as React from 'react'
import { useContext } from 'react'
import GlobalDateRange from './calendarEditForm/GlobalDateRange'
import EventDates from './calendarEditForm/EventDates'
import Artists from './calendarEditForm/Artists'
import Program from './calendarEditForm/Program'

import { GlobalAppStateManagement } from '../../../App'
import useTextLoader from '../../../textLoaders/_useTextLoader'
import { calendarFormFieldStateIF } from 'suli-violin-website-types/src'

interface calendarEditFormPropsIF {
  formFieldValues: calendarFormFieldStateIF
  setFormFieldValues: React.Dispatch<React.SetStateAction<calendarFormFieldStateIF>>
}

const CalendarEditForm = ({ formFieldValues, setFormFieldValues }: calendarEditFormPropsIF) => {

  const [ globalAppState ] = useContext(GlobalAppStateManagement)

  useTextLoader('calendar', setFormFieldValues)
  
  return (
    <div>
      <form style={{
        display: 'flex',
        flexDirection: 'column',
        color: !globalAppState.editFieldsEnabled ? 'gray' : 'black'
      }}>
        <GlobalDateRange state={globalAppState} calendarFormValues={formFieldValues} setCalendarFormValues={setFormFieldValues}/>
        <label style={{
          paddingTop: 10
        }}>
          Type:
          <input
            onChange={(e) => { setFormFieldValues((prevState) => ({
              ...prevState,
              type: e.target.value
            }))}}
            value={formFieldValues.type}
            disabled={!globalAppState.editFieldsEnabled}
          />
        </label>
        <label style={{
          paddingTop: 10
        }}>
          Venue:
          <input
            onChange={(e) => { setFormFieldValues((prevState) => ({
              ...prevState,
              venue: e.target.value
            }))}}
            value={formFieldValues.venue}
            disabled={!globalAppState.editFieldsEnabled}
          />
        </label>
        <label style={{
          paddingTop: 10
        }}>
          Presenter:
          <input
            onChange={(e) => { setFormFieldValues((prevState) => ({
              ...prevState,
              presenter: e.target.value
            }))}}
            value={formFieldValues.presenter}
            disabled={!globalAppState.editFieldsEnabled}
          />
        </label>
        <Artists calendarFormValues={formFieldValues} setCalendarFormValues={setFormFieldValues}/>
        <Program calendarFormValues={formFieldValues} setCalendarFormValues={setFormFieldValues}/>
        <EventDates calendarFormValues={formFieldValues} setCalendarFormValues={setFormFieldValues}/>
      </form>

    </div>
  )
}

export default CalendarEditForm