import { AxiosResponse } from "axios"
// import { BiographyItemAPI } from 'suli-violin-website-types/src'

export type programsInboundTransformedData = {
  dataType: 'programs'
  results: any[]//BiographyItemAPI[] should be ProgramsItemAPI[]
}

export const programsInboundTransformer = (apiData: AxiosResponse): programsInboundTransformedData => {
  return {
    dataType: 'programs',
    ...apiData.data
  }
}
