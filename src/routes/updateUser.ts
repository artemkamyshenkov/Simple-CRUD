import { type IncomingMessage, type ServerResponse } from 'http';
import { getUrlId } from '../utils/getUrlId';
import { getDataBase } from '../utils/getDataBase';
import { sendResponse } from '../utils/sendResponse';
import { type User } from '../utils/types';
import { validateUser } from '../utils/validator';
import { setDataBase } from '../utils/setDataBase';

export const updateUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    let data = '';
    const url = req.url ?? '';
    const id = getUrlId(url);

    const users = await getDataBase();
    console.log(users);
    const jsonData: Omit<User, 'id'> = await new Promise((resolve, reject) => {
      req.on('data', chunk => {
        data += chunk;
      });

      req.on('end', () => {
        try {
          const parsedData: Omit<User, 'id'> = JSON.parse(data);
          resolve(parsedData);
        } catch (error) {
          sendResponse(res, 400, error);
        }
      });
      req.on('error', reject);
    });
    const isValidData = validateUser(jsonData);

    if (id) {
      const user = users?.find(user => String(user?.id) === String(id));

      if (user && isValidData) {
        const newUser = {
          ...user,
          ...jsonData,
        };
        const newData = users.map(user => {
          if (String(user?.id) === String(id)) {
            return newUser;
          }
          return user;
        });

        await setDataBase(newData);
        sendResponse(res, 200, newUser);
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
