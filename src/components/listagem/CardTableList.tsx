import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "react-toastify"
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

import { Appointment } from "@/types/appointment"
import { handleErrorSimple } from "@/utils/handlerError"

type CardTableListProps = {
  dataAppointments: Appointment[]
  setDataAppointments: (value: Appointment[]) => void
  date: Date
}

export default function CardTableList({ dataAppointments, setDataAppointments, date }: CardTableListProps) {
  const services = ["Banho", "Tosa", "Banho e Tosa", "Consulta Veterinária", "Vacinação", "Cirurgia", "Exames", "Outros"];

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'DELETE'
      })

      if (!res.ok) throw new Error('Erro ao deletar agendamento.')
      
      setDataAppointments(dataAppointments.filter(appointment => appointment.id !== id))

      toast.success('Agendamento cancelado com sucesso!', {
        position: 'bottom-right',
        autoClose: 3000
      })
    }

    catch (error) {
      toast.error('Houve um erro ao realizar o cadastro.', {
        position: "bottom-right",
        autoClose: 3000,
      })

      return handleErrorSimple(error)
    }
  }

  const handleEdit = (id: number) => {
    // Implementar lógica de edição
    console.log("Editar item:", id)
  }

  return (
    <Card className="border-orange-200">
      <CardHeader>
        <CardTitle className="text-orange-600">Horários Agendados</CardTitle>
        <CardDescription>
          Lista completa dos animais agendados para {date.toLocaleDateString("pt-BR")}
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
              {dataAppointments.map((item) => (
                <TableRow key={item.id} className="hover:bg-orange-25">
                  <TableCell className="font-medium">{item.animalName}</TableCell>
                  <TableCell>{item.breed}</TableCell>
                  <TableCell>{item.weight}</TableCell>
                  <TableCell>{services[parseInt(item.service)]}</TableCell>
                  <TableCell>{item.ownerName}</TableCell>
                  <TableCell>{item.contact}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
                      {new Date(item.startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - {new Date(item.endTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
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
                              Tem certeza que deseja excluir o horário de {item.animalName}? Esta ação não pode ser
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

  )
}
