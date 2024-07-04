"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSession = authSession;
const express_1 = require("@auth/express");
const express_2 = __importDefault(require("express"));
const app = (0, express_2.default)();
const port = 3001;
function authSession(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.locals.session = yield (0, express_1.getSession)(req, { providers: [] });
        next();
    });
}
app.use(authSession);
app.get('/', (req, res) => {
    const { session } = res.locals;
    res.send(session);
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
