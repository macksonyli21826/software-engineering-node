/**
 * @file Controller RESTful Web service API for Message resource
 */
import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";
import Message from "../models/messages/Message";
/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid1/messages/:uid2 to record that a user sends
 *     messages to the other user
 *     </li>
 *     <li>GET /api/users/:uid/messages/to to retrieve all the messages a user
 *     sends
 *     </li>
 *     <li>GET /api/users/:uid/messages/from to retrieve all the messages sent
 *     to user
 *     </li>DELETE /api/messages/:mid to delete a specific message
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing messages CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:uid1/messages/:uid2", MessageController.messageController.userMessagesUser);
            app.get("/api/users/:uid/messages/from", MessageController.messageController.findMessagesSentFromUser);
            app.get("/api/users/:uid/messages/to", MessageController.messageController.findMessagesSentToUser);
            app.delete("/api/messages/:mid", MessageController.messageController.deleteMessage);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    /**
     * user sends messages to other user
     * @param {Request} req Represents request from client, including the path
     * parameter uid user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON representing message
     */
    userMessagesUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesUser(req.params.uid1, req.params.uid2, req.body)
            .then((message: Message) => res.json(message));

    /**
     * user find all messages sent from user
     * @param {Request} req Represents request from client, including the path
     * parameter uid user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON representing message
     */

    findMessagesSentFromUser = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesSentFromUser(req.params.uid)
            .then((messages: Message[]) => res.json(messages));

    /**
     * user find all messages sent to user
     * @param {Request} req Represents request from client, including the path
     * parameter uid user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON representing message
     */

    findMessagesSentToUser = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesSentToUser(req.params.uid)
            .then((messages: Message[]) => res.json(messages));

    /**
     * delete a message
     * @param {Request} req Represents request from client, including the path
     * parameter uid user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON representing message
     */
    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteMessage(req.params.mid)
            .then((status)=>res.send(status));

};
