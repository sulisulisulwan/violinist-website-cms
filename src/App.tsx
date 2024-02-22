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

const initialState: initStateIF = {
  currentTab: 'photos',
  deleteDocId: null,
  displayDocId: null,
  currWorkflow: '',
  editFieldsEnabled: false,
  editDocId: null,
  fetchedData: {
    bio: null,
    calendar: null,
    media: null,
    blog: null,
  },
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

const App = () => {

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
    async function getData() {
      const aboutData = await bioApiHandler('GET')
      const calendarData = await calendarApiHandler('GET')
      const mediaData = await mediaApiHandler('GET')
      const blogData = await blogApiHandler('GET')

      const bioTransformer = inboundTransformerMap['bio']
      const calendarTransformer = inboundTransformerMap['calendar']
      const mediaTransformer = inboundTransformerMap['media']
      const blogTransformer = inboundTransformerMap['blog']
  
      const newData = {
        bio: bioTransformer(aboutData),
        calendar: calendarTransformer(calendarData),
        media: mediaTransformer(mediaData),
        blog: blogTransformer(blogData),
      }

      setState((prevState) => ({ ...prevState, fetchedData: newData }))
    }

    getData()

  }, [])

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

export default App