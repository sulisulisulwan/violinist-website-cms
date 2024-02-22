import { audioFormValidator } from "./validators/audio"
import { bioFormValidator } from "./validators/bio"
import { calendarFormValidator } from "./validators/calendar"
import { photosFormValidator } from "./validators/photos"
import { videosFormValidator } from "./validators/videos"
import { blogFormValidator } from "./validators/blog"
import { playlistsFormValidator } from "./validators/playlists"
import { validator } from 'suli-violin-website-types/src'

export const validatorMap: Record<string, validator> = {
  bio: bioFormValidator,
  blog: blogFormValidator,
  calendar: calendarFormValidator,
  audio: audioFormValidator,
  photos: photosFormValidator,
  playlists: playlistsFormValidator,
  videos: videosFormValidator
}
