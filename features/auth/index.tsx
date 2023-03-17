import { createContext, useContext, useEffect, useState } from "react"
import { usePathname, useRouter, useSegments } from "expo-router";
import { supabase } from "../../lib/supabase";
import { User } from "@supabase/supabase-js";


type Auth = {
    isLoading: boolean,
    isLoggedIn: boolean,
    user: User | null,
    accessToken: string,
    error: string,
    requestPasscode: (user: string) => Promise<{ email: string } | { phone: string } | void>,
    verifyPasscode: ({ email, phone, token }: {
        email: string,
        token: string,
        phone: undefined
    } | {
        email: undefined,
        phone: string,
        token: string
    }) => void,
    logout: () => void
}
const SSO_DOMAINS = ['morongo-nsn.gov']
const AuthContext = createContext<Auth | null>(null)

function AuthProvider({ children }: { children: JSX.Element }) {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [isLoading, setisLoading] = useState(true)
    const isLoggedIn = Boolean(user)
    const requestPasscode = async (user: string) => {
        setError('')
        const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const phoneRegEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        if (emailRegEx.test(user)) {

            // const domain = user.split('@')[1]
            // if (domain && SSO_DOMAINS.includes(domain)) {
            //     const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'azure', options: { redirectTo: `morongo:///callback` } })
            //     return { sso: data.url }
            // }
            const email = user
            const { data, error } = await supabase.auth.signInWithOtp({
                email, options: {
                    shouldCreateUser: false,

                }
            })
            if (error) return setError(error.message)
            return { email }
        }
        else if (phoneRegEx.test(user)) {
            const phone = '+1' + user.replace(/\D+/g, '')
            const { data, error } = await supabase.auth.signInWithOtp({ phone, options: { shouldCreateUser: false } })
            if (error) return setError(error.message)
            return { phone }
        }
        else {
            return setError('Invalid email or phone number')
        }
    }
    const verifyPasscode = async ({ email, phone, token }: { email: string, token: string, phone: undefined } | { email: undefined, phone: string, token: string }) => {
        setError('')
        if (email) {
            const { data: { user, session }, error } = await supabase.auth.verifyOtp({ email, token, type: 'magiclink' })
            if (user) {
                setUser(user)
            }
            if (session) {
                setAccessToken(session.access_token)
            }
            if (error) return setError(error.message)
            return
        }
        else if (phone) {

            const { data: { user, session }, error } = await supabase.auth.verifyOtp({ phone, token, type: 'sms' })
            if (user) {
                setUser(user)
            }
            if (session) {
                setAccessToken(session.access_token)
            }
            if (error) return setError(error.message)
            return

        }
        else return setError('Unable to verify passcode')
    }

    const logout = async () => {
        const { error } = await supabase.auth.signOut()

        if (!error) {
            setUser(null)
            setAccessToken('')
        }


    }
    const restoreSession = async () => {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (session) {
            setUser(session.user)
            setAccessToken(session.access_token)

        }
        if (error) {
            setUser(null)

            setAccessToken('')
        }
    }
    useEffect(() => {
        restoreSession().then(() => {
            setisLoading(false)
        })

    }, [])

    useEffect(() => {
        if (isLoading) return
        if (isLoggedIn) {
            router.replace('/posts')
        }
        else {
            router.replace('/login')
        }
    }, [isLoading, isLoggedIn])
    return <AuthContext.Provider value={{ isLoading, isLoggedIn, accessToken, user, error, requestPasscode, verifyPasscode, logout }}>
        {children}
    </AuthContext.Provider>
}

function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used within a AuthProvider")

    return context
}

export { AuthProvider, useAuth }