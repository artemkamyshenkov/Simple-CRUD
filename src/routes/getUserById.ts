import { type IncomingMessage, type ServerResponse } from 'http';
import { sendResponse } from '../utils/sendResponse';
import { getUrlId } from '../utils/getUrlId';
import { getDataBase } from '../utils/getDataBase';

export const getUserById = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const url = req.url ?? '';
    const id = getUrlId(url);

    const users = await getDataBase();

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
