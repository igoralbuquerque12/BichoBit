import { connectDB } from "@/lib/mongodb"
import Usuario from "@/modelsMongo/User"
import type { NextAuthOptions } from "next-auth"
import credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"


export const authOptions: NextAuthOptions = {
  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        senha: { label: "Senha", type: "senha" },
      },
      async authorize(credentials: Record<"email" | "senha", string> | undefined) { 
        await connectDB()

        const usuario = await Usuario.findOne({
          "email": credentials?.email
        }) 

        if (!usuario) {
          throw new Error("Email/Senha incorretos") 
        }

        const senhaMatch = await bcrypt.compare(credentials!.senha, usuario.senha) 

        if (!senhaMatch) {
          throw new Error("Email/Senha incorretos")
        }
        return {
          id: usuario._id,
          email: usuario.email
        }
      },
    }),
  ],

  pages: {
    signIn: '/login', 
    error: '/login'
  },

  session: {
    strategy: "jwt", 
  },
  secret: process.env.AUTH_SECRET,


  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id     
        token.email = user.email
      }
      return token
    },

    async session({ session, token }) {
      
      if (session.user) {
        session.user.id = token.id as string     
        session.user.email = token.email as string
      }
      return session
    },
    
  }

}