/**
 * Formats seconds into a MM:SS or H:MM:SS string
 * @param timeInSeconds - Time in seconds
 * @returns Formatted time string
 */
export function formatTime(timeInSeconds: number): string {
  if (isNaN(timeInSeconds)) return '0:00'
  
  const hours = Math.floor(timeInSeconds / 3600)
  const minutes = Math.floor((timeInSeconds % 3600) / 60)
  const seconds = Math.floor(timeInSeconds % 60)
  
  const paddedSeconds = seconds.toString().padStart(2, '0')
  
  if (hours > 0) {
    const paddedMinutes = minutes.toString().padStart(2, '0')
    return `${hours}:${paddedMinutes}:${paddedSeconds}`
  }
  
  return `${minutes}:${paddedSeconds}`
}

/**
 * Parses a time string (HH:MM:SS or MM:SS) into seconds
 * @param timeString - Formatted time string
 * @returns Time in seconds
 */
export function parseTimeString(timeString: string): number {
  const parts = timeString.split(':').map(part => parseInt(part, 10))
  
  if (parts.some(isNaN)) return 0
  
  // Handle MM:SS format
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1]
  }
  
  // Handle HH:MM:SS format
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2]
  }
  
  return 0
}

/**
 * Calculates the remaining time between current and total time
 * @param current - Current time in seconds
 * @param total - Total time in seconds
 * @returns Formatted remaining time string
 */
export function getRemainingTime(current: number, total: number): string {
  if (isNaN(current) || isNaN(total)) return '0:00'
  return formatTime(Math.max(0, total - current))
}

/**
 * Converts a Date object to a time string (HH:MM:SS)
 * @param date - Date object
 * @returns Formatted time string
 */
export function dateToTimeString(date: Date): string {
  return formatTime(date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds())
}

/**
 * Helper to convert milliseconds to MM:SS format
 * @param milliseconds - Time in milliseconds
 * @returns Formatted time string
 */
export function formatMilliseconds(milliseconds: number): string {
  return formatTime(Math.floor(milliseconds / 1000))
}