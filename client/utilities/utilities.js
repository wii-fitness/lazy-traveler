export function daysConverter(startDate, endDate) {
  const start = new Date(this.state.startDate)
  const end = new Date(this.state.endDate)
  var diff = end.getTime() - start.getTime()
  return Math.abs(diff / (1000 * 3600 * 24))
}
