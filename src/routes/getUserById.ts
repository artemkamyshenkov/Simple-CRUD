import fs from 'fs/promises';
import { type IncomingMessage, type ServerResponse } from 'http';
import path from 'path';
import { type User } from '../utils/types';
import { sendResponse } from '../utils/sendResponse';

const filePath = path.join(__dirname, '..', 'db', 'users.json');

export const getUserById = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const url = req.url ?? '';
    const match = url.match(
      /^\/api\/users\/([0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12})$/,
    );
    const id = match?.[1];
    const data = await fs.readFile(filePath, 'utf-8');
    const { users }: { users: User[] } = JSON.parse(data);

    if (id) {
      const user = users?.find(user => String(user?.id) === String(id));
      if (user) {
        sendResponse(res, 200, user);
      } else {
        sendResponse(res, 404, 'User not found');
      }
    } else {
      sendResponse(res, 400, 'The Id has an incorrect format');
    }
  } catch (error) {
    sendResponse(res, 500, 'Internal Server Error');
  }
};
