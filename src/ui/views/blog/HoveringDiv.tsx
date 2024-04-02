import * as React from 'react'

const HoveringDiv = ({ children, stylesOverride }: any) => {

  const [ isHovering, setIsHovering ] = React.useState(false)

  const defaultStyles: any = {
    fontWeight: isHovering ? '900' : '100'
  }

  const styleKeys = Object.keys(stylesOverride)

  styleKeys.forEach((key: any) => {
    defaultStyles[key] = stylesOverride[key]
  })


  
  return (
    <div
      style={defaultStyles}
      onMouseEnter={ (e: any) => { setIsHovering(true) }}
      onMouseLeave={ (e: any) => { setIsHovering(false) }}
    >
      {children}
    </div>
  )
}

export default HoveringDiv