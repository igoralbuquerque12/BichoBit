import { Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Appointment } from "@/types/appointment"
import { getStatisticsAppointments } from "@/utils/getStatistcsAppointments"

type CardsHomeProps = {
    appointments: Appointment[]
}

export default function CardsHome({ appointments }: CardsHomeProps) {
    const { totalWeek, totalToday, busiestDay, averagePerDay } = getStatisticsAppointments(appointments)

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-orange-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total da Semana</CardTitle>
                    <Calendar className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-orange-600">
                        {totalWeek}
                    </div>
                    <p className="text-xs text-gray-600">horários agendados</p>
                </CardContent>
            </Card>

            <Card className="border-orange-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Hoje</CardTitle>
                    <Calendar className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-orange-600">{totalToday}</div>
                    <p className="text-xs text-gray-600">horários hoje</p>
                </CardContent>
            </Card>

            <Card className="border-orange-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Maior Dia</CardTitle>
                    <Calendar className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-orange-600">{busiestDay.count}</div>
                    <p className="text-xs text-gray-600">{busiestDay.day}</p>
                </CardContent>
            </Card>

            <Card className="border-orange-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Média Diária</CardTitle>
                    <Calendar className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-orange-600">{averagePerDay}</div>
                    <p className="text-xs text-gray-600">horários por dia</p>
                </CardContent>
            </Card>
        </div>
    )
}