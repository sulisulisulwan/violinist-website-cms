
import * as React from 'react'

interface bioDocDisplayPropsIF {
  chosenDocData: any
}

const BioDocDisplay = ({ chosenDocData }: bioDocDisplayPropsIF) => {

  return (
    <div 
      className="bio-document-display"
      style={{
        width: '100%',
        paddingLeft: '10px'
      }}
    >
      { chosenDocData.components.map((component: any, index: number) => {
        if (component.type === 'p') {
          return <p key={'paragraphComponent' + index}>{component.content}</p>
        }
        return null
      })}
    </div>
  )
}

export default BioDocDisplay