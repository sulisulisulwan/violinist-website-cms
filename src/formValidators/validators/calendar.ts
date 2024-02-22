import { calendarFormFieldStateIF, threeLetterMonths, validationObjIF } from 'suli-violin-website-types/src'
import { monthToNum } from "../../utils/dateFunctions"
import { getValidationObject } from "../getValidationObject"

const calendarFormValidator = (formValues: calendarFormFieldStateIF): validationObjIF => {
  const validationData = getValidationObject()

  try {
    const startMonth = formValues.dateRange.start.month
    const startDay = formValues.dateRange.start.day
    const startYear = formValues.dateRange.start.year
    
    const endMonth = formValues.dateRange.end.month
    const endDay = formValues.dateRange.end.day
    const endYear = formValues.dateRange.end.year
  
    if (Number(endYear) < Number(startYear)) throw 'End date must be after start date.'
    if (Number(endYear) === Number(startYear)) {
      if (Number(monthToNum(endMonth as threeLetterMonths)) < Number(startMonth)) throw 'End date must be after start date.'
      if (Number(endMonth) === Number(startMonth)) {
        if (Number(endDay) < Number(startDay)) throw 'End date must be after start date.'
      }
    }
  
    const artists = formValues.artists
    artists.forEach(artist => {
      const artistName = artist.name
      if (!artistName) throw 'Artist name field can not be empty.'
    })
  
    const program = formValues.program
    program.forEach(programItem => {
      const programWork = programItem.work
      if (!programWork) throw 'Program work field can not be empty.'
    })
    
    const eventDates = formValues.eventDates
    eventDates.forEach((eventDate) => {
      const eventDateMonth = eventDate.dateTime.date.month
      const eventDateDay = eventDate.dateTime.date.day
      const eventDateYear = eventDate.dateTime.date.year

      if (Number(eventDateYear) < Number(startYear)) throw 'Event date must be within the global date range.'
      if (Number(eventDateYear) === Number(startYear)) {
        if (Number(monthToNum(eventDateMonth as threeLetterMonths)) < Number(startMonth)) throw 'Event date must be within the global date range'
        if (Number(eventDateMonth) === Number(startMonth)) {
          if (Number(eventDateDay) < Number(startDay)) throw 'Event date must be within the global date range.'
        }
      }
      if (Number(eventDateYear) > Number(endYear)) throw 'Event date must be within the global date range.'
      if (Number(eventDateYear) === Number(endYear)) {
        if (Number(monthToNum(eventDateMonth as threeLetterMonths)) > Number(endMonth)) throw 'Event date must be within the global date range.'
        if (Number(eventDateMonth) === Number(endMonth)) {
          if (Number(eventDateDay) > Number(endDay)) throw 'Event date must be within the global date range.'
        }
      }
    })
    
  } catch(e) {
    validationData.isValid = false
    validationData.errorMessage = e
  }

  return validationData
}

export { calendarFormValidator }