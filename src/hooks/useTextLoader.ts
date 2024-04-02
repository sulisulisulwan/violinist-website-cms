import { useContext } from "react"
import { GlobalAppStateManagement } from "../Cms"
import audioTextLoader from "./useTextLoaders/audioTextLoader"
import bioTextLoader from "./useTextLoaders/bioTextLoader"
import blogTextLoader from "./useTextLoaders/blogTextLoader"
import calendarTextLoader from "./useTextLoaders/calendarTextLoader"
import photosTextLoader from "./useTextLoaders/photosTextLoader"
import playlistsTextLoader from "./useTextLoaders/playlistsTextLoader"
import videosTextLoader from "./useTextLoaders/videosTextLoader"
import { formFieldStates } from 'suli-violin-website-types/src'


const useTextLoader = (tab: string, setFormFieldValues: React.Dispatch<React.SetStateAction<formFieldStates>>) => {
  const { appStateManagement } = useContext(GlobalAppStateManagement)
  const [globalAppState, setGlobalAppState] = appStateManagement
  const textLoader = textLoaderMap[tab]
  textLoader(globalAppState, setGlobalAppState, setFormFieldValues)
}

const textLoaderMap: Record<string, Function> = {
  audio: audioTextLoader,
  bio: bioTextLoader,
  blog: blogTextLoader,
  calendar: calendarTextLoader,
  photos: photosTextLoader,
  playlists: playlistsTextLoader,
  videos: videosTextLoader,
}



export default useTextLoader