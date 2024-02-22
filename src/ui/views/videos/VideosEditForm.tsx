import * as React from 'react'
const { useState, useRef, useContext } = React
import { GlobalAppStateManagement } from '../../../App'


import { useSetFieldInForm } from '../useSetFieldInForm'

import ThumbnailField from './components/ThumbnailField'
import YoutubeCodeField from './components/YoutubeCodeField'
import CaptionField from './components/CaptionField'
import useTextLoader from '../../../textLoaders/_useTextLoader'
import { videosFormFieldStateIF } from 'suli-violin-website-types/src'

interface videosEditFormPropsIF {
  formFieldValues: videosFormFieldStateIF
  setFormFieldValues: React.Dispatch<React.SetStateAction<videosFormFieldStateIF>>
}

const VideosEditForm = ({ formFieldValues, setFormFieldValues }: videosEditFormPropsIF) => {
  const formRef = useRef(null)
  const [ globalAppState ] = useContext(GlobalAppStateManagement)
  const setFieldInForm = useSetFieldInForm(setFormFieldValues)
  useTextLoader('videos', setFormFieldValues)
  
  return (
    <div>
      <form
        ref={formRef}
        id="videos-upload-form"
        style={{
          display: 'flex',
          flexDirection: 'column',
          color: !globalAppState.editFieldsEnabled ? 'gray' : 'black',
          marginBottom: 10
        }}
        encType='multipart/form-data'
      >        
        <CaptionField 
          globalAppState={globalAppState} 
          formFieldValues={formFieldValues}
          setFieldInForm={setFieldInForm} 
        />
        <YoutubeCodeField 
          globalAppState={globalAppState}
          formFieldValues={formFieldValues} 
          setFormFieldValues={setFormFieldValues}/>
        <ThumbnailField
          globalAppState={globalAppState}
          formFieldValues={formFieldValues}
          setFieldInForm={setFieldInForm}
          formRef={formRef}
        />
      </form>
    </div>
  )
}


export default VideosEditForm