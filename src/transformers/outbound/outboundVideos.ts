import { OutboundTransformedVideoNotFormData, OutboundTransformedVideos, videosFormFieldStateIF } from 'suli-violin-website-types/src'

export const videosOutboundTransformer = (formFieldValues: videosFormFieldStateIF, docId: number | null): OutboundTransformedVideos  => {


  const videosUploadForm: any = document.getElementById('videos-upload-form')

  const isFormData = formFieldValues.thumbnailUploadPath.currPref === 'custom'
  const isNotSaved = formFieldValues.thumbnailUploadPath.currPref !== 'saved'

  if (isNotSaved) {
    formFieldValues.thumbnailUploadPath.saved = ''
  }

  console.dir(videosUploadForm)
  const transformed: OutboundTransformedVideos = isFormData ? new FormData(videosUploadForm) : {} as OutboundTransformedVideoNotFormData

  if (isFormData) {
    (transformed as FormData).append('youtubeCode', formFieldValues.youtubeCode.code);
    (transformed as FormData).append('id', docId ? docId.toString() : null); // <--- WATCH OUT
    (transformed as FormData).append('caption', formFieldValues.caption);
    (transformed as FormData).append('thumbnailUploadPath', JSON.stringify(formFieldValues.thumbnailUploadPath));
  } else {
    (transformed as OutboundTransformedVideoNotFormData).id = docId ? docId : null;
    (transformed as OutboundTransformedVideoNotFormData).caption = formFieldValues.caption;
    (transformed as OutboundTransformedVideoNotFormData).thumbnailUploadPath = JSON.stringify(formFieldValues.thumbnailUploadPath);
    (transformed as OutboundTransformedVideoNotFormData).youtubeCode = formFieldValues.youtubeCode.code;
  }
  
  return transformed

}
