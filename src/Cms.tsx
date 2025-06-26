import * as React from 'react'
import { useState, useEffect, createContext } from 'react'
import TabContent from './ui/views/TabContent'
import Nav from './ui/views/nav/Nav'
import { inboundTransformerMap } from './transformers/transformers'
import { initStateIF, setStateSSA, tabListItemIF } from 'suli-violin-website-types/src'
import { apiResourceHandlersMap } from './api'
import { useWindowWidth } from './ui/hooks'
import { useConfig } from './hooks'
import { Config } from './config/config'

const tabsList: tabListItemIF[] = [
  {
    metaName: 'audio',
    name: 'AUDIO'
  },
  {
    metaName: 'bio',
    name: 'BIO'
  },
  {
    metaName: 'blog',
    name: 'BLOG'
  },
  {
    metaName: 'calendar',
    name: 'CALENDAR'
  },
  {
    metaName: 'photos',
    name: 'PHOTOS'
  },
  {
    metaName: 'programs',
    name: 'PROGRAMS'
  },
  {
    metaName: 'playlists',
    name: 'PLAYLISTS'
  },
  {
    metaName: 'videos',
    name: 'VIDEOS'
  },
]

interface globalAppContextIF {
  config: Config
  windowWidth: number
  appStateManagement: [initStateIF, setStateSSA]
}


export const GlobalAppStateManagement: React.Context<globalAppContextIF> = createContext(null)

const Cms = ({ config }: any) => {

  const windowWidth = useWindowWidth()

  const [ state, setState ] = useState<initStateIF>({
    currentTab: 'programs',
    deleteDocId: null,
    displayDocId: 1,
    currWorkflow: '',
    editFieldsEnabled: false,
    editDocId: null,
    fetchedData: null,
    isDeletePhase: false,
    modal: {
      isOpen: false,
      type: ''
    },
  })

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
      
      if (!config) {
        return
      }

      
      const apiHandler = apiResourceHandlersMap[state.currentTab]
      const inboundTransformer = inboundTransformerMap[state.currentTab]
      const data = await apiHandler('GET')
      const transformed = inboundTransformer(data)
      setState((prevState) => ({
        ...prevState,
        fetchedData: transformed
      }))
    }
    
    getData()
  }, [state.currentTab, config])
  
  return (
    <GlobalAppStateManagement.Provider value={{
      config: config,
      windowWidth: windowWidth,
      appStateManagement: [state, setState]
    }}>
      <div 
        className="cms-wrapper"
        style={{
          height: '100%',
          maxHeight: '100%',
          width: '100vw',
          maxWidth: '100vw',
        }}
      >
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