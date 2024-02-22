import { useEffect } from "react"
import { initStateIF, setStateSSA } from 'suli-violin-website-types/src'

export const useWorkflowManager = (globalAppState: initStateIF, setGlobalAppState: setStateSSA) => {
  useEffect(() => { workflowActions(globalAppState, setGlobalAppState) }, [globalAppState.currWorkflow])
}

const workflowActions = (state: initStateIF, setState: setStateSSA) => {


  const workflows = state.currWorkflow.split('/')

  if (workflows.includes('newDoc')) {
    newDocWorkflow(state, setState, workflows)
    return
  }

  if (workflows.includes('edit')) {
    editWorkflow(state, setState, workflows)
    return
  }
  
  if (workflows.includes('delete')) {
    deleteWorkflow(state, setState, workflows)
    return
  }

}

const newDocWorkflow = (state: initStateIF, setState: setStateSSA, workflows: string[]) => {
  if (state.editDocId) {
    if (workflows.includes('save')) return
    saveWorkflow(state, setState, workflows)
    return
  }

}

const editWorkflow = (state: initStateIF, setState: setStateSSA, workflows: string[]) => {
  if (!workflows.includes('save')) { 
    saveWorkflow(state, setState, workflows)
    return
  } 
}

const saveWorkflow = (state: initStateIF, setState: setStateSSA, workflows: string[]) => {

  //Prompt user to save with modal
  if (state.editFieldsEnabled) {
    workflows.push('save')
    setState((prevState) => ({
      ...prevState,
      modal: {
        isOpen: true,
        type: 'save'
      },
      currWorkflow: workflows.join('/'),
    }))
    return
  }

  // No save prompting needed
  setState((prevState) => ({
    ...prevState,
    currWorkflow: 'loadText',
    editFieldsEnabled: true,
    editDocId: state.displayDocId,
  }))
}

const deleteWorkflow = (state: initStateIF, setState: setStateSSA, workflows: string[]) => {

  if (!state.modal.isOpen) {
    setState((prevState) => ({
      ...prevState,
      modal: {
        isOpen: true,
        type: 'delete'
      }
    }))
    return
  }
  
}