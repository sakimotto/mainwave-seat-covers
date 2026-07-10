"use client"

import { useId, type ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

interface SelectProps extends ComponentPropsWithoutRef<"select"> {
  placeholder?: string
  error?: string
}

function Select({
  className,
  placeholder,
  error,
  children,
  ...props
}: SelectProps) {
  const id = useId()

  return (
    <div className="relative">
      <select
        id={id}
        data-slot="select"
        className={cn(
          "peer flex h-9 w-full appearance-none rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-xs transition-colors",
          "focus:border-ring focus:ring-3 focus:ring-ring/50 outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
          error && "border-destructive ring-destructive/20",
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )
}

export { Select }
