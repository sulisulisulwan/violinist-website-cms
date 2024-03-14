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
  console.log(fetchedData)
  return fetchedData.results.playlists.find((data: any) => { return data.id === displayDocId })
}

const findDoc = (fetchedData: any, displayDocId: number, currentTab: string) => {
  if (fetchedData === null || currentTab !== fetchedData.dataType) return null
  return fetchedData[currentTab] ?
    fetchedData[currentTab].results.find((data: any) => { return data.id === displayDocId })
    : null
}

const findBioDoc = (fetchedData: any, displayDocId: number, currentTab: string) => {
  if (fetchedData === null || currentTab !== fetchedData.dataType) return null
  return fetchedData.results.find((data: any) => { return data.id === displayDocId })
}

const targetDocMap: any = {
  audio: findAudio,
  bio: findBioDoc,
  blog: findDoc,
  calendar: findCalendarDoc,
  photos: findPhotos,
  playlists: findPlaylists,
  videos: findVideos,
}

export const useGetChosenDocData = (fetchedData: any, currentTab: string, displayDocId: number) => {
  const targetDoc = targetDocMap[currentTab](fetchedData, displayDocId, currentTab)
  return targetDoc
}
