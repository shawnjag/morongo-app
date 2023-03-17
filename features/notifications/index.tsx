
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device'
import { Platform } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAuth } from '../auth';

const device_name = Device.deviceName

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token
}

const useNotifications = () => {
    const queryClient = useQueryClient()
    const { user } = useAuth()
    const { isLoading, data: subscriber } = useQuery('subscriber', async () => {
        const { data, error } = await supabase.from('subscribers').select('*')
        if (error) throw error
        return data

    })
    const { mutate: handleSubscribe } = useMutation({
        mutationFn: async () => {
            const push_token = await registerForPushNotificationsAsync()
            if (push_token) {
                const { data, error } = await supabase.from('subscribers').insert({
                    user: user.id,
                    device_name,
                    push_token
                })
                if (error) throw error
                return data
            }
        }, onSuccess: () => {
            queryClient.invalidateQueries(`subscriber`)
        }
    })
    return { subscriber, handleSubscribe }
}

export { useNotifications }