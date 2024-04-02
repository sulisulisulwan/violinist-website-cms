import * as React from 'react'
import ListButton from '../ListButton'
import { GlobalAppStateManagement } from '../../../../Cms'
import { useWorkflowManager } from '../docEditor/hooks/useWorkflowManager'
import ModalWrapper from '../modals/ModalWrapper'
import DeleteModal from '../modals/DeleteModal'
const { useContext } = React

interface savedDocDisplayWrapperPropsIF {
  chosenDocData: any
  children: React.ReactNode
}

const SavedDocDisplayWrapper = ({ chosenDocData, children }: savedDocDisplayWrapperPropsIF) => {

  const { appStateManagement } = useContext(GlobalAppStateManagement)
  const [ globalAppState, setGlobalAppState ] = appStateManagement
  
  useWorkflowManager(globalAppState, setGlobalAppState)

  return (
    <div 
      className="saved-document-display"
      style={{
        margin: '10px',
        padding: '5px',
        background: 'white',
        border: '2px outset gainsboro',
        width: 'calc(100% - 35px)',
        height: 'calc(100% - 35px)',
        maxWidth: 'calc(100% - 35px)',
        maxHeight: 'calc(100% - 35px)'
      }}
    >
      <div 
        className='saved-document-display-header' 
        style={{
          display: 'flex',
          borderBottom: chosenDocData ? 'solid gray 1px' : '',
        }}
      >
        <nav>
          <ul
            style={{
              display: 'flex',
              listStyleType: 'none',
              padding: 0
            }}
          >
            { globalAppState.displayDocId === null ? null : 
            <>
              <ListButton
                isDisabled={false}
                text={'BACK'}
                onClickHandler={() => { setGlobalAppState((prevState) => ({ ...prevState, displayDocId: null })) }}
              />
              <ListButton
                isDisabled={globalAppState.editDocId === globalAppState.displayDocId}
                text={'EDIT'}
                onClickHandler={() => { setGlobalAppState((prevState) => ({ 
                  ...prevState, 
                  currWorkflow: 'edit',
                })) }}
              />
            </>
            }
          </ul>
        </nav>
        <div
          style={{
            fontWeight: '900',
            paddingLeft: '20px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >{chosenDocData?.name}</div>
      </div>
      <div 
        className="saved-doc-main"
        style={{
          height: 'calc(100% - 40px)'
        }}
      >
        { children }
      </div>
      <div>
        <ModalWrapper isOpen={globalAppState.modal.isOpen}>
          {
            globalAppState.modal.type === '' ? null 
              : globalAppState.modal.type === 'delete' ? <DeleteModal/> 
              : null
          }
        </ModalWrapper>
      </div>
    </div>
  )
}

export default SavedDocDisplayWrapper