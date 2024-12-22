import * as  React from 'react'
import SelectMonth from '../../sharedComponents/dateTimeSelects/SelectMonth'
import SelectDay from '../../sharedComponents/dateTimeSelects/SelectDay'
import SelectYear from '../../sharedComponents/dateTimeSelects/SelectYear'
import SelectTime from '../../sharedComponents/dateTimeSelects/SelectTime'
import DivButton from '../../sharedComponents/DivButton'
import CloseButton from '../../sharedComponents/CloseButton'
import { GlobalAppStateManagement } from '../../../../Cms'
import { calendarFormFieldStateIF, eventListingFormStateIF, initStateIF } from 'suli-violin-website-types/src'

const { useContext } = React

const [ defaultWeekday, defaultMonth, defaultDay, defaultYear] = new Date().toDateString().split(' ')

const getNewEventDateData = (globalStartDate: { day: string, month: string, year: string }): eventListingFormStateIF => ({
  id: null,
  dateTime: {
    date: {
      year: globalStartDate.year,
      month: globalStartDate.month,
      day: globalStartDate.day
    },
    time: {
      hour: '07',
      minute: '00',
      amPm: 'PM'
    }
  },
  location: {
    country: '',
    stateOrProvince: '',
    city: '',
    venue: ''
  },
  link: '',
  eventGroupingId: null
})

const getSetStateCallback = (
  setState: React.Dispatch<React.SetStateAction<calendarFormFieldStateIF>>, 
  index: number, 
  dateOrTime: 'date' | 'time', 
  selectField?: 'month' | 'day' | 'year'
) => {
  return (newValue: any) => {
    setState((prevState) => {

      const copy: any = prevState.eventDates.slice()

      if (dateOrTime === 'time') {
        copy[index].dateTime[dateOrTime] = newValue
      } else {
        copy[index].dateTime[dateOrTime][selectField] = newValue
      }

      return {
        ...prevState,
        eventDates: copy
      }
    })
  }

}

interface eventDatesPropsIF {
  calendarFormValues: calendarFormFieldStateIF
  setCalendarFormValues: React.Dispatch<React.SetStateAction<calendarFormFieldStateIF>>
}

const EventDates = ({ calendarFormValues, setCalendarFormValues }: eventDatesPropsIF) => {
  
  const { appStateManagement }= useContext(GlobalAppStateManagement)
  const state = appStateManagement[0]

  return (
    <label style={{
      paddingTop: 10
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
        Event Dates:
        <DivButton 
          text={'+'} 
          isDisabled={!state.editFieldsEnabled}
          onClickHandler={(e: any) => { setCalendarFormValues((prevState) => { 
            e.preventDefault()
            const newEventDateArray = prevState.eventDates.slice()
            newEventDateArray.push(getNewEventDateData(calendarFormValues.dateRange.start))
            return {
              ...prevState,
              eventDates: newEventDateArray
            }
        })}}/>
      </div>
      <div 
        id="eventdates-form"
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        { 
          calendarFormValues.eventDates.map((eventDate, index) => 
            <EventDate 
              key={'eventDateData-' + index} 
              state={state}
              calendarFormValues={calendarFormValues} 
              setCalendarFormValues={setCalendarFormValues}
              index={index} 
            />)
        }
      </div>
    </label>
  )
}

interface eventDatePropsIF {
  state: initStateIF
  index: number
  calendarFormValues: calendarFormFieldStateIF
  setCalendarFormValues: React.Dispatch<React.SetStateAction<calendarFormFieldStateIF>>
}

const EventDate = ({ state, calendarFormValues, setCalendarFormValues ,index}: eventDatePropsIF) => {


  
  return (
    <div style={{
      padding: '10px',
      backgroundColor: index % 2 === 0 ? 'lightgray' : 'white',
      border: 'gray solid 1px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <CloseButton 
          onClickHandler={(e: any) => { setCalendarFormValues((prevState) => {
            const copy = prevState.eventDates.slice()
            copy.splice(index, 1)
            return {
              ...prevState,
              eventDates: copy
            }
          })}}
        />
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div>
          Date:
          <SelectMonth 
            state={state} 
            dateStateProps={calendarFormValues.eventDates[index].dateTime.date as any} 
            setDateState={getSetStateCallback(setCalendarFormValues, index, 'date', 'month')}
          />
          <SelectDay 
            state={state} 
            dateStateProps={calendarFormValues.eventDates[index].dateTime.date as any} 
            setDateState={getSetStateCallback(setCalendarFormValues, index, 'date', 'day')} 
          />
          <SelectYear 
            state={state} 
            dateStateProps={calendarFormValues.eventDates[index].dateTime.date} 
            setDateState={getSetStateCallback(setCalendarFormValues, index, 'date', 'year')}
            />
        </div>
        <div style={{
            paddingTop: 10,
          }}>
          Time:
          <SelectTime 
            timeStateProps={calendarFormValues.eventDates[index].dateTime.time as any} 
            setTimeState={getSetStateCallback(setCalendarFormValues, index, 'time')}/>
        </div>
      </div>
      <div style={{
        paddingTop: 10,
      }}>
        Location:
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <label style={{
            paddingTop: 10,
            paddingLeft: 20
          }}>
            Country:
            <input
              value={calendarFormValues.eventDates[index].location.country || ''}
              onChange={(e) => { setCalendarFormValues((prevState) => {
                const copy = prevState.eventDates.slice()
                copy[index].location.country = e.target.value
                return {
                  ...prevState,
                  eventDates: copy
                }
              })}}
            />
          </label>
          <label style={{
            paddingTop: 10,
            paddingLeft: 20
          }}>
            State or Province:
            <input
              value={calendarFormValues.eventDates[index].location.stateOrProvince || ''}
              onChange={(e) => { setCalendarFormValues((prevState) => {
                const copy = prevState.eventDates.slice()
                copy[index].location.stateOrProvince = e.target.value
                return {
                  ...prevState,
                  eventDates: copy
                }
              })}}
            />
          </label>
          <label style={{
            paddingTop: 10,
            paddingLeft: 20
          }}>
            City:
            <input
              value={calendarFormValues.eventDates[index].location.city || ''}
              onChange={(e) => { setCalendarFormValues((prevState) => {
                const copy = prevState.eventDates.slice()
                copy[index].location.city = e.target.value
                return {
                  ...prevState,
                  eventDates: copy
                }
              })}}
            />
          </label>
          <label style={{
            paddingTop: 10,
            paddingLeft: 20
          }}>
            Venue:
            <input
              value={calendarFormValues.eventDates[index].location.venue || ''}
              onChange={(e) => { setCalendarFormValues((prevState) => {
                const copy = prevState.eventDates.slice()
                copy[index].location.venue = e.target.value
                return {
                  ...prevState,
                  eventDates: copy
                }
              })}}
            />
          </label>
        </div>  
      </div>
      <div style={{
        paddingTop: 10,
        paddingBottom: 10,
      }}>
        <label>
          Link: 
          <input
            value={calendarFormValues.eventDates[index].link || ''}
            onChange={(e) => { setCalendarFormValues((prevState) => {
              const copy = prevState.eventDates.slice()
              copy[index].link = e.target.value
              return {
                ...prevState,
                eventDates: copy
              }
            })}}
          />
        </label>
      </div>
    </div>
  )
}

export default EventDates