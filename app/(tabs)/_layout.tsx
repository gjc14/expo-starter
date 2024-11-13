import { Redirect, Tabs } from 'expo-router'
import React from 'react'

import { HomeIcon } from '@/components/navigation/HomeIcon'
import { ProfileIcon } from '@/components/navigation/ProfileIcon'
import { useAuthSession } from '@/context/AuthContext'

const TabsLayout = () => {
    const { session } = useAuthSession()

    if (!session || !session.user) {
        // return <Redirect href={'/auth'} />
    }

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#000',
                tabBarStyle: {
                    height: 75,
                    paddingHorizontal: 8,
                    paddingTop: 3,
                    borderTopWidth: 0.8,
                },
            }}
        >
            {/* Index only for redirect to home tab */}
            <Tabs.Screen name="index" options={{ href: null }} />

            <Tabs.Screen
                name="(home)"
                options={{
                    title: 'Home',
                    tabBarIcon({ color, focused }) {
                        return (
                            <HomeIcon
                                size={28}
                                color={color}
                                strokeWidth={2}
                                fill={focused ? color : 'none'}
                            />
                        )
                    },
                }}
            />
            <Tabs.Screen
                name="(profile)"
                options={{
                    title: 'Profile',
                    tabBarIcon({ color }) {
                        return (
                            <ProfileIcon
                                size={28}
                                color={color}
                                strokeWidth={2}
                            />
                        )
                    },
                }}
            />
        </Tabs>
    )
}

export default TabsLayout
