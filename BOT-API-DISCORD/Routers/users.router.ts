import { Router, response } from "express";
import { deleteUser, getAllUsers, getUserById, insertUser, updateUser } from "../Database/users";
import { DatabaseConnection } from "../Database/connection";
import { User } from "../Models/users";
import { EntityNotFoundError } from "../Errors/entity-not-found.error";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export const userRouter = Router();

userRouter.get('/', async (request, response) => {
    const allUsers = await getAllUsers();
    response.send(allUsers);
})

userRouter.get('/list', async (request, response) => {
   const users = await getAllUsers();  
   response.render("user_list", {
        users,
        isCurrentRole: () => function (placeholder: string, render: Function) {
            const [currentRole, testedRole] = render(placeholder).trim().split(" ");
            if (currentRole === testedRole) {
                return "disabled";
            }
            return "";
        }
   })
});

// récupération de la page
userRouter.get('/login', async (request, response) => {
    return response.render('login_page', {});
});

// authentication
userRouter.post('/login',async (request, response, next) => {
    const { username , password } = request.body;

    const user = await DatabaseConnection.manager.findOne(User, {
        where: {
            username
        }
    });

    if (!user) {
        return next(new EntityNotFoundError("Mot de passe ou nom d'utilisateur incorrect"));
    }

    if (!await compare(password, user.password)) {
        return next(new EntityNotFoundError("Mot de passe ou nom d'utilisateur incorrect"));
    }

    const accessToken = sign({
        id: user.id,
        //issuedAt: à quel moment il a été généré
        iat: new Date().getTime() / 1000,
        // à quelle moment le token expire
        exp: (new Date().getTime() / 1000) + 300,
    }, process.env.JWT_SECRET!);

    console.log(accessToken);
    

    response.send({
        accessToken: ''
    });
});

userRouter.get('/:id', async (request, response, next) => {
    try {
        const user = await getUserById(request.params.id);
        response.send(user);
    } catch(err) {
        next(err);
    }
})

userRouter.post('/', async (request, response) => {
    response.send(await insertUser(request.body));
})

userRouter.patch('/:id', async (request, response, next) => {
    try {
        const user = await updateUser(request.params.id, request.body);
        response.send(user);
    } catch(err) {
        next(err);
    }
})

userRouter.delete('/:id', async (request, response) => {
    await deleteUser(request.params.id);
    response.status(204).send(null);
})