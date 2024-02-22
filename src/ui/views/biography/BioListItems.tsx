import * as React from 'react'
import ListButton from '../../sharedComponents/ListButton'
import { bioLongFormApiHandler } from '../../../api/handlers/bioLongForm'
import { bioApiHandler } from '../../../api/handlers/bio'
import { GlobalAppStateManagement } from '../../../App'
import { bioShortFormApiHandler } from '../../../api/handlers/bioShortForm'
import { BiographyItemAPI} from 'suli-violin-website-types/src'
const { useContext } = React

const BioDocListItems = () => {
  
  const [ state, setState ] = useContext(GlobalAppStateManagement)
  
  const biosData = state.fetchedData.bio
  if (!biosData) return null

  const setLongFormClickHandler = async (id: number, ) => {
    try {
      await bioLongFormApiHandler('PATCH', '', { id } as any)
      const newBioData = await bioApiHandler('GET')
      setState((prevState) => ({
        ...prevState,
        fetchedData: {
          ...prevState.fetchedData,
          bio: newBioData.data
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
          ...prevState.fetchedData,
          bio: newBioData.data
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
            <div 
              onMouseEnter={ (e: any) => { e.target.style.fontWeight = '900'}}
              onMouseLeave={ (e: any) => { e.target.style.fontWeight = '100'}}
            >
              {bioData.name}
            </div>
            <div>
              <ul style={{
                  display:'flex',
                  listStyleType: 'none',
                  padding: 0
                }}>
                <div>
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
                </div>
                <div>
                  <ListButton 
                    isDisabled={false} 
                    text='DISPLAY' 
                    onClickHandler={(e) => { setState((prevState) => ({ ...prevState, displayDocId: bioData.id }))} }
                  />
                  <ListButton 
                    isDisabled={state.editDocId !== null && state.editDocId === bioData.id }
                    text={'EDIT'} 
                    onClickHandler={() => { setState((prevState) => ({ 
                      ...prevState,
                      editDocId: bioData.id,
                      displayDocId: bioData.id,
                      currWorkflow: 'edit',
                    })) }}
                  />
                  <ListButton 
                    isDisabled={false} 
                    text='DELETE' 
                    onClickHandler={ (e) => { deleteClickHandler(bioData.id) } }
                  />
                </div>
              </ul>
            </div>  
          </li> 
        )
      }
    </>
  )
}

export default BioDocListItems