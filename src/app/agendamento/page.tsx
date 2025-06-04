"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

import FormAppointment from "@/components/agendamento/FormAppointment"

export default function AppointmentPage() {

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cadastrar Animal</h1>
          <p className="text-gray-600">Agende um novo horário para atendimento</p>
        </div>
        <Button asChild variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>
      </div>

      <FormAppointment />
      
    </div>
  )
}