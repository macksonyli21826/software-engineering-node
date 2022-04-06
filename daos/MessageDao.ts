/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";
import MessageDaoI from "../interfaces/MessageDaoI";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of UserDao
 */

export default class MessageDao implements MessageDaoI{

    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

    userMessagesUser = async (uid1: string, uid2: string, body: Message): Promise<Message> =>
        MessageModel.create({from: uid1, to: uid2, message: body.message});
    findMessagesSentFromUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({from: uid})
    findMessagesSentToUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({to: uid});
    deleteMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});

}