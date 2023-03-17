import { View, Text, Pressable, ScrollView, useWindowDimensions, FlatList, Linking } from "react-native";
import { Link, Slot, usePathname } from "expo-router";
import { useState } from "react";
import { usePosts, PostHeader } from "../../../features/posts";
import Tabs from "../../../components/Tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import departments from '../../../features/departments/data'

export default function RequestsLayout() {
    const { width } = useWindowDimensions()
    const isTablet = width >= 768
    const pathName = usePathname()

    return <View className="">
        <View className={`p-1 flex-row items-center md:w-1/3 lg:hidden ${pathName === '/requests' ? '' : 'hidden'}`}>
            <MaterialCommunityIcons name="account-group" size={24} color="black" />
            <Text className="text-2xl ml-1">Departments</Text>
        </View>

        <View className="flex-row">

            <View className={`${isTablet || pathName === '/requests' ? 'w-full' : 'hidden'} md:w-1/3 h-full bg-gray-200`}>
                <FlatList data={departments}
                    keyExtractor={item => item.name}
                    renderItem={({ item: { name, phone, icon, pageId }, index, separators }) => {
                        // const backgroundColor = index % 2 === 0 ? undefined : colors.card

                        return <Link href={`/requests/${pageId}`} asChild>
                            <Pressable onPress={() => { }}
                                className={`flex-row items-center p-2 ${pathName === `/requests/${pageId}` ? 'bg-orange-200' : index % 2 === 0 ? 'bg-white' : ''}`}>
                                <MaterialCommunityIcons name={icon} type="material-community" size={36} />
                                <Text className="ml-1 text-lg mr-auto">{name}</Text>
                                <MaterialCommunityIcons name="phone" size={24} onPress={() => Linking.openURL(`tel:${phone}`)} />
                            </Pressable>
                        </Link>
                    }} />



            </View>
            <View className="flex-1">
                <Slot />
            </View>
        </View>
    </View>
}
