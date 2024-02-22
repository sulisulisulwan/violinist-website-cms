import * as React from 'react'
import { useState } from 'react'

interface closeButtonPropsIF {
  onClickHandler: React.MouseEventHandler<HTMLSpanElement>
}

const CloseButton = ({ onClickHandler }: closeButtonPropsIF) => {

  const [closeButtonIsClicked, setCloseButtonIsClicked] = useState(false)

  const closeButtonStyles = { 
    cursor: 'pointer',
    border: closeButtonIsClicked  ? '1px solid black' : '1px solid darkgray',
    background: closeButtonIsClicked ? 'gray' : 'darkgray',
    padding: '3px',
    marginBottom: '5px'
  }

  const handleCloseButtonMouseDownAndUp = (e: any) => {

    if (e.type === 'mousedown') {
      setCloseButtonIsClicked(true)
    }

    if (e.type === 'mouseup') {
      setCloseButtonIsClicked(true)
    }

    if (e.type === 'mouseleave') {
      setCloseButtonIsClicked(false)
    }
  }

  return (
    <span 
      onClick={onClickHandler}
      style={closeButtonStyles}
      onMouseDown={handleCloseButtonMouseDownAndUp}
      onMouseUp={handleCloseButtonMouseDownAndUp}
      onMouseLeave={handleCloseButtonMouseDownAndUp}
      draggable={false}
    >X</span>
  )
}

export default CloseButton