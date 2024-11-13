import { Redirect, router } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

import { useAuthSession } from '@/context/AuthContext'

export default function Auth() {
    const { session } = useAuthSession()

    if (session && session.user) {
        return <Redirect href={'/(tabs)'} />
    }

    return (
        <View className="flex-1 justify-center items-center bg-primary">
            <Text className="text-primary-foreground">Auth</Text>

            <TouchableOpacity
                className="bg-secondary px-4 py-2 rounded-lg m-3"
                onPress={() => {
                    router.replace('/(tabs)')
                }}
            >
                <Text className="text-secondary-foreground">Go Home</Text>
            </TouchableOpacity>
        </View>
    )
}
