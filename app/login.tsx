import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../features/auth";


export default function Login() {
    const { requestPasscode, error } = useAuth()
    const [user, setUser] = useState('')
    const router = useRouter()
    const handleLogin = async () => {
        const result = await requestPasscode(user)
        if (result && 'email' in result) {
            return router.push(`/verify-passcode?email=${result.email}`)
        } if (result && 'phone' in result) {
            return router.push(`/verify-passcode?phone=${result.phone}`)
        }

    }
    return <SafeAreaView className="md:bg-gray-200 h-full items-center pt-12">
        <View className="bg-white p-4 max-w-md w-full items-center">
            <Image source={require('../assets/adaptive-icon.png')} className="w-32 h-32 mb-2" />
            {error ? <Text className="border-red-500 border-4 w-full bg-red-200 text-red-500">{error}</Text> : null}
            <View className="rounded border my-1 focus:border-orange-500 p-1 w-full">
                <Text>Email or phone</Text>
                <TextInput keyboardType="email-address" autoCapitalize="none" autoCorrect={false} textContentType="username" className="text-xl" value={user} onChangeText={(newValue) => setUser(newValue)} />
            </View>
            <Pressable className="bg-orange-500 p-2 w-full" onPress={handleLogin}>
                <Text className="text-xl text-white text-center">Request Passcode</Text>
            </Pressable>
            <Pressable className="mt-2">
                <Link href={`/signup`}>Don't have an account? <Text className="text-orange-500">Sign Up</Text></Link>
            </Pressable>
        </View>
    </SafeAreaView>
}