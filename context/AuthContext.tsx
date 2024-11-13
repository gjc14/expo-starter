import { Session } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'

import { supabase } from '@/lib/supabase'

interface AuthContextType {
    session: Session | null
    isLoading: boolean
    signout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Get initial session from storage set in supabase client
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setIsLoading(false)
        })

        // Listen to session changes
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session)
            },
        )

        return () => {
            authListener?.subscription.unsubscribe()
        }
    }, [])

    const signout = async () => {
        await supabase.auth.signOut()
        setSession(null)
    }

    return (
        <AuthContext.Provider value={{ session, isLoading, signout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthSession = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuthSession must be used within an AuthProvider')
    }
    return context
}
