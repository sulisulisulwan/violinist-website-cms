import { PlaylistItemAPI, playlistFormFieldStateIF } from 'suli-violin-website-types/src'

// id gets applied within the saveDocument routine

export const playlistOutboundTransformer = (formFieldValues: playlistFormFieldStateIF, docId: number | null): PlaylistItemAPI => {

  const transformed: PlaylistItemAPI = {
    id: docId,
    name: formFieldValues.name,
    playlistTracks: formFieldValues.playlistTracks.map(track => ({ id: track.id, playlistId: docId, audioTrackId: track.audioTrackId }))
  }
  return transformed
}
