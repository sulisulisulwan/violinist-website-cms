import * as React from 'react'

interface docListPropsIF {
  listItemsComponent: React.FunctionComponent
}

const DocList = ({ listItemsComponent }: docListPropsIF) => {
  
  return (
    <>
      <ul id="doc-list" style={{
        listStyleType: 'none',
        paddingLeft: 10
      }}>
        {
          listItemsComponent ? listItemsComponent({}) : null
        }
      </ul>
    </>
  )
}

export default DocList