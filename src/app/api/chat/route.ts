import { streamText, isStepCount, convertToModelMessages } from "ai"
import { createOpenAI } from "@ai-sdk/openai"
import { SYSTEM_PROMPT } from "@/lib/ai/system-prompt"
import { makeAiTools } from "@/lib/ai/tools"
import { rateLimit, clientIp, tooManyRequests } from "@/lib/rate-limit"

const provider = createOpenAI({
  baseURL: process.env.LLM_BASE_URL ?? "https://api.deepseek.com/v1",
  apiKey: process.env.LLM_API_KEY ?? "",
})

const model = provider.chat(process.env.LLM_MODEL ?? "deepseek-v4-flash")

const MAX_MESSAGES = 40

export async function POST(req: Request) {
  const { ok, retryAfter } = rateLimit({
    key: `chat:${clientIp(req)}`,
    limit: 10,
    windowMs: 60_000,
  })
  if (!ok) return tooManyRequests(retryAfter)

  try {
    const body = await req.json()
    const messages = body.messages

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (messages.length > MAX_MESSAGES) {
      return new Response(JSON.stringify({ error: "Conversation too long. Please start a new chat." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const modelMessages = await convertToModelMessages(messages)
    const locale = typeof body.locale === "string" ? body.locale : "en"

    // Signed-in customer context — garage + identity, so Saki never asks
    // for what the account already knows
    const customer = await getSessionCustomer()
    const garageLines = customer
      ? customer.garage
          .map(
            (g) =>
              `- ${g.year ? `${g.year} ` : ""}${g.vehicle.make}${g.model ? ` ${g.model}` : ""}${g.nickname ? ` ("${g.nickname}")` : ""}`
          )
          .join("\n")
      : ""
    const customerContext = customer
      ? `\n\n## Signed-in Customer (context — use naturally, never re-ask for it)
Name: ${customer.name ?? "unknown"}
Garage (${customer.garage.length} vehicle${customer.garage.length === 1 ? "" : "s"}):
${garageLines || "(empty)"}

Rules for signed-in customers:
- NEVER ask what vehicle they drive or what car they need parts for — you already know their garage. Reference it ("your 2023 Hilux") when relevant.
- For order tracking/status: use getMyOrders. NEVER ask a signed-in customer for an order number or email.
- Greet by name when natural.`
      : ""

    const result = streamText({
      model,
      system: SYSTEM_PROMPT + customerContext,
      messages: modelMessages,
      tools: makeAiTools(locale),
      stopWhen: isStepCount(5),
    })

    return result.toUIMessageStreamResponse()
  } catch (err) {
    console.error("Chat API error:", err)
    return new Response(JSON.stringify({ error: "Something went wrong. Please try again." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
