import { View, Text, Pressable, Alert, useWindowDimensions } from "react-native";
import { useAuth } from "../../features/auth";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, Slot, SplashScreen, Stack, usePathname, useRouter, } from "expo-router";
import { Image } from "expo-image";
import Popover from "react-native-popover-view";
import { useEffect, useState } from "react";
import { useGlobal } from "../_layout";
import * as ScreenOrientation from 'expo-screen-orientation'
import * as Device from 'expo-device'

const navigation = [
    { name: 'News & Events', icon: 'newspaper-variant-outline', path: '/posts' },
    { name: 'Departments', icon: 'account-group', path: '/requests' },
    { name: 'Tribal Government', icon: 'comment-text-multiple-outline', path: '/government' },
    { name: 'Meetings', icon: 'calendar-text', path: '/meetings' },
    // { name: 'My Profile', icon: 'card-account-details-outline', path: '/profile' },
] as const

export default function LoggedInLayout() {
    const { isLoggedIn } = useAuth()
    const pathName = usePathname()
    const router = useRouter()
    const { isFullScreen } = useGlobal()

    useEffect(() => {
        if (!isLoggedIn) return router.replace('/')
    }, [isLoggedIn])

    return <View className="flex-1">
        <Stack.Screen options={{
            headerShown: !isFullScreen,
            headerStyle: { backgroundColor: 'black' },
            headerTitle: '',
            headerLeft: () => <Link href='/' asChild>
                <Pressable className="flex-row">
                    <Image source={require('../../assets/adaptive-icon.png')} style={{ width: 32, height: 32, marginRight: 8 }} />
                    <View >
                        <Text className="text-2xl text-white">Morongo</Text>
                    </View>
                </Pressable>
            </Link>,
            headerRight: () => <View className="flex-row items-center">
                <Link href="/profile" asChild>
                    <MaterialCommunityIcons name="account-circle" size={32} color='white'
                    />
                </Link>

            </View>
        }} />
        <View className="flex-1 lg:flex-row-reverse">
            {/* End Header */}
            <View className="flex-1">
                <Slot />
                {/* <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="profile/index" options={{ presentation: 'modal' }} />
                </Stack> */}
            </View>

            {isFullScreen ? null : <View className="pb-4 md:pb-0 bg-gray-200 flex-row lg:flex-col justify-around lg:justify-start">
                {navigation.map((navItem, index) => <Link key={index} href={navItem.path} asChild>
                    <Pressable className={` ${pathName.startsWith(navItem.path) ? 'bg-orange-500 text-white' : undefined} flex-row items-center mx-2 my-1 rounded py-1 px-2`}>
                        <MaterialCommunityIcons name={navItem.icon} size={32} color={pathName.startsWith(navItem.path) ? 'white' : undefined} />
                        <Text className={`hidden lg:flex ${isFullScreen ? 'lg:hidden' : ''} text-lg ml-1 ${pathName.startsWith(navItem.path) ? 'text-white' : ''}`}>{navItem.name}</Text>
                    </Pressable>
                </Link>)}


            </View>}

        </View>


    </View>
}
