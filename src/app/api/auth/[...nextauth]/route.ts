import { authOptions } from "@/lib/auth"
import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
  }

  interface Session {
    user: {
      id: string
      email: string
    }
  }

  interface JWT {
    id: string
    email: string
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }