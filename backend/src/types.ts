import { Response } from 'express';

interface Character {
  name: string;
  description: string;
  thumbnail: Thumbnail;
}

interface Thumbnail {
  path: string;
  extension: string;
}

interface CustomResponse extends Response {
  status(code: number): CustomResponse;
  json(data: any): CustomResponse;
}

export { Character, Thumbnail, CustomResponse };
