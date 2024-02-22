
import * as React from 'react'

interface bioDocDisplayPropsIF {
  chosenDocData: any
}

const PlaylistsDocDisplay = ({ chosenDocData }: bioDocDisplayPropsIF) => {

  console.log(chosenDocData)

  return (
    <div 
      className="playlists-document-display"
      style={{
        width: '100%',
        paddingLeft: '10px'
      }}
    >
      <div>{chosenDocData.name}</div>
      {
        chosenDocData.playlistTracks.map((track: any, index: number) => {
          return (
            <div key={track.id} style={{
               paddingLeft: 10,
               paddingTop: 10, 
               paddingBottom: 10, 
               backgroundColor: index % 2 === 0 ? 'lightgray': 'white'}}>
              <div><span style={{ fontWeight: 900, paddingRight: 10 }}>Track {index + 1}</span></div>
              <div><span style={{ fontWeight: 900, paddingRight: 10 }}>Author:</span> {track.author}</div>
              <div><span style={{ fontWeight: 900, paddingRight: 10 }}>Title:</span> {track.title}</div>
            </div>
          )
        })
      }
    </div>
  )
}

export default PlaylistsDocDisplay