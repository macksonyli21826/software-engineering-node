/**
 * @file Controller RESTful Web service API for likes resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";
/**
 * @class FollowController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid1/userFollowing/:uid2 to record that a user
 *     follows other user
 *     </li>
 *     <li>DELETE /api/users/:uid1/userFollowing/:uid2 to record that a user
 *     unfollows other user
 *     </li>
 *     <li>GET /api/users/:uid/userFollowing to retrieve all users that user following
 *     </li>
 *     <li>GET /api/users/:uid/userFollowed to retrieve all users that following user
 *     </li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing likes CRUD operations
 * @property {FollowController} FollowController Singleton controller implementing
 * RESTful Web service API
 */

export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:uid1/userFollowing/:uid2", FollowController.followController.userFollowsUser);
            app.delete("/api/users/:uid1/userFollowing/:uid2", FollowController.followController.userUnfollowsUser)
            app.get("/api/users/:uid/userFollowing", FollowController.followController.findAllUsersThatUserFollowing);
            app.get("/api/users/:uid/userFollowed", FollowController.followController.findAllUsersThatFollowingUser);
        }
        return FollowController.followController;
    }

    private constructor() {
    }

    /**
     * user follows user
     * @param {Request} req Represents request from client, including the
     * path parameters uid1 and uid2 represents user1 following user2
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */
    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.uid1, req.params.uid2)
            .then(follows => res.json(follows));

    /**
     * user unfollows user
     * @param {Request} req Represents request from client, including the
     * path parameters uid1 and uid2 represents user1 follows user2.
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    userUnfollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsUser(req.params.uid1, req.params.uid2)
            .then(status => res.send(status));


    /**
     * Retrieves all users that user is following
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatUserFollowing = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatUserFollowing(req.params.uid)
            .then(users => res.json(users));

    /**
     * Retrieves all users that are following user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatFollowingUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatFollowingUser(req.params.uid)
            .then(users => res.json(users));
};