import React from "react"
import { TimeRange } from "../common"

interface Props {
  timeRange: TimeRange
  onTimeChange(newRange: TimeRange): void
}

const TimeSelection = (props: Props): JSX.Element => {
  const { timeRange, onTimeChange } = props
  const startTimeString = timeRange.startTime.toISOString().slice(0, 10)
  const endTimeString = timeRange.endTime.toISOString().slice(0, 10)

  const modifiedRange: TimeRange = { ...timeRange }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStartTimeChange = (event: any) => {
    if (event.target.valueAsDate === null) {
      modifiedRange.startTime = new Date()
      return
    }
    modifiedRange.startTime = event.target.valueAsDate
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEndTimeChange = (event: any) => {
    if (event.target.valueAsDate === null) {
      modifiedRange.endTime = new Date()
      return
    }
    modifiedRange.endTime = event.target.valueAsDate
  }

  const handleButtonClick = () => {
    onTimeChange(modifiedRange)
  }

  return (
    <>
      Search range start:{" "}
      <input
        type="date"
        onChange={handleStartTimeChange}
        defaultValue={startTimeString}
      />
      end:{" "}
      <input
        type="date"
        onChange={handleEndTimeChange}
        defaultValue={endTimeString}
      />
      <button type="button" onClick={handleButtonClick}>
        Update
      </button>
    </>
  )
}

export default TimeSelection
