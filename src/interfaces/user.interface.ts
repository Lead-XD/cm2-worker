import mongoose from "mongoose";
import {userTypes} from "../constants/user.constants";

export interface UserDocumentInterface  {
    email: string;
    userType: userTypes;

    profile: {
        firstName: string;
        lastName: string;
        profilePicturePath: string;
        gid?: string;
    }


    organizations: mongoose.Types.ObjectId[];
    organization: mongoose.Types.ObjectId;
    inviteStatus: string;

    passwordResetToken: string;
    passwordResetExpires: Date;

    invitationSource: {
        taskGID: string;
        projectGID: string;
    }
}