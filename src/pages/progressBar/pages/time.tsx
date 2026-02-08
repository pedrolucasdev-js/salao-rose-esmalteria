import { useContext, useEffect, useState } from "react"
import { CountContext } from "../../schedule"
import { motion } from "framer-motion"
import api from "@/api/BaseUrl"
import { useParams } from "react-router"

const ALL_TIMES = [
  "09:00","10:00","11:00",
  "13:00","14:00","15:00",
  "16:00","17:00"
]

export default function Time() {
  const { setCount, setTime, date } = useContext(CountContext)
  const { salonId } = useParams()

  const [bookedTimes, setBookedTimes] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!date || !salonId) return

    async function fetchAvailability() {
      try {
        setLoading(true)

        const response = await api.get("/appointments/availability", {
          params: {
            salon_id: salonId,
            date
          }
        })

        setBookedTimes(response.data.booked || [])

      } catch (err) {
        console.error("Erro ao buscar horários:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAvailability()
  }, [date, salonId])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto text-left"
    >
      <h2 className="text-2xl font-serif text-[#F5EFE6] mb-2">
        Escolha o horário
      </h2>

      <p className="text-[#E8E1D6] mb-8">
        Horários disponíveis 💅
      </p>

      {loading ? (
        <p className="text-sm text-gray-400">Carregando horários...</p>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {ALL_TIMES.map((time, index) => {

            const isBooked = bookedTimes.includes(time)

            return (
              <motion.button
                key={time}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={!isBooked ? { scale: 1.05 } : {}}
                whileTap={!isBooked ? { scale: 0.95 } : {}}
                disabled={isBooked}
                onClick={() => {
                  if (isBooked) return
                  setTime(time)
                  setCount(4)
                }}
                className={`
                  py-4 rounded-xl font-medium transition border
                  ${isBooked
                    ? "bg-[#132F27] text-gray-500 border-[#D4AF37]/10 cursor-not-allowed"
                    : "bg-[#0F2A23] border-[#D4AF37]/30 text-[#F5EFE6] hover:border-[#D4AF37] shadow-lg"}
                `}
              >
                {time}
                {isBooked && (
                  <span className="block text-xs mt-1">
                    ocupado
                  </span>
                )}
              </motion.button>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
