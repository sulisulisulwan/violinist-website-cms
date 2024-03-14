import { OutboundTransformedPhotos, photosFormFieldStateIF } from 'suli-violin-website-types/src'

export const photosOutboundTransformer = (formFieldValues: photosFormFieldStateIF, docId: number | null): OutboundTransformedPhotos  => {

  if (docId === null) {
    const audioUploadForm: any = document.getElementById('photos-upload-form')
    const transformed = new FormData(audioUploadForm)
  
    transformed.append('photoCred', formFieldValues.photoCred)
    transformed.append('id', docId ? docId.toString() : null) // <--- WATCH OUT
    transformed.append('type', 'media-photo')
    return transformed
  }

  const transformed = {
    id: docId,
    photoCred: formFieldValues.photoCred,
    type: 'media-photo'
  }

  return transformed

}
