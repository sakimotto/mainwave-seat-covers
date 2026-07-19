import { streamText, isStepCount, convertToModelMessages } from "ai"
import { createOpenAI } from "@ai-sdk/openai"
import { SYSTEM_PROMPT } from "@/lib/ai/system-prompt"
import { aiTools } from "@/lib/ai/tools"
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

    const result = streamText({
      model,
      system: SYSTEM_PROMPT,
      messages: modelMessages,
      tools: aiTools,
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
