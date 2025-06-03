import { Appointment } from "@/types/appointment"

export function organizeAppointmentsForDates(dataAppointments: Appointment[]) {
  const dayArrays: Appointment[][] = Array(7).fill(null).map(() => [])

  for (const appointment of dataAppointments) {
    const appointmentDate = new Date(appointment.scheduleDate)
    const dayOfWeek = appointmentDate.getDay() 
    
    dayArrays[dayOfWeek].push(appointment)
  }

  return dayArrays
}
