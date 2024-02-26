import * as React from 'react'
import ListButton from '../../sharedComponents/ListButton'
import { GlobalAppStateManagement } from '../../../Cms'
import { CMSEventGroupDateRange, CalendarInboundTransformedData, InboundEventGroup, initStateIF, setStateSSA } from 'suli-violin-website-types/src'
const { useContext } = React

const CalendarListItems = () => {
  
  const [ state, setState ] = useContext(GlobalAppStateManagement)
  const data: CalendarInboundTransformedData = state.fetchedData.calendar
  const calendarData =  data.results
  
  if (!calendarData) return null

  return (
    <>
      <div>
        <h3>UPCOMING EVENTS</h3>
        {
          calendarData.upcoming.map((eventGroupData, index: number) => {
            const { startIcon, endIcon } = parseDateToIcon(eventGroupData.dateRange)
            return <CalListItem 
              key={'' + eventGroupData.id + index}
              eventGroupData={eventGroupData}
              startIcon={startIcon} 
              endIcon={endIcon}
              index={index}
              state={state}
              setState={setState} 
            />
          })
        }
      </div>
      <div>
        <h3>PREVIOUS EVENTS</h3>
        {
          calendarData.past.map((eventGroupData: InboundEventGroup, index: number) => {
            const { startIcon, endIcon } = parseDateToIcon(eventGroupData.dateRange)
            return <CalListItem 
              key={'' + eventGroupData.id + index}
              eventGroupData={eventGroupData}
              startIcon={startIcon} 
              endIcon={endIcon}
              index={index}
              state={state}
              setState={setState} 
            />
          })
        }
      </div>
    </>
  )
}

interface callListItemPropsIF {
  eventGroupData: InboundEventGroup
  startIcon: any
  endIcon: any
  state: initStateIF
  setState: setStateSSA
  index: number
}

const CalListItem = ({ eventGroupData, startIcon, endIcon, state, setState, index }: callListItemPropsIF) => {

  return (
    <li 
      style={{
        fontFamily: 'Arial',
        padding: '5px',
        backgroundColor: index % 2 === 0 ? 'lightGray' : 'white',
        border: 'gray solid 1px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <div 
        style={{
          display: 'flex'
        }}
      >
        { startIcon }{ endIcon }
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div>{ eventGroupData.type }</div>
        <div>{ eventGroupData.presenter }</div>
      </div>  
      <ul style={{
        listStyleType: 'none'
      }}>
        <ListButton 
          text={'DISPLAY'} 
          isDisabled={false}
          onClickHandler={() => { setState((prevState) => ({ ...prevState, displayDocId: eventGroupData.id }))}}
        />
        <ListButton 
          isDisabled={state.editDocId !== null && state.editDocId === eventGroupData.id }
          text={'EDIT'} 
          onClickHandler={() => { setState((prevState) => ({ 
            ...prevState,
            editDocId: eventGroupData.id,
            displayDocId: eventGroupData.id,
            currWorkflow: 'edit',
          })) }}
        />
        <ListButton 
          text={'DELETE'} 
          isDisabled={false}
          onClickHandler={() => { setState((prevState) => ({
            ...prevState,
            deleteDocId: eventGroupData.id,
            currWorkflow: 'delete'
          })) }}
        />
      </ul>
    </li> 
  )
}


const parseDateToIcon = (dateRange: CMSEventGroupDateRange) => {
  const startDateTime = dateRange.start
  const endDateTime = dateRange.end
  
  let startIcon = null
  let endIcon = null

  if (startDateTime) {
    const { year, month, day } = startDateTime
    startIcon = (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'white',
        border: 'gray solid 1px',
        padding: '10px',
        marginRight: '10px'
      }}>
        <div style={{
          fontSize: '30px'
        }}>{day}</div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: '10px',
          fontWeight: '900'
        }}>
          <span>{month}</span>
          <span>{year}</span>
        </div>
      </div>
    )
  }

  if (endDateTime) {
    const { year, month, day } = endDateTime
    endIcon = (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'white',
        border: 'gray solid 1px',
        padding: '10px'
      }}>
        <div style={{
          fontSize: '30px'
        }}>{day}</div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: '10px',
          fontWeight: '900'
        }}>
          <span>{month}</span>
          <span>{year}</span>
        </div>
      </div>
    )
  }

  return {
    startIcon,
    endIcon
  }

}


export default CalendarListItems