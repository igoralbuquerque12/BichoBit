import { signIn } from "next-auth/react"

export async function login(email: string, password: string) {
    const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false
    })

    if (!res?.ok) {
        throw new Error("Erro durante o login.")
    }

    return true
}