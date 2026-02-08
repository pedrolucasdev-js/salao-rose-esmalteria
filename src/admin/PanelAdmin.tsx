import { useState } from "react"
import ServicesScreen from "./ServicesScreen"

export default function PanelAdmin() {
  const [showScreen, setShowScreen] = useState(false)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Painel Administrativo</h1>
      <p className="mb-4">
        Bem-vindo ao painel administrativo! Aqui você pode gerenciar seus serviços,
        horários e agendamentos.
      </p>

      {showScreen ? (
        <ServicesScreen onClose={() => setShowScreen(false)} />
      ) : (
        <button
          onClick={() => setShowScreen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Abrir Tela de Serviços
        </button>
      )}
    </div>
  )
}
