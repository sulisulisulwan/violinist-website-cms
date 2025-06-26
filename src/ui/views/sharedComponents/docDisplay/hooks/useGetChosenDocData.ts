import { EventGroupAPI } from 'suli-violin-website-types/src'

const findCalendarDoc = (fetchedData: any, displayDocId: number, currentTab: string) => {
  if (fetchedData === null || currentTab !== fetchedData.dataType) return null
  let chosenDocData = fetchedData.results.upcoming.find((data: EventGroupAPI) => { return data.id === displayDocId })
  if (!chosenDocData) {
    chosenDocData = fetchedData.results.past.find((data: EventGroupAPI) => { return data.id === displayDocId })
  }
  return chosenDocData
}

const findAudio = (fetchedData: any, displayDocId: number, currentTab: string) => {
  if (fetchedData === null || currentTab !== fetchedData.dataType) return null
  return fetchedData.results.find((data: any) => { return data.id === displayDocId })
}

const findPhotos = (fetchedData: any, displayDocId: number, currentTab: string) => {
  if (fetchedData === null || currentTab !== fetchedData.dataType) return null
  return fetchedData.results.find((data: any) => { return data.id === displayDocId })
}

const findVideos = (fetchedData: any, displayDocId: number, currentTab: string) => {
  if (fetchedData === null || currentTab !== fetchedData.dataType) return null
  return fetchedData.results.find((data: any) => { return data.id === displayDocId })
}

const findPlaylists = (fetchedData: any, displayDocId: number, currentTab: string) => {
  if (fetchedData === null || currentTab !== fetchedData.dataType) return null
  return fetchedData.results.playlists.find((data: any) => { return data.id === displayDocId })
}

const findBlogDoc = (fetchedData: any, displayDocId: number, currentTab: string) => {
  if (fetchedData === null || currentTab !== fetchedData.dataType) return null
  return fetchedData.results.find((data:any) => { return data.id === displayDocId })
}

const findBioDoc = (fetchedData: any, displayDocId: number, currentTab: string) => {
  if (fetchedData === null || currentTab !== fetchedData.dataType) return null
  return fetchedData.results.find((data: any) => { return data.id === displayDocId })
}

const findProgramDoc = (fetchedData: any, displayDocId: number, currentTab: string) => {
  //TODO:
  if (fetchedData === null 
    || currentTab !== fetchedData.dataType
  ) return null
  return fetchedData.results.find((data: any) => { return data.id === displayDocId })
}

const targetDocMap: any = {
  audio: findAudio,
  bio: findBioDoc,
  blog: findBlogDoc,
  calendar: findCalendarDoc,
  photos: findPhotos,
  playlists: findPlaylists,
  programs: findProgramDoc,
  videos: findVideos,
}

export const useGetChosenDocData = (fetchedData: any, currentTab: string, displayDocId: number) => {
  const targetDoc = targetDocMap[currentTab](fetchedData, displayDocId, currentTab)
  return targetDoc
}
