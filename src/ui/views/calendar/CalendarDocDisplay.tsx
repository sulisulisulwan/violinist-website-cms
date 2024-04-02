
import * as React from 'react'

import { parseTimeAsNonMilitaryAMPM } from '../../../utils/dateFunctions'
import { EventGroupArtistAPI, EventGroupProgramAPI, InboundEventGroup, InboundEventListing, parsedDateAndTime } from 'suli-violin-website-types/src'

const fieldLabelStyle = {
  fontWeight: '900'
}

const listStyle={
  paddingTop: '5px',
  paddingBottom: '5px',
}

const topLevelFieldStyle = {
  paddingTop: '5px',
  paddingBottom: '5px',
  background: 'green'
}

interface calendarDocDisplayPropsIF {
  chosenDocData: InboundEventGroup
}

const CalendarDocDisplay = ({ chosenDocData }: calendarDocDisplayPropsIF) => {
  const startDate = chosenDocData.dateRange.start
  const endDate = chosenDocData.dateRange.end

  return (
    <div 
      className="calendar-document-display"
      style={{
        paddingLeft: '10px',
        height: 'calc(100% - 30px)',
        overflow: 'scroll'
      }}
    >
      <div style={listStyle}>
        <div><span style={fieldLabelStyle}>Global Date Range:</span>
        </div>
        <ul style={{
          listStyleType: 'none'
        }}>
          <li style={listStyle}><span style={fieldLabelStyle}>Start date: </span>{ getDateHTML(startDate) }</li>
          <li style={listStyle}><span style={fieldLabelStyle}>End date: </span>{ getDateHTML(endDate) }</li>
        </ul>
      </div>
      <div style={listStyle}><span style={fieldLabelStyle}>Type: </span><DisplayInput text={chosenDocData.type}/></div>
      <div style={listStyle}><span style={fieldLabelStyle}>Venue: </span><DisplayInput text={chosenDocData.venue}/></div>
      <div style={listStyle}><span style={fieldLabelStyle}>Presenter: </span><DisplayInput text={chosenDocData.presenter}/></div>
      <div style={listStyle}>
        <span style={fieldLabelStyle}>Artists:</span>
        { !chosenDocData.artists.length ? null : 
          <ul style={{
            listStyleType: 'none',
          }}>
            {
              chosenDocData.artists.map((artistData: EventGroupArtistAPI, index: number) => {
                return <Artist key={`artist-${index}`} artistData={artistData} idx={index}/>
              })
            }
          </ul>
        }
        <ul></ul>
      </div>
      <div>
        <span style={fieldLabelStyle}>Program</span>
        { !chosenDocData.program.length ? null : 
          <ul style={{
            listStyleType: 'none'
          }}>
            {
              chosenDocData.program.map((programData: EventGroupProgramAPI, index: number) => {
                return <Program key={`program-${index}`} programData={programData} idx={index}/>
              })
            }
          </ul>
        }
      </div>
      <div>
        <span style={fieldLabelStyle}>Event Dates</span>
        { !chosenDocData.eventDates.length ? null : 
          <ul style={{
            listStyleType: 'none'
          }}>
            {
              chosenDocData.eventDates.map((eventData, index) => {
                return <EventDate key={`eventDate-${index}`} eventData={eventData} idx={index}/>
              })
            }
          </ul>
        }
      </div>
    </div>
  )
}

interface eventDatePropsIF {
  eventData: InboundEventListing
  idx: number
}

const EventDate = ({ eventData, idx }: eventDatePropsIF) => {

  const { country, stateOrProvince, city, venue } = eventData.location
  const { link } = eventData

  return (
    <li style={{
      background: idx % 2 === 0 ? 'lightgray' : 'white',
      padding: 0
    }}>
      <div style={listStyle}>
        <span style={fieldLabelStyle}>Date: </span>{ getDateHTML(eventData.dateTime.date) }
      </div>
      <div style={listStyle}>
        <span style={fieldLabelStyle}>Time: </span>{ getTimeHtml(eventData.dateTime) }
      </div>
      <div style={listStyle}>
        <span style={fieldLabelStyle}>Location: </span>
        <ul style={{
          listStyleType: 'none'
        }}>
          <li style={listStyle}><span style={fieldLabelStyle}>Country: </span><DisplayInput text={country}/></li>
          <li style={listStyle}><span style={fieldLabelStyle}>State or Province: </span><DisplayInput text={stateOrProvince}/></li>
          <li style={listStyle}><span style={fieldLabelStyle}>City: </span><DisplayInput text={city}/></li>
          <li style={listStyle}><span style={fieldLabelStyle}>Venue: </span><DisplayInput text={venue}/></li>
        </ul>
      </div>
      <div style={listStyle}>
        <span style={fieldLabelStyle}>Link: </span>
        <DisplayInput text={link}/>
      </div>
    </li>
  )
}

interface programPropsIF {
  programData: EventGroupProgramAPI
  idx: number
}

const Program = ({ programData, idx }: programPropsIF) => {

  const { composer, arranger, work } = programData

  return (
    <li style={{
      background: idx % 2 === 0 ? 'lightgray' : 'white',
      padding: 0
    }}>
      <ul style={{
          listStyleType: 'none',
          padding: 0
        }}
      >
        <li style={listStyle}><span style={fieldLabelStyle}>Composer: </span><DisplayInput text={composer}/></li>
        <li style={listStyle}><span style={fieldLabelStyle}>Arranger: </span><DisplayInput text={arranger}/></li>
        <li style={listStyle}><span style={fieldLabelStyle}>Work: </span><DisplayInput text={work}/></li>
      </ul>
    </li>
  )
}

interface artistPropsIF {
  artistData: EventGroupArtistAPI
  idx: number
}

const Artist = ({ artistData, idx }: artistPropsIF) => {

  const { name, medium } = artistData


  return (
    <li style={{
      background: idx % 2 === 0 ? 'lightgray' : 'white',
      paddingTop: '7px',
      paddingBottom: '7px'
    }}>
      <ul style={{
        listStyleType: 'none',
        padding: 0,

      }}>
        <li style={listStyle}><span style={fieldLabelStyle}>Name: </span><DisplayInput text={name}/></li>
        <li style={listStyle}><span style={fieldLabelStyle}>Medium: </span><DisplayInput text={medium}/></li>
      </ul>
    </li>
  )
}

const getDateHTML = (parsedDateTime: any) => {

  if (parsedDateTime === null) return null
  const { year, month, day } = parsedDateTime

  return (
    <>
      <span><input value={month} disabled={true}/></span>
      <span><input value={day} disabled={true}/></span>
      <span><input value={year} disabled={true}/></span> 
    </>
  )

}

const getTimeHtml = (parsedDateTime: parsedDateAndTime) => {
  if (parsedDateTime === null) return null

  const parsedTime = parseTimeAsNonMilitaryAMPM(parsedDateTime)

  return (
    <>
      <span><input value={parsedTime.hour + ':' + parsedTime.minute + ' ' + parsedTime.amPm} disabled={true}/></span>
    </>
  )
}



const DisplayInput = ({ text }: {text: string}) => {

  const style = {
    width: '50%'
  }

  return (
    <input style={style} disabled={true} value={text}></input>
  )
}

export default CalendarDocDisplay