import * as React from 'react'
import ListButton from '../../sharedComponents/ListButton'
import { useGetThumbnailPreview } from '../hooks/useGetThumbnailPreview'
import { initStateIF, videosFormFieldStateIF } from 'suli-violin-website-types/src'


interface thumnbailFieldPropsIF {
  formRef: React.MutableRefObject<HTMLFormElement>
  globalAppState: initStateIF
  formFieldValues: videosFormFieldStateIF
  setFieldInForm: Function
}

const ThumbnailField = ({ globalAppState, formFieldValues, formRef, setFieldInForm }: thumnbailFieldPropsIF) => {

  const thumbnailPreviewSrc = useGetThumbnailPreview(formFieldValues, formRef.current, globalAppState.editDocId)

  return (
    <label style={{
      fontWeight: 600,
      marginBottom: 20
    }}>
      Thumbnail:

      <div style={{
        marginLeft: 10,
        fontWeight: 100
      }}>
        <div style={{ paddingTop: 20 }}>
          {
            formFieldValues.thumbnailUploadPath.currPref === 'saved' ?
              <div style={{ margin: 'auto', width: 100, textAlign: 'center' }}>
                <ListButton
                  text={'REPLACE'}
                  onClickHandler={() => {
                    setFieldInForm('thumbnailUploadPath', { 
                      ...formFieldValues.thumbnailUploadPath,
                      currPref: '', 
                    })
                  }}
                  isDisabled={false}
                />
              </div>
              :
              <ThumbnailPreference 
                globalAppState={globalAppState}
                formFieldValues={formFieldValues}
                setFieldInForm={setFieldInForm}
              />
          }

        </div>
      </div>
      <ThumbnailPreview thumbnailPreviewSrc={thumbnailPreviewSrc}/>
    </label>
  )
}




interface thumnbailPreferencePropsIF {
  globalAppState: initStateIF
  formFieldValues: videosFormFieldStateIF
  setFieldInForm: Function
}

const getSelectValue = (youtubeCode: string, imgIdx: string) => {
  return `https://img.youtube.com/vi/${youtubeCode}/${imgIdx}.jpg`
}

const ThumbnailPreference = ({ globalAppState, formFieldValues, setFieldInForm }: thumnbailPreferencePropsIF) => {

  const currPref = formFieldValues.thumbnailUploadPath.currPref
  const youtubeCodeIsValid = formFieldValues.youtubeCode.isValid

  const defaultYT = formFieldValues.thumbnailUploadPath.defaultYT
  const selectDefaultValue = defaultYT ? defaultYT.substring(defaultYT.length - 5, defaultYT.length - 4).toString() : "0"

  const selectComponent = youtubeCodeIsValid ? 
    <select 
      disabled={!globalAppState.editFieldsEnabled}
      style={{
        display: currPref === 'defaultYT' ? '' : 'none'
      }}
      onChange={(e) => { setFieldInForm('thumbnailUploadPath', { 
        ...formFieldValues.thumbnailUploadPath,
        defaultYT: getSelectValue(formFieldValues.youtubeCode.code, e.target.value)
      })}}
      defaultValue={selectDefaultValue}
    >
      <option value={0}>1</option>
      <option value={1}>2</option>
      <option value={2}>3</option>
      <option value={3}>4</option>
    </select>
    :
    <select
      disabled={!globalAppState.editFieldsEnabled}
    >
      <option value="INVALID">You must enter a valid YouTube Code</option>
    </select>



  return (
    <>
      { 
        globalAppState.editDocId !== null && formFieldValues.thumbnailUploadPath.currPref !== 'saved' ? 
          <div style={{ margin: 'auto', width: 100, textAlign: 'center' }}>
            <ListButton
              text={'CANCEL'}
              isDisabled={false}
              onClickHandler={() => { setFieldInForm('thumbnailUploadPath', { 
                ...formFieldValues.thumbnailUploadPath,
                custom: '',
                currPref: 'saved'
              })}}
            />
          </div>
          : 
          null
      }
      <div style={{ paddingTop: 20 }}>
        <label style={{ marginRight: 10 }}>
          Default Youtube:
          <input 
            disabled={!globalAppState.editFieldsEnabled}
            onClick={() => { setFieldInForm('thumbnailUploadPath', { 
              ...formFieldValues.thumbnailUploadPath,
              currPref: 'defaultYT',
              defaultYT: `https://img.youtube.com/vi/${formFieldValues.youtubeCode.code}/${selectDefaultValue}.jpg`,
            })}}
            type="radio" 
            name="thumbnail-preference"
            value={'defaultYT'}
            />
        </label>
        <label>
          Custom upload:
          <input 
            disabled={!globalAppState.editFieldsEnabled}
            onClick={() => { setFieldInForm('thumbnailUploadPath', { 
              ...formFieldValues.thumbnailUploadPath,
              currPref: 'custom',
            }) }}
            type="radio" 
            name="thumbnail-preference"
            value={'custom'}
          />
        </label>
      </div>
      <div>
        { currPref === 'defaultYT' ? selectComponent : null }
        <input 
          style={{
            display: currPref === 'custom' ? '' : 'none'
          }}
          type='file' 
          name='video-thumbnail'
          onChange={(e) => { setFieldInForm('thumbnailUploadPath', { 
            ...formFieldValues.thumbnailUploadPath,
            custom: e.target.value 
          })}}
          value={formFieldValues.thumbnailUploadPath.custom}
        />
      </div>
    </>
  )
}






interface thumbnailPreviewSrcPropsIF {
  thumbnailPreviewSrc: string
}

const ThumbnailPreview = ({ thumbnailPreviewSrc }: thumbnailPreviewSrcPropsIF) => {

  return (
    <div style={{
      paddingTop: 50,
      height: 200,
      minHeight: 200,
      textAlign: 'center'
    }}>
      {
        thumbnailPreviewSrc === null ? 
        null :
        <img
          height={'100%'}
          id="youtube-thumbnail"
          src={thumbnailPreviewSrc}
        /> 
      }
    </div>
  )

}


export default ThumbnailField