/**
 * @see https://docs.expo.dev/linking/overview/#universal-linking
 * @see https://supabase.com/docs/guides/auth/native-mobile-deep-linking
 * @see https://www.youtube.com/watch?v=8TZ6O1C8ujE
 * Auth flow:
 * 1. Sign in with OAuth / Maginc Link (Email)
 * 2.1. Broser open and await response from OAuth provider await `WebBrowser.openAuthSessionAsync()`
 * 2.2. Email sent and listen for deeplink `Linking.useURL()`
 * 3. Parse response and set session `createSessionFromUrl()`
 */
import { Provider } from '@supabase/supabase-js'
import { makeRedirectUri } from 'expo-auth-session'
import * as QueryParams from 'expo-auth-session/build/QueryParams'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'
import { View } from 'react-native'

import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

WebBrowser.maybeCompleteAuthSession() // required for web only
const redirectTo = makeRedirectUri() + 'auth' // redirect to auth route contains Auth component

/**
 * Create session from URL response from OAuth provider or email link.
 * @param url
 * @returns Promise<Session | null | undefined>
 */
const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url)

    if (errorCode) throw new Error(errorCode)
    const { access_token, refresh_token } = params

    if (!access_token) return

    const { data, error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
    })
    if (error) throw error
    return data.session
}

// Auth method - OAuth
const performOAuth = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
            redirectTo,
            skipBrowserRedirect: true,
        },
    })
    if (error) throw error

    const res = await WebBrowser.openAuthSessionAsync(
        data?.url ?? '',
        redirectTo,
    )

    if (res.type === 'success') {
        const { url } = res
        await createSessionFromUrl(url)
    }
}

/**
 * Auth method - Magic Link (Email)
 * This function throws error
 */
export const sendMagicLink = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            emailRedirectTo: redirectTo,
        },
    })

    if (error) throw error
    // Email sent.
}

export function Auth({ onMagicLinkPress }: { onMagicLinkPress: () => void }) {
    // Handle linking into app from email app.
    const url = Linking.useURL()
    if (url) createSessionFromUrl(url)

    return (
        <View className="gap-2 mb-5">
            <Button onPress={() => performOAuth('google')}>
                Sign in with Google
            </Button>
            <Button onPress={onMagicLinkPress}>Sign in with Email</Button>
        </View>
    )
}
