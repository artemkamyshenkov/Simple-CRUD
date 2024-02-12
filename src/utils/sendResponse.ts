import { type ServerResponse } from 'http';

export const sendResponse = <T>(res: ServerResponse, code: number, data: T) => {
  if (code >= 400) {
    res.writeHead(code, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: data }));
    return;
  }
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};
