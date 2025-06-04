"use server"

import { connectDB } from "@/lib/mongodb"
import User from "@/modelsMongo/User"
import bcrypt from "bcryptjs"
import { UserInterface } from "@/types/user"

export async function registerUser(dataUser: UserInterface) {
    const { email, password } = dataUser

    if (!email || !password) {
        throw new Error("Dados faltantes para cadastro.")
    }

    await connectDB()

    try {
        const UserDB = await User.findOne({ email: email })

        if (UserDB) throw new Error("Usuário já cadastrado no banco de dados.")
        
        const hashPassword = await bcrypt.hash(password, 10)
        
        const novoUser = new User({
            email, 
            password: hashPassword
        })

        await novoUser.save()
        return true
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error)
        throw error
    }
}