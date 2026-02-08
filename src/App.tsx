import { BrowserRouter, Route, Routes } from "react-router"
import { ScheduleProvider } from "./pages/progressBar/context/ScheduleContext"

import Hero from "./components/hero"
import SchedulePage from "./pages/schedule"
import PanelAdmin from "./admin/PanelAdmin"
import { Toaster } from "sonner"

export default function App() {
  return (
    <ScheduleProvider>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/:salonId/appointment" element={<SchedulePage />} />
          <Route path="/admin/:salonId/panel" element={<PanelAdmin />} />
        </Routes>

        <Toaster richColors position="top-right" />

      </BrowserRouter>
    </ScheduleProvider>
  )
}
