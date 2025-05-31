"use server"

import { Calendar, List, Plus } from "lucide-react"
import Link from "next/link"

import GraphHome from "@/components/GraphHome"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Appointment } from "@/types/appointment"

import { organizeAppointmentsForDates } from "@/utils/organizeAppointmentsForDates"
import { getWeekRange } from "@/utils/getWeekRange"

const weekData = [
  { day: "Segunda", horarios: 8 },
  { day: "Terça", horarios: 12 },
  { day: "Quarta", horarios: 6 },
  { day: "Quinta", horarios: 15 },
  { day: "Sexta", horarios: 10 },
  { day: "Sábado", horarios: 5 },
]

export default async function HomePage() {
  const { startOfWeek, endOfWeek } = getWeekRange()

  const queryParams = new URLSearchParams({ start: startOfWeek.toString(), end: endOfWeek.toString() });

  const res = await fetch(`${process.env.URL}/api/appointments?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) throw new Error("Erro no fetch de get appointments")
  
  const data = await res.json()
  const dataAppointments: Appointment[] = data.data

  const appointmentArray = organizeAppointmentsForDates(dataAppointments)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Visão geral dos horários da semana</p>
        </div>
        <div className="flex gap-3">
          <Button asChild className="bg-orange-500 hover:bg-orange-600">
            <Link href="/cadastro">
              <Plus className="mr-2 h-4 w-4" />
              Cadastrar Horário
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
            <Link href="/listagem">
              <List className="mr-2 h-4 w-4" />
              Ver Lista Detalhada
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total da Semana</CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {weekData.reduce((acc, day) => acc + day.horarios, 0)}
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
            <div className="text-2xl font-bold text-orange-600">12</div>
            <p className="text-xs text-gray-600">horários hoje</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Maior Dia</CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">15</div>
            <p className="text-xs text-gray-600">quinta-feira</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Média Diária</CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">9.3</div>
            <p className="text-xs text-gray-600">horários por dia</p>
          </CardContent>
        </Card>
      </div>

      <GraphHome appointmentArray={appointmentArray} />
    </div>
  )
}

