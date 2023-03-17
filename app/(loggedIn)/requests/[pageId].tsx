import { Link, useSearchParams } from 'expo-router'
import { Text, View, useWindowDimensions, ScrollView, Linking } from 'react-native'
import PostHeader from '../../../features/posts/PostHeader'
import RenderHtml from 'react-native-render-html';
import { Image } from 'expo-image'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { usePost } from '../../../features/posts'
import departments from '../../../features/departments/data'

export default function ViewPage() {
    const searchParams = useSearchParams()
    const pageId = Number(searchParams['pageId'])
    const { width } = useWindowDimensions()
    const isTablet = width >= 768
    const { isLoading, isError, data: page } = usePost('pages', pageId)
    const department = departments.find(department => department.pageId === String(pageId))
    if (isLoading) return <View>
        <Text>Loading...</Text>
    </View>
    if (isError) return <View>
        <Text>Error</Text>
    </View>
    if (page) return <View className="w-full p-2">
        <View className="mb-2 flex-row items-center">

            {!isTablet ? <Link href="/requests" asChild>
                <MaterialIcons name="chevron-left" size={36} />
            </Link> : null}
            <View
                className={` flex-1 flex-row items-center p-2`}>
                <MaterialCommunityIcons name={department.icon} type="material-community" size={36} />
                <Text className="ml-1 text-xl mr-auto">{department.name}</Text>
                <MaterialCommunityIcons name="phone" size={24} onPress={() => Linking.openURL(`tel:${department.phone}`)} />
            </View>
        </View>

        <ScrollView>
            {page?._embedded?.['wp:featuredmedia'][0].source_url ?
                <Image style={{ width: '100%', aspectRatio: '4/3' }} source={{ uri: page?._embedded?.['wp:featuredmedia'][0].source_url }} /> : null}
            <RenderHtml
                contentWidth={isTablet ? width * .65 : width}
                source={{ html: page?.content.rendered }}
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
        <Text>Page {pageId} Not Found</Text>
    </View>
}