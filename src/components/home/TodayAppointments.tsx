import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Appointment } from "@/types/appointment"

type TodayAppointmentsProps = {
    appointments: Appointment[]
}

export default function TodayAppointments({ appointments }: TodayAppointmentsProps) {
    const today = new Date()

    const todayAppointments = appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.scheduleDate)
        return appointmentDate.getDate() === (today.getDate() - 1)
    })

    return (
        <Card className="border-orange-200">
            <CardHeader>
                <CardTitle className="text-orange-600">Agendamentos de Hoje</CardTitle>
                <CardDescription>Lista de animais e suas observações para hoje</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {todayAppointments.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">Nenhum agendamento para hoje</p>
                    ) : (
                        todayAppointments.map((appointment) => (
                            <div key={appointment.id} className="border border-orange-100 rounded-lg p-4 hover:bg-orange-50">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-orange-700">{appointment.animalName}</h3>
                                        <p className="text-sm text-gray-600">
                                            {new Date(appointment.startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - {new Date(appointment.endTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                                {appointment.observations && (
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">Observações:</span> {appointment.observations}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
} 