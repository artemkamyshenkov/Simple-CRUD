import { type IncomingMessage, type ServerResponse } from 'http';
import { getDataBase } from '../utils/getDataBase';
import { sendResponse } from '../utils/sendResponse';

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = await getDataBase();
    sendResponse(res, 200, users ?? []);
  } catch (error) {
    sendResponse(res, 500, 'Internal Server Error');
  }
};
