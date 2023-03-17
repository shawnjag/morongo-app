import { Text, View, Pressable } from 'react-native'

export default function Tabs({ tabs, activeTab, setActiveTab }: { tabs: string[], activeTab: number, setActiveTab: (index: number) => void }) {
    if (tabs.length) return <View className="flex-row justify-around">
        {tabs.map((tab, index) => <Pressable onPress={() => setActiveTab(index)}
            key={tab}
            className={`${activeTab === index ? 'border-b-orange-500' : 'border-b-transparent'} pb-1 border-b-2 px-1 mx-2`}>
            <Text className={`text-lg ${activeTab === index ? 'font-semibold' : ''}`}>{tab}</Text>
        </Pressable>)}
    </View>
    return null
}