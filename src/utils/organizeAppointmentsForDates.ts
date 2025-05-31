import { Appointment } from "@/types/appointment"

export function organizeAppointmentsForDates(dataAppointments: Appointment[]) {

  const dayArrays: Appointment[][] = Array(6).fill(null).map(() => [])

  for (const appointment of dataAppointments) {
    const appointmentDate = new Date(appointment.scheduledAt)
    const dayOfWeek = appointmentDate.getDay() 
    
    if (dayOfWeek >= 1 && dayOfWeek <= 6) {
      dayArrays[dayOfWeek - 1].push(appointment)
    }
  }

  return dayArrays
}
