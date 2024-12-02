import { useEffect } from "react"
import { BlogItemAPI, ParsedHTMLComponent, blogFormFieldStateIF, initStateIF, setStateSSA } from 'suli-violin-website-types/src'
import parser from "../../utils/ComponentParserr"

const blogTextLoader = (state: initStateIF, setState: setStateSSA, setFormFieldValues: React.Dispatch<React.SetStateAction<blogFormFieldStateIF>>) => {
  useEffect(() => {
    if (state.currWorkflow === 'loadText') {
      const targetDoc = state.editDocId === null ? 
          { title: '', components: [], dateCreated: '', dateLastModified: '' } 
        : state.fetchedData.results.find((doc: BlogItemAPI) => state.editDocId === doc.id)

      const loadText = parser.parseToHtml(targetDoc.components)

      setState((prevState) => ({ ...prevState, currWorkflow: '' }))
      setFormFieldValues(() => ({
        textEditorText: loadText,
        titleText: targetDoc.title,
        dateCreated: targetDoc.dateCreated,
        dateLastModified: targetDoc.dateLastModified
      }))
    }

    
  }, [state])
}
export default blogTextLoader