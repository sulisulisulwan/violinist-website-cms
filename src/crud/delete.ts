import { fetchedDataForCMS, initStateIF, setStateSSA } from 'suli-violin-website-types/src'
import { apiResourceHandlersMap } from "../api"
import { inboundTransformerMap } from '../transformers/transformers'

export const deleteDocument = async (state: initStateIF, setState: setStateSSA) => {
  const apiHandler = apiResourceHandlersMap[state.currentTab]
  try {
    await apiHandler('DELETE', `?id=${state.deleteDocId}`)
    const newDbData = await apiHandler('GET')
    const inboundTransformer = inboundTransformerMap[state.currentTab]
    const transformedInboundData = inboundTransformer(newDbData)

    const editDocId = state.deleteDocId === state.editDocId ? null : state.editDocId
        
    setState((prevState) => {
      const newFetchedDataState = {
        ...prevState.fetchedData,
        media: {
          ...prevState.fetchedData.media
        }
      }
  
      if (['bio', 'calendar', 'blog'].includes(state.currentTab)) {
        newFetchedDataState[state.currentTab as keyof fetchedDataForCMS] = transformedInboundData
      } else if (['audio', 'videos', 'photos'].includes(state.currentTab)) {
        newFetchedDataState.media[state.currentTab] = transformedInboundData[state.currentTab]
      } else if (state.currentTab === 'playlists') {
        newFetchedDataState.media[state.currentTab] = transformedInboundData
      }


      return {
        ...prevState,
        modal: {
          isOpen: false,
          type: ''
        },
        currWorkflow: 'loadText',
        editDocId,
        displayDocId: null,
        fetchedData: {
          ...prevState.fetchedData,
          [['audio', 'videos', 'photos'].includes(state.currentTab) ? 'media' : state.currentTab]: transformedInboundData
        },
        editFieldsEnabled: editDocId ? true : false,
      }
    })
    
  } catch(e) {
    console.error(e)
  }
  
}

export const dontDeleteDocument = (state: initStateIF, setState: setStateSSA) => {

  setState((prevState) => ({
    ...prevState,
    currWorkflow: 'loadText',
    modal: {
      isOpen: false,
      type: ''
    }
  }))

}