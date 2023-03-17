import { View, Text, Pressable, Alert, ScrollView, useWindowDimensions } from "react-native";
import { Link, Slot, usePathname, useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { supabase } from '../../../lib/supabase'
import { MeetingHeader, useMeetings } from "../../../features/meetings";
import { format } from "date-fns";
import { useGlobal } from "../../_layout";
import { StatusBar } from 'expo-status-bar'

const getMeetings = async () => {
    const { data, error } = await supabase.from('meetings').select('*').eq('type', 'EDPC Meeting').order('date', { ascending: false })
    if (error) throw error
    return data
}

export default function MeetingLayout() {
    const { width } = useWindowDimensions()
    const isTablet = width >= 768
    const pathName = usePathname()
    const tabs = ['Upcoming', 'Previous']
    const [activeTab, setActiveTab] = useState(0)
    const { isFullScreen } = useGlobal()

    const { isLoading, data: meetings } = useQuery(['meetingsOld'], getMeetings, { placeholderData: [] })

    if (isFullScreen) return <View className="flex-1">
        <StatusBar style="dark" />
        <Slot />
    </View>
    return <View className="flex-row h-full">

        <View className={`${isTablet || pathName === '/meetings' ? 'w-full' : 'hidden'} md:w-1/3 h-full bg-gray-200`}>

            {/* <View className="flex-row justify-around">
                {tabs.map((tab, index) => <Pressable onPress={() => setActiveTab(index)}
                    key={tab}
                    className={`${activeTab === index ? 'border-b-orange-500' : 'border-b-transparent'}  border-b-2 px-4`}>
                    <Text className="text-xl ">{tab}</Text>
                </Pressable>)}
            </View> */}
            <ScrollView>
                {meetings.length > 0 ? meetings.map((meeting, index) => {

                    return <Link href={`meetings/${meeting.id}`} key={meeting.id} asChild >
                        <Pressable
                            className={`p-1 ${pathName === `/meetings/${meeting.id}` ? 'bg-orange-200' : index % 2 === 0 ? 'bg-white' : undefined}`}>

                            {/* <Text>{JSON.stringify(meeting.meeting_type)}</Text> */}
                            <MeetingHeader meetingId={meeting.id} />

                        </Pressable>
                    </Link>
                }
                ) : <Text>Loading...</Text>}
            </ScrollView>



        </View>
        <View className="flex-1 items-center">
            <Slot />
        </View>
    </View>
}
