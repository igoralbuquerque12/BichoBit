import { signIn } from "next-auth/react"

export async function login(email: string, senha: string) {
    const res = await signIn("credentials", {
        email: email,
        senha: senha,
        redirect: false
    })

    if (!res?.ok) {
        throw new Error("Erro durante o login.")
    }

    return true
}