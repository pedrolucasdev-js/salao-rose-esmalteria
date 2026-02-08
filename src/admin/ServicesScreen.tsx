import { useEffect, useState } from "react"
import api from "../api/BaseUrl"
import type { Salon } from "../types/Salon"
import type { Service } from "../types/Services"


export default function ServicesScreen({ onClose }: { onClose: () => void }) {
  const [services, setServices] = useState<Service[]>([])
  const [salons, setSalons] = useState<Salon[]>([])
  const [loading, setLoading] = useState(true)

  const [salonId, setSalonId] = useState("")
  const [name, setName] = useState("")
  const [duration, setDuration] = useState("")
  const [price, setPrice] = useState("")
  const [saving, setSaving] = useState(false)

  async function fetchData() {
    try {
      const [servicesRes, salonsRes] = await Promise.all([
        api.get<Service[]>("/services"),
        api.get<Salon[]>("/salons"),
      ])

      setServices(servicesRes.data)
      setSalons(salonsRes.data)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateService(e: React.FormEvent) {
    e.preventDefault()

    if (!salonId || !name || !duration || !price) return

    try {
      setSaving(true)

      await api.post("/services", {
        salon_id: salonId,
        name,
        duration_minutes: Number(duration),
        price: Number(price),
      })

      setName("")
      setDuration("")
      setPrice("")

      fetchData()
    } catch (error) {
      console.error("Erro ao cadastrar serviço:", error)
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Serviços</h1>
        <button
          onClick={onClose}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Fechar
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleCreateService}
        className="grid grid-cols-1 sm:grid-cols-5 gap-3"
      >
        <select
          value={salonId}
          onChange={(e) => setSalonId(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Selecione o salão</option>
          {salons.map((salon) => (
            <option key={salon.id} value={salon.id}>
              {salon.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Serviço"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="number"
          placeholder="Min"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white rounded-lg px-4 py-2 text-sm hover:bg-gray-800 transition disabled:opacity-50"
        >
          {saving ? "Salvando..." : "Adicionar"}
        </button>
      </form>

      {/* Lista */}
      {loading ? (
        <p className="text-sm text-gray-500">Carregando serviços...</p>
      ) : services.length === 0 ? (
        <p className="text-sm text-gray-400">
          Nenhum serviço cadastrado ainda.
        </p>
      ) : (
        <ul className="space-y-3">
          {services.map((service) => {
            const salon = salons.find(s => s.id === service.salon_id)

            return (
              <li
                key={service.id}
                className="flex justify-between items-center border rounded-lg px-4 py-3"
              >
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-xs text-gray-500">
                    {service.duration_minutes} min • {salon?.name}
                  </p>
                </div>

                <span className="font-semibold text-sm">
                  R$ {service.price}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
