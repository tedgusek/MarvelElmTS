"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const vite_plugin_elm_1 = require("vite-plugin-elm");
const dns_1 = __importDefault(require("dns"));
dns_1.default.setDefaultResultOrder('verbatim');
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, vite_plugin_elm_1.plugin)()],
    server: {
        open: true,
        // port: 8080,
        // origin: 'http://localhost:5173',
        // proxy: {
        //   '/': {
        //     target: 'http://localhost:5173',
        //     changeOrigin: true,
        //   },
        // },
    },
    build: {
        manifest: true,
        rollupOptions: {
            input: './frontend/src/Main.elm',
        },
        outDir: 'build',
        target: 'es2020',
    },
});
//# sourceMappingURL=vite.config.js.map