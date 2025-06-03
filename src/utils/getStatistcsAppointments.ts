import { Appointment } from "@/types/appointment"

interface StatisticsData {
    totalWeek: number
    totalToday: number
    busiestDay: {
        day: string
        count: number
    }
    averagePerDay: number
}

export function getStatisticsAppointments(appointments: Appointment[]): StatisticsData {
    const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    const dataStatistics: StatisticsData = {
        totalWeek: appointments.length,
        totalToday: appointments.filter(appointment => {
            const appointmentDate = new Date(appointment.scheduleDate)

            return appointmentDate.getDate() === (today.getDate() - 1)
        }).length,
        busiestDay: {
            day: '',
            count: 0
        },
        averagePerDay: 0
    }

    const appointmentsByDay = Array(7).fill(0)
    
    appointments.forEach(appointment => {
        const appointmentDate = new Date(appointment.scheduleDate)
        const dayOfWeek = appointmentDate.getUTCDay()
        appointmentsByDay[dayOfWeek]++
    })

    let maxAppointments = 0
    let busiestDayIndex = 0

    appointmentsByDay.forEach((count, index) => {
        if (count > maxAppointments) {
            maxAppointments = count
            busiestDayIndex = index
        }
    })

    dataStatistics.busiestDay = {
        day: dayNames[busiestDayIndex],
        count: maxAppointments
    }
    
    const daysWithAppointments = appointmentsByDay.filter(count => count > 0).length
    dataStatistics.averagePerDay = daysWithAppointments > 0 
        ? appointments.length / daysWithAppointments 
        : 0
        console.log(dataStatistics)
    return dataStatistics
}