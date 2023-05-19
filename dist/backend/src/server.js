"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const marvelController_1 = __importDefault(require("./controllers/marvelController"));
const express_1 = __importDefault(require("express"));
// import path from 'path';
// const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app = (0, express_1.default)();
const PORT = 5173;
// app.use(express.static(path.resolve(__dirname, '../../frontend/src')));
// app.use(express.static(path.resolve(__dirname, '../../frontend/src')));
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.get('/characters', marvelController_1.default.getCharacters);
// Error handling middleware
//need to rework this
// app.use((err: any, req: Request, res: Response) => {
//   // console.log(err.stack);
//   (res as CustomResponse).status(500).json({ error: 'Internal Server Error' });
//   // return;
// });
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
//# sourceMappingURL=server.js.map