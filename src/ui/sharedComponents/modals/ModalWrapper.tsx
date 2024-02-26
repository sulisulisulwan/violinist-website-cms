import * as React from 'react'
const { useContext } = React
import * as ReactDom from 'react-dom'
import CloseButton from '../CloseButton'
import { GlobalAppStateManagement } from '../../../Cms'

interface modalWrapperPropsIF {
  children: React.ReactNode
  isOpen: boolean
}

const ModalWrapper = ({ children, isOpen }: modalWrapperPropsIF) => {

  const setState = useContext(GlobalAppStateManagement)[1]

  const closeButtonClickHandler = () => setState((prevState) => ({ 
    ...prevState, 
    modal: { 
      isOpen: false, 
      type: '',
    },
    currWorkflow: ''
  })) 

  if (!isOpen) return null
  
  const modal = (
    <div 
      className="modal-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, .7)',
        zIndex: 1000
      }}
      >
      <div 
        className="modal-inner-window"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#FFF',
          padding: '2px',
          border: '2px solid black',
          zIndex: 1000
        }}
      >
        <div 
          className="modal-header"
          style={{ 
            display: 'flex',  
            justifyContent: 'flex-end', 
            backgroundColor: 'lightgray',
            borderBottom: '1px solid black',
          }}
        >
          <CloseButton onClickHandler={ closeButtonClickHandler }/>
        </div>
        <div 
          className="modal-content"
          style={{
            padding: '10px'
          }}
        >{ children }</div>
      </div>
    </div>
  )

  return ReactDom.createPortal(modal, document.getElementById('portal'))
}

export default ModalWrapper