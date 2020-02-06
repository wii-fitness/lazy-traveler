export function daysConverter(startDate, endDate) {
  console.log(startDate, endDate)
  const start = new Date(startDate)
  const end = new Date(endDate)
  var diff = end.getTime() - start.getTime()
  console.log(Math.abs(diff / (1000 * 3600 * 24)))
  return Math.abs(diff / (1000 * 3600 * 24))
}
