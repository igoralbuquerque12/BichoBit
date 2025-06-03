"use server"

import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

export const connectDB = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI não está definida")
    }

    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB já está conectado")
      return
    }

    await mongoose.connect(MONGODB_URI!)
    console.log("MongoDB conectado com sucesso")
    
  } catch (error) {
    console.error("Erro ao conectar no MongoDB:", error)
    throw error
  }
}