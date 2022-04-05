
/**
 * @file Server file
 */
 import express, {Request, Response} from 'express';

 import UserController from "./controllers/UserController";
 import TuitController from "./controllers/TuitController";
 import LikeController from "./controllers/LikeController";
 import mongoose from "mongoose";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
 
 // connect to the database
 //const DB_USERNAME = process.env.DB_USERNAME;
 //const DB_PASSWORD = process.env.DB_PASSWORD;
 const connectionString = 'mongodb+srv://li_yuanqia:123456ABC@cluster0.gh58x.mongodb.net/Tuiter?retryWrites=true&w=majority';
 mongoose.connect(connectionString);
 
 // create RESTful Web service API
 const app = express();
 app.use(express.json());
 
 app.get('/', (req: Request, res: Response) =>
     res.send('Welcome!'));
 
 app.get('/add/:a/:b', (req: Request, res: Response) =>
     res.send(req.params.a + req.params.b));

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);

 const PORT = 4000;
 app.listen(process.env.PORT || PORT);

