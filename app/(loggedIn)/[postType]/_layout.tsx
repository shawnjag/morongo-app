import { View, Text, Pressable, ScrollView, useWindowDimensions } from "react-native";
import { Link, Slot, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { StatusBar } from "expo-status-bar";
import ImageSlider from "../../../components/ImageSlider";
import { usePosts, PostHeader } from "../../../features/posts";
import Tabs from "../../../components/Tabs";

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useGlobal } from "../../_layout";
import { WP_Post } from "../../../features/posts/types";

export default function PostsLayout() {
    const { width } = useWindowDimensions()
    // const isTablet = width >= 768
    const isTablet = width >= 1024

    const pathName = usePathname()
    const { isFullScreen } = useGlobal()

    const { isLoading: loadingNews, data: news } = usePosts('posts')

    const { isLoading: loadingEvents, data: { events } } = usePosts('events')


    const tabs = ['Upcoming', 'Previous']
    const [activeTab, setActiveTab] = useState(0)

    useEffect(() => {
        console.log({ events })
    }, [events])

    const posts = news && news.length && events && events.length ? [...events, ...news].sort((a, b) => {
        const aDate = 'venue' in a ? `${a.start_date}` : a.date
        const bDate = 'venue' in b ? `${b.start_date}` : b.date
        if (activeTab === 0) return Number(new Date(aDate)) - Number(new Date(bDate))
        if (activeTab === 1) return Number(new Date(bDate)) - Number(new Date(aDate))
    }).filter(post => {
        if (activeTab === 0) {
            if ('venue' in post) return Number(new Date(`${post.start_date}`)) > Number(new Date())
            else return Number(new Date(post.date)) > Number(new Date())

        }
        if (activeTab === 1) {
            if ('venue' in post) return Number(new Date(`${post.start_date}`)) < Number(new Date())
            else return Number(new Date(post.date)) < Number(new Date())

        }
    }) : []
    if (isFullScreen) return <View className="flex-1">
        <StatusBar style="dark" />
        <Slot />
    </View>

    return <View>
        <View className="flex-row">

            <View className={`${isTablet || pathName === '/posts' ? 'w-full' : 'hidden'} lg:w-1/3  h-full bg-gray-200`}>

                {!isTablet ? <View>

                    <ImageSlider />
                </View> : null}
                <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                {loadingNews || loadingEvents ? <Text>Loading...</Text> : <View><ScrollView>
                    {posts.map((post, index) => <Link href={`/${'venue' in post ? 'events' : `${post.type}s`}/${post.id}`} key={post.id} asChild >
                        <Pressable
                            className={`p-1 ${pathName === `/${'venue' in post ? 'events' : `${post.type}s`}/${post.id}` ? 'bg-orange-200' : index % 2 === 0 ? 'bg-white' : undefined}`}>
                            <PostHeader post={post} />
                        </Pressable>
                    </Link>)
                    }

                </ScrollView>
                </View>
                }
            </View>
            <View className="flex-1 items-center">
                <Slot />
            </View>
        </View>
    </View>
}
