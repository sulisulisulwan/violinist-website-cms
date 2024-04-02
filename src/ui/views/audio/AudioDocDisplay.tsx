import * as React from 'react'
import { GlobalAppStateManagement } from '../../../Cms'

interface audioDocDisplayPropsIF {
  chosenDocData: any
}



const AudioDocDisplay = ({ chosenDocData }: audioDocDisplayPropsIF) => {

  const config = React.useContext(GlobalAppStateManagement).config

  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column',
      margin: 10
    }}>
      <div>
        <audio controls src={`${config.getField('BACKEND_API_BASE_URL')}/media/audio?id=${chosenDocData.id}`}/>
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Author: </span>
        <span
          style={{
            fontSize: 17,
            // fontWeight: 600
          }}
        >{' ' + chosenDocData.author}</span>
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Title: </span>
        <span
          style={{
            fontSize: 17  
          }}
        >{chosenDocData.title}</span>
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

export default AudioDocDisplay