import { Router, Request, Response } from "express";
import { body, checkSchema, param, query } from "express-validator";
import { ValidationMiddleware } from "./validation-middleware";

const router = Router();

const validation = [
    body('title', 'Le titre est absent').notEmpty(),
    body('directors', 'Les réalisateurs doivent être un tableau').isArray(),
    body('is_released', 'is_release doit être booléen').isBoolean().toBoolean()
];

// version schéma objet
const schema = checkSchema({
    title: {
        notEmpty: true,
        errorMessage: 'Le titre est absent'
    },
    directors: {
        isArray: true,
        errorMessage: 'Les réalisateurs doivent être un tableau'
    },
    is_released: {
        isBoolean: true,
        toBoolean: true,
        errorMessage: 'is_release doit être un booléen'
    }
});

router.post('/movie',
    schema, // middleware 1 next()    |
    ValidationMiddleware, // middleware 2  <
    (req: Request, res: Response) => { // middleware 3            <
    const body = req.body;

    console.log(body);

    res.send("movie created");
});

// paramètre d'URL
// 123e4567-e89b-12d3-a456-426614174000
router.get('/movie/:id', param('id').isUUID(), ValidationMiddleware,(req, res) => {
    // param :id
    const param = req.params?.id;

    console.log(param);

    res.send({
        title: "Jurassic Clark"
    });
});

router.get('/movie', query('page').isInt().optional().toInt(), ValidationMiddleware ,(req, res) => {
    const query = req.query;

    console.log(query);

    res.send({
        title: 'Jurassic Pork'
    });
})

export {
    router
};