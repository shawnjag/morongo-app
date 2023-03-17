import { Link, useSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text, View, useWindowDimensions } from 'react-native'
import StyledPdf from '../../../../components/StyledPdf'
import Tabs from '../../../../components/Tabs'
import { usePost, PostHeader } from '../../../../features/posts'
import { MaterialIcons } from '@expo/vector-icons'
import { useGlobal } from '../../../_layout'


export default function ViewPost() {
    const { width } = useWindowDimensions()
    const isTablet = width >= 768
    const searchParams = useSearchParams()
    const postId = Number(searchParams['postId'])
    const [activeTab, setActiveTab] = useState(0)
    const { isFullScreen, setIsFullScreen } = useGlobal()

    const { isLoading, isError, data: meeting } = usePost('meetings', postId)
    const tabs = [
        meeting && 'agenda' in meeting && meeting.agenda ? 'Agenda' : undefined,
        meeting && 'mailer' in meeting && meeting.mailer ? 'Mailer' : undefined,
        meeting && 'minutes' in meeting && meeting.minutes ? 'Minutes' : undefined,
        meeting && 'highlights' in meeting && meeting.highlights ? 'Highlights' : undefined,]
        .filter(item => item)

    if (isLoading) return <View>
        <Text>Loading...</Text>
    </View>
    if (isError) return <View>
        <Text>Error</Text>
    </View>
    return <View className="p-2 md:flex-1">
        <View className="flex-row items-center">

            {!isTablet ? <Link href="/government" asChild>
                <MaterialIcons name="chevron-left" size={36} />
            </Link> : null}
            <View className="flex-1">
                <PostHeader post={meeting} /></View>

            {isTablet ? <MaterialIcons name={isFullScreen ? 'fullscreen-exit' : 'fullscreen'} onPress={() => setIsFullScreen(value => !value)} size={36} />
                : null}
        </View>
        {tabs.length ? <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} /> : null}
        {tabs.length === 0 ? <Text>Documents for this meeting are not yet available. Check back soon!</Text> : null}
        {tabs[activeTab]?.toLowerCase() in meeting ?
            <StyledPdf
                fitPolicy={0} //[fitWidth (selected), fitHeight, fitBoth (default)]

                className="w-96 h-96 md:w-full md:flex-1"
                source={{ uri: meeting[tabs[activeTab]?.toLowerCase()] }}
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
            : null}

    </View>
}