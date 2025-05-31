"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

import { Appointment } from "@/types/appointment"

type GraphHomeProps = {
    appointmentArray: Appointment[][]
}

const chartConfig = {
    horarios: {
        label: "Horários",
        color: "#f97316",
    },
}


export default function GraphHome({ appointmentArray }: GraphHomeProps) {

    const weekData = [
        { day: "Segunda", horarios: appointmentArray[0].length },
        { day: "Terça", horarios: appointmentArray[1].length },
        { day: "Quarta", horarios: appointmentArray[2].length },
        { day: "Quinta", horarios: appointmentArray[3].length },
        { day: "Sexta", horarios: appointmentArray[4].length },
        { day: "Sábado", horarios: appointmentArray[5].length },
    ]   

    return (
        <Card className="border-orange-200">
            <CardHeader>
                <CardTitle className="text-orange-600">Horários da Semana</CardTitle>
                <CardDescription>Distribuição de horários agendados de segunda a sábado</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weekData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                            <XAxis dataKey="day" stroke="#ea580c" fontSize={12} />
                            <YAxis stroke="#ea580c" fontSize={12} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="horarios" fill="#f97316" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}