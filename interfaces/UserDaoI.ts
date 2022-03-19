// This is file for A2
// Implements the interface that the DAO needs to implement. This would allow us to replace
// the DAO implementation without disrupting the rest aof the application

import User from "../models/users/User";

export default interface UserDaoI {
    findAllUsers (): Promise<User[]>;
    findUserById (uid: string): Promise<any>;
    createUser (user: User): Promise<User>;
    updateUser (uid: string, user: User): Promise<any>;
    deleteUser (uid: string): Promise<any>;
    deleteAllUsers (): Promise<any>;
};