import * as React from 'react'
const { useContext } = React
import ListButton from '../ListButton'
import { deleteDocument, dontDeleteDocument } from '../../../crud/delete'
import { GlobalAppStateManagement } from '../../../App'

const DeleteModal = () => {

  const [ state, setState ] = useContext(GlobalAppStateManagement)

  return (
    <>
      Delete this Document?
      <div className="save-doc-user-options">
        <ul style={{
          display: 'flex',
          listStyleType: 'none',
          padding: 0,
          justifyContent: 'center'
        }}>
          <ListButton isDisabled={false} text={'YES'} onClickHandler={() => { deleteDocument(state, setState) }}/>
          <ListButton isDisabled={false} text={'NO'}  onClickHandler={() => { dontDeleteDocument(state, setState) }}/>
        </ul>
      </div>
    </>
  )
}

export default DeleteModal