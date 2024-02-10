import { type IncomingMessage, type ServerResponse } from 'http';
import { getUsers } from './getUsers.ts';
import { getUserById } from './getUserById.ts';

type RouteMethod = Record<
  string,
  (req: IncomingMessage, res: ServerResponse) => unknown
>;
type Routes = Record<string, RouteMethod>;

const routes: Routes = {
  '/api/users': {
    GET: getUsers,
  },
  '^/api/users/([0-9a-zA-Z-]+)$': {
    GET: getUserById,
  },
};

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req?.url ?? '';
  const method = req?.method ?? '';

  const targetRoute = Object.keys(routes).find(route => {
    const regex = new RegExp(`^${route}$`);
    return regex.test(url);
  });

  if (targetRoute) {
    const routeMethods = routes[targetRoute];
    if (routeMethods[method]) {
      routeMethods[method](req, res);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Page not found' }));
  }
};
