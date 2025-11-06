import { createServerFn } from "@tanstack/react-start"
import { QlikItem } from "src/features/qlik/schema"
import kyInstance from "src/lib/ky"

export const fetchQlikItems = createServerFn({ method: 'GET' }).handler(
  async () => {
    console.info('Fetching qlik items...')
    return kyInstance.get(`http://localhost:3000/api/qlik/items`).json<QlikItem[]>()
  }
)
