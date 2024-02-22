import { AxiosResponse } from "axios"
import { BlogItemAPI } from 'suli-violin-website-types/src'

export type blogInboundTransformedData = {
  results: BlogItemAPI[]
}

export const blogInboundTransformer = (apiData: AxiosResponse): blogInboundTransformedData => {

  const transformed = apiData.data.results.map((result: any) => {
    return {
      id: result.id,
      title: result.title,
      components: result.components,
      dateCreated: result.dateCreated,
      dateLastModified: result.dateLastModified
    }
  })

  return { results: transformed }
}
