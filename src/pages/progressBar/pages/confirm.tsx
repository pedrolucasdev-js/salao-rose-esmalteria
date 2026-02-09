import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { CountContext } from "../../schedule"
import { toast } from "sonner"
import api from "../../../api/BaseUrl"

export default function Confirm() {

  const { salonId, service, date, time } = useContext(CountContext)

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  async function handleConfirm() {

    if (!salonId || !service || !date || !time) {
      toast.error("Dados do agendamento incompletos")
      return
    }

    try {
      setLoading(true)

      await api.post("/appointments", {
        appointment: {
          salon_id: salonId,
          service_id: service.id,
          date,
          hour: time
        }
      })

      toast.success("Agendamento confirmado 🎉")

      setTimeout(() => {
        navigate("/")
      }, 1200)

    } catch (error: any) {

      const message =
        error?.response?.data?.error ||
        "Esse horário já foi reservado"

      toast.error(message)

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        Confirme seu agendamento
      </h2>

      <div className="p-6 border rounded-2xl bg-white shadow-sm space-y-2 text-black">

        <p><b>Serviço:</b> {service?.name}</p>
        <p><b>Data:</b> {date}</p>
        <p><b>Horário:</b> {time}</p>
        <p>
          <b>Preço:</b>{" "}
          {service?.price
            ? `R$ ${Number(service.price).toFixed(2)}`
            : "--"}
        </p>

        <button
          disabled={loading}
          onClick={handleConfirm}
          className={`
            w-full mt-4 p-3 rounded-lg text-white font-medium transition
            ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"}
          `}
        >
          {loading ? "Confirmando..." : "Confirmar Agendamento"}
        </button>

      </div>
    </div>
  )
}
