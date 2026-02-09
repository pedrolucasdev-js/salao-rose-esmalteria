import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ServicesScreen from "./ServicesScreen"
import api from "@/api/BaseUrl"
import { useParams } from "react-router"
import type { Appointment } from "@/types/Appointment"

export default function PanelAdmin() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [showScreen, setShowScreen] = useState(false)
  const { salonId } = useParams()

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await api.get<Appointment[]>("/appointments", {
          params: { salon_id: salonId }
        })
        setAppointments(response.data)
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error)
      }
    }

    if (salonId) fetchAppointments()
  }, [salonId])

  return (
    <div className="min-h-screen bg-[#0F2A23] text-[#F5EFE6] p-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-serif text-[#D4AF37]">
            Painel Administrativo
          </h1>

          {!showScreen && (
            <button
              onClick={() => setShowScreen(true)}
              className="px-5 py-3 rounded-full bg-[#D4AF37] text-[#0F2A23] font-semibold hover:scale-105 transition"
            >
              + Serviços
            </button>
          )}
        </motion.div>

        {showScreen ? (
          <ServicesScreen onClose={() => setShowScreen(false)} />
        ) : (
          <>
            <h2 className="text-xl font-medium mb-4">
              Agendamentos do salão
            </h2>

            {appointments.length === 0 ? (
              <p className="text-[#E8E1D6]">
                Nenhum agendamento encontrado.
              </p>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-[#132F27] border border-[#D4AF37]/20 rounded-2xl p-5 shadow-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="text-sm text-[#E8E1D6]">
                        <b>Data:</b>{" "}
                        {new Intl.DateTimeFormat("pt-BR", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        }).format(new Date(appointment.date))}
                      </p>

                      <p className="text-sm text-[#E8E1D6]">
                        <b>Hora:</b>{" "}
                        {new Intl.DateTimeFormat("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false
                        }).format(new Date(appointment.hour))}
                      </p>
                    </div>

                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium ${appointment.status === "confirmed"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-black"
                        }`}
                    >
                      {appointment.status === "confirmed"
                        ? "Confirmado"
                        : "Pendente"}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
