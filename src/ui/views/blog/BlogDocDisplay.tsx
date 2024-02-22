import * as React from 'react'

interface blogDocDisplayPropsIF {
  chosenDocData: any
}

const BlogDocDisplay = ({ chosenDocData }: blogDocDisplayPropsIF) => {
  
  return (
    <div 
      className="blog-document-display"
      style={{
        width: '100%',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <div style={{
          paddingTop: 10,
          paddingLeft: 10
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
        borderTop: '1px solid gray'
      }}>
        { chosenDocData.components.map((component: any, index: number) => {
          if (component.type === 'p') {
            return <p key={'paragraphComponent' + index}>{component.content}</p>
          }
          return null
        })}
      </div>
    </div>
  )
}

export const formatDate = (datetime: string) => {
  const date = new Date(datetime)
  const year = date.getFullYear()
  const day = date.getDate()
  const month = date.getMonth()
  // console.log(date)
  return month + '/' + day + '/' + year
}

export default BlogDocDisplay