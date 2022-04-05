/**
 * @file Declares Follow data type representing relationship between
 * users and another user
 */
import User from "../users/User";

/**
 * @typedef Follow represents a follow relationship between the users
 * @property {User} userFollowing users that user follows
 * @property {User} userFollowed other users that follow user
 */
export default interface Follow {
    userFollowing: User;
    userFollowed: User;
};