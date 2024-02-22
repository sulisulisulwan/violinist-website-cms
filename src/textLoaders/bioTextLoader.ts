import { useEffect } from "react"
import { BiographyItemAPI, ParsedHTMLComponent, bioFormFieldStateIF, initStateIF, setStateSSA } from 'suli-violin-website-types/src'

const bioTextLoader = (state: initStateIF, setState: setStateSSA, setFormFieldValues: React.Dispatch<React.SetStateAction<bioFormFieldStateIF>>) => {
  useEffect(() => {
    if (state.currWorkflow === 'loadText') {
      const targetDoc = state.editDocId === null ? 
          { name: '', components: [] } 
        : state.fetchedData.bio.results.find((doc: BiographyItemAPI) => state.editDocId === doc.id)

      const loadText = targetDoc.components.reduce((memo: string, component: ParsedHTMLComponent) => {
        let componentText = ''
  
        if (component.type === 'p') {
          componentText += (component.content
           + '\n\n')
        }
  
        return memo += componentText
      }, '')
  
      setState((prevState) => ({ ...prevState, currWorkflow: '' }))
      setFormFieldValues(() => ({
        textareaText: loadText,
        titleText: targetDoc.name
      }))
    }

    
  }, [state])
}

export default bioTextLoader