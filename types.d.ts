import { NextApiRequest } from 'next';

declare module 'next' {
  export interface NextApiRequest extends NextApiRequest {
    json: () => Promise

  }
}