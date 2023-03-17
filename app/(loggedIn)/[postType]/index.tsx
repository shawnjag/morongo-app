import { useWindowDimensions, View, Text, Pressable } from 'react-native'
import ImageSlider from '../../../components/ImageSlider'

import { MaterialIcons } from '@expo/vector-icons'
import { useGlobal } from '../../_layout'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
export default function Posts() {
    const { width } = useWindowDimensions()
    const isTablet = width >= 768
    const { isFullScreen, setIsFullScreen } = useGlobal()
    return <View className="w-full">
        <View className={`flex-row items-center p-2 ${isFullScreen ? 'absolute z-10 top-4 right-2' : ''}`}>

            {!isFullScreen ? <MaterialIcons name="image" size={24} color="black" /> : null}

            {!isFullScreen ? <Text className="text-lg ml-1 mr-auto">Access Channel</Text> : null}



            {isTablet ?
                <MaterialIcons color={isFullScreen ? 'white' : 'black'}
                    name={isFullScreen ? 'fullscreen-exit' : 'fullscreen'}
                    onPress={() => setIsFullScreen(value => !value)}
                    style={{ backgroundColor: isFullScreen ? 'black' : undefined, borderRadius: 18 }}
                    size={36} />
                : null}
        </View>
        {isTablet ? <ImageSlider /> : null}
    </View>
}