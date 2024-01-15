import { Status } from "@/@types/type"

export interface IPostState {
    data: null | TPost[]
    count: number,
    status: Status.ERROR | Status.LOADING | Status.SUCCESS
}

export interface IFetchPosts {
    posts: TPost[],
    count: number
}

export type TPost = {
    _id: string,
    content: string,
    attached: string[],
    createdAt: Date
    user: string,
    likes: number,
    views: number
}