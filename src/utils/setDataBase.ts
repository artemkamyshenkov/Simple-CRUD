import fs from 'fs/promises';
import path from 'path';
import { type User } from './types';

export const setDataBase = async <T = User>(data: T) => {
  const filePath = path.join(__dirname, '..', 'db', 'users.json');
  await fs.writeFile(filePath, JSON.stringify(data));
};
