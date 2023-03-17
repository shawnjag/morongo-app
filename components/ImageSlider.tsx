
import { useRef, useState } from 'react'
import { View, Text, Pressable, FlatList, useWindowDimensions, StyleSheet } from 'react-native'

import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import usePosts from '../features/posts/usePosts'
import { useGlobal } from '../app/_layout'



export default function ImageSlider() {

    const { width } = useWindowDimensions()
    const { isFullScreen } = useGlobal()
    // const isTablet = width >= 768

    const ref = useRef<FlatList>(null)
    const router = useRouter()
    const sliderWidth = width >= 1024 && !isFullScreen ? width * .54 : width
    const { isLoading: loadingSlides, data: slides } = usePosts('ml-slide', { per_page: 100 })
    const { isLoading: loadingEvents, data: { events } } = usePosts('events')
    const { isLoading: loadingPosts, data: posts } = usePosts('posts')
    if (loadingSlides || loadingPosts || loadingEvents) return <Text>Loading...</Text>

    const items = slides && slides.length && events && events.length && posts && posts.length ?
        [...slides, ...events, ...posts].filter(item => {
            if ('venue' in item) return item.image
            else return item._embedded && item._embedded['wp:featuredmedia'][0].source_url
        }) : []

    const [index, setIndex] = useState(0)
    // const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    //     const currentIndex = viewableItems[0]?.index
    //     setIndex(currentIndex)

    // }, [])

    // useEffect(() => {
    //     const newIndex = index + 1 < items.length ? index + 1 : 0

    //     const interval = setInterval(() => {
    //         ref.current?.scrollToIndex({ index: newIndex })
    //     }, 8000)
    //     return () => clearInterval(interval)

    // }, [index])

    const styles = StyleSheet.create({
        slide: {
            width: sliderWidth,
            // width: sliderWidth,
            aspectRatio: 4 / 3,
            // aspectRatio: fullScreen ? 16 / 9 : 4 / 3,
            contentFit: 'contain'
        }
    })

    return <FlatList
        // style={{ alignSelf: 'flex-start' }}
        data={items}
        ref={ref}
        // onViewableItemsChanged={onViewableItemsChanged}
        horizontal
        refreshing={loadingSlides || loadingPosts || loadingEvents}
        snapToAlignment='start'
        decelerationRate='fast'
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => String(index)}
        snapToInterval={sliderWidth}
        renderItem={({ item, index, separators }) => {
            const uri = 'venue' in item ? item.image.url : item._embedded['wp:featuredmedia'][0].source_url
            return <Pressable onPress={() => {
                console.log({ item }); if (['post', 'event', 'meeting']
                    .includes(item.type)) { router.push(`/${item.type}s/${item.id}`) }
            }}>
                <Image

                    source={{ uri }}
                    onError={error => console.log({ error })}
                    style={styles.slide}
                />
            </Pressable>
        }

        } />
}