/**
 * @file Declares bookmark that user can bookmark tuits
 */
import User from "../users/User";
import Tuit from "../tuits/Tuit";


/**
 * @typedef Bookmark represents a user bookmarks a tuit
 * @property {User} bookmarkedBy User who bookmarks the tuit
 * @property {Tuit} bookmarkedTuit tuit that is bookmarked
 */

export default interface Bookmark {
    bookmarkedBy: User
    bookmarkedTuit: Tuit,
};