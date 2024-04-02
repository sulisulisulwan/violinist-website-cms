import * as React from 'react'
import ListButton from '../sharedComponents/ListButton'
import { GlobalAppStateManagement } from '../../../Cms'
import { PlaylistItemAPI } from 'suli-violin-website-types/src'
import HoveringDiv from '../blog/HoveringDiv'
const { useContext } = React

const PlaylistsListItems = () => {
  
  const { appStateManagement } = useContext(GlobalAppStateManagement)
  const [ globalAppState, setGlobalAppState ] = appStateManagement
  
  const playlistsData = globalAppState.fetchedData
  if (!playlistsData || playlistsData.dataType !== 'playlists') return null

  const deleteClickHandler = async(id: number) => {
    setGlobalAppState((prevState) => ({ 
      ...prevState, 
      currWorkflow: 'delete',
      deleteDocId: id 
    }))
  }

  return (
    <>
      {
        playlistsData.results.playlists.map((playlistData: PlaylistItemAPI, index: number) => 
          <li 
            key={'' + playlistData.id + index}
            style={{
              padding: '5px',
              backgroundColor: index % 2 === 0 ? 
                'lightGray' : 'white',
              border: 'gray solid 1px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <HoveringDiv stylesOverride={{ width: '100%' }}>
              <div 
                style={{
                  width: '100%'
                }}
                onClick={(e) => { setGlobalAppState((prevState) => ({ ...prevState, displayDocId: playlistData.id }))} }
              >
                {playlistData.name}
              </div>
            </HoveringDiv>
            <div>
              <ul 
                style={{
                  display:'flex',
                  listStyleType: 'none',
                  padding: 0
                }}>
                  <ListButton 
                    isDisabled={false} 
                    text='DELETE' 
                    onClickHandler={ (e) => { deleteClickHandler(playlistData.id) } }
                  />
              </ul>
            </div>  
          </li> 
        )
      }
    </>
  )
}

export default PlaylistsListItems