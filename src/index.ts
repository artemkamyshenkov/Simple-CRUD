import dotenv from 'dotenv';
import http from 'http';
import { routeHandler } from './routes/routeHandle';

dotenv.config();

const PORT = process.env.PORT ?? 4000;

const server = http.createServer((req, res) => {
  routeHandler(req, res);
});

server.on('error', err => {
  console.log(err);
});
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
