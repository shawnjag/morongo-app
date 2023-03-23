import { Slot, Stack, useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { AppState, AppStateStatus, Platform, useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider, focusManager } from 'react-query';
import { AuthProvider } from "../features/auth";
import { RootSiblingParent } from 'react-native-root-siblings';
import { StatusBar } from 'expo-status-bar'
import { addNotificationResponseReceivedListener, setNotificationHandler, useLastNotificationResponse } from "expo-notifications";
import * as Device from 'expo-device'
import * as ScreenOrientation from 'expo-screen-orientation'

// import '../styles.css'

const Globals = createContext<{ isFullScreen: boolean, setIsFullScreen: (newValue: boolean) => void } | undefined>(undefined)

const GlobalProvider = ({ children }: { children: JSX.Element }) => {
    const [isFullScreen, setIsFullScreen] = useState(false)

    return <Globals.Provider value={{ isFullScreen, setIsFullScreen }}>{children}</Globals.Provider>
}

export const useGlobal = () => {
    const context = useContext(Globals)
    if (context === undefined) {
        throw new Error('useGlobal must be used within a GlobalProvider')
    }
    return context
}

function onAppStateChange(status: AppStateStatus) {
    // React Query already supports in web browser refetch on window focus by default
    if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active');
    }
}

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 2 } },
});

setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});


export default function Root() {
    const router = useRouter()
    useEffect(() => {
        const notificationSubscription = addNotificationResponseReceivedListener(response => {

            const url = response.notification.request.content.data.url
            if (url) router.push(url)
        });

        return () => {

            notificationSubscription.remove();
        };
    }, [router])
    useEffect(() => {
        const subscription = AppState.addEventListener('change', onAppStateChange)

        return () => subscription.remove()
    }, [])
    const scheme = useColorScheme()
    useEffect(() => {
        Device.getDeviceTypeAsync()
            .then(deviceType => {

                if (deviceType === Device.DeviceType.PHONE) {
                    ScreenOrientation.lockAsync
                        (ScreenOrientation.OrientationLock.PORTRAIT_UP)
                }
            })

    }, [])
    return (
        <GlobalProvider>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <StatusBar style="light" />
                    <RootSiblingParent>
                        <Stack screenOptions={{ headerShown: false, animation: 'none' }} />
                    </RootSiblingParent>
                </QueryClientProvider>
            </AuthProvider>
        </GlobalProvider>
    );
}