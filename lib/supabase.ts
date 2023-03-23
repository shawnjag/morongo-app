import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import "react-native-url-polyfill/auto";
// import { Platform } from 'react-native';
// import { setupURLPolyfill } from 'react-native-url-polyfill'

// if (Platform.OS !== 'web') {
//     setupURLPolyfill()
// }

const SUPABASE_URL = "https://zbwneiafqtptxbjawlzm.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpid25laWFmcXRwdHhiamF3bHptIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc0NjM5MzMsImV4cCI6MTk5MzAzOTkzM30.5tTd8rqYE3OaRfxJ2njgpLFYE4hi4HQN3XmytrAahrU"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {

    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
    }
})

export { supabase, SUPABASE_URL, SUPABASE_ANON_KEY }