"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { addGarageVehicle, removeGarageVehicle } from "@/lib/actions/garage"
import type { Dictionary, Locale } from "@/i18n"
import type { Vehicle } from "@/types"

type GarageEntry = {
  id: string
  make: string
  model: string | null
  year: number | null
  nickname: string | null
}

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 27 }, (_, i) => currentYear + 1 - i)

export function GarageClient({
  dict,
  locale,
  catalogVehicles,
  garage,
}: {
  dict: Dictionary
  locale: Locale
  catalogVehicles: Vehicle[]
  garage: GarageEntry[]
}) {
  const [vehicleId, setVehicleId] = useState("")
  const [model, setModel] = useState("")
  const [year, setYear] = useState("")
  const [nickname, setNickname] = useState("")
  const [error, setError] = useState("")
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const selectedVehicle = catalogVehicles.find((v) => v.id === vehicleId)

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!vehicleId) return
    setError("")
    startTransition(async () => {
      const result = await addGarageVehicle({
        vehicleId,
        model: model || undefined,
        year: year ? Number(year) : undefined,
        nickname: nickname || undefined,
      })
      if (result.success) {
        setVehicleId("")
        setModel("")
        setYear("")
        setNickname("")
        router.refresh()
      } else {
        setError(result.error ?? "Failed")
      }
    })
  }

  function handleRemove(id: string) {
    startTransition(async () => {
      await removeGarageVehicle(id)
      router.refresh()
    })
  }

  return (
    <div className="space-y-8">
      {/* Current garage */}
      {garage.length === 0 ? (
        <div className="bg-mainwave-grey border border-mainwave-border p-8 text-center">
          <p className="text-sm font-medium text-mainwave-black">{dict.garage.empty}</p>
          <p className="text-xs text-gray-500 mt-2">{dict.garage.emptyBody}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {garage.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between bg-white border border-mainwave-border p-4"
            >
              <div>
                <p className="text-sm font-bold text-mainwave-black">
                  {entry.nickname ? `${entry.nickname} — ` : ""}
                  {entry.make}
                  {entry.model ? ` ${entry.model}` : ""}
                  {entry.year ? ` (${entry.year})` : ""}
                </p>
              </div>
              <button
                onClick={() => handleRemove(entry.id)}
                disabled={pending}
                className="text-xs font-medium text-gray-400 hover:text-brand-accent transition-colors disabled:opacity-50"
              >
                {dict.garage.remove}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add vehicle */}
      <form onSubmit={handleAdd} className="bg-mainwave-grey border border-mainwave-border p-6 space-y-4">
        <h2 className="text-sm font-bold text-mainwave-black uppercase tracking-wider">{dict.garage.add}</h2>
        {error && <p className="text-sm text-brand-accent">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="make" className="block text-xs font-medium text-mainwave-text mb-1">{dict.garage.make}</label>
            <select
              id="make"
              required
              value={vehicleId}
              onChange={(e) => { setVehicleId(e.target.value); setModel("") }}
              className="w-full border border-mainwave-border bg-white px-3 py-2 text-sm focus:outline-none focus:border-brand-accent"
            >
              <option value="">—</option>
              {catalogVehicles.map((v) => (
                <option key={v.id} value={v.id}>{v.make}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="model" className="block text-xs font-medium text-mainwave-text mb-1">{dict.garage.model}</label>
            <select
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              disabled={!selectedVehicle}
              className="w-full border border-mainwave-border bg-white px-3 py-2 text-sm focus:outline-none focus:border-brand-accent disabled:opacity-50"
            >
              <option value="">—</option>
              {selectedVehicle?.models.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="year" className="block text-xs font-medium text-mainwave-text mb-1">{dict.garage.year}</label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full border border-mainwave-border bg-white px-3 py-2 text-sm focus:outline-none focus:border-brand-accent"
            >
              <option value="">—</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="nickname" className="block text-xs font-medium text-mainwave-text mb-1">{dict.garage.nickname}</label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={dict.garage.nicknamePlaceholder}
              className="w-full border border-mainwave-border bg-white px-3 py-2 text-sm focus:outline-none focus:border-brand-accent"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={pending || !vehicleId}
          className="bg-brand-accent text-white text-sm font-bold uppercase tracking-wider px-6 py-3 hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {pending ? dict.garage.adding : dict.garage.add}
        </button>
      </form>
    </div>
  )
}
