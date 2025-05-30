"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { Calendar, List, Plus } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const weekData = [
  { day: "Segunda", horarios: 8 },
  { day: "Terça", horarios: 12 },
  { day: "Quarta", horarios: 6 },
  { day: "Quinta", horarios: 15 },
  { day: "Sexta", horarios: 10 },
  { day: "Sábado", horarios: 5 },
]

const chartConfig = {
  horarios: {
    label: "Horários",
    color: "#f97316",
  },
}

export default function HomePage() {
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
    </div>
  )
}
