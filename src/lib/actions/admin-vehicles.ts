"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function addVehicle(formData: FormData) {
  const make = formData.get("make") as string
  const slug = formData.get("slug") as string
  if (!make || !slug) throw new Error("Make and slug are required")

  await prisma.vehicle.create({
    data: { make, slug, image: "/images/vehicles/default.svg" },
  })
  revalidatePath("/admin/vehicles")
}

export async function addModel(formData: FormData) {
  const vehicleId = formData.get("vehicleId") as string
  const name = formData.get("name") as string
  if (!vehicleId || !name) throw new Error("Vehicle and model name are required")

  const slug = name.toLowerCase().replace(/\s+/g, "-")
  await prisma.vehicleModel.create({
    data: { name, slug, vehicleId },
  })
  revalidatePath("/admin/vehicles")
}

export async function deleteVehicle(vehicleId: string) {
  await prisma.vehicle.delete({ where: { id: vehicleId } })
  revalidatePath("/admin/vehicles")
}

export async function deleteModel(modelId: string) {
  await prisma.vehicleModel.delete({ where: { id: modelId } })
  revalidatePath("/admin/vehicles")
}
