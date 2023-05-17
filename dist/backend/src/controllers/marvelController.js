"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.marvelController = void 0;
const axios_1 = __importDefault(require("axios"));
const md5_1 = __importDefault(require("md5"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const apiKey = process.env.MARVEL_API_KEY_PRIVATE;
const publicKey = process.env.MARVEL_API_KEY_PUBLIC;
async function marvelController(req, res) {
    const ts = new Date().getTime().toString();
    const hash = (0, md5_1.default)(ts + apiKey + publicKey);
    const endpoint = `v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    try {
        const response = await axios_1.default.get(`http(s)://gateway.marvel.com/${endpoint}`);
        const characters = response.data;
        res.status(200).json(characters);
    }
    catch (error) {
        console.log('Error retrieving characters:', error);
        res
            .status(500)
            .json({ error: 'Internal Server Error' });
    }
}
exports.marvelController = marvelController;
//# sourceMappingURL=marvelController.js.map