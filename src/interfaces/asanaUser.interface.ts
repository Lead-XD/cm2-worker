
import mongoose from "mongoose";
import {AsanaResourceTypes} from "../constants/asana.constants";

export interface AsanaUserDocumentInterface {
    gid: string,
    resourceType: AsanaResourceTypes,
    name: string,
    email: string,
    photo: {
        image21x21: string
        image27x27: string
        image36x36: string
        image60x60: string
        image128x128: string
        image1024x1024: string
    },
    workspaces: workspace[],
}

interface workspace {
    gid: string,
    resourceType: AsanaResourceTypes,
    name: string,
}
