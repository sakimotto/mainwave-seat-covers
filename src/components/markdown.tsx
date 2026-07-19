import { Fragment, type ReactNode } from "react"

/**
 * Minimal markdown renderer for chat messages — bold, code, links,
 * bullet and numbered lists. No dangerouslySetInnerHTML, no deps.
 */

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  // Order matters: bold first, then code, then links
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  const parts = text.split(pattern)

  parts.forEach((part, i) => {
    const key = `${keyPrefix}-${i}`
    if (part.startsWith("**") && part.endsWith("**")) {
      nodes.push(<strong key={key} className="font-semibold">{part.slice(2, -2)}</strong>)
    } else if (part.startsWith("`") && part.endsWith("`")) {
      nodes.push(
        <code key={key} className="bg-black/10 rounded px-1 py-0.5 text-[0.85em] font-mono">
          {part.slice(1, -1)}
        </code>
      )
    } else if (part.startsWith("[")) {
      const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (match) {
        nodes.push(
          <a
            key={key}
            href={match[2]}
            className="underline decoration-brand-accent underline-offset-2 hover:text-brand-accent transition-colors"
            {...(match[2].startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {match[1]}
          </a>
        )
        return
      }
      nodes.push(<Fragment key={key}>{part}</Fragment>)
    } else {
      nodes.push(<Fragment key={key}>{part}</Fragment>)
    }
  })

  return nodes
}

export function Markdown({ text, className }: { text: string; className?: string }) {
  const lines = text.split("\n")
  const blocks: ReactNode[] = []
  let listBuffer: { ordered: boolean; items: string[] } | null = null

  const flushList = (index: number) => {
    if (!listBuffer || listBuffer.items.length === 0) return
    const items = listBuffer.items.map((item, i) => (
      <li key={i}>{renderInline(item, `li-${index}-${i}`)}</li>
    ))
    blocks.push(
      listBuffer.ordered ? (
        <ol key={`list-${index}`} className="list-decimal pl-5 space-y-1 my-1">{items}</ol>
      ) : (
        <ul key={`list-${index}`} className="list-disc pl-5 space-y-1 my-1">{items}</ul>
      )
    )
    listBuffer = null
  }

  lines.forEach((line, index) => {
    const trimmed = line.trim()
    const bullet = trimmed.match(/^[-*•]\s+(.+)$/)
    const numbered = trimmed.match(/^\d+[.)]\s+(.+)$/)

    if (bullet) {
      if (!listBuffer || listBuffer.ordered) {
        flushList(index)
        listBuffer = { ordered: false, items: [] }
      }
      listBuffer.items.push(bullet[1])
    } else if (numbered) {
      if (!listBuffer || !listBuffer.ordered) {
        flushList(index)
        listBuffer = { ordered: true, items: [] }
      }
      listBuffer.items.push(numbered[1])
    } else {
      flushList(index)
      if (trimmed === "") {
        blocks.push(<div key={`gap-${index}`} className="h-2" />)
      } else {
        blocks.push(<p key={`p-${index}`}>{renderInline(trimmed, `p-${index}`)}</p>)
      }
    }
  })
  flushList(lines.length)

  return <div className={className}>{blocks}</div>
}
