import { useContext } from "react"
import { CountContext } from "../../schedule"
import { motion } from "framer-motion"

export default function Date() {
  const { setCount, setDate, setTime } = useContext(CountContext)

  const today = new (globalThis.Date)().toISOString().split("T")[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl mx-auto text-left"
    >
      <h2 className="text-2xl font-serif text-[#F5EFE6] mb-2">
        Escolha a data
      </h2>

      <p className="text-[#E8E1D6] mb-8">
        Selecione o melhor dia para seu momento de cuidado 💅
      </p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-[#0F2A23] border border-[#D4AF37]/30 p-8 rounded-[24px] shadow-xl"
      >
        <label className="block text-sm text-[#D4AF37] mb-3 uppercase tracking-widest">
          Data do agendamento
        </label>

        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="date"
          min={today}
          onChange={(e) => {
            setDate(e.target.value)
            setTime(null)
            setCount(3)
          }}
          className="
            w-full text-lg p-4 rounded-xl
            bg-[#132F27]
            text-[#F5EFE6]
            border border-[#D4AF37]/30
            focus:outline-none
            focus:border-[#D4AF37]
            focus:ring-2
            focus:ring-[#D4AF37]/40
            transition
          "
        />
      </motion.div>
    </motion.div>
  )
}
