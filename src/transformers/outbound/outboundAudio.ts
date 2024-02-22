import { OutboundTransformedAudio, audioFormFieldStateIF } from 'suli-violin-website-types/src'

export const audioOutboundTransformer = (formFieldValues: audioFormFieldStateIF, docId: number | null): OutboundTransformedAudio  => {

  if (docId === null) {
    const audioUploadForm: any = document.getElementById('audio-upload-form')
    const transformed = new FormData(audioUploadForm)
  
    transformed.append('author', formFieldValues.author)
    transformed.append('title', formFieldValues.title)
    transformed.append('id', docId ? docId.toString() : null) // <--- WATCH OUT
    return transformed
  }

  const transformed = {
    id: docId,
    author: formFieldValues.author,
    title: formFieldValues.title,
  }

  return transformed

}
