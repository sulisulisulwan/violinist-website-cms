import * as React from 'react'
import DivButton from '../../../sharedComponents/DivButton'
import CloseButton from '../../../sharedComponents/CloseButton'
import { GlobalAppStateManagement } from '../../../../Cms'
import { calendarFormFieldStateIF } from 'suli-violin-website-types/src'

const getNewArtistData = () => ({
  name: '',
  medium: ''
})

interface artistsPropsIF {
  calendarFormValues: calendarFormFieldStateIF
  setCalendarFormValues: React.Dispatch<React.SetStateAction<calendarFormFieldStateIF>>
}

const Artists = ({ calendarFormValues, setCalendarFormValues }: artistsPropsIF) => {

  const state = React.useContext(GlobalAppStateManagement)[0]

  return (
    <label  style={{
      paddingTop: 10
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
        Artists:
        <DivButton 
          isDisabled={!state.editFieldsEnabled}
          text={'+'} 
          onClickHandler={ (e: any) => setCalendarFormValues((prevState) => { 
            e.preventDefault()
            const newArtistsArray = prevState.artists.slice()
            newArtistsArray.push(getNewArtistData())
            return {
              ...prevState,
              artists: newArtistsArray
            }
          })}
        />
      </div>
      <div 
        id="artists-form"
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        { 
          calendarFormValues.artists.map((artist, index) => {
            return <Artist 
              key={'artist-' + index}
              calendarFormValues={calendarFormValues} 
              setCalendarFormValues={setCalendarFormValues}
              index={index} 
            />
          })
        }
      </div>
    </label>

  )
}

interface artistPropsIf {
  calendarFormValues: calendarFormFieldStateIF
  index: number
  setCalendarFormValues: React.Dispatch<React.SetStateAction<calendarFormFieldStateIF>>
}

const Artist = ({ calendarFormValues, index, setCalendarFormValues }: artistPropsIf) => {

  return (
    <div 
      key={'artist-' + index}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: index % 2 === 0 ? 'lightgray' : 'white',
        border: 'gray solid 1px'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <CloseButton 
          onClickHandler={(e: any) => { setCalendarFormValues((prevState) => {
            const copy = prevState.artists.slice()
            copy.splice(index, 1)
            return {
              ...prevState,
              artists: copy
            }
          })}}
        />
      </div>
      <label style={{
        paddingLeft: 20
      }}>
        Name:
        <input
          value={calendarFormValues.artists[index].name || ''}
          onChange={(e) => { setCalendarFormValues((prevState) => {
            const copy = prevState.artists.slice()
            copy[index].name = e.target.value
            return {
              ...prevState,
              artists: copy
            }
          })}}
        />
      </label>
      <label style={{
        paddingTop: 10,
        paddingLeft: 20,
        paddingBottom: 10,
      }}>
        Medium:
        <input
          value={calendarFormValues.artists[index].medium || ''}
          onChange={(e) => { setCalendarFormValues((prevState) => {
            const copy = prevState.artists.slice()
            copy[index].medium = e.target.value
            return {
              ...prevState,
              artists: copy
            }
          })}}
        />
      </label>
    </div>
  )
}

export default Artists