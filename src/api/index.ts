import { bioApiHandler } from "./handlers/bio"
import { bioLongFormApiHandler } from "./handlers/bioLongForm"
import { bioShortFormApiHandler } from "./handlers/bioShortForm"
import { audioApiHandler } from "./handlers/audio"
import { blogApiHandler } from "./handlers/blog"
import { calendarApiHandler } from "./handlers/calendar"
import { mediaApiHandler } from "./handlers/media"
import { photosApiHandler } from "./handlers/photos"
import { playlistsApiHandler } from "./handlers/playlists"
import { videosApiHandler } from "./handlers/videos"
import { cmsAuthApiHandler } from "./handlers/cms-auth"
import { programsApiHandler } from "./handlers/programs"



export const apiResourceHandlersMap: Record<string, Function> = {
  audio: audioApiHandler,
  bio: bioApiHandler,
  bioLongForm: bioLongFormApiHandler,
  bioShortForm: bioShortFormApiHandler,
  blog: blogApiHandler,
  calendar: calendarApiHandler,
  cmsAuth: cmsAuthApiHandler,
  media: mediaApiHandler,
  playlists: playlistsApiHandler,
  programs: programsApiHandler,
  photos: photosApiHandler,
  videos: videosApiHandler
}
