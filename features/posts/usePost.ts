import { supabase } from "../../lib/supabase"
import { WP_Event, WP_Post } from "./types"
import fields from './postFields'
import { useQuery } from "react-query"

const getPostById = async (postType: keyof typeof fields, postId: number) => {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw new Error(error.message)
    if (data.session) {
        const accessToken = data.session.access_token
        console.log({ postType, postId })
        if (postType === 'events') {
            return await fetch(`https://events.morongo.workers.dev/${postType}/${postId}?private=true`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then(async response => {
                    if (response.ok) {
                        return await response.json() as WP_Event
                    }
                    else throw "There was an error getting the event."

                })

        }
        return await fetch(`https://wordpress.morongo.workers.dev/${postType}/${postId}?private=true&_embed=wp:featuredmedia`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(async response => {
                if (response.ok) {
                    return await response.json() as WP_Post
                }
                else throw "There was an error getting the post."

            })
    }
    else throw "Unauthorized"

}

const usePost = (postType: keyof typeof fields, postId: number) => {
    return useQuery([postType, postId], () => getPostById(postType, postId), { staleTime: 1000 * 60 * 60 * 24 })
}

export default usePost