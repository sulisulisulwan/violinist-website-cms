
import * as React from 'react'
import parser from '../../../utils/ComponentParserr'

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
      { parser.parseToReactElements(React, chosenDocData.components) }
    </div>
  )
}

export default BioDocDisplay