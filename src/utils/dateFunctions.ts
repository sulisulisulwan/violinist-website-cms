import { 
  eventListingDateTimeObjIF, 
  paddedMonthNumbers, 
  parsedAsNonMilitaryTime, 
  parsedDateAndTime, 
  threeLetterMonths 
} from 'suli-violin-website-types/src'



export const numToMonth = (numAsString: paddedMonthNumbers): threeLetterMonths => {
  const map: Record<paddedMonthNumbers, threeLetterMonths> = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
  }
  return map[numAsString]
}

export const monthToNum = (month: threeLetterMonths): paddedMonthNumbers => {
  const map: Record<threeLetterMonths, paddedMonthNumbers> = {
    'Jan': '01',
    'Feb': '02',
    'Mar': '03',
    'Apr': '04',
    'May': '05',
    'Jun': '06',
    'Jul': '07',
    'Aug': '08',
    'Sep': '09',
    'Oct': '10',
    'Nov': '11',
    'Dec': '12',
  }
  return map[month]
}


export const parseDateTime = (dateTimeIsoString: string): parsedDateAndTime => {

  const [date, time] = dateTimeIsoString.split('T')
  const [year, month, day] = date.split('-')
  const [hour, minute, seconds] = time.split(':')

  return {
    date: {
      year,
      month,
      day
    },
    time: {
      hour,
      minute,
      seconds
    }
  }
}

export const parseTimeAsNonMilitaryAMPM = (parsedDateTime: parsedDateAndTime): parsedAsNonMilitaryTime => {
  const { hour, minute } = parsedDateTime.time

  let hourNonMilitary = Number(hour)
  hourNonMilitary = hourNonMilitary > 12 ? hourNonMilitary - 12 : hourNonMilitary
  const amPm = Number(hour) >= 12 ? 'PM' : 'AM'
  hourNonMilitary = hourNonMilitary === 0 ? 12 : hourNonMilitary

  return {
    hour: hourNonMilitary.toString(),
    minute: minute,
    amPm
  }
}

export const dateTimeObjectToDateTime = (dateTimeObj: eventListingDateTimeObjIF) => {
  let date = '' + dateTimeObj.date.year + '-' +
    monthToNum(dateTimeObj.date.month as threeLetterMonths) + '-' +
    dateTimeObj.date.day
  let time = '' + dateTimeObj.time.hour + ':' +
    dateTimeObj.time.minute + ':' +
    '00'

  const dateTime = date + ' ' + time

  return dateTime
}