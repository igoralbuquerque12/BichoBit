import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormData } from "@/types/appointment"
import { handleErrorSimple } from "@/utils/handlerError"
import { toast } from 'react-toastify'


export default function FormAppointment() {
    const [formData, setFormData] = useState<FormData>({
        animalName: "",
        breed: "",
        weight: "",
        service: "",
        ownerName: "",
        contact: "",
        scheduleDate: "",
        startTime: "",
        endTime: "",
        observations: "",
    })

    const cleanForm = () => {
        setFormData({
            animalName: "",
            breed: "",
            weight: "",
            service: "",
            ownerName: "",
            contact: "",
            scheduleDate: "",
            startTime: "",
            endTime: "",
            observations: "",
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // const scheduledDate = new Date("2025-05-20")
        // const dayOfWeek = scheduledDate.getDay()

        // if (dayOfWeek === 0) {
        //   console.log("Não é permitido agendar para domingos: ", dayOfWeek)
        //   alert("Não é permitido agendar para domingos.") // Subs por um toast
        //   return
        // }

        const createAppointment = async (formData: FormData) => {
            try {
                const res = await fetch('/api/appointments', {
                    method: 'POST',
                    body: JSON.stringify(formData)
                })

                if (!res.ok) throw new Error('Erro no fetch de criar agendamento.')

                cleanForm()

                toast.success('Agendamento realizado com sucesso!', {
                    position: "bottom-right",
                    autoClose: 3000,
                })
            } catch (error) {
                toast.error('Houve um erro ao realizar o cadastro.', {
                    position: "bottom-right",
                    autoClose: 3000,
                })

                return handleErrorSimple(error)
            }
        }

        createAppointment(formData)
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <Card className="border-orange-200">
            <CardHeader>
                <CardTitle className="text-orange-600">Informações do Animal</CardTitle>
                <CardDescription>Preencha todos os dados necessários para o agendamento</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="animalName">Nome do Animal *</Label>
                            <Input
                                id="animalName"
                                value={formData.animalName}
                                onChange={(e) => handleInputChange("animalName", e.target.value)}
                                placeholder="Ex: Rex, Mimi, Thor..."
                                className="border-orange-200 focus:border-orange-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="breed">Raça *</Label>
                            <Input
                                id="breed"
                                value={formData.breed}
                                onChange={(e) => handleInputChange("breed", e.target.value)}
                                placeholder="Ex: Golden Retriever, Persa..."
                                className="border-orange-200 focus:border-orange-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="weight">weight *</Label>
                            <Input
                                id="weight"
                                value={formData.weight}
                                onChange={(e) => handleInputChange("weight", e.target.value)}
                                placeholder="Ex: 25kg, 3kg..."
                                className="border-orange-200 focus:border-orange-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="service">Serviço *</Label>
                            <Select onValueChange={(value) => handleInputChange("service", value)}>
                                <SelectTrigger className="border-orange-200 focus:border-orange-500">
                                    <SelectValue placeholder="Selecione o serviço" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">Banho</SelectItem>
                                    <SelectItem value="1">Tosa</SelectItem>
                                    <SelectItem value="2">Banho e Tosa</SelectItem>
                                    <SelectItem value="3">Consulta Veterinária</SelectItem>
                                    <SelectItem value="4">Vacinação</SelectItem>
                                    <SelectItem value="5">Cirurgia</SelectItem>
                                    <SelectItem value="6">Exames</SelectItem>
                                    <SelectItem value="7">Outros</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ownerName">Nome do Dono *</Label>
                            <Input
                                id="ownerName"
                                value={formData.ownerName}
                                onChange={(e) => handleInputChange("ownerName", e.target.value)}
                                placeholder="Nome completo do proprietário"
                                className="border-orange-200 focus:border-orange-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contact">contact *</Label>
                            <Input
                                id="contact"
                                value={formData.contact}
                                onChange={(e) => handleInputChange("contact", e.target.value)}
                                placeholder="(11) 99999-9999"
                                className="border-orange-200 focus:border-orange-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date">Data do Agendamento *</Label>
                            <Input
                                id="date"
                                type="date"
                                value={formData.scheduleDate}
                                onChange={(e) => handleInputChange("scheduleDate", e.target.value)}
                                className="border-orange-200 focus:border-orange-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Horário *</Label>
                            <div className="flex gap-2">
                                <Input
                                    type="time"
                                    value={formData.startTime}
                                    onChange={(e) => handleInputChange("startTime", e.target.value)}
                                    className="border-orange-200 focus:border-orange-500"
                                    required
                                />
                                <span className="flex items-center text-gray-500">até</span>
                                <Input
                                    type="time"
                                    value={formData.endTime}
                                    onChange={(e) => handleInputChange("endTime", e.target.value)}
                                    className="border-orange-200 focus:border-orange-500"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="observations">Observações</Label>
                        <Textarea
                            id="observations"
                            value={formData.observations}
                            onChange={(e) => handleInputChange("observations", e.target.value)}
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
                        <Button type="button" onClick={cleanForm} variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                            Limpar Formulário
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}