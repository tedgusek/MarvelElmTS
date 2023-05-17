import { Request, Response } from 'express';
import axios from 'axios';
import md5 from 'md5';

import dotenv from 'dotenv';
dotenv.config();

interface CustomResponse extends Response {
  status(code: number): CustomResponse;
  json(data: any): CustomResponse;
}

const apiKey = process.env.MARVEL_API_KEY_PRIVATE;
const publicKey = process.env.MARVEL_API_KEY_PUBLIC;

export async function marvelController(
  req: Request,
  res: Response
): Promise<void> {
  const ts = new Date().getTime().toString();
  const hash = md5(ts + apiKey + publicKey);

  const endpoint = `v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`; // Replace with your desired endpoint path

  try {
    const response = await axios.get(
      `http(s)://gateway.marvel.com/${endpoint}`
    );
    const characters = response.data;

    // const characters = response.data.results; // Adjust this based on the Marvel API response structure

    (res as CustomResponse).status(200).json(characters);
  } catch (error) {
    console.log('Error retrieving characters:', error);
    (res as CustomResponse)
      .status(500)
      .json({ error: 'Internal Server Error' });
  }
}
