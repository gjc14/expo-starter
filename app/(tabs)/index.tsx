// https://github.com/expo/router/issues/763#issuecomment-1635316964
import { Redirect } from 'expo-router'

export default function TabsIndexRedirect() {
    return <Redirect href="/(tabs)/(home)" />
}
