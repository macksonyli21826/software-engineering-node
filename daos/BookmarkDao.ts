import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";

export default class BookmarkDao implements BookmarkDaoI {

    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {}

    userBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({bookmarkedBy: uid, bookmarkedTuit: tid});

    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedBy: uid, bookmarkedTuit: tid});
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedBy: uid})
            .populate("bookmarkedTuit")
            .exec();
}