"use client"

import type React from "react"

import { useState } from "react"
import { Save, ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CadastroPage() {
  const [formData, setFormData] = useState({
    nomeAnimal: "",
    raca: "",
    peso: "",
    servico: "",
    nomeDono: "",
    contato: "",
    data: "",
    horarioInicio: "",
    horarioFim: "",
    observacoes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Dados do formulário:", formData)
    // Implementar lógica de salvamento
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

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

      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-600">Informações do Animal</CardTitle>
          <CardDescription>Preencha todos os dados necessários para o agendamento</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nomeAnimal">Nome do Animal *</Label>
                <Input
                  id="nomeAnimal"
                  value={formData.nomeAnimal}
                  onChange={(e) => handleInputChange("nomeAnimal", e.target.value)}
                  placeholder="Ex: Rex, Mimi, Thor..."
                  className="border-orange-200 focus:border-orange-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="raca">Raça *</Label>
                <Input
                  id="raca"
                  value={formData.raca}
                  onChange={(e) => handleInputChange("raca", e.target.value)}
                  placeholder="Ex: Golden Retriever, Persa..."
                  className="border-orange-200 focus:border-orange-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="peso">Peso *</Label>
                <Input
                  id="peso"
                  value={formData.peso}
                  onChange={(e) => handleInputChange("peso", e.target.value)}
                  placeholder="Ex: 25kg, 3kg..."
                  className="border-orange-200 focus:border-orange-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="servico">Serviço *</Label>
                <Select onValueChange={(value) => handleInputChange("servico", value)}>
                  <SelectTrigger className="border-orange-200 focus:border-orange-500">
                    <SelectValue placeholder="Selecione o serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="banho-tosa">Banho e Tosa</SelectItem>
                    <SelectItem value="consulta">Consulta Veterinária</SelectItem>
                    <SelectItem value="vacinacao">Vacinação</SelectItem>
                    <SelectItem value="cirurgia">Cirurgia</SelectItem>
                    <SelectItem value="exame">Exames</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nomeDono">Nome do Dono *</Label>
                <Input
                  id="nomeDono"
                  value={formData.nomeDono}
                  onChange={(e) => handleInputChange("nomeDono", e.target.value)}
                  placeholder="Nome completo do proprietário"
                  className="border-orange-200 focus:border-orange-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contato">Contato *</Label>
                <Input
                  id="contato"
                  value={formData.contato}
                  onChange={(e) => handleInputChange("contato", e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="border-orange-200 focus:border-orange-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="data">Data do Agendamento *</Label>
                <Input
                  id="data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => handleInputChange("data", e.target.value)}
                  className="border-orange-200 focus:border-orange-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Horário *</Label>
                <div className="flex gap-2">
                  <Input
                    type="time"
                    value={formData.horarioInicio}
                    onChange={(e) => handleInputChange("horarioInicio", e.target.value)}
                    className="border-orange-200 focus:border-orange-500"
                    required
                  />
                  <span className="flex items-center text-gray-500">até</span>
                  <Input
                    type="time"
                    value={formData.horarioFim}
                    onChange={(e) => handleInputChange("horarioFim", e.target.value)}
                    className="border-orange-200 focus:border-orange-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => handleInputChange("observacoes", e.target.value)}
                placeholder="Informações adicionais sobre o animal ou serviço..."
                className="border-orange-200 focus:border-orange-500"
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                <Save className="mr-2 h-4 w-4" />
                Salvar Agendamento
              </Button>
              <Button type="button" variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                Limpar Formulário
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
