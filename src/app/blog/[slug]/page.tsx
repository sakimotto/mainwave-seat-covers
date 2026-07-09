{
  /*
    This dynamic blog route handler is managed by a separate specialist agent.
    Each individual blog post has its own dedicated page at the resolved slug path.
    This file serves as a fallback placeholder.
  */
}

import { notFound } from "next/navigation"

export default function CatchAllBlogPost() {
  notFound()
}
