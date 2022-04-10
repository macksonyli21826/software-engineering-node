import {Request, Response} from "express";
import Tuit from "../models/tuits/Tuit";

export default interface TuitControllerI {
    findAllTuits (req: Request, res: Response): void;
    findTuitById (req: Request, res: Response): void;
    findTuitByUser (req: Request, res: Response): void;
    createTuit (req: Request, res: Response): void;
    updateTuit (req: Request, res: Response): void;
    deleteTuit (req: Request, res: Response): void;
    deleteTuitsByUser (Req: Request, res: Response): void;
    deleteAllTuits (req: Request, res: Response): void;
};