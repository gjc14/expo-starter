import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetTextInput,
    BottomSheetView,
} from '@gorhom/bottom-sheet'
import { Redirect } from 'expo-router'
import { useRef, useState } from 'react'
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { toast } from 'sonner-native'

import { Auth, sendMagicLink } from '@/components/auth/Auth'
import { ThreeScaleDotLoader } from '@/components/loaders/ThreeScaleDotLoader'
import { LogoSvg } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { useAuthSession } from '@/context/AuthContext'

export default function AuthScreen() {
    const { session } = useAuthSession()

    if (session && session.user) {
        return <Redirect href={'/(tabs)'} />
    }

    const bottomSheetRef = useRef<BottomSheet>(null)
    const [initializeBottomSheet, setInitializeBottomSheet] = useState(false)
    const [email, setEmail] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [countDown, setCountDown] = useState<number>(0)

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView className="flex-1 bg-primary px-8">
                <View className="grow items-center justify-center gap-8">
                    <LogoSvg />
                    <Text className="text-2xl text-primary-foreground font-bold">
                        Expo Supabase Starter
                    </Text>
                </View>

                <Auth
                    onMagicLinkPress={() => {
                        !initializeBottomSheet && setInitializeBottomSheet(true)
                        bottomSheetRef.current?.snapToIndex(0)
                    }}
                />

                {initializeBottomSheet && (
                    <BottomSheet
                        ref={bottomSheetRef}
                        snapPoints={['30%']}
                        enablePanDownToClose
                        backdropComponent={props => (
                            <BottomSheetBackdrop
                                {...props}
                                appearsOnIndex={0}
                                disappearsOnIndex={-1}
                                onPress={() => {
                                    Keyboard.dismiss()
                                }}
                            />
                        )}
                        keyboardBlurBehavior="restore"
                        onClose={() => {
                            Keyboard.dismiss()
                        }}
                    >
                        <BottomSheetView className="flex-1 justify-start items-start px-9 py-5">
                            <Text className="text-xl font-bold px-1">
                                Sign up with your Email Address
                            </Text>
                            <BottomSheetTextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder="free@myself.com"
                                keyboardType="email-address"
                                autoComplete="email"
                                autoCapitalize="none"
                                autoCorrect={false}
                                className="w-full h-12 border border-border rounded-sm px-3.5 my-3 placeholder:text-muted"
                            />
                            <Button
                                onPress={async () => {
                                    try {
                                        setLoading(true)
                                        await sendMagicLink(email)
                                        toast.success(
                                            'Magic Link is sent. Please check your email.',
                                        )
                                        setLoading(false)

                                        // Only allow sending magic link once every 60 seconds.
                                        setCountDown(60)
                                        const interval = setInterval(() => {
                                            setCountDown(prev => {
                                                if (prev === 1)
                                                    clearInterval(interval)
                                                return prev - 1
                                            })
                                        }, 1000)
                                    } catch (error) {
                                        toast.error(
                                            'Magic Link is not sent. Please try again later.',
                                        )
                                        setLoading(false)
                                    }
                                }}
                                disabled={loading || !!countDown}
                                className="w-full h-12 flex-row items-center bg-primary"
                            >
                                {loading ? (
                                    <ThreeScaleDotLoader />
                                ) : countDown ? (
                                    <Text className="font-semibold text-lg text-primary-foreground rounded-sm">
                                        Send again in {countDown}s
                                    </Text>
                                ) : (
                                    <Text className="font-semibold text-lg text-primary-foreground rounded-sm">
                                        Send Magic Link
                                    </Text>
                                )}
                            </Button>
                        </BottomSheetView>
                    </BottomSheet>
                )}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
