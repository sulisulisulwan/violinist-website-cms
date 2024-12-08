import * as React from 'react'
const { useContext, useRef } = React
import { GlobalAppStateManagement } from '../../../Cms'

import { useSetFieldInForm } from '../useSetFieldInForm'
import useTextLoader from '../../../hooks/useTextLoader'
import { useGetThumbnailPreview } from '../videos/hooks/useGetThumbnailPreview'
import { useTrackMouseCoords } from './useTrackMouseCoords'
import { photosFormFieldStateIF } from 'suli-violin-website-types/src'


interface photosEditFormPropsIF {
  formFieldValues: photosFormFieldStateIF
  setFormFieldValues: React.Dispatch<React.SetStateAction<any>>
}

const PhotosEditForm = ({ formFieldValues, setFormFieldValues }: photosEditFormPropsIF) => {
  
  const { appStateManagement } = useContext(GlobalAppStateManagement)
  const [ globalAppState ] = appStateManagement
  
  const formRef = useRef(null)
  const imgRef = useRef(null)
  
  // const [ cropActivated, setCropActivated ] = React.useState(false)
  // const { 
  //   pointerCoords, 
  //   cropMoveable,
  //   setCropMoveable 
  // } = useTrackMouseCoords(imgRef)

  const setFieldInForm = useSetFieldInForm(setFormFieldValues)

  const thumbnailPreviewSrc = useGetThumbnailPreview(formFieldValues, formRef.current, globalAppState.editDocId)
  useTextLoader('photos', setFormFieldValues)

  const labelStyle = { paddingTop: 10 }

  // const cropImage = () => {
  //   const canvas: any = document.getElementById('cropped')
  //   const context = canvas.getContext('2d')
  //   const image = new Image()
  //   image.src = thumbnailPreviewSrc

  //   const cropSquareRects = document.getElementById('cursor').getClientRects()
  //   const origImgSquareRects = document.getElementById('preview').getClientRects()
    
  //   const orignalWidth = image.width
  //   const originalHeight = image.height

  //   const horizontalRatio = orignalWidth / origImgSquareRects[0].width
  //   const verticalRatio = originalHeight / origImgSquareRects[0].height

  //   const xCrop = 0
  //   // const yCrop = origImgSquareRects[0].top + cropSquareRects[0].top 
  //   const yCrop = Math.abs(origImgSquareRects[0].top - cropSquareRects[0].top) * verticalRatio
  //   const widthFromXCrop = horizontalRatio * cropSquareRects[0].width
  //   const heightFromYCrop = verticalRatio * cropSquareRects[0].height
  //   const displayX = 0
  //   const displayY = 0
  //   const displayWidth = 400
  //   const displayHeight = 260
  //   context.drawImage(image, 
  //     xCrop, yCrop, 
  //     widthFromXCrop, heightFromYCrop
  //     , displayX, displayY
  //     , displayWidth, displayHeight
  //   )
  // }



  return (
    <div>
      <form
        ref={formRef}
        id="photos-upload-form"
        style={{
          display: 'flex',
          flexDirection: 'column',
          color: !globalAppState.editFieldsEnabled ? 'gray' : 'black',
          marginBottom: 10
        }}
        encType='multipart/form-data'
      >
        {
          globalAppState.editDocId ? null :  // we only allow file upload for audio records that haven't been made yet in db
          <label style={labelStyle}>
            Upload file:
            <input 
              onChange={(e) => { setFieldInForm('uploadPath', e.target.value) } }
              type="file" 
              name="photo"
              disabled={!globalAppState.editFieldsEnabled}
              value={formFieldValues.uploadPath ?? ''}
            />
          </label>
        }
        <label style={labelStyle}>
          Photo Credit:
          <input 
            onChange={(e) => setFieldInForm('photoCred', e.target.value)}
            disabled={!globalAppState.editFieldsEnabled}
            value={formFieldValues.photoCred}
          />
        </label>
      </form>
      <div style={{
        cursor: 'pointer',
        WebkitUserSelect: 'none',  
        userSelect: 'none'
      }}>
        <img
          style={{
            maxWidth: 400
          }}
          id="preview"
          ref={imgRef}
          width={400}
          src={thumbnailPreviewSrc}
        />
      </div>
      {/* <div
        style={{
          display: cropMoveable ? 'none' : ''
        }}
      >
        CROP SET <button onClick={() => cropImage() }>Create Cropped Image</button>
      </div> */}
      {/* <div 
        onClick={() => { setCropMoveable(!cropMoveable) }}
        id="cursor" 
        style={{
          display: formFieldValues.uploadPath ? '' : 'none',
          background: 'white',
          opacity: .5,
          zIndex: 100,
          minHeight: 260,
          maxHeight: 260,
          minWidth: 400,
          maxWidth: 400,
          position: 'absolute',
          top: pointerCoords.y,
          left: pointerCoords.x,
        }}
      ></div> */}
      <canvas id="cropped" width={400} height={260}>

      </canvas>
    </div>
  )
}

export default PhotosEditForm