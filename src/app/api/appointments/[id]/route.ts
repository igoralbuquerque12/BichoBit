import { NextResponse } from "next/server"
import { handleError } from "@/utils/handlerError"
import { prisma } from "@/lib/prisma"

export async function PATCH( request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params
        const { ...body } = await request.json()
        
        if (!id) {
            return NextResponse.json({
                status: "error",
                message: "Missing appointment ID",
            }, { status: 400 })
        }

        const updatedAppointment = await prisma.appointment.update({
            where: { id: parseInt(id) },
            data: { ...body },
        })

        return NextResponse.json({
            status: "success",
            message: "Appointment updated successfully",
            data: updatedAppointment,
        })

    } catch (error) {
        return handleError(error)
    }
}

export async function DELETE( request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    
    if (!id) {
        return NextResponse.json({
            status: "error",
            message: "Missing appointment ID",
        }, { status: 400 })
    }

    await prisma.appointment.delete({
        where: { id: parseInt(id) },
    })

    return NextResponse.json({
        status: "success",
        message: "Appointment deleted successfully"
    })
  } catch (error) {
    return handleError(error)
  }
}