import * as AppleAuthentication from 'expo-apple-authentication'
import { Platform } from 'react-native'

import { supabase } from '@/lib/supabase'

export function AppleAuth({
    buttonType = 'CONTINUE',
    buttonStyle = 'BLACK',
    cornerRadius,
    style,
}: {
    buttonType?: 'CONTINUE' | 'SIGN_IN' | 'SIGN_UP'
    buttonStyle?: 'WHITE' | 'WHITE_OUTLINE' | 'BLACK'
    cornerRadius?: number
    style: AppleAuthentication.AppleAuthenticationButtonProps['style']
}) {
    if (Platform.OS === 'ios')
        return (
            <AppleAuthentication.AppleAuthenticationButton
                buttonType={
                    AppleAuthentication.AppleAuthenticationButtonType[
                        buttonType
                    ]
                }
                buttonStyle={
                    AppleAuthentication.AppleAuthenticationButtonStyle[
                        buttonStyle
                    ]
                }
                cornerRadius={cornerRadius}
                style={style}
                onPress={async () => {
                    try {
                        const credential =
                            await AppleAuthentication.signInAsync({
                                requestedScopes: [
                                    AppleAuthentication.AppleAuthenticationScope
                                        .FULL_NAME,
                                    AppleAuthentication.AppleAuthenticationScope
                                        .EMAIL,
                                ],
                            })
                        console.log(credential)
                        // Sign in via Supabase Auth.
                        if (credential.identityToken) {
                            const {
                                error,
                                data: { user },
                            } = await supabase.auth.signInWithIdToken({
                                provider: 'apple',
                                token: credential.identityToken,
                            })
                            console.log(
                                JSON.stringify({ error, user }, null, 2),
                            )
                            if (!error) {
                                // User is signed in.
                            }
                        } else {
                            throw new Error('No identityToken.')
                        }
                    } catch (e: any) {
                        if (e.code === 'ERR_REQUEST_CANCELED') {
                            // handle that the user canceled the sign-in flow
                        } else {
                            // handle other errors
                        }
                    }
                }}
            />
        )
    return <>{/* Implement Android Auth options. */}</>
}
