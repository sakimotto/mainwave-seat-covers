"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import type { Vehicle } from "@/types"

const years = Array.from({ length: 26 }, (_, i) => (2000 + i).toString()).reverse()

export function VehicleSelector({ vehicles }: { vehicles: Vehicle[] }) {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selectedMake, setSelectedMake] = useState("")
  const [selectedModel, setSelectedModel] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [animating, setAnimating] = useState(false)

  const selectedVehicle = useMemo(() => vehicles.find((v) => v.slug === selectedMake), [selectedMake, vehicles])

  const models = useMemo(() => selectedVehicle?.models ?? [], [selectedVehicle])

  const goToStep = (s: 1 | 2 | 3) => {
    setAnimating(true)
    setTimeout(() => {
      setStep(s)
      setAnimating(false)
    }, 200)
  }

  const handleMakeSelect = (make: string) => {
    setSelectedMake(make)
    setSelectedModel("")
    setSelectedYear("")
    goToStep(2)
  }

  const handleModelSelect = (model: string) => {
    setSelectedModel(model)
    goToStep(3)
  }

  const handleYearSelect = (year: string) => {
    setSelectedYear(year)
  }

  const handleFind = () => {
    if (!selectedMake) return
    const modelSlug = selectedModel.toLowerCase().replace(/\s+/g, "-")
    if (selectedModel) {
      router.push(`/shop/${selectedMake}/${modelSlug}`)
    } else {
      router.push(`/vehicle/${selectedMake}`)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                  step >= s
                    ? "bg-brand-accent text-white scale-100"
                    : "bg-white/20 text-white/40 scale-90"
                )}
              >
                {step > s ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  s
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium transition-colors hidden sm:inline",
                  step >= s ? "text-white" : "text-white/40"
                )}
              >
                {s === 1 ? "Make" : s === 2 ? "Model" : "Year"}
              </span>
            </div>
            {s < 3 && <div className={cn("w-8 h-px transition-colors", step > s ? "bg-brand-accent" : "bg-white/20")} />}
          </div>
        ))}
      </div>

      {/* Content area */}
      <div
        className={cn(
          "transition-all duration-200",
          animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        )}
      >
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-white/70 text-sm text-center mb-4">Select your vehicle make</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {vehicles.map((v) => (
                <button
                  key={v.id}
                  onClick={() => handleMakeSelect(v.slug)}
                  className="group flex flex-col items-center gap-2 p-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 hover:border-brand-accent/50 transition-all text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                    <img src={v.image} alt={v.make} className="w-6 h-6 object-contain opacity-80 group-hover:opacity-100" />
                  </div>
                  <span className="text-xs font-medium text-white/80 group-hover:text-white transition-colors leading-tight">
                    {v.make}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => goToStep(1)}
                className="text-white/60 hover:text-white text-xs flex items-center gap-1 transition-colors"
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Change make
              </button>
              <span className="text-white/50 text-xs">
                {selectedVehicle?.make}
              </span>
            </div>
            <p className="text-white/70 text-sm text-center">Select your model</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {models.map((model) => (
                <button
                  key={model}
                  onClick={() => handleModelSelect(model)}
                  className="p-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 hover:border-brand-accent/50 transition-all text-center text-sm font-medium text-white"
                >
                  {model}
                </button>
              ))}
            </div>
            <button
              onClick={() => handleModelSelect("")}
              className="w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-dashed border-white/20 hover:border-white/40 transition-all text-sm text-white/60 hover:text-white"
            >
              Skip — show all {selectedVehicle?.make} products
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => goToStep(2)}
                className="text-white/60 hover:text-white text-xs flex items-center gap-1 transition-colors"
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Change model
              </button>
              <span className="text-white/50 text-xs">
                {selectedVehicle?.make} {selectedModel}
              </span>
            </div>
            <p className="text-white/70 text-sm text-center">Select your year</p>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearSelect(year)}
                  className={cn(
                    "p-2 rounded-lg text-sm font-medium transition-all",
                    selectedYear === year
                      ? "bg-brand-accent text-white border-brand-accent"
                      : "bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 text-white"
                  )}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      {step >= 2 && (
        <div className={cn("mt-8 text-center transition-all duration-200", animating ? "opacity-0" : "opacity-100")}>
          <button
            onClick={handleFind}
            className="bg-brand-accent text-white font-bold text-sm uppercase tracking-wider px-10 py-4 hover:bg-red-700 transition-colors inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            {selectedYear
              ? `Find ${selectedYear} ${selectedVehicle?.make} ${selectedModel} Seat Covers`
              : selectedModel
                ? `Find ${selectedVehicle?.make} ${selectedModel} Seat Covers`
                : `Find ${selectedVehicle?.make} Seat Covers`}
          </button>
        </div>
      )}
    </div>
  )
}
