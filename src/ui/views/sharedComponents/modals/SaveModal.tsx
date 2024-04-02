import * as React from 'react'
const { useContext } = React
import { cancelSave, dontSaveDocument, saveDocument } from '../../../../crud/save'
import ListButton from '../ListButton'

import { GlobalAppStateManagement } from '../../../../Cms'
import { initialFormStates } from 'suli-violin-website-types/src'

interface deleteModalProps {
  formFieldValues: initialFormStates
}

const SaveModal = ({ formFieldValues }: deleteModalProps) => {

  const { appStateManagement } = useContext(GlobalAppStateManagement)
  const [ state, setState ] = appStateManagement

  return (
    <>
      Save this Document?
      <div className="save-doc-user-options">
        <ul style={{
          display: 'flex',
          listStyleType: 'none',
          padding: 0,
          justifyContent: 'center'
        }}>
          <ListButton isDisabled={false} text={'YES'} onClickHandler={() => { saveDocument(state, setState, formFieldValues) }}/>
          <ListButton isDisabled={false}  text={'NO'}  onClickHandler={() => { dontSaveDocument(state, setState) }}/>
          <ListButton isDisabled={false}  text={'Cancel'} onClickHandler={() => { cancelSave(setState) }}/>
        </ul>
      </div>
    </>
  )
}

export default SaveModal