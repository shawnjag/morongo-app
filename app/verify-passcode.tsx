import { Link, useRouter, useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../features/auth";


export default function VerifyPasscode() {
    const { verifyPasscode, error } = useAuth()
    const searchParams = useSearchParams()
    const passcodeSentMessage = `A passcode has been sent to ${'email' in searchParams ? searchParams.email : 'phone' in searchParams ? searchParams.phone : ''}`
    const [token, setToken] = useState('')
    const handleVerify = async () => {
        if ('email' in searchParams) {
            const result = await verifyPasscode({ email: searchParams.email, token })
        }
        if ('phone' in searchParams) {
            const result = await verifyPasscode({ phone: searchParams.phone, token })
        }


    }
    return <SafeAreaView className="md:bg-gray-200 h-full items-center pt-12">
        <View className="bg-white p-4 max-w-md w-full items-center">
            <Image source={require('../assets/adaptive-icon.png')} className="w-32 h-32 mb-2" />
            {error ? <Text className="border-red-500 border-4 w-full bg-red-200 text-red-500">{error}</Text> : passcodeSentMessage ? <Text className="border-green-500 border-4 w-full bg-green-200 text-green-500">{passcodeSentMessage}</Text> : null}
            <View className="rounded border my-1 focus:border-orange-500 p-1 w-full">
                <Text>Enter passcode</Text>
                <TextInput keyboardType="number-pad" autoCapitalize="none" autoCorrect={false} textContentType="oneTimeCode" className="text-xl" value={token} onChangeText={(newValue) => setToken(newValue)} />
            </View>
            {/* <View className="rounded border my-1 focus:border-orange-500 p-1 w-full">
                <Text>Pass</Text>
                <TextInput textContentType="password" secureTextEntry className="text-xl" value={pass} onChangeText={(newValue) => setPass(newValue)} />
            </View> */}
            <Pressable className="bg-orange-500 p-2 w-full" onPress={handleVerify}>
                <Text className="text-xl text-white text-center">Verify Passcode</Text>
            </Pressable>
            <Link href={`/login`} asChild>
                <Pressable className="mt-2 p-2 w-full">
                    <Text className="text-xl text-orange-500 text-center">Start Over</Text>
                </Pressable>
            </Link>
        </View>
    </SafeAreaView>
}