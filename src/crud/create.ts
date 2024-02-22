import { initStateIF, setStateSSA } from 'suli-violin-website-types/src'

export const createNewDocument = (state: initStateIF, setState: setStateSSA) => {
  if (!state.editFieldsEnabled) {
    setState((prevState) => ({ 
      ...prevState, 
      editFieldsEnabled: true,
    }))
    return
  }
  
  setState((prevState) => ({
    ...prevState,
    currWorkflow: 'newDoc',
    modal: {
      isOpen: true,
      type: 'save'
    }
  }))

}