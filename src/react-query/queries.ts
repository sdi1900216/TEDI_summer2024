import {useQuery, useMutation, useQueryClient, useInfiniteQuery} from '@tanstack/react-query'
import { CreateUserAccount, LoginAccount } from '../appwrite/api.ts'
import { INewUser } from '../types'

//κανει Mutation σε υπάρχον User Account που έχουμε φτιάξει με την συνάρτηση CreateUserAccount

export const useCreateUserAccountMut = () => {
    return useMutation( {
        mutationFn: (user: INewUser) => CreateUserAccount(user)
    })
}

export const useLoginAccountMut = () => {
    return useMutation( {
        mutationFn: (user: {email:string, password: string} ) => LoginAccount(user),
    });
}