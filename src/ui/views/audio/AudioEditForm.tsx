import * as React from 'react'
const { useContext } = React
import { GlobalAppStateManagement } from '../../../Cms'
import { useSetFieldInForm } from '../useSetFieldInForm'
import useTextLoader from '../../../hooks/useTextLoader'
import { audioFormFieldStateIF } from 'suli-violin-website-types/src'


interface audioEditFormPropsIF {
  formFieldValues: audioFormFieldStateIF
  setFormFieldValues: React.Dispatch<React.SetStateAction<audioFormFieldStateIF>>
}

const AudioEditForm = ({ formFieldValues, setFormFieldValues }: audioEditFormPropsIF) => {
  const { appStateManagement } = useContext(GlobalAppStateManagement)
  const [ globalAppState ] = appStateManagement
  
  const setFieldInForm = useSetFieldInForm(setFormFieldValues)
  useTextLoader('audio', setFormFieldValues)

  const labelStyle = { paddingTop: 10 }

  return (
    <div>
      <form
        id="audio-upload-form"
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
              name="audio-track"
              disabled={!globalAppState.editFieldsEnabled}
            />
          </label>
        }
        <label style={labelStyle}>
          Author:
          <input 
            onChange={(e) => setFieldInForm('author', e.target.value)}
            disabled={!globalAppState.editFieldsEnabled}
            value={formFieldValues.author}
          />
        </label>
        <label style={labelStyle}>
          Title:
          <input 
            onChange={(e) => setFieldInForm('title', e.target.value)}
            disabled={!globalAppState.editFieldsEnabled}
            value={formFieldValues.title}
          />
        </label>
      </form>
    </div>
  )
 
}

export default AudioEditForm