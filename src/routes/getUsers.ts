import fs from 'fs/promises';
import { type IncomingMessage, type ServerResponse } from 'http';
import path from 'path';

const filePath = path.join(__dirname, '..', 'db', 'users.json');

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const { users } = JSON.parse(data);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
};
