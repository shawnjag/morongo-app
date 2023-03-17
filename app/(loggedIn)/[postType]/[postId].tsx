import { Link, useSearchParams } from 'expo-router'
import { Text, View, useWindowDimensions, ScrollView } from 'react-native'
import PostHeader from '../../../features/posts/PostHeader'
import RenderHtml from 'react-native-render-html';
import { Image } from 'expo-image'
import { MaterialIcons } from '@expo/vector-icons'
import { usePost } from '../../../features/posts'

export default function ViewPost() {
    const searchParams = useSearchParams()
    const postType = searchParams['postType'] as 'events' | 'slides' | 'posts' | 'meetings'
    const postId = Number(searchParams['postId'])
    const { width } = useWindowDimensions()
    // const isTablet = width >= 768
    const isTablet = width >= 1024
    const { isLoading, isError, data: post } = usePost(postType, postId)
    if (isLoading) return <View>
        <Text>Loading...</Text>
    </View>
    if (isError) return <View>
        <Text>Error</Text>
    </View>
    if (post) {
        if ('venue' in post) {
            const image = post.image ? post.image.url : null
            const content = post.description
            return <View className="w-full p-2">
                <View className="mb-2 flex-row items-center">

                    {!isTablet ? <Link href="/posts" asChild>
                        <MaterialIcons name="chevron-left" size={36} />
                    </Link> : null}
                    <PostHeader post={post} />
                </View>

                <ScrollView>
                    {image ?
                        <Image style={{ width: '100%', aspectRatio: '4/3' }}
                            source={{ uri: image }} /> : null}
                    <RenderHtml
                        contentWidth={isTablet ? width * .56 : width}
                        source={{ html: content }}
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

        }
        else {
            const image = post._embedded?.['wp:featuredmedia'][0].source_url
            const content = post.content.rendered


            return <View className="w-full p-2">
                <View className="mb-2 flex-row items-center">

                    {!isTablet ? <Link href="/posts" asChild>
                        <MaterialIcons name="chevron-left" size={36} />
                    </Link> : null}
                    <PostHeader post={post} />
                </View>

                <ScrollView>
                    {image ?
                        <Image style={{ width: '100%', aspectRatio: '4/3' }}
                            source={{ uri: image }} /> : null}
                    <RenderHtml
                        contentWidth={isTablet ? width * .56 : width}
                        source={{ html: content }}
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
        }
    }

    else return <View>
        <Text>Post {postId} Not Found</Text>
    </View>
}