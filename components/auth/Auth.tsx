import { View } from 'react-native'
import { Button } from '../ui/button'

export function Auth({ onMagicLinkPress }: { onMagicLinkPress: () => void }) {
    return (
        <View className="w-full mb-5 gap-3">
            <Button
                onPress={() => onMagicLinkPress()}
                className="w-full h-12"
                textClassName="font-semibold text-lg"
            >
                Send Magic Link
            </Button>
        </View>
    )
}
