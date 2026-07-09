import { prisma } from "@/lib/prisma"
import { addVehicle, addModel, deleteVehicle, deleteModel } from "@/lib/actions/admin-vehicles"

export default async function AdminVehiclesPage() {
  const vehicles = await prisma.vehicle.findMany({
    include: { models: { orderBy: { name: "asc" } } },
    orderBy: { make: "asc" },
  })

  return (
    <div className="container-site py-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-mainwave-black mb-6">Vehicle Admin</h1>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-mainwave-black mb-3">Add New Vehicle Make</h2>
        <form action={addVehicle} className="flex gap-2">
          <input
            name="make"
            placeholder="e.g. Tesla"
            required
            className="flex-1 border border-mainwave-border px-3 py-2 text-sm focus:outline-none focus:border-mainwave-red"
          />
          <input
            name="slug"
            placeholder="e.g. tesla"
            required
            className="flex-1 border border-mainwave-border px-3 py-2 text-sm focus:outline-none focus:border-mainwave-red"
          />
          <button type="submit" className="bg-mainwave-red text-white px-4 py-2 text-sm font-medium hover:bg-red-700 transition-colors">
            Add
          </button>
        </form>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-mainwave-black mb-3">Add Model to Vehicle</h2>
        <form action={addModel} className="flex gap-2">
          <select
            name="vehicleId"
            required
            className="flex-1 border border-mainwave-border px-3 py-2 text-sm focus:outline-none focus:border-mainwave-red"
          >
            <option value="">Select make</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>{v.make}</option>
            ))}
          </select>
          <input
            name="name"
            placeholder="e.g. Model Y"
            required
            className="flex-1 border border-mainwave-border px-3 py-2 text-sm focus:outline-none focus:border-mainwave-red"
          />
          <button type="submit" className="bg-mainwave-red text-white px-4 py-2 text-sm font-medium hover:bg-red-700 transition-colors">
            Add
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-mainwave-black mb-3">Current Vehicles</h2>
        {vehicles.length === 0 ? (
          <p className="text-sm text-gray-500">No vehicles yet.</p>
        ) : (
          <div className="space-y-4">
            {vehicles.map((v) => (
              <div key={v.id} className="border border-mainwave-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-mainwave-black">{v.make} ({v.slug})</span>
                  <form action={deleteVehicle.bind(null, v.id)}>
                    <button type="submit" className="text-red-500 text-xs hover:text-red-700 transition-colors">
                      Delete
                    </button>
                  </form>
                </div>
                {v.models.length > 0 ? (
                  <ul className="space-y-1">
                    {v.models.map((m) => (
                      <li key={m.id} className="flex items-center justify-between text-sm text-mainwave-text ml-4">
                        <span>{m.name}</span>
                        <form action={deleteModel.bind(null, m.id)}>
                          <button type="submit" className="text-red-400 text-xs hover:text-red-600 transition-colors ml-2">
                            ×
                          </button>
                        </form>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-gray-400 ml-4">No models yet</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
