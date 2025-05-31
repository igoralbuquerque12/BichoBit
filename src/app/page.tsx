"use server"

import { List, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

import CardsHome from "@/components/CardsHome"
import GraphHome from "@/components/GraphHome"

import { Appointment } from "@/types/appointment"
import { organizeAppointmentsForDates } from "@/utils/organizeAppointmentsForDates"
import { getWeekRange } from "@/utils/getWeekRange"


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

      <CardsHome appointments={dataAppointments} />

      <GraphHome appointmentArray={appointmentArray} />
    </div>
  )
}

