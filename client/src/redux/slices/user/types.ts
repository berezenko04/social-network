import { Status } from "@/@types/type";

export interface IUserSliceState {
    data: null | IUserData,
    status: Status.LOADING | Status.SUCCESS | Status.ERROR,
}

export interface IUserData {
    _id: string,
    email: string,
    name: string,
    avatarUrl: string,
    posterUrl: string,
    siteUrl: string,
    token: string,
    birthDate: string,
    username: string,
    description: string
    followers: number,
    following: number
}

export interface IUpdateInfo {
    username: string,
    avatar: File,
    name: string,
    birthDate: string,
}

