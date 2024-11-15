import '../global.css'

import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Toaster } from 'sonner-native'

import { AuthProvider, useAuthSession } from '@/context/AuthContext'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [sessionLoaded, setSessionLoaded] = useState(false)
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    })

    useEffect(() => {
        if (error) {
            throw error
        }
        if (loaded && sessionLoaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded, error, sessionLoaded])

    if (!loaded || error) {
        return null
    }

    return (
        <GestureHandlerRootView>
            <AuthProvider>
                <SessionLoadedCheck onLoaded={() => setSessionLoaded(true)} />

                {!sessionLoaded ? (
                    <ActivityIndicator
                        size="large"
                        className="flex-1 items-center"
                    />
                ) : (
                    <Stack
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen name="auth" />
                        <Stack.Screen name="(tabs)" />
                    </Stack>
                )}

                <StatusBar style="auto" />
                <Toaster />
            </AuthProvider>
        </GestureHandlerRootView>
    )
}

const SessionLoadedCheck = ({ onLoaded }: { onLoaded: () => void }) => {
    const { isLoading } = useAuthSession()

    useEffect(() => {
        if (!isLoading) onLoaded()
    }, [isLoading])

    return null
}
