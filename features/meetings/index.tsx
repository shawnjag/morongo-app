import { format } from 'date-fns'
import { View, Text, Switch } from 'react-native'
import { useQuery } from 'react-query'
import { supabase } from '../../lib/supabase'
import { MaterialIcons } from '@expo/vector-icons';

const getMeetings = async () => {
    const { data, error } = await supabase.from('meetings').select(`
    id,
    name, 
    date,
    type,
    acceptingSubmissions,
    agenda_items(
        id, 
        item_number,
        title,
        status,
        submitter
    )`)
    if (error) throw error
    return data
}

const getMeetingInfo = async (id: number) => {
    const { data, error } = await supabase.from('meetings').select(`
    name, 
    date,
    type,
    acceptingSubmissions,
    agenda_items(
        id, 
        item_number,
        title,
        status,
        submitter
    )`).eq('id', id).single()
    if (error) throw error
    return data
}

const useMeetings = () => useQuery('meetingsOld', getMeetings, { placeholderData: [] })

function MeetingHeader({ meetingId }: { meetingId: number }) {
    const { isLoading, isError, error, data: meetingInfo } = useQuery(['meetingsOld', meetingId], () => getMeetingInfo(meetingId))
    if (isLoading) return <Text>Loading...</Text>
    if (isError) return <Text>{JSON.stringify({ error })}</Text>
    // return <Text>{JSON.stringify({ meetingInfo })}</Text>
    return <View className="flex-row items-center">

        <View className="border-orange-500 border-2 mr-2">
            <Text className="px-2 text-center text-md bg-orange-500 text-white">{format(new Date(meetingInfo.date + 'T00:00:00'), 'MMM')}</Text>
            <Text className="text-center text-lg">{meetingInfo.date.split('-')[2]}</Text>
        </View>
        <View>
            <Text className="text-md">{format(new Date(meetingInfo.date + 'T00:00:00'), 'EEEE, MMMM do')}</Text>
            {/* <Text className="text-2xl">{meetingInfo.name}</Text> */}
            <Text className="text-xl">{meetingInfo.type}</Text>
        </View>
        {/* <View className="ml-auto">
            <Switch value={meetingInfo.acceptingSubmissions} /><Text>Submissions are {meetingInfo.acceptingSubmissions ? 'OPEN' : 'CLOSED'}</Text>
        </View> */}
    </View>
}

function MeetingStatus({ value }: { value: 'pending' | 'rejected' | 'approved' }) {
    switch (value) {
        case 'pending':
            return <View className="bg-yellow-100 w-24 mx-1 border-yellow-500 border-2 rounded text-lg p-2 flex-row items-center"><MaterialIcons name="access-time" size={16} color={"rgb(234 179 8)"} /><Text className="text-yellow-500">Pending</Text></View>
        case 'rejected':
            return <View className="bg-red-100 w-24 mx-1 border-red-500 border-2 rounded text-lg p-2 flex-row items-center"><MaterialIcons name="cancel" size={16} color={`rgb(239 68 68)`} /><Text className="text-red-500">Rejected</Text></View>
        case 'approved':
            return <View className="bg-green-100 w-24 mx-1 border-green-500 border-2 rounded text-lg p-2 flex-row items-center"><MaterialIcons name="check" size={16} color={`rgb(34 197 94)`} /><Text className="text-green-500">Approved</Text></View>
    }
}

const getMeetingItem = async ({ queryKey }) => {
    const { meetingId, itemNo } = queryKey[1]
    const { data, error } = await supabase.from('agenda_items').select('*').eq('meeting_id', meetingId).eq('item_number', itemNo).single()
    if (error) throw error
    return data
}

const useMeetingItem = ({ meetingId, itemNo }: { meetingId: number, itemNo: number }) => {
    return useQuery(['meeting', { meetingId, itemNo }], getMeetingItem, { placeholderData: {} })
}


export { MeetingHeader, MeetingStatus, useMeetingItem, useMeetings }