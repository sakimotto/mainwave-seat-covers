import { streamText, isStepCount, convertToModelMessages } from "ai"
import { createOpenAI } from "@ai-sdk/openai"
import { SYSTEM_PROMPT } from "@/lib/ai/system-prompt"
import { aiTools } from "@/lib/ai/tools"

const provider = createOpenAI({
  baseURL: process.env.LLM_BASE_URL ?? "https://api.deepseek.com/v1",
  apiKey: process.env.LLM_API_KEY ?? "",
})

const model = provider.chat(process.env.LLM_MODEL ?? "deepseek-v4-flash")

export async function POST(req: Request) {
  const { messages } = await req.json()

  const modelMessages = await convertToModelMessages(messages)

  const result = streamText({
    model,
    system: SYSTEM_PROMPT,
    messages: modelMessages,
    tools: aiTools,
    stopWhen: isStepCount(5),
  })

  return result.toUIMessageStreamResponse()
}
