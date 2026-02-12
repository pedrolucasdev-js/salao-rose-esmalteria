import { createContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "react-router";

import Service from "../pages/progressBar/pages/service"
import Date from "../pages/progressBar/pages/date"
import Time from "./progressBar/pages/time";
import Confirm from "./progressBar/pages/confirm";

export const CountContext = createContext<any>(null)

export default function SchedulePage() {
    const { salonId } = useParams();

    const [count, setCount] = useState(1)
    const [service, setService] = useState<any>(null)
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [phone, setPhone] = useState("")

    const fade = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <CountContext.Provider value={{
            count,
            setCount,
            salonId,
            service,
            setService,
            date,
            setDate,
            time,
            setTime,
            phone,
            setPhone
        }}>

            <section className="min-h-screen bg-[#0F2A23] text-[#F5EFE6] py-12 px-4">
                <div className="max-w-5xl mx-auto">

                    {/* Topo */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fade}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6"
                    >
                        <div>
                            <p className="text-[#D4AF37] tracking-[0.3em] uppercase text-sm">
                                Rose Esmalteria
                            </p>
                            <h1 className="text-3xl sm:text-4xl font-serif mt-2">
                                Agende seu horário
                            </h1>
                        </div>

                        <Link
                            to="/"
                            className="px-6 py-3 rounded-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F2A23] transition"
                        >
                            ← Voltar para Home
                        </Link>
                    </motion.div>

                    {/* Progress */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fade}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-4 gap-4 mb-12"
                    >
                        {["Serviço", "Data", "Horário", "Confirmar"].map((step, i) => (
                            <div key={i} className="text-center">
                                <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center border
                                    ${count >= i + 1 ? "bg-[#D4AF37] text-[#0F2A23]" : "border-[#D4AF37]"}`}>
                                    {i + 1}
                                </div>
                                <p className="text-xs mt-2 opacity-80">{step}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Conteúdo */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={count}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 0.4 }}
                            className="bg-[#132F27] p-8 rounded-[30px] shadow-2xl"
                        >
                            {count === 1 && <Service />}
                            {count === 2 && <Date />}
                            {count === 3 && <Time />}
                            {count === 4 && <Confirm />}
                        </motion.div>
                    </AnimatePresence>

                </div>
            </section>

        </CountContext.Provider>
    );
}
