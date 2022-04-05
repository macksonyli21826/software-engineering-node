import FollowDaoI from "../interfaces/FollowDaoI"
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    userFollowsUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.create({userFollowing: uid2, userFollowed: uid1});

    userUnfollowsUser = async(uid1: string, uid2: string): Promise<any> =>
        FollowModel.deleteOne({userFollowing: uid2, userFollowed: uid1});

    findAllUsersThatUserFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();

    findAllUsersThatFollowingUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();
}