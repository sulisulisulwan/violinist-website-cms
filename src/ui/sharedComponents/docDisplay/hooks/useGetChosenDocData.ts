import { EventGroupAPI } from 'suli-violin-website-types/src'

const findCalendarDoc = (fetchedData: any, displayDocId: number, currentTab: string) => {
  let chosenDocData = fetchedData[currentTab].results.upcoming.find((data: EventGroupAPI) => { return data.id === displayDocId })
  if (!chosenDocData) {
    chosenDocData = fetchedData[currentTab].results.past.find((data: EventGroupAPI) => { return data.id === displayDocId })
  }
  return chosenDocData
}

const findMediaDoc = (fetchedData: any, displayDocId: number, currentTab: string) => {
  if (fetchedData.media === null) return null
  return fetchedData?.media[currentTab]?.find((data: any) => { return data?.id === displayDocId })
}

const findAudio = (fetchedData: any, displayDocId: number, currentTab: string) => {
  if (fetchedData.media === null) return null
  return fetchedData.media[currentTab].find((data: any) => { return data.id === displayDocId })
}

const findPlaylists = (fetchedData: any, displayDocId: number, currentTab: string) => {
  if (fetchedData.media === null) return null
  return fetchedData.media?.playlists?.find((data: any) => { return data.id === displayDocId })
}

const findDoc = (fetchedData: any, displayDocId: number, currentTab: string) => {
  if (fetchedData[currentTab] === null) return null
  return fetchedData[currentTab] ?
    fetchedData[currentTab].results.find((data: any) => { return data.id === displayDocId })
    : null
}

const targetDocMap: any = {
  audio: findAudio,
  bio: findDoc,
  blog: findDoc,
  calendar: findCalendarDoc,
  photos: findMediaDoc,
  playlists: findPlaylists,
  videos: findMediaDoc,
}

export const useGetChosenDocData = (fetchedData: any, currentTab: string, displayDocId: number) => {
  const targetDoc = targetDocMap[currentTab](fetchedData, displayDocId, currentTab)
  return targetDoc
}
