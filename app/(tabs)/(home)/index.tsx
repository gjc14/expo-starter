import { router } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

const Home = () => {
    return (
        <View className="flex-1 items-center justify-center">
            <Text>Home</Text>
            <TouchableOpacity
                className="bg-secondary px-4 py-2 rounded-lg m-3"
                onPress={() => {
                    router.replace('/auth')
                }}
            >
                <Text className="text-secondary-foreground">Go Auth</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home
