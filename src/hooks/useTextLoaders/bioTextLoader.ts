import { useEffect } from "react"
import parser from '../../utils/ComponentParserr'
import { BiographyItemAPI, ParsedHTMLComponent, bioFormFieldStateIF, initStateIF, setStateSSA } from 'suli-violin-website-types/src'

const bioTextLoader = (state: initStateIF, setState: setStateSSA, setFormFieldValues: React.Dispatch<React.SetStateAction<bioFormFieldStateIF>>) => {
  useEffect(() => {

    if (state.currWorkflow === 'loadText') {
      const targetDoc = state.editDocId === null ? 
          { name: '', components: [] } 
        : state.fetchedData.results.find((doc: BiographyItemAPI) => state.editDocId === doc.id)

      const loadText = parser.parseToHtml(targetDoc.components)

      setState((prevState) => ({ ...prevState, currWorkflow: '' }))
      setFormFieldValues(() => ({
        textEditorText: loadText,
        titleText: targetDoc.name
      }))
    }

    
  }, [state])
}

export default bioTextLoader