import * as React from 'react'
import ListButton from '../sharedComponents/ListButton'
import { GlobalAppStateManagement } from '../../../Cms'
import { CMSEventGroupDateRange, InboundEventGroup, initStateIF, setStateSSA } from 'suli-violin-website-types/src'
import HoveringDiv from '../blog/HoveringDiv'
const { useContext } = React

const CalendarListItems = () => {
  
  const { appStateManagement } = useContext(GlobalAppStateManagement)
  const [ state, setState ] = appStateManagement
  
  const { fetchedData } = state 
  if (!fetchedData || fetchedData.dataType !== 'calendar') {
    return null
  }

  const calendarData =  fetchedData.results

  return (
    <>
      <div>
        <h3>UPCOMING EVENTS</h3>
        {
          calendarData.upcoming.map((eventGroupData: any, index: number) => {
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

const CalListItem = ({ eventGroupData, startIcon, endIcon, setState, index }: callListItemPropsIF) => {

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
      <HoveringDiv stylesOverride={{ width: '100%' }}>
        <div 
          style={{ 
            display: 'flex', 
            width: '100%'
          }} 
          onClick={() => { setState((prevState) => ({ ...prevState, displayDocId: eventGroupData.id }))}}
        >

          <div 
            style={{
              display: 'flex',
              paddingRight: 20
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
        </div>
      </HoveringDiv>
      <ul 
        style={{
          listStyleType: 'none',
          padding: 0
        }}
      >
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