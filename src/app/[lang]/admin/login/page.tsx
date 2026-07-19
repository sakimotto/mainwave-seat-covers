import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { getDictionary } from "@/i18n"

async function login(formData: FormData) {
  "use server"
  const token = formData.get("token") as string
  const expected = process.env.ADMIN_TOKEN
  if (!expected || token !== expected) {
    redirect("?error=1")
  }
  const cookieStore = await cookies()
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/",
  })
  redirect("./vehicles")
}

export default async function AdminLoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const [{ lang }, { error }] = await Promise.all([params, searchParams])
  getDictionary(lang) // validates locale

  return (
    <div className="container-site py-16 max-w-sm">
      <h1 className="text-2xl font-bold text-mainwave-black mb-6">Admin Login</h1>
      {error && (
        <p className="mb-4 text-sm text-brand-accent">Invalid token. Try again.</p>
      )}
      <form action={login} className="space-y-4">
        <div>
          <label htmlFor="token" className="block text-xs font-medium text-mainwave-text mb-1">
            Admin Token
          </label>
          <input
            id="token"
            name="token"
            type="password"
            required
            autoComplete="off"
            className="w-full border border-mainwave-border px-3 py-2 text-sm focus:outline-none focus:border-brand-accent"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-brand-accent text-white text-sm font-bold uppercase tracking-wider py-3 hover:bg-red-700 transition-colors"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}
