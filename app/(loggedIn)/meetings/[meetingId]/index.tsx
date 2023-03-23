import { Link, useNavigation, useRouter, useSearchParams } from 'expo-router'
import { Text, View, TouchableOpacity, Touchable, Pressable, Switch, TextInput, useWindowDimensions } from 'react-native'
import { useQuery, useQueryClient } from 'react-query'
import { supabase } from '../../../../lib/supabase'
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../../../features/auth';
import useFiles from '../../../../features/files/useFiles';
import StyledPdf from '../../../../components/StyledPdf';
import { useGlobal } from '../../../_layout';
import Tabs from '../../../../components/Tabs';
import { MeetingHeader } from '../../../../features/meetings';

const getMeetingInfo = async (id: number) => {
    const { data, error } = await supabase.from('meetings').select(`name, 
    date,
    type,
    acceptingSubmissions
    `).eq('id', id).single()
    if (error) throw error
    return data
}


export default function ViewMeeting() {
    const { width } = useWindowDimensions()
    console.log({ width })
    const isTablet = width >= 768
    const [activeTab, setActiveTab] = useState(0)
    const queryClient = useQueryClient()
    const searchParams = useSearchParams()
    const { accessToken } = useAuth()
    const meetingId = Number(searchParams.meetingId)
    const { error: meetingError, isError: errorLoadingMeeting, isLoading: loadingMeeting, data: meeting } = useQuery(['meetingsOld', meetingId], () => getMeetingInfo(meetingId))

    const meetingDate = meeting && 'date' in meeting && meeting.date ? format(new Date(meeting.date + 'T00:00:00'), 'MMddyy') : ''
    const { error: attachmentsError, isError: errorLoadingAttachments, isLoading: loadingAttachments, data: attachments } = useFiles(`meetings/edpc/${meetingDate}`, { enabled: meetingDate.length > 0 })

    const { isFullScreen, setIsFullScreen } = useGlobal()
    const router = useRouter()

    if (loadingMeeting || loadingAttachments) return <View>
        <Text>Loading...</Text>
    </View>
    if (errorLoadingMeeting || errorLoadingAttachments) return <View>
        <Text>{JSON.stringify({ meetingError, attachmentsError })}</Text>
    </View>



    const tabs = attachments && attachments.ListBucketResult && 'Contents' in attachments.ListBucketResult
        ? Array.isArray(attachments.ListBucketResult.Contents) ?
            attachments.ListBucketResult.Contents.map(file => file.Key.split('.')[0]?.replace(`meetings/edpc/${meetingDate}/`, ''))
            : [attachments.ListBucketResult.Contents.Key.split('.')[0]?.replace(`meetings/edpc/${meetingDate}/`, '')]
        : []

    const filePath = tabs && tabs.length && tabs[activeTab] ? `meetings/edpc/${meetingDate}/${tabs[activeTab]}.pdf` : ''


    return <View className="w-full p-2 md:flex-1">
        <View className="flex-row items-center p-2">
            {!isTablet ? <MaterialIcons name="chevron-left" size={36} onPress={() => router.push('/meetings')} /> : null}
            <MeetingHeader meetingId={meetingId} />
        </View>
        <View className="flex-row">

            <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            <View className="ml-auto">{isTablet ? <MaterialIcons name={isFullScreen ? 'fullscreen-exit' : 'fullscreen'} onPress={() => setIsFullScreen(value => !value)} size={36} />
                : null}
            </View>
        </View>
        {filePath ?
            <View className="flex-1">
                <View className="flex-1">
                    <StyledPdf
                        fitPolicy={0} //[fitWidth (selected), fitHeight, fitBoth (default)]

                        className="w-96 h-96 md:w-full md:flex-1"
                        source={{
                            uri: `https://s3.morongo.workers.dev/${encodeURI(filePath)}`, headers: {
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
                            queryClient.invalidateQueries(`meetings/edpc/${meetingDate}`)
                        }}
                        onPressLink={(uri) => {
                            console.log(`Link pressed: ${uri}`);
                        }}
                    // style={{ flex: 1, width, height }}
                    />
                </View>

            </View>
            : null}

    </View>
}