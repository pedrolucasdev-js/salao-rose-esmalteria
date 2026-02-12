import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { CountContext } from "../../schedule"
import { toast } from "sonner"
import api from "../../../api/BaseUrl"

export default function Confirm() {
  const { salonId, service, date, time, phone, setPhone } = useContext(CountContext)

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  async function handleConfirm() {

    if (!salonId || !service || !date || !time || !phone) {
      toast.error("Preencha todos os dados, incluindo o telefone")
      return
    }

    const phoneRegex = /^\d{10,11}$/
    if (!phoneRegex.test(phone.replace(/\D/g, ""))) {
      toast.error("Telefone inválido. Use formato: (11) 98765-4321")
      return
    }

    try {
      setLoading(true)

      const response = await api.post("/appointments", {
        appointment: {
          salon_id: salonId,
          service_id: service.id,
          date,
          hour: time,
          phone: phone
        }
      })

      toast.success("Agendamento confirmado 🎉")

      const message = `Olá! Gostaria de confirmar meu agendamento:\n\n📋 Serviço: ${service.name}\n📅 Data: ${date}\n⏰ Horário: ${time}\n💅 Preço: R$ ${Number(service.price).toFixed(2)}\n📞 Telefone: ${phone}`

      setTimeout(() => {
        const whatsappUrl = `https://wa.me/5562999782641?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, "_blank")

        // Redirecionar para home após 2 segundos
        setTimeout(() => {
          navigate("/")
        }, 2000)
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

      <div className="p-6 border rounded-2xl bg-white shadow-sm space-y-4 text-black">

        <p><b>Serviço:</b> {service?.name}</p>
        <p><b>Data:</b> {date}</p>
        <p><b>Horário:</b> {time}</p>
        <p>
          <b>Preço:</b>{" "}
          {service?.price
            ? `R$ ${Number(service.price).toFixed(2)}`
            : "--"}
        </p>

        <div className="border-t pt-4">
          <label className="block mb-2">
            <b>Seu telefone:</b>
          </label>
          <input
            type="tel"
            placeholder="(11) 98765-4321"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Usaremos este telefone para abrir o WhatsApp e confirmar seu agendamento
          </p>
        </div>

        <button
          disabled={loading || !phone}
          onClick={handleConfirm}
          className={`
            w-full mt-4 p-3 rounded-lg text-white font-medium transition
            ${loading || !phone
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"}
          `}
        >
          {loading ? "Confirmando..." : "Confirmar e Abrir WhatsApp"}
        </button>

      </div>
    </div>
  )
}
