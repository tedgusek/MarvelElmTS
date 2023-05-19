"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const marvelController_1 = __importDefault(require("../controllers/marvelController"));
const router = express_1.default.Router();
router.get('/characters', marvelController_1.default.getCharacters
// (req: Request, res: Response) => res.status(200).json(res.locals.data)
);
exports.default = router;
//# sourceMappingURL=marvelApi.js.map