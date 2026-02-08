import { useContext, useEffect, useState } from "react"
import { CountContext } from "../../schedule"
import { motion } from "framer-motion"
import api from "../../../api/BaseUrl"

type Service = {
  id: string
  name: string
  duration_minutes: number
  price: number
}

export default function Service() {
  const { setCount, setService } = useContext(CountContext)
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchData() {
    try {
      const response = await api.get<Service[]>("/services")
      setServices(response.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="max-w-xl mx-auto text-left">
      <h2 className="text-2xl font-serif text-[#F5EFE6] mb-2">
        Escolha seu serviço
      </h2>
      <p className="text-[#E8E1D6] mb-8">
        Selecione o cuidado perfeito para você 💅
      </p>

      {loading ? (
        <p className="text-sm text-gray-400">Carregando serviços...</p>
      ) : (
        <div className="space-y-4">
          {services.map((service, index) => (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setService(service)
                setCount(2)
              }}
              className="w-full p-5 rounded-2xl flex justify-between items-center
              bg-[#0F2A23] border border-[#D4AF37]/30
              hover:border-[#D4AF37] transition shadow-lg"
            >
              <div>
                <p className="font-medium text-[#F5EFE6]">
                  {service.name}
                </p>
                <span className="text-sm text-[#E8E1D6]">
                  ⏱ {service.duration_minutes} min
                </span>
              </div>

              <span className="font-semibold text-[#D4AF37]">
                R$ {Number(service.price).toFixed(2)}
              </span>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}
