import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { handleErrorRequest } from "@/utils/handlerError"
import { Prisma } from "@prisma/client"
// import { Appointment } from "@/types/appointment"

export async function GET(req: Request) {
    try {
        const url = new URL(req.url)
       
        const date = url.searchParams.get('date')

        if (date) {
            const startDate = new Date(date)
            const endDate = new Date(date + 'T23:59:59.999Z')

            const dataAppointments = await prisma.appointment.findMany({
                where: { 
                    scheduleDate: { 
                        gte: startDate,
                        lte: endDate
                    } 
                }
            })

            return NextResponse.json({
                status: "success",
                message: "Appointment listed with success",
                data: dataAppointments
            })
        }

        const start = url.searchParams.get('start')
        const end = url.searchParams.get('end')

        const whereClause: Prisma.appointmentWhereInput = {}

        if (start || end) {
            whereClause.scheduleDate = {}
            if (start) {
                whereClause.scheduleDate.gte = new Date(start)
            }
            if (end) {
                whereClause.scheduleDate.lte = new Date(end)
            }
        }

        const dataAppointments = await prisma.appointment.findMany({
            where: whereClause
        })

        return NextResponse.json({
            status: "success",
            message: "Appointment listed with success",
            data: dataAppointments
        })

    } catch (error) {
        return handleErrorRequest(error)
    }
}

export async function POST(req: Request) {
    try {
        const { animalName, breed, weight, service, ownerName, contact, scheduleDate, startTime, endTime } = await req.json()

        const missingFields = [] // Extra validation
        if (!animalName) missingFields.push('animalName')
        if (!breed) missingFields.push('breed')
        if (weight === undefined || weight === null) missingFields.push('weight')
        if (!service) missingFields.push('service')
        if (!ownerName) missingFields.push('ownerName')
        if (!contact) missingFields.push('contact')
        if (!scheduleDate) missingFields.push('scheduleDate')
        if (!startTime) missingFields.push('startTime')
        if (!endTime) missingFields.push('endTime')

        if (missingFields.length > 0) {
            return NextResponse.json({
                status: "error",
                message: 'Missing required fields',
                missingFields: missingFields
            }, {
                status: 422
            })
        }

        const [year, month, day] = scheduleDate.split('-')
        const formattedScheduleDate = new Date(`${year}-${month}-${day}T00:00:00-00:00`).toISOString()
        const formattedStartTime = new Date(`${year}-${month}-${day}T${startTime}-00:00`).toISOString()
        const formattedEndTime = new Date(`${year}-${month}-${day}T${endTime}-00:00`).toISOString()

        const newAppointment = await prisma.appointment.create({
            data: {
                animalName,
                breed,
                weight,
                service,
                ownerName,
                contact,
                scheduleDate: formattedScheduleDate,
                startTime: formattedStartTime,
                endTime: formattedEndTime
            }
        })

        return NextResponse.json({
            status: "success",
            message: "Appointment created with success",
            data: newAppointment
        })

    } catch (error) {
        return handleErrorRequest(error)
    }
}