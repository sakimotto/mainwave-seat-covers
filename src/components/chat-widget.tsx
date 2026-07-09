"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import type { UIMessage } from "ai"
import { DefaultChatTransport } from "ai"
import { cn } from "@/lib/utils"

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    messages: [
      {
        id: "welcome",
        role: "assistant" as const,
        parts: [
          { type: "text" as const, text: "G'day! I'm Saki, the Mainwave AI assistant. How can I help you find the perfect seat covers today?" },
        ],
      },
    ] as UIMessage[],
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all",
          open ? "bg-mainwave-black scale-0" : "bg-mainwave-red hover:bg-red-700 scale-100"
        )}
        aria-label="Chat with Saki AI"
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-2xl border border-mainwave-border flex flex-col transition-all duration-200 origin-bottom-right",
          open ? "opacity-100 scale-100 h-[560px]" : "opacity-0 scale-0 h-0 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-mainwave-border bg-mainwave-black text-white rounded-t-xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-mainwave-red flex items-center justify-center text-xs font-bold">
              S
            </div>
            <div>
              <p className="text-sm font-semibold">Saki AI</p>
              <p className="text-[10px] text-gray-400">Mainwave Assistant</p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap",
                  msg.role === "user"
                    ? "bg-mainwave-red text-white rounded-br-sm"
                    : "bg-mainwave-grey text-mainwave-text rounded-bl-sm"
                )}
              >
                {msg.parts.map((part, i) =>
                  part.type === "text" ? <span key={i}>{part.text}</span> : null
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-mainwave-grey rounded-lg rounded-bl-sm px-3 py-2 text-sm text-mainwave-text">
                <span className="inline-flex gap-1">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce [animation-delay:0.1s]">●</span>
                  <span className="animate-bounce [animation-delay:0.2s]">●</span>
                </span>
              </div>
            </div>
          )}
          {error && (
            <div className="text-xs text-red-500 text-center">
              Something went wrong. Please try again.
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="border-t border-mainwave-border p-3 flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about seat covers..."
            className="flex-1 px-3 py-2 text-sm border border-mainwave-border rounded-md focus:outline-none focus:border-mainwave-red transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-mainwave-red text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
            </svg>
          </button>
        </form>
      </div>
    </>
  )
}
