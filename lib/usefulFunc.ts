import { postType } from "@/app/page";

export function sortPostsByDate(array: postType[]) {
    return array.sort((a,b) => new Date(a.updated_at).getUTCDate() - new Date(b.updated_at).getUTCDate())
}