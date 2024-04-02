import { numToMonth, parseDateTime } from "../../utils/dateFunctions"
import { CalendarDataAPI, EventGroupAPI, CalendarInboundTransformedData, paddedMonthNumbers } from 'suli-violin-website-types/src'
import { AxiosResponse } from "axios"

export const calendarInboundTransformer = (apiData: AxiosResponse): CalendarInboundTransformedData => {

  
  const transformed:CalendarInboundTransformedData = {
    dataType: 'calendar',
    results: {
      upcoming: [],
      past: []
    }
  }

  for (let key in apiData.data.results as CalendarDataAPI) {

    transformed.results[key as keyof CalendarDataAPI] = apiData.data.results[key].map((data: EventGroupAPI) => {
      
      const parsedStartDate = parseDateTime(data.dateRange.start)
      const parsedEndDate = parseDateTime(data.dateRange.end)

      const t = {
        id: data.id,
        artists: data.artists,
        program: data.program,
        type: data.type,
        venue: data.venue,
        presenter: data.presenter,
        dateRange: {
          start: {
            day: parsedStartDate.date.day,
            month: numToMonth(parsedStartDate.date.month as paddedMonthNumbers),
            year: parsedStartDate.date.year
          },
          end: {
            day: parsedEndDate.date.day,
            month: numToMonth(parsedEndDate.date.month as paddedMonthNumbers),
            year: parsedEndDate.date.year
          },
        },
        eventDates: data.eventDates.map(eventDate => {

          const parsedDateTime = parseDateTime(eventDate.dateTime)
          const transformedEventDate = {
            id: eventDate.id,
            dateTime: parsedDateTime,
            link: eventDate.link,
            location: eventDate.location,
            eventGroupingId: eventDate.eventGroupingId,
          }
          transformedEventDate.dateTime.date.month = numToMonth(parsedDateTime.date.month as paddedMonthNumbers)
          return transformedEventDate
        })
      }
      return t
    })
    
  }

  return transformed
}
