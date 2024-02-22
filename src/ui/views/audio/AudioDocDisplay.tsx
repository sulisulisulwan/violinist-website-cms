import * as React from 'react'

interface audioDocDisplayPropsIF {
  chosenDocData: any
}

const AudioDocDisplay = ({ chosenDocData }: audioDocDisplayPropsIF) => {

  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column',
      margin: 10
    }}>
      <div>
        <audio controls src={`http://localhost:1337/v1/media/audio?id=${chosenDocData.id}`}/>
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