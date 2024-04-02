
import * as React from 'react'

interface bioDocDisplayPropsIF {
  chosenDocData: any
}

const BioDocDisplay = ({ chosenDocData }: bioDocDisplayPropsIF) => {

  return (
    <div 
      className="bio-document-display"
      style={{
        marginTop: 10,
        marginBottom: 20,
        paddingLeft: 10,
        height: 'calc(100% - 30px)',
        width: 'calc(100% - 15px)',
        overflow: 'scroll'
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