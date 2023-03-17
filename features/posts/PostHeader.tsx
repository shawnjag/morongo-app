import { View, Text } from 'react-native'
import { format } from 'date-fns'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { WP_Post } from './types'

export default function PostHeader({ post }: { post: WP_Post }) {
    // if (post.type === 'tribe_events') return <Text>{JSON.stringify({ post })}</Text>
    if (!('type' in post)) {
        return <View className="flex-row items-center">

            <View className="border-orange-500 border-2 mr-2">
                <Text className="px-2 text-center text-md bg-orange-500 text-white">
                    {format(new Date(post.start_date), 'MMM')}
                </Text>
                <Text className="text-center text-lg">
                    {format(new Date(post.start_date), 'dd')}
                </Text>
            </View>
            <View className="flex-1">
                <Text className="text-xs">
                    {/* 1994-01-21T16:44:44 -> Monday, January 21st */}
                    {format(new Date(post.start_date), 'EEEE, MMMM do @ HH:mm a')}
                </Text>
                <Text className="text-md">
                    {post.title}
                </Text>
            </View>
        </View>
    }
    if (post.type === 'meeting') {
        // const date = `${post.meeting_date.replace(' ', 'T')}`
        const date = post.meeting_date.replace(' ', 'T').split(' ')[0]
        return <View className="flex-row items-center">

            <View className="border-orange-500 border-2 mr-2 w-12 h-12">
                <Text className="px-2 text-center text-md bg-orange-500 text-white">
                    {format(new Date(date), 'MMM')}
                </Text>
                <Text className="text-center text-lg">
                    {/* 1994-01-21T16:44:44 -> 21 */}
                    {format(new Date(date), 'dd')}
                </Text>
            </View>
            <View className="flex-1">
                <Text className="text-xs">
                    {/* 1994-01-21T16:44:44 -> Monday, January 21st */}
                    {format(new Date(date), 'EEEE, MMMM do @ HH:mm a')}
                </Text>
                <Text className="text-md">
                    {post.meeting_type}
                </Text>
            </View>
        </View>

    }


    return <View className="flex-row items-center">

        <View className="mr-2">
            {post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.thumbnail?.source_url ?
                <Image className="w-12 h-12" source={{
                    uri: post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url
                }} />
                : <MaterialCommunityIcons name={post.type === 'page' ? 'file-document-outline' : 'categories' in post && post.categories.includes(137) ? 'ballot-outline' : `newspaper-variant-outline`} size={48} color="black" />}
        </View>
        <View className="flex-1">
            <Text className="text-md">
                {post.title.rendered}
            </Text>
        </View>

    </View>
}