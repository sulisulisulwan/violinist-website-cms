import { useContext } from "react"
import { GlobalAppStateManagement } from "../Cms"
import audioTextLoader from "./audioTextLoader"
import bioTextLoader from "./bioTextLoader"
import blogTextLoader from "./blogTextLoader"
import calendarTextLoader from "./calendarTextLoader"
import photosTextLoader from "./photosTextLoader"
import playlistsTextLoader from "./playlistsTextLoader"
import videosTextLoader from "./videosTextLoader"
import { formFieldStates } from 'suli-violin-website-types/src'


const useTextLoader = (tab: string, setFormFieldValues: React.Dispatch<React.SetStateAction<formFieldStates>>) => {
  const [globalAppState, setGlobalAppState] = useContext(GlobalAppStateManagement)
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