import { createFileRoute } from '@tanstack/react-router'
import { getQlikUser, getQlikItems } from '../../../features/qlik/qlik-actions';
import { QlikItem } from '@/features/qlik/schema';

export const Route = createFileRoute('/api/qlik/items')({
  server: {
    handlers: {
      GET: async () => {
        const currentUser = await getQlikUser("anders@forba.se");
        const qlikUser = currentUser.data?.[0];

        if (!qlikUser) {
          return Response.json({ error: 'Qlik user not found' }, { status: 404 });
        }

        const items: QlikItem[] = await getQlikItems(qlikUser);
        return Response.json(items, { status: 200 })
      },
    },
  }
})
