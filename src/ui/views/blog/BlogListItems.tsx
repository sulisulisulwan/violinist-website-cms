import * as React from 'react'
import { GlobalAppStateManagement } from '../../../App'
import ListButton from '../../sharedComponents/ListButton'
import { formatDate } from './BlogDocDisplay'
import { BlogItemAPI } from 'suli-violin-website-types/src'
const { useContext } = React

const BlogListItems = () => {

  const [ globalAppState, setGlobalAppState ] = useContext(GlobalAppStateManagement)
  const blogsData = globalAppState.fetchedData.blog
  if (!blogsData) return null

  const deleteClickHandler = async(id: number) => {
    setGlobalAppState((prevState: any) => ({ 
      ...prevState, 
      currWorkflow: 'delete',
      deleteDocId: id 
    }))
  }

  return (
    <div>

      {
        !blogsData.results.length ? 'No Blog Entries :(' :
        blogsData.results.map((blogData: BlogItemAPI, index: number) => 
          <li 
            key={'' + blogData.id + index}
            style={{
              padding: '5px',
              backgroundColor: index % 2 === 0 ? 
                'lightGray' : 'white',
              border: 'gray solid 1px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 13 }}>Created: {formatDate(blogData.dateCreated)}</span>
                <span style={{ fontSize: 13 }}>Modified {formatDate(blogData.dateLastModified)}</span>
              </div>
              
            </div>
            <div 
                onMouseEnter={ (e: any) => { e.target.style.fontWeight = '900'}}
                onMouseLeave={ (e: any) => { e.target.style.fontWeight = '100'}}
              >
                {blogData.title}
              </div>
            <div>
              <ul style={{
                  display:'flex',
                  listStyleType: 'none',
                  padding: 0
                }}>
                <ListButton 
                  isDisabled={false} 
                  text='DISPLAY' 
                  onClickHandler={(e) => { setGlobalAppState((prevState) => ({ ...prevState, displayDocId: blogData.id }))} }
                />
                <ListButton 
                  isDisabled={globalAppState.editDocId !== null && globalAppState.editDocId === blogData.id }
                  text={'EDIT'} 
                  onClickHandler={() => { setGlobalAppState((prevState) => ({ 
                    ...prevState,
                    editDocId: blogData.id,
                    displayDocId: blogData.id,
                    currWorkflow: 'edit',
                  })) }}
                />
                <ListButton 
                  isDisabled={false} 
                  text='DELETE' 
                  onClickHandler={ (e) => { deleteClickHandler(blogData.id) } }
                />
              </ul>
            </div>  
          </li> 
        )
      }
    </div>
  )
}

export default BlogListItems