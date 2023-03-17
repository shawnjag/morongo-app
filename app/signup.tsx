import { Link } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, Pressable, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../features/auth";
import { supabase } from "../lib/supabase";


export default function SignUp() {
    const [name, setName] = useState('')
    const [rollNo, setRollNo] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    // const handleSignup = async () => {
    //     const { data, error } = await supabase.auth.signUp({ email: user, password: pass })
    //     if (!error) {
    //         login({ user, pass })
    //     }
    //     else {
    //         Alert.alert('Error', error.message)
    //     }
    // }
    return <SafeAreaView className="md:bg-gray-200 h-full items-center pt-12">
        <View className="bg-white p-4 max-w-md w-full items-center">
            <Image source={require('../assets/adaptive-icon.png')} className="w-32 h-32 mb-2" />
            <Text className="border-4 border-yellow-500 bg-yellow-200 p-2">This application is intended for Enrolled Tribal Members of the Morongo Band of Mission Indians. Please fill out the form below to request access. A member of our team will contact you for additional verification if necessary.</Text>
            <View className="rounded border my-1 focus:border-orange-500 p-1 w-full">
                <Text>Full Name</Text>
                <TextInput keyboardType="default" autoCapitalize="none" autoCorrect={false} textContentType="name" className="text-xl" value={name} onChangeText={(newValue) => setName(newValue)} />
            </View>
            <View className="rounded border my-1 focus:border-orange-500 p-1 w-full">
                <Text>Roll Number</Text>
                <TextInput keyboardType="numeric" autoCapitalize="none" autoCorrect={false} textContentType="none" className="text-xl" value={rollNo} onChangeText={(newValue) => setRollNo(newValue)} />
            </View>
            <View className="rounded border my-1 focus:border-orange-500 p-1 w-full">
                <Text>Email Address</Text>
                <TextInput keyboardType="email-address" autoCapitalize="none" autoCorrect={false} textContentType="emailAddress" className="text-xl" value={email} onChangeText={(newValue) => setEmail(newValue)} />
            </View>
            <View className="rounded border my-1 focus:border-orange-500 p-1 w-full">
                <Text>Mobile Phone</Text>
                <TextInput keyboardType="phone-pad" autoCapitalize="none" autoCorrect={false} textContentType="telephoneNumber" className="text-xl" value={phone} onChangeText={(newValue) => setPhone(newValue)} />
            </View>
            <Pressable className="bg-orange-500 p-2 w-full" onPress={() => { }}>
                <Text className="text-xl text-white text-center">Sign Up</Text>
            </Pressable>
            <Pressable className="mt-2">
                <Link href={`/login`}>Already have an account? <Text className="text-orange-500">Login</Text></Link>
            </Pressable>
        </View>
    </SafeAreaView>
}