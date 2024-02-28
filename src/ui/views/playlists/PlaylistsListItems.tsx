import * as React from 'react'
import ListButton from '../../sharedComponents/ListButton'
import { GlobalAppStateManagement } from '../../../Cms'
import { PlaylistItemAPI } from 'suli-violin-website-types/src'
const { useContext } = React

const PlaylistsListItems = () => {
  
  const [ globalAppState, setGlobalAppState ] = useContext(GlobalAppStateManagement)
  
  const playlistsData = globalAppState.fetchedData?.media?.playlists
  if (!playlistsData) return null

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
        playlistsData.map((playlistData: PlaylistItemAPI, index: number) => 
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
            <div 
              onMouseEnter={ (e: any) => { e.target.style.fontWeight = '900'}}
              onMouseLeave={ (e: any) => { e.target.style.fontWeight = '100'}}
            >
              {playlistData.name}
            </div>
            <div>
              <ul style={{
                  display:'flex',
                  listStyleType: 'none',
                  padding: 0
                }}>
                  <ListButton 
                    isDisabled={false} 
                    text='DISPLAY' 
                    onClickHandler={(e) => { setGlobalAppState((prevState) => ({ ...prevState, displayDocId: playlistData.id }))} }
                  />
                  <ListButton 
                    isDisabled={globalAppState.editDocId !== null && globalAppState.editDocId === playlistData.id }
                    text={'EDIT'} 
                    onClickHandler={() => { setGlobalAppState((prevState) => ({ 
                      ...prevState,
                      editDocId: playlistData.id,
                      displayDocId: playlistData.id,
                      currWorkflow: 'edit',
                    })) }}
                  />
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