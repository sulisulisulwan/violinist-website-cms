import * as React from 'react'

const { useState, useEffect } = React

export const useTrackMouseCoords = (imgRef: any) => {

  const [ cropMoveable, setCropMoveable ] = useState(true)
  const [ hookState, setHookState ] = useState({
    mouseCoords: { x: null, y: null},
    pointerCoords:  { 
      x: 0,
      y: 0
    },
  })

  
  useEffect(() => {

    const mouseMoveListener =  (e: MouseEvent) => {

      const imgRect = document.getElementById('preview').getBoundingClientRect()
      const cursorRect = document.getElementById('cursor').getBoundingClientRect()

      let newState = {
        mouseCoords: { 
          x: e.clientX || hookState.mouseCoords.x, 
          y: e.clientY || hookState.mouseCoords.y 
        },
        pointerCoords:  { 
          x: cropMoveable ? computeX(e, imgRect, cursorRect, hookState) : hookState.pointerCoords.x,
          y: cropMoveable ? computeY(e, imgRect, cursorRect, hookState) : hookState.pointerCoords.y
        },
      }

      setHookState(newState)
    }

    document.addEventListener('mousemove', mouseMoveListener)
    return () => {
      document.removeEventListener('mousemove', mouseMoveListener)
    }
  }, [hookState])


  return { 
    pointerCoords: hookState.pointerCoords,
    setCropMoveable,
    cropMoveable
  }
}

const computeY = (e: any, imgRect: any, cursorRect: any, hookState: any) => {

  if (e.type === 'mousemove') {

    const distanceFromMouseToImgBottom = Math.abs(e.clientY - imgRect.bottom)
    
    return e.clientY < imgRect.top ? imgRect.top + window.scrollY
      : distanceFromMouseToImgBottom < cursorRect.height ? imgRect.bottom - cursorRect.height + window.scrollY
      : e.clientY + window.scrollY
  }

  if (e.type === 'scroll') {
    return hookState.mouseCoords.y + window.scrollY
  }

}

const computeX = (e: any, imgRect: any, cursorRect: any, hookState: any) => {

  if (e.type === 'mousemove') {

    const distanceFromMouseToImgRight = Math.abs(e.clientX - imgRect.right)

    return e.clientX < imgRect.left ? imgRect.left 
      : distanceFromMouseToImgRight < cursorRect.width ? imgRect.right - cursorRect.width 
      : e.clientX
  }

  if (e.type === 'scroll') {
    window.scrollX
    return cursorRect.left
  }

}
