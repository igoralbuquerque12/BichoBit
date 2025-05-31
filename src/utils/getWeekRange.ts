// utils/getWeekRange.ts

export function getWeekRange(date: Date = new Date()) {
  const dayOfWeek = date.getDay() 

  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  const lastMonday = new Date(date)
  lastMonday.setDate(date.getDate() + diffToMonday)
  lastMonday.setHours(0, 0, 0, 0)

  const diffToSaturday = 6 - dayOfWeek
  const nextSaturday = new Date(date)
  nextSaturday.setDate(date.getDate() + diffToSaturday)
  nextSaturday.setHours(23, 59, 59, 999)

  return {
    startOfWeek: lastMonday,
    endOfWeek: nextSaturday,
  }
}
