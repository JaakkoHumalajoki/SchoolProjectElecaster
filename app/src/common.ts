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
