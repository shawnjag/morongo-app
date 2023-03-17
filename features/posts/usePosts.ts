import { QueryClient, useQuery, useQueryClient } from "react-query"
import { supabase } from "../../lib/supabase"
import { useAuth } from "../auth"
import fields from './postFields'
import { WP_Event, WP_Post } from "./types"

const defaultParams = {
    private: 'true',
    per_page: '25',
    _embed: 'wp:featuredmedia',
}


const getPosts = async (postType: keyof typeof fields, params = {}) => {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw new Error(error.message)
    if (data.session) {
        const accessToken = data.session.access_token
        const url = postType === 'events' ? new URL(`https://events.morongo.workers.dev/${postType}`) : new URL(`https://wordpress.morongo.workers.dev/${postType}`)
        for (const [key, value] of Object.entries({ ...defaultParams, ...params })) {
            url.searchParams.append(key, value)
        }

        const response = await fetch(`${String(url)}${postType in fields ? `&_fields=${fields[postType].join(',')}` : ''}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.ok) {
            if (postType === 'events') return await response.json() as { events: WP_Event[] }
            return await response.json() as WP_Post[]
        }
        else throw new Error(`There was an error getting ${postType}.`)
    }
    else throw new Error('Unauthorized')
}

const usePosts = (postType: keyof typeof fields, params = {}) => {
    const { isLoggedIn } = useAuth()
    return useQuery([postType, { ...defaultParams, ...params }], () => getPosts(postType, params), { staleTime: 1000 * 60 * 60 * 24, placeholderData: [], enabled: isLoggedIn })
}

const prefetchPosts = async (queryClient: QueryClient, postType: keyof typeof fields, params = {}) => {
    return await queryClient.prefetchQuery([postType, { ...defaultParams, ...params }], () => getPosts(postType, params), { staleTime: 1000 * 60 * 60 * 24 })
}

export { prefetchPosts }

export default usePosts