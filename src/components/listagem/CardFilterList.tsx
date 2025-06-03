"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "lucide-react"

export default function CardFilterList({ selectedDate, setSelectedDate }: { selectedDate: Date, setSelectedDate: (date: Date) => void }) {
    return (
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
                        value={selectedDate.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }).split('T')[0]}
                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                        className="w-auto border-orange-200 focus:border-orange-500"
                    />
                    <Button className="bg-orange-500 hover:bg-orange-600">Filtrar</Button>
                </div>
            </CardContent>
        </Card>
    )
}