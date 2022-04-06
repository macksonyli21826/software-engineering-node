import Message from "../models/messages/Message";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
    userMessagesUser (uid1: string, uid2: string, message: Message): Promise<Message>;
    findMessagesSentFromUser (uid: string): Promise<Message[]>;
    findMessagesSentToUser (uid: string): Promise<Message[]>;
    deleteMessage (mid: string): Promise<any>;
};