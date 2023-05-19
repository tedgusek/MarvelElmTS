"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const md5_1 = __importDefault(require("md5"));
const dotenv_1 = __importDefault(require("dotenv"));
const marvelController = {
    async getCharacters(req, res) {
        try {
            await dotenv_1.default.config();
            const apiKey = process.env.MARVEL_API_KEY_PRIVATE;
            const publicKey = process.env.MARVEL_API_KEY_PUBLIC;
            const ts = new Date().getTime().toString();
            const hash = (0, md5_1.default)(ts + apiKey + publicKey);
            const endpoint = `v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
            const response = await axios_1.default.get(`http://gateway.marvel.com/${endpoint}`);
            const charactersArray = response.data.data.results; //returns an array of objects, we want to use the properties: 'name', 'description', 'thumbnail.path'
            //   console.log(charactersArray[0].name);
            const limitedCharactersArray = charactersArray.map((character) => {
                const limitedCharacter = {
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
            res
                .setHeader('Access-Control-Allow-Origin', 'http://localhost:5173/characters')
                .status(200)
                .json(limitedCharactersArray);
        }
        catch (error) {
            console.log('Error retrieving charactersArray:', error);
            res
                .status(500)
                .json({ error: 'Internal Server Error' });
        }
    },
    // Add other methods here as needed
};
exports.default = marvelController;
//# sourceMappingURL=marvelController.js.map