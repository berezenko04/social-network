import { Status } from "@/@types/type"

export interface IPostState {
    data: null | TPost[]
    status: Status.ERROR | Status.LOADING | Status.SUCCESS
}

export type TPost = {
    content: string,
    attached: string[],
    createdAt: Date
    user: string,
    likes: number,
    views: number
}