// import { Request, Response } from 'express';
// import axios from 'axios';
// import md5 from 'md5';

// import dotenv from 'dotenv';
// dotenv.config();

// interface CustomResponse extends Response {
//   status(code: number): CustomResponse;
//   json(data: any): CustomResponse;
// }

// const apiKey = process.env.MARVEL_API_KEY_PRIVATE;
// const publicKey = process.env.MARVEL_API_KEY_PUBLIC;

// export async function getCharacters(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   const ts = new Date().getTime().toString();
//   const hash = md5(ts + apiKey + publicKey);

//   const endpoint = `v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

//   try {
//     const response = await axios.get(
//       `http(s)://gateway.marvel.com/${endpoint}`
//     );
//     const characters = response.data;

//     (res as CustomResponse).status(200).json(characters);
//   } catch (error) {
//     console.log('Error retrieving characters:', error);
//     (res as CustomResponse)
//       .status(500)
//       .json({ error: 'Internal Server Error' });
//   }
// }
import { Request, Response } from 'express';
import axios from 'axios';
import md5 from 'md5';

import dotenv from 'dotenv';

interface CustomResponse extends Response {
  status(code: number): CustomResponse;
  json(data: any): CustomResponse;
}

const marvelController = {
  async getCharacters(req: Request, res: Response): Promise<void> {
    try {
      await dotenv.config();
      const apiKey = process.env.MARVEL_API_KEY_PRIVATE;
      const publicKey = process.env.MARVEL_API_KEY_PUBLIC;

      const ts = new Date().getTime().toString();
      const hash = md5(ts + apiKey + publicKey);

      const endpoint = `v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`; // Replace with your desired endpoint path
      //   const endpoint = `v1/public/comics/82967/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

      const response = await axios.get(`http://gateway.marvel.com/${endpoint}`); // took out (s) after http
      const charactersArray = response.data.data.results; //returns an array of objects, we want to use the properties: 'name', 'description', 'thumbnail.path'
      console.log(charactersArray[0].name);

      // const charactersArray = response.data.results; // Adjust this based on the Marvel API response structure

      (res as CustomResponse).status(200).json(charactersArray);
    } catch (error) {
      console.log('Error retrieving charactersArray:', error);
      (res as CustomResponse)
        .status(500)
        .json({ error: 'Internal Server Error' });
    }
  },

  // Add other methods here as needed
};

export default marvelController;
