import { View, Text, Pressable, ScrollView, useWindowDimensions } from "react-native";
import { Link, Slot, usePathname } from "expo-router";
import { useState } from "react";
import { usePosts, PostHeader } from "../../../features/posts";
import Tabs from "../../../components/Tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import useFiles from "../../../features/files/useFiles";
import FileHeader from "../../../features/files/FileHeader";
import { useGlobal } from "../../_layout";
import { StatusBar } from "expo-status-bar";

export default function GovernmentLayout() {
    const { width } = useWindowDimensions()
    const isTablet = width >= 768
    const pathName = usePathname()
    const tabs = ['Meetings', 'Ballots', 'Ordinances']
    const [activeTab, setActiveTab] = useState(0)
    const { isFullScreen } = useGlobal()
    const { error: meetingError, isLoading: loadingMeetings, isError: errorLoadingMeetings, data: meetings } = usePosts('meetings')
    const { error: ballotError, isLoading: loadingBallots, isError: errorLoadingBallots, data: ballots } = usePosts('posts', { categories: 137 })
    const { error: ordinanceError, isLoading: loadingOrdinances, isError: errorLoadingOrdinances, data: ordinances } = useFiles('ordinances')

    if (loadingMeetings || loadingBallots || loadingOrdinances) return <Text>Loading...</Text>
    if (errorLoadingMeetings || errorLoadingBallots || errorLoadingOrdinances) return <Text>Error: {JSON.stringify({ meetingError, ballotError, ordinanceError })}</Text>

    if (isFullScreen) return <View className="pt-3 flex-1">
        <StatusBar style="dark" />
        <Slot />
    </View>

    return <View className="">
        <View className={`md:flex-row p-1 mb-1 md:items-end ${(isTablet || (pathName === '/government')) ? 'w-full' : 'hidden'} `}>
            <View className="flex-row items-center md:w-1/3 lg:hidden">
                <MaterialCommunityIcons name="comment-text-multiple-outline" size={24} color="black" />
                <Text className="text-2xl ml-1">Tribal Government</Text>
            </View>
            <View className="md:flex-1">

                <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            </View>
        </View>

        <View className={"flex-row"}>

            <View className={`${(isTablet || (pathName === '/government')) ? 'w-full' : 'hidden'} md:w-1/3 h-full bg-gray-200`}>
                <ScrollView>
                    {activeTab === 0 ? meetings && meetings.map((meeting, index) => {

                        return <Link href={`government/meetings/${meeting.id}`} key={meeting.id} asChild >
                            <Pressable
                                className={`p-1 ${pathName === `/government/meetings/${meeting.id}` ? 'bg-orange-200' : index % 2 === 0 ? 'bg-white' : undefined}`}>

                                <PostHeader post={meeting} />



                            </Pressable>
                        </Link>
                    }) : activeTab === 1 ? ballots && ballots.map((ballot, index) => {

                        return <Link href={`/government/ballots/${ballot.id}`} key={ballot.id} asChild >
                            <Pressable
                                className={`p-1 ${pathName === `/government/ballots/${ballot.id}` ? 'bg-orange-200' : index % 2 === 0 ? 'bg-white' : undefined}`}>

                                <PostHeader post={ballot} />



                            </Pressable>
                        </Link>
                    }) : activeTab === 2 && ordinances && 'ListBucketResult' in ordinances && ordinances.ListBucketResult.Contents.length ? ordinances.ListBucketResult.Contents.slice(1, ordinances.ListBucketResult.Contents.length).map((ordinance, index) => {

                        return <Link href={`/government/${ordinance.Key}`} key={ordinance.Key} asChild >
                            <Pressable
                                className={`p-1 ${pathName === `/government/${ordinance.Key}` ? 'bg-orange-200' : index % 2 === 0 ? 'bg-white' : undefined}`}>
                                <FileHeader filePath={ordinance.Key} />
                            </Pressable>
                        </Link>
                    })

                        : null}

                </ScrollView>



            </View>
            <View className="flex-1">
                <Slot />
            </View>
        </View>
    </View>
}
