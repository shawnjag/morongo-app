import { ScrollView, Text, View, Pressable, TextInput, Switch, Alert } from "react-native";
import { useAuth } from "../../../features/auth";
import { useNotifications } from "../../../features/notifications";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from "react";
import { useQuery } from "react-query";
import { supabase } from "../../../lib/supabase";
import { Stack } from "expo-router";

export default function Profile() {
    const { user, accessToken, logout } = useAuth()

    const handleLogout = () => {
        Alert.alert('Sign Out', 'Are you sure?', [{ text: 'Yes', onPress: () => { logout() } }, { text: 'No' }])
    }
    const { subscriber, handleSubscribe } = useNotifications()
    // const [name, setName] = useState('')
    // const [emailAlerts, setEmailAlerts] = useState(true)
    // const [phoneAlerts, setPhoneAlerts] = useState(true)
    // const [appAlerts, setAppAlerts] = useState(true)
    // const [isChanged, setIsChanged] = useState(false)
    // const { isLoading, isError, data: profile } = useQuery(['user'], async () => {
    //     const { data, error } = await supabase.from('users').select('*').eq('id', user?.id).single()
    //     if (error) throw error
    //     return data
    // }, {})
    console.log({ accessToken })
    return <View className="p-2">
        <View className="flex-row items-center">
            <MaterialCommunityIcons name="account-circle" size={36} color="black" />
            <Text className="ml-1 text-2xl">My Profile</Text>
        </View>
        <View className="flex-row items-center">
            <Pressable className="flex-row items-center border-2 border-orange-500 p-2 rounded m-2" onPress={() => handleSubscribe()}>

                <MaterialCommunityIcons name="bell" size={32} color="rgb(249 115 22)" />
                <Text className=" text-orange-500 text-xl">Enable Notifications</Text>
            </Pressable>

            <Pressable className="flex-row items-center border-red-500 border p-2" onPress={handleLogout}>
                <MaterialCommunityIcons name="logout" size={32} color="red" />
                <Text className="text-lg text-red-500">Sign Out</Text>
            </Pressable>

        </View>
        <ScrollView>
            <Text>{JSON.stringify({ user }, null, 2)}</Text>
        </ScrollView>
        {/* 
        <View className="rounded border my-1 focus:border-orange-500 p-1 w-full">
            <Text>Full Name</Text>
            <TextInput
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="name"
                className="text-xl"
                value={name} onChangeText={(newValue) => setName(newValue)} />
        </View>
        <View className="rounded my-1 focus:border-orange-500 p-1 w-full">
            <Text>Roll No #</Text>
            <Text className="text-xl">1234</Text>
        </View>
        <View className="rounded border my-1 focus:border-orange-500 p-1 w-full">
            <Text>Email Address</Text>
            <TextInput
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="name"
                className="text-xl"
                value={name} onChangeText={(newValue) => setName(newValue)} />
        </View>
        <View className="rounded border my-1 focus:border-orange-500 p-1 w-full">
            <Text>Phone Number</Text>
            <TextInput
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="name"
                className="text-xl"
                value={name} onChangeText={(newValue) => setName(newValue)} />
        </View>
        <View className="flex-row items-center">
            <MaterialCommunityIcons name="bell" size={36} color="black" />
            <Text className="ml-1 text-2xl">Notifications</Text>
        </View>
        <Pressable onPress={() => { setEmailAlerts(value => !value) }} className="flex-row items-center py-1">
            <Text className="text-lg mr-auto">Emails</Text>
            <Switch value={emailAlerts} />
        </Pressable>
        <Pressable onPress={() => { setPhoneAlerts(value => !value) }} className="flex-row items-center py-1">
            <Text className="text-lg mr-auto">Texts</Text>
            <Switch value={phoneAlerts} />
        </Pressable>
        <Pressable onPress={() => { setAppAlerts(value => !value) }} className="flex-row items-center py-1">
            <Text className="text-lg mr-auto">In-App</Text>
            <Switch value={appAlerts} />
        </Pressable> */}



        {/* <View className="items-center flex-row p-2 bg-green-200 w-full">
            <MaterialCommunityIcons name="check-circle-outline" size={32} style={{ marginRight: 2 }} color="green" />
            <Text className="text-2xl">Notifications are Enabled</Text>
        </View>
        <View className="items-center flex-row p-2 bg-yellow-200 w-full">
            <MaterialCommunityIcons name="information-outline" size={32} style={{ marginRight: 2 }} color="orange" />
            <Text className="text-2xl">Please Enable Notifications</Text>
        </View>
        <View className="items-center flex-row p-2 bg-red-200 w-full">
            <MaterialCommunityIcons name="alert-circle-outline" size={32} style={{ marginRight: 2 }} color="red" />
            <Text className="text-2xl">Notifications are Disabled</Text>
        </View> */}
        {/* 
        <Text>{JSON.stringify({ subscriber })}</Text>
        <Text>{JSON.stringify(user, null, 2)}</Text> */}
    </View>
}