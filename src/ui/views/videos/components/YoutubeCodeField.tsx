import * as React from 'react'
import { useTestIsValidYoutubeCode } from '../hooks/useTestYoutubeCode'
import { initStateIF, videosFormFieldStateIF } from 'suli-violin-website-types/src'


interface youtubeCodeFieldPropsIF {
  globalAppState: initStateIF
  formFieldValues: videosFormFieldStateIF
  setFormFieldValues: React.Dispatch<React.SetStateAction<videosFormFieldStateIF>>
}

const YoutubeCodeField = ({ globalAppState, formFieldValues, setFormFieldValues }: youtubeCodeFieldPropsIF) => {

  useTestIsValidYoutubeCode(setFormFieldValues, formFieldValues)

  const iFrame = ( formFieldValues.youtubeCode.isValid ? 
    <div style={{
      width: "100%",
      aspectRatio: '16/9',
      padding: 10
    }}>
      <iframe 
        width="90%"
        height="90%" 
        src={`https://www.youtube.com/embed/${formFieldValues.youtubeCode.code}`}
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowFullScreen
      />
    </div>
    : null
  )

  return (
    <>
      <label style={{
        marginBottom: 20,
        fontWeight: 600
      }}>
        YouTube code:
        <input
          onChange={(e) => {
            setFormFieldValues((prevState: any) => ({
              ...prevState,
              youtubeCode: {
                ...prevState.youtubeCode,
                code: e.target.value
              }
            }))
          }}
          disabled={!globalAppState.editFieldsEnabled}
          value={formFieldValues.youtubeCode.code}
        />
      </label>
      { iFrame }
    </>
  )
}

export default YoutubeCodeField