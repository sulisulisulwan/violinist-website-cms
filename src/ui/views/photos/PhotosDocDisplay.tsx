import * as React from 'react'
import config from '../../../../config'

interface photosDocDisplayPropsIF {
  chosenDocData: any
}

const PhotosDocDisplay = ({ chosenDocData }: photosDocDisplayPropsIF) => {

  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column',
      margin: 10
    }}>
      <div style={{
        alignContent: 'middle',
        textAlign: 'center',

      }}>
        <img 
          style={{
            border: '1px solid gray'
          }}
          width={300}
          src={`${config.BACKEND_API_BASE_URL}/media/photos?id=${chosenDocData.id}`}
        />
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Author: </span>
        <span
          style={{
            fontSize: 17,
            // fontWeight: 600
          }}
        >{' ' + chosenDocData.photoCred}</span>
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Filename: </span>
        <span
          style={{
            fontSize: 17  
          }}
        >{chosenDocData.originalFileName}</span>
      </div>
    </div>
  )
}

export default PhotosDocDisplay