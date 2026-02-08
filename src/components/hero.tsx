import { motion } from "framer-motion"
import '../css/hero/hero.css';

export default function Hero() {

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 }
    }

    const fadeLeft = {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0 }
    }

    return (
        <section className="bg-[#0F2A23] py-14 sm:py-20 lg:py-28 text-[#F5EFE6]">
            <div className="px-6 mx-auto max-w-7xl">
                <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">

                    {/* Texto */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        transition={{ staggerChildren: 0.2 }}
                    >
                        <motion.p
                            variants={fadeUp}
                            transition={{ duration: 0.6 }}
                            className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] font-medium"
                        >
                            Rose Esmalteria
                        </motion.p>

                        <motion.h1
                            variants={fadeUp}
                            transition={{ duration: 0.6 }}
                            className="mt-6 text-4xl sm:text-6xl font-serif leading-tight"
                        >
                            Beleza, cuidado e
                            <span className="block text-[#D4AF37]">
                                autoestima nas suas mãos
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            transition={{ duration: 0.6 }}
                            className="mt-6 text-base sm:text-lg text-[#E8E1D6] max-w-xl"
                        >
                            Um espaço feminino pensado para você relaxar,
                            se cuidar e sair com unhas impecáveis.
                            Agende online e tenha seu momento especial.
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            transition={{ duration: 0.6 }}
                            className="flex flex-wrap gap-4 mt-10"
                        >
                            <motion.a
                                whileHover={{ scale: 1.07 }}
                                whileTap={{ scale: 0.95 }}
                                href="/3ad7c0a9-305e-4d3d-a61b-0dce40723848/appointment"
                                className="px-8 py-4 font-semibold rounded-full bg-[#D4AF37] text-[#0F2A23] shadow-lg"
                            >
                                Agendar horário
                            </motion.a>

                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="#"
                                className="px-8 py-4 font-medium border rounded-full border-[#D4AF37] text-[#D4AF37]"
                            >
                                Meus agendamentos
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    {/* Imagem */}
                    <motion.div
                        variants={fadeLeft}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className="absolute inset-0 rounded-[40px] bg-[#D4AF37]/10 blur-2xl"
                        />

                        <motion.img
                            whileHover={{ scale: 1.03 }}
                            className="relative w-full rounded-[40px] shadow-2xl object-cover"
                            src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png"
                            alt="Espaço feminino de esmalteria"
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
