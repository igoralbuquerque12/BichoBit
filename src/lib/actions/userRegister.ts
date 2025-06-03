"use server"

import { connectDB } from "@/lib/mongodb"
import User from "@/modelsMongo/User"
import bcrypt from "bcryptjs"

interface UserInterface {
    email: string
    senha: string
}


export async function cadastrar(dataUser: UserInterface) {
    const { email, senha } = dataUser

    if (!email || !senha) {
        throw new Error("Dados faltantes para cadastro.")
    }

    await connectDB()

    try {
        const UserDB = await User.findOne({ email: email })

        if (UserDB) throw new Error("Usuário já cadastrado no banco de dados.")
        
        const hashPassword = await bcrypt.hash(senha, 10)
        
        const novoUser = new User({
            email, 
            senha: hashPassword
        })

        await novoUser.save()
        return true
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error)
        throw error
    }
}