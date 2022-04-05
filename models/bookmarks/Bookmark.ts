/**
 * @file Declares bookmark that user can bookmark tuits
 */
import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * @typedef Bookmark represents a user bookmarks a tuit
 * @property {Tuit} bookmarkedTuit tuit that is bookmarked
 * @property {User} bookmarkedBy User who bookmarks the tuit
 */

export default interface Bookmark {
    bookmarkedTuit: Tuit,
    bookmarkedBy: User
};