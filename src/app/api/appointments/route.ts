import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { handleError } from "@/utils/handlerError"

export async function GET() {
    try {
        const dataAppointments = await prisma.appointment.findMany()

        return NextResponse.json({
            status: "success",
            message: "Appointment listed with success",
            data: dataAppointments
        })

    } catch (error) {
        return handleError(error)
    }
}

export async function POST(req: Request) {
    try {
        const { animalName, breed, weight, service, ownerName, contact, scheduledAt } = await req.json()

        const missingFields = [] // Extra validation
        if (!animalName) missingFields.push('animalName')
        if (!breed) missingFields.push('breed')
        if (weight === undefined || weight === null) missingFields.push('weight')
        if (!service) missingFields.push('service')
        if (!ownerName) missingFields.push('ownerName')
        if (!contact) missingFields.push('contact')
        if (!scheduledAt) missingFields.push('scheduledAt')

        if (missingFields.length > 0) {
            return NextResponse.json({
                status: "error",
                message: 'Missing required fields',
                missingFields: missingFields
            }, {
                status: 422
            })
        }

        const newAppointment = await prisma.appointment.create({ data: { animalName, breed, weight, service, ownerName, contact, scheduledAt } })

        return NextResponse.json({
            status: "success",
            message: "Appointment created with success",
            data: newAppointment
        })

    } catch (error) {
        return handleError(error)
    }
}