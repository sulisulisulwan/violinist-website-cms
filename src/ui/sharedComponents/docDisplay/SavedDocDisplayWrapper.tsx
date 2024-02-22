import * as React from 'react'
import ListButton from '../ListButton'
import { GlobalAppStateManagement } from '../../../App'
const { useContext } = React

interface savedDocDisplayWrapperPropsIF {
  chosenDocData: any
  children: React.ReactNode
}

const SavedDocDisplayWrapper = ({ chosenDocData, children }: savedDocDisplayWrapperPropsIF) => {

  const [ globalAppState, setGlobalAppState ] = useContext(GlobalAppStateManagement)

  return (
    <div 
      className="saved-document-display"
      style={{
        margin: '10px',
        padding: '5px',
        background: 'white',
        outline: '2px outset gainsboro',
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
      <div className="saved-doc-main">
        { children }
      </div>
    </div>
  )
}

export default SavedDocDisplayWrapper