import * as React from 'react'
import { parseTimeAsNonMilitaryAMPM } from '../../../../utils/dateFunctions'

interface selectTimePropsIF {
  timeStateProps: {
    hour: string;
    minute: string;
    amPm: string;
  }
  setTimeState: React.Dispatch<React.SetStateAction<any>>
}

const padTime = (timeAsString: string) => {
  let padded = timeAsString
  if (Number(timeAsString) < 10) {
    padded = '0' + Number(timeAsString) 
  } else {
    padded = Number(timeAsString) + ''
  }

  return padded
}

const SelectTime = ({ timeStateProps, setTimeState }: selectTimePropsIF) => {
  // const { hour, minute, amPm } = timeStateProps
  const { amPm, hour, minute } = parseTimeAsNonMilitaryAMPM({ time: timeStateProps } as any)
  const paddedMinute = padTime(minute)

  return (
    <div>
      <select 
        value={hour}
        onChange={(e) => {

          if (Number(e.target.value) > 12) return

          setTimeState({
            ...timeStateProps,
            hour: amPm === 'PM' ? (Number(e.target.value) + 12).toString() : e.target.value
          })
        }}
      >
        {[1,2,3,4,5,6,7,8,9,10,11,12].map((hourOption, index) => {
          return <option key={'selectTime' + hourOption + index} value={hourOption.toString()}>{hourOption}</option>
        })}
      </select>
      <input 
        min={0}
        max={59}
        type="number"
        onChange={(e) => {
          if (Number(e.target.value) > 59) return
          setTimeState({
            ...timeStateProps,
            minute: e.target.value
          })
        }}
        value={paddedMinute}
      />
      <select 
        value={amPm}
        onChange={(e) => {
          setTimeState({
            ...timeStateProps,
            amPm: e.target.value,
            hour: e.target.value === 'PM' ? (Number(hour) + 12).toString() : hour.toString()
          })
        }}
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  )
}

export default SelectTime