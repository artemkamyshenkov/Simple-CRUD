import fs from 'fs/promises';
import path from 'path';
import { type User } from './types';

export const getDataBase = async () => {
  const filePath = path.join(__dirname, '..', 'db', 'users.json');
  const db = await fs.readFile(filePath, 'utf-8');
  const { users }: { users: User[] } = JSON.parse(db);
  return users;
};
