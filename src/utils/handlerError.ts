import { NextResponse } from "next/server"

export const handleErrorRequest = (error: unknown) => {
    if (error instanceof Error) {
        console.log("Error: ", error) // Subs por logs melhores
        return NextResponse.json({
            status: 'error',
            message: 'An error occurred',
            error: error.message,
        }, { status: 500 })
    }

    console.log("Unknown: ", error) // Subs por logs melhores
    return NextResponse.json({
        status: 'error',
        message: 'Unknown error occurred',
    }, { status: 500 })
}

export const handleErrorSimple = (error: unknown) => {
    if (error instanceof Error) {
        console.log(`Erro: ${error.message}`)
    } else {
        console.log("Ocorreu um erro desconhecido.")
    }
}