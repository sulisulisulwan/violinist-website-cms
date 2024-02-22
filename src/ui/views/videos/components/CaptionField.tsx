import * as React from 'react'
import { initStateIF, videosFormFieldStateIF } from 'suli-violin-website-types/src'

interface captionFieldPropsIF {
  globalAppState: initStateIF
  setFieldInForm: Function
  formFieldValues: videosFormFieldStateIF
}

const CaptionField = ({ globalAppState, formFieldValues, setFieldInForm }: captionFieldPropsIF) => {

  return (
    <label style={{
      fontWeight: 600,
      marginBottom: 20
    }}>
      Caption:
      <input 
      style={{
        marginLeft: 10
      }}
        onChange={(e) => setFieldInForm('caption', e.target.value)}
        disabled={!globalAppState.editFieldsEnabled}
        value={formFieldValues.caption}
      />
    </label>
  )
}

export default CaptionField