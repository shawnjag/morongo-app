import { Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
export default function FileHeader({ filePath }: { filePath: string }) {

    const folders = filePath.split('/')
    const file = folders[folders.length - 1]
    const [fileName, fileExt] = file?.split('.')


    if (folders[0] === 'ordinances') {
        const [ordinanceNo, ...rest] = fileName.split(' ')
        const ordinanceName = rest.join(' ').replace('Ordinance', '')

        return <View className="flex-row items-center">
            <MaterialCommunityIcons name="file-document-outline" size={36} color="black" />

            <View className="flex-1 ml-1">
                <Text className="text-xl">
                    Ordinance <Text className="font-bold">{ordinanceNo}</Text>
                </Text>
                <Text className="text-lg font-bold">
                    {ordinanceName.trim()}
                </Text>
            </View>
        </View>

    }
    return null



}