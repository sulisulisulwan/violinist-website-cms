import { BlogItemAPI, blogFormFieldStateIF } from 'suli-violin-website-types/src'
import parser from '../../utils/ComponentParserr'
// id gets applied within the saveDocument routine

export const blogOutboundTransformer = (formFieldValues: blogFormFieldStateIF, docId: number | null): BlogItemAPI => {
  const components = parser.parseToComponents(formFieldValues.textEditorText)
  const title = formFieldValues.titleText 

  const transformed: any = {
    id: docId,
    title,
    components
  }
  return transformed
}
