import * as React from 'react'
import ListButton from '../sharedComponents/ListButton'
import { bioLongFormApiHandler } from '../../../api/handlers/bioLongForm'
import { bioApiHandler } from '../../../api/handlers/bio'
import { GlobalAppStateManagement } from '../../../Cms'
import { bioShortFormApiHandler } from '../../../api/handlers/bioShortForm'
import { BiographyItemAPI} from 'suli-violin-website-types/src'
import HoveringDiv from '../blog/HoveringDiv'
const { useContext } = React

const BioDocListItems = () => {
  
  const { appStateManagement } = useContext(GlobalAppStateManagement)
  const [ state, setState ] = appStateManagement
  
  const biosData = state.fetchedData
  if (!biosData || biosData.dataType !== 'bio') return null


  const setLongFormClickHandler = async (id: number, ) => {
    try {
      await bioLongFormApiHandler('PATCH', '', { id } as any)
      const newBioData = await bioApiHandler('GET')
      
      setState((prevState) => ({
        ...prevState,
        fetchedData: {
          dataType: 'bio',
          ...newBioData.data
        }
      }))
    } catch(e) {
      console.log(e)
    }
  }

  const setShortFormClickHandler = async (id: number, ) => {
    try {
      await bioShortFormApiHandler('PATCH', '', { id } as any)
      const newBioData = await bioApiHandler('GET')
      setState((prevState) => ({
        ...prevState,
        fetchedData: {
          dataType: 'bio',
          ...newBioData.data
        }
      }))
    } catch(e) {
      console.log(e)
    }
  }

  const deleteClickHandler = async(id: number) => {
    setState((prevState) => ({ 
      ...prevState, 
      currWorkflow: 'delete',
      deleteDocId: id 
    }))
  }

  return (
    <>
      <div style={{ marginBottom: 20}}>
        COLOR CODE:
        <span style={{ background: 'lightblue', paddingRight: 10}}>Short Form</span>
        <span style={{ background: 'lightgreen', paddingRight: 10}}>Long Form</span>
      </div>
      {
        biosData.results.map((bioData: BiographyItemAPI, index: number) => 
          <li 
            className="document-item"
            key={'' + bioData.id + index}
            style={{
              padding: '5px',
              backgroundColor: bioData.id === biosData.longFormId ? 
              'lightgreen': bioData.id === biosData.shortFormId ? 
              'lightblue': index % 2 === 0 ? 
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
                  onClick={(e) => { setState((prevState) => ({ ...prevState, displayDocId: bioData.id })) }}
                >
                  {bioData.name}
                </div>
              </HoveringDiv>
            <div>
              <ul style={{
                  display:'flex',
                  listStyleType: 'none',
                  padding: 0
                }}>
                  <ListButton 
                    isDisabled={bioData.id === biosData.shortFormId} 
                    text={bioData.id === biosData.longFormId ? 'UNSET LONG' : 'SET LONG'}
                    onClickHandler={ (e) => { setLongFormClickHandler(bioData.id === biosData.longFormId ? null : bioData.id) } }
                  />
                  <ListButton 
                    isDisabled={bioData.id === biosData.longFormId} 
                    text={bioData.id === biosData.shortFormId ? 'UNSET SHORT' : 'SET SHORT'}
                    onClickHandler={ (e) => { setShortFormClickHandler(bioData.id === biosData.shortFormId ? null : bioData.id) } }
                  />
                  <ListButton 
                    isDisabled={false} 
                    text='DELETE' 
                    onClickHandler={ (e) => { deleteClickHandler(bioData.id) } }
                  />
              </ul>
            </div>  
          </li> 
        )
      }
    </>
  )
}

export default BioDocListItems