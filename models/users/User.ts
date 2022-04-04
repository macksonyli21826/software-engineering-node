
import mongoose from "mongoose"

import AccountType from "./AccountType"; // personal/academic/professional
import MaritalStatus from "./MaritalStatus"; // married/single/widowed
import Location from "./Location"; // latitude/longitude

export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    firstName?: string,
    lastName?: string,
    email: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    location?: Location,
    salary?: number
};