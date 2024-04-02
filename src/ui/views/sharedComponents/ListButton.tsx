import * as React from 'react'
const { useState } = React

interface listButtonPropsIF {
  text: string
  onClickHandler: React.MouseEventHandler<HTMLLIElement>
  isDisabled: boolean
  stylesOverride?: any
}

const ListButton = ({ text, onClickHandler, isDisabled, stylesOverride }: listButtonPropsIF) => {

  const [ hoverStyleMixin, setHoverStyleMixin ] = useState({})

  const defaultListItemStyle: any = {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: '10px',
    border: !!isDisabled ? 'solid gray 1px' : 'solid black 1px',
    padding: '5px',
    backgroundColor: 'aliceBlue',
    cursor: 'pointer',
    color: !!isDisabled ? 'gray' : 'black',
  }

  if (stylesOverride) {
    const styleKeys = Object.keys(stylesOverride)
    styleKeys.forEach((key: string) => {
      defaultListItemStyle[key as keyof any] = stylesOverride[key]
    })
  }

  const computedLIStyle = {
    ...defaultListItemStyle,
    ...hoverStyleMixin
  }


  const handleMouseDownButton = (e: React.MouseEvent<HTMLLIElement>) => {        
    if (!isDisabled) {
      setHoverStyleMixin({ 
        backgroundColor: 'darkGray'
      })
    }
  }
  
  const handleMouseUpButton = (e: any) => {
    if (!isDisabled) {
      setHoverStyleMixin({ 
        backgroundColor: 'aliceBlue'
      })
    }
  }
  
  const handleMouseLeave = (e: any) => {
    if (!isDisabled) {
      setHoverStyleMixin({ 
        backgroundColor: 'aliceBlue',
        fontWeight: 100
      })
    }
  }
  const handleMouseEnter = (e: any) => {
    if (!isDisabled) {
      setHoverStyleMixin({ 
        backgroundColor: 'aliceBlue',
        fontWeight: 900
      })
    }
  }
  
  return (
    <li
      style={computedLIStyle}
      onMouseEnter={ handleMouseEnter }
      onClick={ isDisabled ? () => {} : onClickHandler}
      onMouseDown={ handleMouseDownButton }
      onMouseUp={ handleMouseUpButton } 
      onMouseLeave={ handleMouseLeave } 
    >
      {text}
    </li>
  )
}

export default ListButton