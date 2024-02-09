import dotenv from 'dotenv';
import http from 'http';
import { getUsers } from './routes/getUsers.ts';
import { type IncomingMessage, type ServerResponse } from 'http';

dotenv.config();
type Routes = Record<
  string,
  (req: IncomingMessage, res: ServerResponse) => unknown
>;
const routes: Routes = {
  '/api/users': getUsers,
};

const PORT = process.env.PORT ?? 4000;

const server = http.createServer((req, res) => {
  const routeHandler = routes[req.url ?? ''];
  if (routeHandler) {
    routeHandler(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.on('error', err => {
  console.log(err);
});
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
