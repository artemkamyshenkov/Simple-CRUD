import { type User } from './types';

export function validateUser(user: Omit<User, 'id'>) {
  if (typeof user !== 'object') {
    throw new Error('User must be an object');
  }
  if (
    JSON.stringify(Object.keys(user).sort()) !==
    JSON.stringify(['age', 'hobbies', 'username'])
  ) {
    throw new Error('Invalid user schema!');
  }
  if (typeof user.username !== 'string') {
    throw new Error('User name must be a string');
  }
  if (typeof user.age !== 'number') {
    throw new Error('User age must be a number');
  }
  if (!Array.isArray(user.hobbies)) {
    throw new Error('User hobbies must be an array');
  }
  if (!user.hobbies.every(elem => typeof elem === 'string')) {
    throw new Error('User hobbies must be an array of string');
  }
  return true;
}
