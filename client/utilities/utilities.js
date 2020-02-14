export function daysConverter(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  var diff = end.getTime() - start.getTime()
  return Math.abs(diff / (1000 * 3600 * 24))
}
