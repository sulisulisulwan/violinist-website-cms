
import { bioOutboundTransformer } from './outbound/outboundBiography'
import { calendarOutboundTransformer } from './outbound/outboundCalendar'

import { bioInboundTransformer } from './inbound/inboundBiography'
import { calendarInboundTransformer } from "./inbound/inboundCalendar"
import { mediaInboundTransformer } from "./inbound/inboundMedia"
import { audioOutboundTransformer } from './outbound/outboundAudio'
import { photosOutboundTransformer } from './outbound/outboundPhotos'
import { videosOutboundTransformer } from './outbound/outboundVideos'
import { blogOutboundTransformer } from './outbound/outboundBlog'
import { blogInboundTransformer } from './inbound/inboundBlog'
import { playlistOutboundTransformer } from './outbound/outboundPlaylists'
import { OutboundTransformer } from 'suli-violin-website-types/src'
import { audioInboundTransformer } from './inbound/inboundAudio'
import { videosInboundTransformer } from './inbound/inboundVideos'
import { photosInboundTransformer } from './inbound/inboundPhotos'
import { playlistsInboundTransformer } from './inbound/inboundPlaylists'
import { programsInboundTransformer } from './inbound/inboundPrograms'
import { programsOutboundTransformer } from './outbound/outboundPrograms'


export const inboundTransformerMap: Record<string, Function> = {
  audio: audioInboundTransformer,
  bio: bioInboundTransformer,
  blog: blogInboundTransformer,
  calendar: calendarInboundTransformer,
  media: mediaInboundTransformer,
  videos: videosInboundTransformer,
  playlists: playlistsInboundTransformer,
  programs: programsInboundTransformer,
  photos: photosInboundTransformer,
}

export const outboundTransformerMap: Record<string, OutboundTransformer> = {
  audio: audioOutboundTransformer,
  bio: bioOutboundTransformer,
  blog: blogOutboundTransformer,
  calendar: calendarOutboundTransformer,
  photos: photosOutboundTransformer,
  programs: programsOutboundTransformer,
  playlists: playlistOutboundTransformer,
  videos: videosOutboundTransformer
}


