import * as React from 'react'
import EditorWrapper from '../sharedComponents/editor/EditWrapper'
import SavedDocDisplayWrapper from '../sharedComponents/docDisplay/SavedDocDisplayWrapper'
import DocList from '../sharedComponents/docDisplay/DocList'

import BioDocDisplay from './biography/BioDocDisplay'
import CalendarDocDisplay from './calendar/CalendarDocDisplay'
import BioDocListItems from './biography/BioListItems'
import CalendarListItems from './calendar/CalendarListItems'
import BlogDocDisplay from './blog/BlogDocDisplay'
import AudioDocDisplay from './audio/AudioDocDisplay'
import PhotosDocDisplay from './photos/PhotosDocDisplay'
import PhotosListItems from './photos/PhotosListItems'
import BlogListItems from './blog/BlogListItems'
import AudioListItems from './audio/AudioListItems'
import VideosListItems from './videos/VideosListItems'
import VideoDocDisplay from './videos/VideosDocDisplay'
import PlaylistsDocDisplay from './playlists/PlaylistsDocDisplay'
import PlaylistsListItems from './playlists/PlaylistsListItems'
import { useGetChosenDocData } from '../sharedComponents/docDisplay/hooks/useGetChosenDocData'
import { initStateIF, setStateSSA } from 'suli-violin-website-types/src'

interface tabContentPropsIF {
  state: initStateIF
  setState: setStateSSA
}

const TabContent = ({ state, setState }: tabContentPropsIF) => {

  if (state.fetchedData === null) return null

  const { 
    currentTab, 
    displayDocId, 
    fetchedData
  } = state

  let chosenDocData = useGetChosenDocData(
    fetchedData, 
    currentTab, 
    displayDocId
  )

  const savedDocChildren = displayDocId ? 
      docDisplayMap[currentTab]({ chosenDocData }) // display a specific doc
    : <DocList listItemsComponent={ listItemsMap[currentTab] }/> // display a list


  return (
    <div 
      className="dashboard-content-wrapper"
      style={{
        background: 'beige',
        border: '1px solid gray',
        display: 'grid',
        gridTemplateColumns: '50% 50%'
      }}
    >
      <EditorWrapper/>
      <SavedDocDisplayWrapper chosenDocData={chosenDocData}>
        { savedDocChildren }
      </SavedDocDisplayWrapper>
    </div>
  )
}

const docDisplayMap: Record<string, React.FunctionComponent> = {
  audio: AudioDocDisplay,
  bio: BioDocDisplay,
  blog: BlogDocDisplay,
  calendar: CalendarDocDisplay,
  photos: PhotosDocDisplay,
  playlists: PlaylistsDocDisplay,
  videos: VideoDocDisplay,
}

const listItemsMap: Record<string, React.FunctionComponent> = {
  audio: AudioListItems,
  bio: BioDocListItems,
  blog: BlogListItems,
  calendar: CalendarListItems,
  photos: PhotosListItems,
  playlists: PlaylistsListItems,
  videos: VideosListItems,
}

export default TabContent