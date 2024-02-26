import * as React from 'react'
const { useContext } = React
import CloseButton from '../../../sharedComponents/CloseButton'
import DivButton from '../../../sharedComponents/DivButton'
import { GlobalAppStateManagement } from '../../../../Cms'
import { calendarFormFieldStateIF } from 'suli-violin-website-types/src'

const getNewProgramData = () => ({
  composer: '',
  arranger: '',
  work: ''
})

interface programPropsIF {
  calendarFormValues: calendarFormFieldStateIF
  setCalendarFormValues: React.Dispatch<React.SetStateAction<calendarFormFieldStateIF>>
}

const Program = ({ calendarFormValues, setCalendarFormValues }: programPropsIF) => {

  const state = useContext(GlobalAppStateManagement)[0]

  return (
    <label style={{
      paddingTop: 10
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
        Program: 
        <DivButton 
          isDisabled={!state.editFieldsEnabled}
          text={"+"}
          onClickHandler={(e: any) => { 
            setCalendarFormValues((prevState) => { 
              e.preventDefault()
              const newProgramArray = prevState.program.slice()
              newProgramArray.push(getNewProgramData())
              return {
                ...prevState,
                program: newProgramArray
              }
            })
          }}
        />
      </div>
      <div 
        id="program-form"
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {
          calendarFormValues.program.map((program, index) => {
            return <Work
              key={'programWorkData-' + index}
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

interface workPropsIf {
  calendarFormValues: calendarFormFieldStateIF
  index: number
  setCalendarFormValues: React.Dispatch<React.SetStateAction<calendarFormFieldStateIF>>
}

const Work = ({ calendarFormValues, index, setCalendarFormValues }: workPropsIf) => {

  return (
    <div 
      key={'program-' + index}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: index % 2 === 0 ? 'lightgray' : 'white',
        border: 'gray solid 1px'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <CloseButton 
          onClickHandler={(e: any) => { setCalendarFormValues((prevState) => {
            const copy = prevState.program.slice()
            copy.splice(index, 1)
            return {
              ...prevState,
              program: copy
            }
          })}}
        />
      </div>
      <label style={{
        paddingLeft: 20
      }}>
        Composer:
        <input
          value={calendarFormValues.program[index].composer}
          onChange={(e) => { setCalendarFormValues((prevState) => {
            const copy = prevState.program.slice()
            copy[index].composer = e.target.value

            return {
              ...prevState,
              program: copy
            }
          })}}
        />
      </label>
      <label style={{
        paddingTop: 10,
        paddingLeft: 20
      }}>
        Arranger:
        <input
          value={calendarFormValues.program[index].arranger}
          onChange={(e) => { setCalendarFormValues((prevState) => {
            const copy = prevState.program.slice()
            copy[index].arranger = e.target.value
            return {
              ...prevState,
              program: copy
            }
          })}}
        />
      </label>
      <label style={{
        paddingTop: 10,
        paddingLeft: 20,
        paddingBottom: 10,
      }}>
        Work:
        <input
          value={calendarFormValues.program[index].work}
          onChange={(e) => { setCalendarFormValues((prevState) => {
            const copy = prevState.program.slice()
            copy[index].work = e.target.value
            return {
              ...prevState,
              program: copy
            }
          })}}
        />
      </label>
    </div>
  )
}
export default Program