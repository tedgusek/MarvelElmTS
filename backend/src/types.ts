import { Response } from 'express';

const ALLOWED_ORIGIN = null;

interface Character {
  name: string;
  description: string;
  //   thumbnail: string;
  thumbnail: Thumbnail;
}

interface Thumbnail {
  path: string;
  extension: string;
}

interface CustomResponse extends Response {
  status(code: number): CustomResponse;
  json(data: any): CustomResponse;
  setHeader(
    header: 'Access-Control-Allow-Origin',
    value: typeof ALLOWED_ORIGIN
  ): CustomResponse;
}

export { Character, Thumbnail, CustomResponse };
