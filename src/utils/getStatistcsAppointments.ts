import { Appointment } from "@/types/appointment";

interface StatisticsData {
    totalWeek: number;
    totalToday: number;
    busiestDay: {
        day: string;
        count: number;
    };
    averagePerDay: number;
}

export function getStatisticsAppointments(appointments: Appointment[]): StatisticsData {
    const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const dataStatistics: StatisticsData = {
        totalWeek: appointments.length,
        totalToday: appointments.filter(appointment => {
            const appointmentDate = new Date(appointment.scheduledAt);
            return appointmentDate >= startOfDay && appointmentDate <= endOfDay;
        }).length,
        busiestDay: {
            day: '',
            count: 0
        },
        averagePerDay: 0
    };

    const appointmentsByDay = Array(7).fill(0);
    
    appointments.forEach(appointment => {
        const appointmentDate = new Date(appointment.scheduledAt);
        const dayOfWeek = appointmentDate.getDay();
        appointmentsByDay[dayOfWeek]++;
    });

    let maxAppointments = 0;
    let busiestDayIndex = 0;

    appointmentsByDay.forEach((count, index) => {
        if (count > maxAppointments) {
            maxAppointments = count;
            busiestDayIndex = index;
        }
    });

    dataStatistics.busiestDay = {
        day: dayNames[busiestDayIndex],
        count: maxAppointments
    };

    const daysWithAppointments = appointmentsByDay.filter(count => count > 0).length;
    dataStatistics.averagePerDay = daysWithAppointments > 0 
        ? appointments.length / daysWithAppointments 
        : 0;

    return dataStatistics;
}