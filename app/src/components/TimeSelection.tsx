import React from "react"

/**
 * Expected props for the TimeSelection component
 */
export interface Props {
  /**
   * Currently selected TimeRange in App state
   */
  timeRange: TimeRange
  /**
   * Callback function for when user changes TimeRange
   * @param newRange changed TimeRange
   */
  onTimeChange(newRange: TimeRange): void
}

/**
 * Reusable TimeSelection component that gives user control over
 * the start and end dates for fetching data.
 * @param props Props
 * @returns React element
 */
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
    <div className="card-sm flex xs:flex-col sm:flex-row md:flex-col lg:flex-row space-x-4 xs:space-x-0 xs:space-y-2 md:space-y-0 xs:px-4 justify-between lg:items-center flex-grow">
      <h3 className="text-lg font-bold">Search range</h3>
      <div className="flex flex-col md:flex-row sm:space-y-2 md:space-y-0 md:space-x-4">
        <div className="flex justify-between items-center space-x-2 self-end">
          <h4 className="text-lg">Start</h4>
          <input
            className="card-xs self-end"
            type="date"
            onChange={handleStartTimeChange}
            defaultValue={startTimeString}
          />
        </div>
        <div className="flex justify-between items-center self-end space-x-2">
          <h4 className="text-lg">End</h4>
          <input
            className="card-xs self-end"
            type="date"
            onChange={handleEndTimeChange}
            defaultValue={endTimeString}
          />
        </div>
        <button
          className="btn-sm h-8 self-end md:self-center ring-red-300 text-gray-500 bg-white hover:bg-gray-700 hover:text-white hoverAnimation"
          type="button"
          onClick={handleButtonClick}
        >
          Update
        </button>
      </div>
    </div>
  )
}

export default TimeSelection
