import * as React from 'react'


interface divButtonPropsIF {
  text: string
  onClickHandler: React.MouseEventHandler<HTMLDivElement>
  isDisabled: boolean
}


const DivButton = ({ text, onClickHandler, isDisabled }: divButtonPropsIF) => {

  const divButtonStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: '10px',
    border: !!isDisabled ? 'solid gray 1px' : 'solid black 1px',
    padding: '5px',
    backgroundColor: 'aliceBlue',
    cursor: 'pointer',
    color: !!isDisabled ? 'gray' : 'black'
  }

  const handleMouseDownButton = (e: React.MouseEvent<HTMLDivElement>) => {

    if (!isDisabled) {
      (e.target as HTMLButtonElement).style.backgroundColor = 'darkGray'
    }
  }
  
  const handleMouseUpButton = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDisabled) {
      (e.target as HTMLButtonElement).style.backgroundColor = 'aliceBlue'
    }
  }
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const eventTarget = e.target as HTMLButtonElement
    if (!isDisabled) {
      eventTarget.style.backgroundColor = 'aliceBlue'
      eventTarget.style.fontWeight = '100'
    }
  }
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const eventTarget = e.target as HTMLButtonElement
    if (!isDisabled) {
      eventTarget.style.backgroundColor = 'aliceBlue'
      eventTarget.style.fontWeight = '900'
    }
  }
  
  return (
    <div
      style={divButtonStyle}
      onMouseEnter={ handleMouseEnter }
      onClick={ isDisabled ? () => {} : onClickHandler}
      onMouseDown={ handleMouseDownButton }
      onMouseUp={ handleMouseUpButton } 
      onMouseLeave={ handleMouseLeave } 
    >
      {text}
    </div>
  )
}

export default DivButton