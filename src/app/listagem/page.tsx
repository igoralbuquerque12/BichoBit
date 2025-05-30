"use client"

import { useState } from "react"
import { Edit, Trash2, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const mockData = [
  {
    id: 1,
    nomeAnimal: "Rex",
    raca: "Golden Retriever",
    peso: "25kg",
    servico: "Banho e Tosa",
    nomeDono: "João Silva",
    contato: "(11) 99999-9999",
    horario: "09:00-10:00",
  },
  {
    id: 2,
    nomeAnimal: "Mimi",
    raca: "Persa",
    peso: "3kg",
    servico: "Consulta Veterinária",
    nomeDono: "Maria Santos",
    contato: "(11) 88888-8888",
    horario: "10:30-11:00",
  },
  {
    id: 3,
    nomeAnimal: "Thor",
    raca: "Rottweiler",
    peso: "40kg",
    servico: "Vacinação",
    nomeDono: "Pedro Costa",
    contato: "(11) 77777-7777",
    horario: "14:00-14:30",
  },
]

export default function ListaPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [data, setData] = useState(mockData)

  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id))
  }

  const handleEdit = (id: number) => {
    // Implementar lógica de edição
    console.log("Editar item:", id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lista Detalhada</h1>
          <p className="text-gray-600">Visualize e gerencie todos os horários agendados</p>
        </div>
      </div>

      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-600">Filtros</CardTitle>
          <CardDescription>Selecione a data para visualizar os horários</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-orange-500" />
              <Label htmlFor="date">Data:</Label>
            </div>
            <Input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-auto border-orange-200 focus:border-orange-500"
            />
            <Button className="bg-orange-500 hover:bg-orange-600">Filtrar</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-600">Horários Agendados</CardTitle>
          <CardDescription>
            Lista completa dos animais agendados para {new Date(selectedDate).toLocaleDateString("pt-BR")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-orange-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-orange-50">
                  <TableHead className="text-orange-700">Nome do Animal</TableHead>
                  <TableHead className="text-orange-700">Raça</TableHead>
                  <TableHead className="text-orange-700">Peso</TableHead>
                  <TableHead className="text-orange-700">Serviço</TableHead>
                  <TableHead className="text-orange-700">Nome do Dono</TableHead>
                  <TableHead className="text-orange-700">Contato</TableHead>
                  <TableHead className="text-orange-700">Horário</TableHead>
                  <TableHead className="text-orange-700">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id} className="hover:bg-orange-25">
                    <TableCell className="font-medium">{item.nomeAnimal}</TableCell>
                    <TableCell>{item.raca}</TableCell>
                    <TableCell>{item.peso}</TableCell>
                    <TableCell>{item.servico}</TableCell>
                    <TableCell>{item.nomeDono}</TableCell>
                    <TableCell>{item.contato}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
                        {item.horario}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(item.id)}
                          className="h-8 w-8 text-orange-600 hover:bg-orange-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir o horário de {item.nomeAnimal}? Esta ação não pode ser
                                desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(item.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
