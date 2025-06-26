
import * as React from 'react'
import parser from '../../../utils/ComponentParserr'

interface bioDocDisplayPropsIF {
  chosenDocData: any
}

const ProgramsDocDisplay = ({ chosenDocData }: bioDocDisplayPropsIF) => {

  return (
    <div 
      className="programs-document-display"
      style={{
        marginTop: 10,
        marginBottom: 20,
        paddingLeft: 10,
        height: 'calc(100% - 30px)',
        width: 'calc(100% - 15px)',
        overflow: 'scroll'
      }}
    >
      { chosenDocData ? parser.parseToReactElements(React, chosenDocData.components) : null }
    </div>
  )
}

export default ProgramsDocDisplay