import * as React from 'react'
import { GlobalAppStateManagement } from '../../../Cms'
import ListButton from '../sharedComponents/ListButton'
import { formatDate } from './BlogDocDisplay'
import { BlogItemAPI } from 'suli-violin-website-types/src'
import HoveringDiv from './HoveringDiv'
const { useContext } = React

const BlogListItems = () => {

  const {appStateManagement} = useContext(GlobalAppStateManagement)
  const [ globalAppState, setGlobalAppState ] = appStateManagement
  
  const blogsData = globalAppState.fetchedData
  const deleteClickHandler = async(id: number) => {
    setGlobalAppState((prevState: any) => ({ 
      ...prevState, 
      currWorkflow: 'delete',
      deleteDocId: id 
    }))
  }


  if (!blogsData || blogsData.dataType !== 'blog') return null

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
              <HoveringDiv stylesOverride={{ width: '100%' }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '50% 50%'
                  }}
                  onClick={(e) => { setGlobalAppState((prevState) => ({ ...prevState, displayDocId: blogData.id }))} }
                >
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 13 }}>Created: {formatDate(blogData.dateCreated)}</span>
                      <span style={{ fontSize: 13 }}>Modified {formatDate(blogData.dateLastModified)}</span>
                    </div>
                  </div>
                  <div 
                  >
                    {blogData.title}
                  </div>
                </div>
              </HoveringDiv>
            <div>
              <ul style={{
                  display:'flex',
                  listStyleType: 'none',
                  padding: 0
                }}>
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