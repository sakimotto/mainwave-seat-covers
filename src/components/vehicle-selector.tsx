"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { ChevronDownIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import type { Vehicle } from "@/types"

export function VehicleSelector({ vehicles, compact }: { vehicles: Vehicle[]; compact?: boolean }) {
  const router = useRouter()
  const [selectedMake, setSelectedMake] = useState("")
  const [selectedModel, setSelectedModel] = useState("")

  const models = useMemo(() => {
    const v = vehicles.find((v) => v.slug === selectedMake)
    return v?.models ?? []
  }, [selectedMake, vehicles])

  const handleGo = () => {
    if (!selectedMake) return
    if (selectedModel) {
      router.push(`/shop/${selectedMake}/${selectedModel.toLowerCase().replace(/\s+/g, "-")}`)
    } else {
      router.push(`/vehicle/${selectedMake}`)
    }
  }

  return (
    <div className={cn("flex flex-col sm:flex-row gap-2", compact ? "items-stretch" : "items-center")}>
      <select
        value={selectedMake}
        onChange={(e) => { setSelectedMake(e.target.value); setSelectedModel("") }}
        className={cn(
          "border border-mainwave-border bg-white text-mainwave-text focus:outline-none focus:border-mainwave-red transition-colors appearance-none",
          compact ? "text-xs px-3 py-2" : "text-sm px-4 py-3"
        )}
        style={{ backgroundImage: "none" }}
      >
        <option value="">Select Make</option>
        {vehicles.map((v) => (
          <option key={v.id} value={v.slug}>{v.make}</option>
        ))}
      </select>

      {selectedMake && (
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className={cn(
            "border border-mainwave-border bg-white text-mainwave-text focus:outline-none focus:border-mainwave-red transition-colors appearance-none",
            compact ? "text-xs px-3 py-2" : "text-sm px-4 py-3"
          )}
          style={{ backgroundImage: "none" }}
        >
          <option value="">All Models</option>
          {models.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      )}

      <button
        onClick={handleGo}
        disabled={!selectedMake}
        className={cn(
          "bg-mainwave-red text-white font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap",
          compact ? "text-xs px-3 py-2" : "text-sm px-6 py-3"
        )}
      >
        Go
      </button>
    </div>
  )
}
