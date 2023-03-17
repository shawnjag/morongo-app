import { Link, useSearchParams } from 'expo-router'
import { Text, View, useWindowDimensions, ScrollView } from 'react-native'
import RenderHtml from 'react-native-render-html';
import { Image } from 'expo-image'
import { MaterialIcons } from '@expo/vector-icons'
import { usePost, PostHeader } from '../../../../features/posts'

export default function ViewPost() {
    const searchParams = useSearchParams()
    const postId = Number(searchParams['postId'])
    const { width } = useWindowDimensions()
    const isTablet = width >= 768
    const { isLoading, isError, data: post } = usePost('posts', postId)
    if (isLoading) return <View>
        <Text>Loading...</Text>
    </View>
    if (isError) return <View>
        <Text>Error</Text>
    </View>
    if (post) return <View className="w-full p-2">
        <View className="mb-2 flex-row items-center">

            {!isTablet ? <Link href="/government" asChild>
                <MaterialIcons name="chevron-left" size={36} />
            </Link> : null}
            <PostHeader post={post} />
        </View>

        <ScrollView>
            {post?._embedded?.['wp:featuredmedia'][0].source_url ?
                <Image style={{ width: '100%', aspectRatio: '4/3' }} source={{ uri: post?._embedded?.['wp:featuredmedia'][0].source_url }} /> : null}
            <RenderHtml
                contentWidth={isTablet ? width * .65 : width}
                source={{ html: post?.content.rendered }}
                renderersProps={{
                    a: {
                        onPress: (evt, href, htmlAttribs) => {
                            console.log({ evt, href, htmlAttribs })
                        }
                    }
                }}

            />


        </ScrollView>

    </View>
    else return <View>
        <Text>Post {postId} Not Found</Text>
    </View>
}