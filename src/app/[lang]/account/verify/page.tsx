import Link from "next/link"
import { getDictionary, localePath } from "@/i18n"
import { verifyEmail } from "@/lib/actions/auth"

export default async function VerifyEmailPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ token?: string }>
}) {
  const [{ lang }, { token }] = await Promise.all([params, searchParams])
  const { locale, dict } = getDictionary(lang)

  const result = token
    ? await verifyEmail(token)
    : { success: false, error: "Missing token" }

  return (
    <div className="container-site py-16 md:py-24 max-w-md text-center">
      <h1 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-4">{dict.verify.title}</h1>
      {result.success ? (
        <>
          <p className="text-lg font-bold text-green-700 mb-2">{dict.verify.success}</p>
          <p className="text-sm text-gray-500 mb-8">{dict.verify.successBody}</p>
        </>
      ) : (
        <>
          <p className="text-lg font-bold text-brand-accent mb-2">{dict.verify.failed}</p>
          <p className="text-sm text-gray-500 mb-8">{dict.verify.failedBody}</p>
        </>
      )}
      <Link
        href={localePath(locale, "/account")}
        className="inline-block bg-brand-accent text-white text-sm font-bold uppercase tracking-wider px-8 py-3 hover:bg-red-700 transition-colors"
      >
        {dict.verify.continue}
      </Link>
    </div>
  )
}
