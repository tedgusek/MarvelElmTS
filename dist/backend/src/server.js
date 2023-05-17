"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const marvelController_1 = __importDefault(require("./controllers/marvelController"));
const app = (0, express_1.default)();
const PORT = 5173;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.get('/characters', marvelController_1.default.getCharacters);
// Error handling middleware
app.use((err, req, res) => {
    console.log(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map