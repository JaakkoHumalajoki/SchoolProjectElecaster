/**
 * Interface for defining time ranges
 * application wide
 *
 * Start time should never be earlier than end time
 */
export interface TimeRange {
  /**
   * Point of time range should start
   */
  startTime: Date
  /**
   * Point of time range should end
   */
  endTime: Date
}

export const calculateAverage = (values: number[]): number => {
  if (!values || values.length < 1) {
    return 0
  }
  const total = values.reduce((sum, value) => sum + value, 0)
  return total / values.length
}

export const calculateMinimum = (values: number[]): number => {
  if (!values || values.length < 1) {
    return 0
  }
  return values.reduce((min, value) => (value < min ? value : min), values[0])
}

export const calculateMaximum = (values: number[]): number => {
  if (!values || values.length < 1) {
    return 0
  }
  return values.reduce((max, value) => (value > max ? value : max), values[0])
}
