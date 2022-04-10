import Tuit from "../models/tuits/Tuit";

/**
 * @file Declares API for Tuits related data access object methods
 */
export default interface TuitDaoI {
    findAllTuits (): Promise<Tuit[]>;
    findTuitById (tid: string): Promise<Tuit>;
    findTuitByUser (uid: string): Promise<Tuit[]>;
    createTuit (uid: string, tuit: Tuit): Promise<Tuit>;
    updateTuit (tid: string, tuit: Tuit): Promise<any>;
    deleteTuit (tid: string): Promise<any>;
    deleteTuitsByUser (uid: string): Promise<any>;
    deleteAllTuits (): Promise<any>;

};