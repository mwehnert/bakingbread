/* eslint-disable import/prefer-default-export */
function secondsDiff(d1: Date, d2: Date) {
  const secDiff = Math.floor((d2.getTime() - d1.getTime()) / 1000)
  return secDiff
}

function minutesDiff(d1: Date, d2: Date) {
  const seconds = secondsDiff(d1, d2)
  const minDiff = Math.floor(seconds / 60)
  return minDiff
}

function hoursDiff(d1: Date, d2: Date) {
  const minutes = minutesDiff(d1, d2)
  const hDiff = Math.floor(minutes / 60)
  return hDiff
}

function daysDiff(d1: Date, d2: Date) {
  const hours = hoursDiff(d1, d2)
  const dDiff = Math.floor(hours / 24)
  return dDiff
}

function weeksDiff(d1: Date, d2: Date) {
  const days = daysDiff(d1, d2)
  const wDiff = Math.floor(days / 7)
  return wDiff
}

function yearsDiff(d1: Date, d2: Date) {
  const yDiff = d2.getFullYear() - d1.getFullYear()
  return yDiff
}

function monthsDiff(d1: Date, d2: Date) {
  const years = yearsDiff(d1, d2)
  const months = years * 12 + (d2.getMonth() - d1.getMonth())
  return months
}

const ranges = {
  second: { max: 59, diff: secondsDiff },
  minute: { max: 59, diff: minutesDiff },
  hour: { max: 23, diff: hoursDiff },
  day: { max: 6, diff: daysDiff },
  week: { max: 4, diff: weeksDiff },
  month: { max: 11, diff: monthsDiff },
  year: { max: 1000, diff: yearsDiff },
}

function formatGermanRelativeDate(date: Date): string {
  const then = new Date(date)
  const now = new Date()
  const rtf = new Intl.RelativeTimeFormat("de", { numeric: "auto" })

  // eslint-disable-next-line no-restricted-syntax
  for (const [timespan, config] of Object.entries(ranges)) {
    const diff = config.diff(then, now)
    if (diff <= config.max) {
      return rtf.format(-diff, timespan as any)
    }
  }
  return date.toLocaleDateString("de")
}
export { formatGermanRelativeDate }
