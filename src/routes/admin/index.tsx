import { createFileRoute } from '@tanstack/react-router'
import { AdminOverview } from "src/features/admin/admin-overview";

export const Route = createFileRoute('/admin/')({
  component: AdminOverview
})
