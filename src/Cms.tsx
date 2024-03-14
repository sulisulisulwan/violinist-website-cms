import * as React from 'react'
import { useState, useEffect, createContext } from 'react'
import TabContent from './ui/views/TabContent'
import Nav from './ui/sharedComponents/nav/Nav'
import { bioApiHandler } from './api/handlers/bio'
import { calendarApiHandler } from './api/handlers/calendar'
import { mediaApiHandler } from './api/handlers/media'
import { inboundTransformerMap } from './transformers/transformers'
import { blogApiHandler } from './api/handlers/blog'
import { initStateIF, setStateSSA, tabListItemIF } from 'suli-violin-website-types/src'
import { apiResourceHandlersMap } from './api'

const initialState: initStateIF = {
  currentTab: 'bio',
  deleteDocId: null,
  displayDocId: null,
  currWorkflow: '',
  editFieldsEnabled: false,
  editDocId: null,
  fetchedData: null,
  isDeletePhase: false,
  modal: {
    isOpen: false,
    type: ''
  },
}

const tabsList: tabListItemIF[] = [
  {
    metaName: 'bio',
    name: 'BIO'
  },
  {
    metaName: 'calendar',
    name: 'CALENDAR'
  },
  {
    metaName: 'blog',
    name: 'BLOG'
  },
  {
    metaName: 'videos',
    name: 'VIDEOS'
  },
  {
    metaName: 'photos',
    name: 'PHOTOS'
  },
  {
    metaName: 'audio',
    name: 'AUDIO'
  },
  {
    metaName: 'playlists',
    name: 'PLAYLISTS'
  },
]

export const GlobalAppStateManagement: React.Context<[initStateIF, setStateSSA]> = createContext(null)

const Cms = () => {

  const [ state, setState ] = useState(initialState)

  const handleClickTab = (val: string) => {
    setState((prevState) => ({
      ...prevState,
      currentTab: val,
      editDocId: null,
      displayDocId: null,
      editFieldsEnabled: false
    }))
  }

  useEffect(() => {
    const getData = async () => {
      const apiHandler = apiResourceHandlersMap[state.currentTab]
      const inboundTransformer = inboundTransformerMap[state.currentTab]
      const data = await apiHandler('GET')
      const transformed = inboundTransformer(data)
      setState((prevState) => ({
        ...prevState,
        fetchedData: transformed
      }))
      console.log(transformed)
    }


    getData()
  }, [state.currentTab])

  return (
    <GlobalAppStateManagement.Provider value={[state, setState]}>
      <div>
        <Nav
          handleClickTab={handleClickTab}
          tabsList={tabsList}
          currentTab={state.currentTab}
        />
        <TabContent
          state={state}
          setState={setState}
        />
      </div>
    </GlobalAppStateManagement.Provider>
  )
}

export default Cms