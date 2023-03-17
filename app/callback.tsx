import { usePathname, useSearchParams } from "expo-router";
import { Text } from 'react-native'
export default function Callback() {
    const searchParams = useSearchParams()
    const pathName = usePathname()
    return <Text>{JSON.stringify({ searchParams, pathName })}</Text>
}