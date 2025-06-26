import * as React from 'react'
import ListButton from '../sharedComponents/ListButton'
import { bioLongFormApiHandler } from '../../../api/handlers/bioLongForm'
import { bioApiHandler } from '../../../api/handlers/bio'
import { GlobalAppStateManagement } from '../../../Cms'
import { bioShortFormApiHandler } from '../../../api/handlers/bioShortForm'
import { BiographyItemAPI} from 'suli-violin-website-types/src'
import HoveringDiv from '../blog/HoveringDiv'
const { useContext } = React

const ProgramsListItems = () => {
  
  const { appStateManagement } = useContext(GlobalAppStateManagement)
  const [ state, setState ] = appStateManagement
  
  const programsData = state.fetchedData
  if (!programsData || programsData.dataType !== 'programs') return null

  const deleteClickHandler = async(id: number) => {
    setState((prevState) => ({ 
      ...prevState, 
      currWorkflow: 'delete',
      deleteDocId: id 
    }))
  }

  return (
    <>
      {
        programsData.results.map((programData: BiographyItemAPI, index: number) => 
          <li 
            className="document-item"
            key={'' + programData.id + index}
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
                  style={{ width: '100%' }}
                  onClick={(e) => { setState((prevState) => ({ ...prevState, displayDocId: programData.id })) }}
                >
                  {programData.name}
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
                    onClickHandler={ (e) => { deleteClickHandler(programData.id) } }
                  />
              </ul>
            </div>  
          </li> 
        )
      }
    </>
  )
}

export default ProgramsListItems