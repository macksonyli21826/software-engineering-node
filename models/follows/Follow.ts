/**
 * @file Declares Follow data type representing relationship between
 * users and another user
 */
import User from "../users/User";


export default interface Follow {
    userFollowing: User;
    userFollowed: User;
};