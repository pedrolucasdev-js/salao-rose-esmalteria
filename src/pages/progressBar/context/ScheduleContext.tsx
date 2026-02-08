import { createContext, useContext, useState, type ReactNode,  } from "react"

type ScheduleData = {
  service?: string
  date?: string
  time?: string
}

type ScheduleContextType = {
  data: ScheduleData
  setData: (value: Partial<ScheduleData>) => void
}

const ScheduleContext = createContext({} as ScheduleContextType)

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const [data, setSchedule] = useState<ScheduleData>({})

  function setData(value: Partial<ScheduleData>) {
    setSchedule(prev => ({ ...prev, ...value }))
  }

  return (
    <ScheduleContext.Provider value={{ data, setData }}>
      {children}
    </ScheduleContext.Provider>
  )
}

export function useSchedule() {
  return useContext(ScheduleContext)
}
