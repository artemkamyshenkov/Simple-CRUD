import { type IncomingMessage, type ServerResponse } from 'http';
import { getUrlId } from '../utils/getUrlId';
import { getDataBase } from '../utils/getDataBase';
import { sendResponse } from '../utils/sendResponse';
import { setDataBase } from '../utils/setDataBase';

export const deleteUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const url = req.url ?? '';
    const id = getUrlId(url);

    const users = await getDataBase();

    if (id) {
      const user = users?.find(user => String(user?.id) === String(id));
      if (user) {
        const newUsers = users.filter(user => String(user?.id) !== String(id));
        await setDataBase(newUsers);
        sendResponse(res, 204, 'User was deleted');
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
