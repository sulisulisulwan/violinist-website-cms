import { dateTimeObjectToDateTime } from '../../utils/dateFunctions'
import { EventGroupAPI, calendarFormFieldStateIF, eventListingFormStateIF } from 'suli-violin-website-types/src'

// ids get set in the saveDocument routine

export const calendarOutboundTransformer = (formFieldValues: calendarFormFieldStateIF, docId: number | null): EventGroupAPI => {
  const start = dateTimeObjectToDateTime({ date: formFieldValues.dateRange.start, time: { hour: '00', minute: '00', amPm: 'AM' } })
  const end = dateTimeObjectToDateTime({ date: formFieldValues.dateRange.end, time: { hour: '00', minute: '00', amPm: 'AM' } })

  const transformed: EventGroupAPI = {
    id: docId,
    ...formFieldValues,
    dateRange: {
      start,
      end,
    },
    eventDates: formFieldValues.eventDates.map((eventDate: eventListingFormStateIF) => {
      return {
        ...eventDate,
        id: eventDate.id || null,
        dateTime: dateTimeObjectToDateTime(eventDate.dateTime),
        eventGroupingId: eventDate.eventGroupingId || null,
      }
    })
  }

  return transformed
}
