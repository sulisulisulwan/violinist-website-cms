import { componentParser } from '../../utils/componentParser'
import { BlogItemAPI, blogFormFieldStateIF } from 'suli-violin-website-types/src'

// id gets applied within the saveDocument routine

export const blogOutboundTransformer = (formFieldValues: blogFormFieldStateIF, docId: number | null): BlogItemAPI => {
  const components = componentParser(formFieldValues.textareaText)
  const title = formFieldValues.titleText 

  const transformed: any = {
    id: docId,
    title,
    components
  }
  return transformed
}
