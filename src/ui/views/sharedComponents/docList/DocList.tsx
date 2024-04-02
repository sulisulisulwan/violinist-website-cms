import * as React from 'react'
import ListButton from '../ListButton'
import { createNewDocument } from '../../../../crud/create'
import { GlobalAppStateManagement } from '../../../../Cms'
import { useWorkflowManager } from '../docEditor/hooks/useWorkflowManager'
import ModalWrapper from '../modals/ModalWrapper'
import DeleteModal from '../modals/DeleteModal'

interface docListPropsIF {
  listItemsComponent: React.FunctionComponent
}

const DocList = ({ listItemsComponent }: docListPropsIF) => {

  const { appStateManagement } = React.useContext(GlobalAppStateManagement)  
  const [ globalAppState, setGlobalAppState ] = appStateManagement
  
  useWorkflowManager(globalAppState, setGlobalAppState)

  return (
    <>
      <div 
        style={{
          display: 'flex', 
          justifyContent: 'right', 
          paddingRight: 20,
          paddingBottom: 10,
          maxHeight: '10%'
        }}
      >
        <ListButton
          text={'CREATE NEW'}
          onClickHandler={ () => createNewDocument(globalAppState, setGlobalAppState) }
          isDisabled={false}
          stylesOverride={{
            maxWidth: 200
          }}
        />
      </div>
      <hr/>
      <ul id="doc-list" style={{
        listStyleType: 'none',
        paddingLeft: 10,
        maxHeight: 'calc(100% - 70px)',
        overflow: 'scroll'
      }}>
        {
          listItemsComponent ? listItemsComponent({}) : null
        }
      </ul>
      <div>
        <ModalWrapper isOpen={globalAppState.modal.isOpen}>
          {
            globalAppState.modal.type === '' ? null 
              : globalAppState.modal.type === 'delete' ? <DeleteModal/> 
              : null
          }
        </ModalWrapper>
      </div>
    </>
  )
}

export default DocList