import { Status } from "@/@types/type"
import { TPost } from "../posts/types"

export interface IBookmarksState {
    status: Status.ERROR | Status.LOADING | Status.SUCCESS
    data: TPost[]
}
