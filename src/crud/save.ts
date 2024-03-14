import { apiResourceHandlersMap } from "../api"
import { validatorMap } from "../formValidators"
import { outboundTransformerMap } from "../transformers/transformers"
import { inboundTransformerMap } from "../transformers/transformers"
import { initStateIF, initialFormStates, setStateSSA } from 'suli-violin-website-types/src'

export const saveDocument = async (state: initStateIF, setState: setStateSSA, formFieldValues: initialFormStates) => {

  const validate = validatorMap[state.currentTab]
  const validationData = validate(formFieldValues)

  if (!validationData.isValid) {
    setState((prevState) => ({
      ...prevState,
      modal: {
        isOpen: false,
        type: ''
      }
    }))
    alert('VALIDATION ERROR: ' + validationData.errorMessage)
    return
  }

  //TRANSFORM
  const outboundTransformer = outboundTransformerMap[state.currentTab]
  const transformedFieldValues = outboundTransformer(formFieldValues, state.editDocId)
  const apiResourceHandler = apiResourceHandlersMap[state.currentTab]

  //SEND TO SAVED DATA TO API
  try {
    const dbAction = state.editDocId === null ? 'POST' : 'PATCH'
    const insertResult = await apiResourceHandler(dbAction, null, transformedFieldValues)
    const insertId = insertResult.data.insertId
    renderSavedMessage()

    //GET UPDATED DATA FROM API
    const newDbData = await apiResourceHandler('GET')
    const inboundTransformer = inboundTransformerMap[state.currentTab]
    const transformedInboundData = inboundTransformer(newDbData)

    const workflows = state.currWorkflow.split('/')
    const transferDocFromDisplay = workflows.includes('edit') ? state.displayDocId : state.editDocId

    const editDocId = workflows.includes('newDoc') ? null 
    : transferDocFromDisplay ? transferDocFromDisplay
    : insertId

    //CLEAN UP AND UPDATE
    setState((prevState) => ({ 
      ...prevState, 
      modal: {
        isOpen: false,
        type: ''
      },
      currWorkflow: transferDocFromDisplay ? 'loadText' : state.currWorkflow,
      editDocId,
      displayDocId: null,
      fetchedData: transformedInboundData
    }))

  } catch(e) {
    console.log(e)
    alert('Something went wrong!')
  }
  
  
}

export const dontSaveDocument = (state: initStateIF, setState: setStateSSA) => {

  const workflows = state.currWorkflow.split('/')
  const isNewDoc = workflows.includes('newDoc')
  const isLoadTextPhase = workflows.includes('edit') || isNewDoc
  const transferDocFromDisplay = workflows.includes('edit') ? state.displayDocId : state.editDocId

  setState((prevState) => ({ 
    ...prevState, 
    currWorkflow: isLoadTextPhase ? 'loadText' : state.currWorkflow,
    modal: {
      isOpen: false,
      type: ''
    },
    editDocId: isNewDoc ? null : transferDocFromDisplay
  }))
}

export const cancelSave = (setState: setStateSSA) => {
  setState((prevState) => ({
    ...prevState,
    currWorkflow: '',
    modal: {
      isOpen: false,
      type: ''
    }
  }))
}

const renderSavedMessage = () => {
  const saveMessageElement = document.getElementById('edit-nav-saved-message')
  saveMessageElement.style.display = 'flex'
  setTimeout(() => {
    saveMessageElement.style.display = 'none'
  }, 3000)

}