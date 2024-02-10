import { type IncomingMessage, type ServerResponse } from 'http';
import { validateUser } from '../utils/validator';
import { type User } from '../utils/types';
import { v4 as uuidv4 } from 'uuid';
import { sendResponse } from '../utils/sendResponse';
import { getDataBase } from '../utils/getDataBase';
import { setDataBase } from '../utils/setDataBase';

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  let data = '';

  try {
    const users = await getDataBase();

    const jsonData: Omit<User, 'id'> = await new Promise((resolve, reject) => {
      req.on('data', chunk => {
        data += chunk;
      });

      req.on('end', () => {
        try {
          const parsedData: Omit<User, 'id'> = JSON.parse(data);
          resolve(parsedData);

          console.log(jsonData);
        } catch (error) {
          sendResponse(res, 400, error);
        }
      });
      req.on('error', reject);
    });

    const validateData = validateUser(jsonData);

    if (validateData) {
      const newUser = {
        id: uuidv4(),
        ...jsonData,
      };
      users.push(newUser);

      await setDataBase(users);
      sendResponse(res, 201, newUser);
    }
  } catch (error) {
    console.log();
    sendResponse(res, 401, (error as Error).message);
  }
};
