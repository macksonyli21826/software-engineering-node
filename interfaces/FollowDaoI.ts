import Follow from "../models/follows/Follow";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface FollowDaoI {

    // User 1 follows user 2
    userFollowsUser (uid1: string, uid2: string): Promise<Follow>;

    // User 1 unfollows user 2
    userUnfollowsUser (uid1: string, uid2: string): Promise<any>;

    // User views a list of other users they are following
    findAllUsersThatUserFollowing (uid: string): Promise<Follow[]>;

    // User views a list of other users that are following them
    findAllUsersThatFollowingUser (tid: string): Promise<Follow[]>;

};
