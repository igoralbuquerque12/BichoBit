"use client"

import { useEffect, useState } from "react"
import { DateTime } from 'luxon'

import { Appointment } from "@/types/appointment"

import CardTableList from "@/components/listagem/CardTableList"
import CardFilterList from "@/components/listagem/CardFilterList"

export default function ListagemPage() {
  const [dataAppointments, setDataAppointments] = useState<Appointment[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const now = DateTime.now().setZone('America/Sao_Paulo')
    
    return new Date(`${now.year}, ${now.month}, ${now.day}`)
  })

  useEffect(() => {
    const getAppointments = async () => {
      console.log('A data selecionada: ', selectedDate)
      const queryParams = new URLSearchParams({
        date: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
      })
      console.log(`A data do query: ${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`)
      const res = await fetch(`/api/appointments?${queryParams.toString()}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) throw new Error('Erro no fetch de buscar agendamentos.')

      const data = await res.json()
      return data.data
    }

    const fetchData = async () => {
      const data = await getAppointments()
      setDataAppointments(data)
    }

    fetchData()
  }, [selectedDate])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lista Detalhada</h1>
          <p className="text-gray-600">Visualize e gerencie todos os horários agendados</p>
        </div>
      </div>
      <CardFilterList selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <CardTableList dataAppointments={dataAppointments} date={selectedDate} />
    </div>
  )
}
