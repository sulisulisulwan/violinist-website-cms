import { 
  audioFormFieldStateIF, 
  bioFormFieldStateIF, 
  blogFormFieldStateIF, 
  calendarFormFieldStateIF, 
  formTypes, 
  photosFormFieldStateIF, 
  playlistFormFieldStateIF, 
  videosFormFieldStateIF 
} from 'suli-violin-website-types/src'


const getBioForm = (): bioFormFieldStateIF => {
  return {
    textareaText: '',
    titleText: '',
  }

}

const getCalendarForm = (): calendarFormFieldStateIF => {
  const [defaultWeekday, defaultMonth, defaultDay, defaultYear] = new Date().toDateString().split(' ')
  
  return {
    dateRange: {
      start: {
        month: defaultMonth,
        day: defaultDay,
        year: defaultYear
      },
      end: {
        month: defaultMonth,
        day: defaultDay,
        year: defaultYear
      }
    },
    type: '',
    venue: '',
    presenter: '',
    artists: [],
    program: [],
    eventDates: []
  }

}

const getBlogForm = (): blogFormFieldStateIF => {
  return {
    titleText: '',
    textareaText: '',
    dateCreated: '',
    dateLastModified: ''
  }
}

const getVideosForm = (): videosFormFieldStateIF => {
  return {
    thumbnailUploadPath: {
      currPref: '',
      defaultYT: '',
      custom: '',
      saved: ''
    },
    youtubeCode: {
      isValid: false,
      code: ''
    },
    caption: ''
  }
}

const getPhotosForm = (): photosFormFieldStateIF => {
  return {
    uploadPath: '',
    photoCred: ''
  }
}

const getAudioForm = (): audioFormFieldStateIF => {
  return {
    uploadPath: '',
    author: '',
    title: ''
  } 
}

const getPlaylistsForm = (): playlistFormFieldStateIF => {

  return {
    name: '',
    playlistTracks: []
  }
}

export const getInitFormFieldsState = (tab: formTypes) => {

  switch (tab) {
    case 'audio':
      return getAudioForm()
    case 'bio':
      return getBioForm()
    case 'blog':
      return getBlogForm()
    case 'calendar':
      return getCalendarForm()
    case 'photos':
      return getPhotosForm()
    case 'playlists':
      return getPlaylistsForm()
    case 'videos':
      return getVideosForm()
    default: 
      throw new Error('Invalid form getter')
  }

}

