import { Text, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { useAuthSession } from '@/context/AuthContext'

const Profile = () => {
    return (
        <View className="flex-1 items-center justify-center">
            <Text>Profile</Text>
            <SignOutButton />
        </View>
    )
}

export default Profile

const SignOutButton = () => {
    const { signout } = useAuthSession()
    return <Button onPress={signout}>Sign Out</Button>
}
