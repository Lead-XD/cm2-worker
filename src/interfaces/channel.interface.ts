import mongoose from "mongoose";
import {EmailProviders} from "../constants/email.constants";
import {ChannelStatus} from "../constants/channel.constants";
import {ProjectDocument} from "../models/Project.model";

export interface ChannelDetails {
    sms: SMSChannelDetails,
    email: EmailChannelDetails,
}

export interface EmailChannelDetails extends MessageChannelDetails {
    emailAddress: string;
    provider:EmailProviders;
    signatureImageURL?:string;
}

export interface SMSChannelDetails extends MessageChannelDetails {
    phoneNumber: string;
}

export interface MessageChannelDetails {
    status?:ChannelStatus,
    outboxProject: mongoose.Types.ObjectId|ProjectDocument,
    inboxProject: mongoose.Types.ObjectId|ProjectDocument,
    messageSignature?:string,
}
