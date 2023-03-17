import { Redirect, SplashScreen, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useAuth } from "../features/auth";
import { usePosts } from "../features/posts";
import { prefetchPosts } from "../features/posts/usePosts";

const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
export default function Index() {
    const { isLoading: authLoading, isLoggedIn } = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const queryClient = useQueryClient()
    const router = useRouter()
    // useEffect(() => {
    //     if (authLoading === false) {
    //         if (isLoggedIn) {
    //             Promise.all([
    //                 prefetchPosts(queryClient, 'posts'),
    //                 prefetchPosts(queryClient, 'events'),
    //                 prefetchPosts(queryClient, 'meetings'),
    //                 prefetchPosts(queryClient, 'ml-slide'),
    //             ]).then(() => {
    //                 setIsLoading(false)
    //             })
    //         }
    //         else setIsLoading(false)
    //     }
    // }, [authLoading, isLoggedIn])
    // if (isLoading) return <SplashScreen />
    if (authLoading) return <SplashScreen />
    if (isLoggedIn) return <Redirect href="/posts" />
    else return <Redirect href="/login" />

}
