import * as React from 'react'
import ListButton from '../../sharedComponents/ListButton'
import { GlobalAppStateManagement } from '../../../Cms'
import { PhotoDataAPI } from 'suli-violin-website-types/src'
import config from '../../../../config'
const { useContext } = React

const PhotosListItems = () => {

  const [ state, setState ] = useContext(GlobalAppStateManagement)
  const photos: { dataType: 'photos', results: PhotoDataAPI[]} = state.fetchedData

  const deleteClickHandler = (id: number) => {
    setState((prevState) => ({ 
      ...prevState, 
      currWorkflow: 'delete',
      deleteDocId: id 
    }))
  }

  if (!photos || photos.dataType !== 'photos') return null
  
  return (
    <div>{ photos.results.length ? photos.results.map((photo, index: number) => {
      return (
        <div 
          key={index}
          style={{
            padding: 5,
            border: 'gray solid 1px',
            backgroundColor: index % 2 === 0 ? 'whitesmoke' : 'white',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{
            display: 'flex', 
            flexDirection: 'column',
            
          }}>
            <div style={{
              display: 'flex'
            }}>
              <div style={{
                margin: 5,
                border: '1px solid gray'
              }}> 
                <img 
                  width={80}
                  src={`${config.BACKEND_API_BASE_URL}/media/photos?id=${photo.id}`}
                />
              </div>
              <div style={{
                marginLeft: 10
              }}>
                <div>
                  <span style={{ fontWeight: 'bold' }}>Photo Credit: </span>
                  <span
                    style={{
                      fontSize: 17,
                      // fontWeight: 600
                    }}
                  >{' ' + photo.photoCred}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold' }}>Filename: </span>
                  <span
                    style={{
                      fontSize: 17  
                    }}
                  >{photo.originalFileName}</span>

                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ListButton 
              isDisabled={false} 
              text='DISPLAY' 
              onClickHandler={(e) => { setState((prevState) => ({ ...prevState, displayDocId: photo.id }))} }/>
            <ListButton
              isDisabled={state.editDocId === photo.id}
              text={'EDIT'}
              onClickHandler={() => { setState((prevState) => ({ 
                ...prevState, 
                editDocId: photo.id,
                displayDocId: photo.id,
                currWorkflow: 'edit',
              })) }}
            />
            <ListButton 
              isDisabled={false} 
              text='DELETE' 
              onClickHandler={(e) => deleteClickHandler(photo.id)}
            />
          </div>
        </div>
      )
    }) : 'No Photos!' }</div>
  )
}

export default PhotosListItems