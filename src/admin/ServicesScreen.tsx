import { useEffect, useState } from "react"
import { motion } from "framer-motion"
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
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-3xl bg-[#132F27] border border-[#D4AF37]/20 rounded-3xl shadow-2xl p-6 space-y-6 text-[#F5EFE6]"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-serif text-[#D4AF37]">
            Gerenciar Serviços
          </h1>

          <button
            onClick={onClose}
            className="text-sm text-red-400 hover:text-red-300 transition"
          >
            Fechar ✕
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
            className="bg-[#0F2A23] border border-[#D4AF37]/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="">Salão</option>
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
            className="bg-[#0F2A23] border border-[#D4AF37]/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37]"
          />

          <input
            type="number"
            placeholder="Min"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="bg-[#0F2A23] border border-[#D4AF37]/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37]"
          />

          <input
            type="number"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-[#0F2A23] border border-[#D4AF37]/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37]"
          />

          <button
            type="submit"
            disabled={saving}
            className="bg-[#D4AF37] text-[#0F2A23] rounded-xl px-4 py-2 text-sm font-semibold hover:scale-105 transition disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Adicionar"}
          </button>
        </form>

        {/* Lista */}
        {loading ? (
          <p className="text-sm text-gray-400">Carregando serviços...</p>
        ) : services.length === 0 ? (
          <p className="text-sm text-gray-400">
            Nenhum serviço cadastrado ainda.
          </p>
        ) : (
          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
            {services.map((service, index) => {
              const salon = salons.find(s => s.id === service.salon_id)

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex justify-between items-center bg-[#0F2A23] border border-[#D4AF37]/10 rounded-xl px-4 py-3"
                >
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-xs text-[#E8E1D6]">
                      {service.duration_minutes} min • {salon?.name}
                    </p>
                  </div>

                  <span className="font-semibold text-[#D4AF37]">
                    R$ {service.price}
                  </span>
                </motion.div>
              )
            })}
          </div>
        )}
      </motion.div>
    </div>
  )
}
