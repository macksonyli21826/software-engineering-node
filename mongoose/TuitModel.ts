// @ts-ignore
import mongoose from "mongoose";
import TuitSchema from "./TuitSchema";

const TuitModel = mongoose.model('UserModel', TuitSchema);

export default TuitModel;
