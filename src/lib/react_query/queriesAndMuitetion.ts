import { INewUser, ISignInUser } from '@/types'
import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery
} from '@tanstack/react-query'
import { createUserAccount, signInAccount } from '../appwrite/api'


export const useCreateUser=()=>{
    return useMutation({
        mutationFn: (user: INewUser)=>createUserAccount(user)
    })
}

export const useSignInUser=()=>{
    return useMutation({
        mutationFn: (user: ISignInUser)=>signInAccount(user)
    })
}