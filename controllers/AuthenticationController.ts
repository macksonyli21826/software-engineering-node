
import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";

// bcrypt is used to encrypt the password
const bcrypt = require('bcrypt');

const saltRounds = 10;

const AuthenticationController = (app: Express) => {
    
    const userDao: UserDao = UserDao.getInstance();

    const signup = async (req: Request, res: Response) => {
        console.log("signup entered")
        const newUser = req.body;
        const password = newUser.password;
        if (password === undefined) {
            res.sendStatus(400);
            return;
        }
        const hash = await bcrypt.hash(password, saltRounds);
        newUser.password = hash;

        const existingUser = await userDao
            .findUserByUsername(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        } else {
            const insertedUser = await userDao
                .createUser(newUser);
            insertedUser.password = '';

            // @ts-ignore
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    }
    app.post("/api/auth/signup", signup);


// login button is hooked here
const login = async (req: Request, res: Response) => {

    console.log("==> login")
    console.log("==> req.session")
    console.log(req.session)

    const user = req.body;
    const username = user.username;
    const password = user.password;
    if (username === undefined) {
        res.sendStatus(400);
        return;
    }
    if (password === undefined) {
        res.sendStatus(400);
        return;
    }
    console.log(password)
    const existingUser = await userDao
        .findUserByUsername(username);
    if(existingUser === null){
        res.sendStatus(400);
        return;
    }
    const match = await bcrypt.compare(password, existingUser.password);
    // login successful, response is existing user and it displays their profile
    // login not successful, response is error code, and it stays here
    if (match) {
        existingUser.password = '*****';
        // @ts-ignore
        req.session['profile'] = existingUser;
        res.json(existingUser);
    } else {
        res.sendStatus(403);
    }
}

    // register is the same as signup
    /*
    const register = async (req: Request, res: Response) => {
        console.log("==> register")
        console.log("==> req.session")
        console.log(req.session)

        const newUser = req.body;
        const password = newUser.password;
        const hash = await bcrypt.hash(password, saltRounds);
        newUser.password = hash;

        const existingUser = await userDao
            .findUserByUsername(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        } else {
            const insertedUser = await userDao
                .createUser(newUser);
            insertedUser.password = '';
            // @ts-ignore
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    }
     */

    // if profile exists, the profile content gets loaded
    // if profile not exists send status
    // profile screen is hooked here
    const profile = (req: Request, res: Response) => {
        // @ts-ignore
        const profile = req.session['profile'];
        if (profile) {
            // line below added from instruction
            profile.password = "";
            res.json(profile);
        } else {
            res.sendStatus(403);
        }
    }

    // logout button hooks here and destroy session
    const logout = (req: Request, res: Response) => {
        // @ts-ignore
        req.session.destroy();
        res.sendStatus(200);
    }

    app.post("/api/auth/profile", profile);
    app.post("/api/auth/logout", logout);


    app.post("/api/auth/login", login);
    // app.post("/api/auth/register", register);


}

export default AuthenticationController;

