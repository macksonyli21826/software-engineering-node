import {Request, Response} from "express";
import Follow from "../models/follows/Follow";

export default interface FollowControllerI{
    userFollowsUser (req: Request, res: Response): void;

    userUnfollowsUser (req: Request, res: Response): void;

    findAllUsersThatUserFollowing (req: Request, res: Response): void;

    findAllUsersThatFollowingUser (req: Request, res: Response): void;
};