import { useQuery } from "react-query"
import { supabase } from "../../lib/supabase"

const getFile = async (filePath: string) => {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw new Error(error.message)
    if (data.session) {
        const accessToken = data.session.access_token

        const response = await fetch(`https://s3.morongo.workers.dev/${filePath}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.ok) {
            return await response.blob()
        }
        else throw new Error(`There was an error getting filePath ${filePath}.`)
    }
    else throw new Error('Unauthorized')
}

const useFile = (filePath: string) => {
    return useQuery(filePath.split('/'), () => getFile(filePath))
}
export default useFile