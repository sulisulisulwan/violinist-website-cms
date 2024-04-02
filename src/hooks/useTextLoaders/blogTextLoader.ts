import { useEffect } from "react"
import { BlogItemAPI, ParsedHTMLComponent, blogFormFieldStateIF, initStateIF, setStateSSA } from 'suli-violin-website-types/src'

const blogTextLoader = (state: initStateIF, setState: setStateSSA, setFormFieldValues: React.Dispatch<React.SetStateAction<blogFormFieldStateIF>>) => {
  useEffect(() => {
    if (state.currWorkflow === 'loadText') {
      const targetDoc = state.editDocId === null ? 
          { title: '', components: [], dateCreated: '', dateLastModified: '' } 
        : state.fetchedData.results.find((doc: BlogItemAPI) => state.editDocId === doc.id)

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
        titleText: targetDoc.title,
        dateCreated: targetDoc.dateCreated,
        dateLastModified: targetDoc.dateLastModified
      }))
    }

    
  }, [state])
}
export default blogTextLoader