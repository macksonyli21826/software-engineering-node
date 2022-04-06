import {Request, Response} from "express";
import Message from "../models/messages/Message";

export default interface MessageControllerI {
    userMessagesUser (req: Request, res: Response): void;
    findMessagesSentFromUser (req: Request, res: Response): void;
    findMessagesSentToUser (req: Request, res: Response): void;
    deleteMessage (req: Request, res: Response): void;
};