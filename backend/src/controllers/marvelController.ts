import { Request, Response } from 'express';
import axios from 'axios';
import md5 from 'md5';
import dotenv from 'dotenv';
import { Character, CustomResponse } from '../types';

const marvelController = {
  async getCharacters(req: Request, res: Response): Promise<void> {
    try {
      await dotenv.config();
      const apiKey = process.env.MARVEL_API_KEY_PRIVATE;
      const publicKey = process.env.MARVEL_API_KEY_PUBLIC;

      const ts = new Date().getTime().toString();
      const hash = md5(ts + apiKey + publicKey);

      const endpoint = `v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

      const response = await axios.get(`http://gateway.marvel.com/${endpoint}`);
      const charactersArray: Character[] = response.data.data.results; //returns an array of objects, we want to use the properties: 'name', 'description', 'thumbnail.path'
      //   console.log(charactersArray[0].name);

      const limitedCharactersArray = charactersArray.map((character) => {
        const limitedCharacter: Character = {
          name: character.name,
          description: character.description,
          thumbnail: {
            path: character.thumbnail.path,
            extension: character.thumbnail.extension,
          },
        };
        return limitedCharacter;
      });

      //   console.log(limitedCharactersArray);

      (res as CustomResponse)
        .setHeader('Access-Control-Allow-Origin', null)
        .status(200)
        .json(limitedCharactersArray);
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
