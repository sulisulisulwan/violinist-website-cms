import * as React from 'react'
import { parseTimeAsNonMilitaryAMPM } from '../../../../utils/dateFunctions'

interface selectTimePropsIF {
  timeStateProps: {
    hour: string;
    minute: string;
    seconds: string;
  }
  setTimeState: React.Dispatch<React.SetStateAction<any>>
}

const SelectTime = ({ timeStateProps, setTimeState }: selectTimePropsIF) => {
  const { amPm, hour, minute } = parseTimeAsNonMilitaryAMPM({ time: timeStateProps } as any)
  const paddedHour = Number(hour) < 10 ? '0' + Number(hour) : hour
  const paddedMinute = Number(minute) < 10 ? '0' + Number(minute) : minute

  return (
    <div>
      <input 
        type="number"
        min={1}
        max={12}
        onChange={(e) => {
          setTimeState({
            ...timeStateProps,
            hour: amPm === 'PM' ? (Number(e.target.value) + 12).toString() : e.target.value
          })
        }}
        value={paddedHour}
        />
      <input 
        min={0}
        max={59}
        type="number"
        onChange={(e) => {
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