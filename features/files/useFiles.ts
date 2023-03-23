import { useQuery } from "react-query"
import { supabase } from "../../lib/supabase"

type S3_Files = {
    ListBucketResult: {
        Name: 'morongo',
        Prefix: string,
        MaxKeys: number,
        IsTruncated: boolean,
        Contents: Array<{
            Key: string,
            LastModified: string,
            ETag: string,
            Size: number,
            StorageClass: string

        }> | {
            Key: string,
            LastModified: string,
            ETag: string,
            Size: number,
            StorageClass: string

        }

    }
}

const getFiles = async (filePath: string) => {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw new Error(error.message)
    if (data.session) {
        const accessToken = data.session.access_token

        const response = await fetch(`https://s3.morongo.workers.dev/?prefix=${filePath}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.ok) {
            return await response.json() as S3_Files
        }
        else throw new Error(`There was an error getting filePath ${filePath}.`)
    }
    else throw new Error('Unauthorized')
}

const useFiles = (filePath: string, options: {}) => {
    return useQuery([filePath], () => getFiles(filePath), { ...options })
}

export default useFiles