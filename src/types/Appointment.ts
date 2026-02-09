export type Appointment = {
  id: string
  salon_id: string
  service_id: string
  price: number
  date: string
  hour: string
  status: "pending" | "confirmed" | "done" | "canceled"
  created_at: string
}
