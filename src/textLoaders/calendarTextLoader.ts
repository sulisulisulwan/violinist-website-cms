import { useEffect } from "react"
import { getInitFormFieldsState } from "../initFormFieldsStates"
import { EventGroupAPI, calendarFormFieldStateIF, initStateIF, setStateSSA } from 'suli-violin-website-types/src'

const calendarTextLoader = (state: initStateIF, setState: setStateSSA, setFormFieldValues: React.Dispatch<React.SetStateAction<calendarFormFieldStateIF>>) => {
  useEffect(() => {
    if (state.currWorkflow === 'loadText') {
      const targetDoc = state.editDocId === null ? 
        getInitFormFieldsState('calendar') 
        : (
            state.fetchedData.results.upcoming.find((doc: EventGroupAPI) => state.editDocId === doc.id) 
            || (state.fetchedData.results.past.find((doc: EventGroupAPI) => state.editDocId === doc.id) )
          )
      setFormFieldValues(targetDoc)
      setState((prevState) => ({ ...prevState, currWorkflow: '' }))
    }
    
  }, [state.currWorkflow])
}

export default calendarTextLoader