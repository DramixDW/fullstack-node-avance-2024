"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.soundRouter = void 0;
const express_1 = require("express");
const authorize_middleware_1 = require("../Middlewares/authorize.middleware");
const multer_1 = __importDefault(require("multer"));
const express_validator_1 = require("express-validator");
const validation_middleware_1 = require("../Middlewares/validation.middleware");
const sounds_1 = require("../Database/sounds");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        // ['lapin', 'mp3']
        const fileParts = file.originalname.split('.');
        const extension = fileParts.pop();
        // file.mp3
        // => file-4556466.mp3
        cb(null, `${fileParts.join('.')}-${Date.now()}.${extension}`);
    }
});
const configuredMulter = (0, multer_1.default)({
    dest: './uploads',
    storage,
});
exports.soundRouter = (0, express_1.Router)();
exports.soundRouter.get('/', (0, authorize_middleware_1.createAuthorizeMiddleWare)([]), async (request, response) => {
    const sounds = await (0, sounds_1.getAllSounds)();
    response.send(sounds);
});
exports.soundRouter.get('/list', async (request, response) => {
    const sounds = await (0, sounds_1.getAllSounds)();
    response.render('sound_list', {
        sounds,
    });
});
exports.soundRouter.get('/:id', (0, authorize_middleware_1.createAuthorizeMiddleWare)([]), async (request, response, next) => {
    const sound = await (0, sounds_1.getSoundById)(request.params.id);
    response.send(sound);
});
const uploadValidation = [
    (0, express_validator_1.body)('name').notEmpty(),
    (0, express_validator_1.body)('category').notEmpty(),
    // on vérifie que c'est un audio/mpeg => mp3
    (0, express_validator_1.body)('files.*.mimetype').isIn(['audio/mpeg'])
];
// array => multiple
exports.soundRouter.post('/', configuredMulter.array('sound'), (req, _res, next) => {
    // petit hack qui permet de valider avec express-validator. On met le file dans le body
    req.body.files = req.files; // => tableau de fichiers 
    // on passe à la suite => ...uploadValidation
    next();
}, ...uploadValidation, validation_middleware_1.ValidationMiddleware, async (request, response) => {
    // soit un objet de files, soit un tableau de files. On doit utiliser une assertion pour lui indiquer le bon type.
    const files = request.files;
    for (const file of files) {
        // truc.mp3
        const fileName = file.filename.split('.');
        // => ['truc', 'mp3']
        fileName.pop();
        // => ['truc']
        await (0, sounds_1.createSound)({
            id: new Date().getTime().toString(),
            name: `${request.body.name}-${fileName.join('.')}`,
            category: request.body.category,
            // filename à la place de originalName pour avoir le nom du fichier final qui sera stocké sur le disque
            file: file.filename,
        });
    }
    response.redirect('/sounds/list');
});
// Les formulaires en html n'accepte que les method post et get. Pour pas écrire un fetch,
// Nous avons fait un post /:id qui se comporte comme un put.
exports.soundRouter.post('/:id', configuredMulter.single('sound'), async (request, response) => {
    var _a;
    await (0, sounds_1.replaceSound)(request.params.id, Object.assign(Object.assign({}, request.body), { file: (_a = request.file) === null || _a === void 0 ? void 0 : _a.originalname }));
    response.redirect('/sounds/list');
});
exports.soundRouter.delete('/:id', async (request, response) => {
    await (0, sounds_1.deleteSound)(request.params.id);
    response.status(204).send(null);
});
