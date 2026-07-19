"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { getSessionCustomer } from "@/lib/actions/auth"

export async function addGarageVehicle(input: {
  vehicleId: string
  model?: string
  year?: number
  nickname?: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    const customer = await getSessionCustomer()
    if (!customer) return { success: false, error: "Not signed in" }

    await prisma.customerVehicle.create({
      data: {
        customerId: customer.id,
        vehicleId: input.vehicleId,
        model: input.model || null,
        year: input.year ?? null,
        nickname: input.nickname?.trim() || null,
      },
    })

    revalidatePath("/en/account/garage")
    revalidatePath("/th/account/garage")
    return { success: true }
  } catch {
    return { success: false, error: "Failed to add vehicle" }
  }
}

export async function removeGarageVehicle(
  garageEntryId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const customer = await getSessionCustomer()
    if (!customer) return { success: false, error: "Not signed in" }

    const result = await prisma.customerVehicle.deleteMany({
      where: { id: garageEntryId, customerId: customer.id },
    })
    if (result.count === 0) return { success: false, error: "Vehicle not found" }

    revalidatePath("/en/account/garage")
    revalidatePath("/th/account/garage")
    return { success: true }
  } catch {
    return { success: false, error: "Failed to remove vehicle" }
  }
}
