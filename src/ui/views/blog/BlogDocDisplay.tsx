import * as React from 'react'
import parser from '../../../utils/ComponentParserr'

interface blogDocDisplayPropsIF {
  chosenDocData: any
}

const BlogDocDisplay = ({ chosenDocData }: blogDocDisplayPropsIF) => {

  return (
    <div 
      className="blog-document-display"
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <div style={{
          paddingTop: 10,
          paddingLeft: 10,
          height: 25
        }}>
          <span style={{ fontWeight: 900 }}>Title: </span>{chosenDocData.title}
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          paddingRight: 10,
          color: 'gray'
        }}>
          <span>Date Created: {formatDate(chosenDocData.dateCreated)}</span>
          <span>Date Modified: {formatDate(chosenDocData.dateLastModified)}</span>
        </div>
      </div>
      <div style={{
        borderTop: '1px solid gray',
        height: 'calc(100% - 80px)',
        width: '100%',
        overflow: 'scroll',
        wordWrap: 'break-word'
      }}>
        { parser.parseToReactElements(React, chosenDocData.components) }
      </div>
    </div>
  )
}

export const formatDate = (datetime: string) => {
  const date = new Date(datetime)
  const year = date.getFullYear()
  const day = date.getDate() + 1
  const month = date.getMonth() + 1
  return month + '/' + day + '/' + year
}

export default BlogDocDisplay