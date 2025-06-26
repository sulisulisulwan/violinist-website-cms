import { componentParser } from '../../utils/componentParser'
import { BiographyItemAPI, bioFormFieldStateIF } from 'suli-violin-website-types/src'
import parser from '../../utils/ComponentParserr'
// id gets applied within the saveDocument routine

export const programsOutboundTransformer = (formFieldValues: bioFormFieldStateIF, docId: number | null): BiographyItemAPI => {

  const components = parser.parseToComponents(formFieldValues.textEditorText)
  const name = formFieldValues.titleText 

  const transformed: BiographyItemAPI = {
    id: docId,
    name: name,
    components
  }
  return transformed
}
