import { Link, useSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text, View, useWindowDimensions } from 'react-native'
import StyledPdf from '../../../../components/StyledPdf'
import Tabs from '../../../../components/Tabs'
import { usePost, PostHeader } from '../../../../features/posts'
import { MaterialIcons } from '@expo/vector-icons'
import useFile from '../../../../features/files/useFile'
import { useAuth } from '../../../../features/auth'
import FileHeader from '../../../../features/files/FileHeader'
import { useGlobal } from '../../../_layout'


export default function ViewOrdinance() {
    const { width } = useWindowDimensions()
    const isTablet = width >= 768
    const searchParams = useSearchParams()
    const [activeTab, setActiveTab] = useState(0)
    const filePath = searchParams['filePath']
    const { accessToken } = useAuth()
    const { isFullScreen, setIsFullScreen } = useGlobal()

    return <View className="p-2 md:flex-1">
        <View className="flex-row items-center">

            {!isTablet ? <Link href="/government" asChild>
                <MaterialIcons name="chevron-left" size={36} />
            </Link> : null}
            <View className="flex-1">
                <FileHeader filePath={`ordinances/${filePath}`} />
            </View>
            {isTablet ? <MaterialIcons name={isFullScreen ? 'fullscreen-exit' : 'fullscreen'} onPress={() => setIsFullScreen(value => !value)} size={36} />
                : null}
        </View>


        <StyledPdf
            fitPolicy={0} //[fitWidth (selected), fitHeight, fitBoth (default)]

            className="w-96 h-96 md:w-full md:flex-1"
            source={{
                uri: `https://s3.morongo.workers.dev/ordinances/${encodeURI(filePath)}`, headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }}
            onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
                console.log(error);
            }}
            onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
            }}
        // style={{ flex: 1, width, height }}
        />


    </View>
}