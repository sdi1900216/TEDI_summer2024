import React from 'react';
import { createContext, useContext, useEffect, useState,  } from 'react'
import { IContextType, IUser } from '../types/index.ts'
import {getCurrentUser, } from '../appwrite/api.ts'
import {useNavigate} from 'react-router-dom'
import {} from '@tanstack/react-query'

export const INITIAL_USER = {
    id:'',
    name:'',
    email:'',
    password:'',
    imageURL:'',
    bio:''
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () =>  false as boolean,
}

const AuthContext= createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({children} : {children: React.ReactNode}) => {
    const [user, setUser]= useState<IUser>(INITIAL_USER)
    const [isLoading, setIsLoading]= useState(false);
    const [isAuthenticated, setIsAuthenticated]= useState(false);

    const navigate= useNavigate();
    const checkAuthUser=  async() => {
        try {
            const currentAccount = await getCurrentUser();

            if(currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    email: currentAccount.email,
                    imageURL:currentAccount.imageURL,
                    bio: currentAccount.bio
                })
                setIsAuthenticated(true);
                return true;
            }
            return false;
        } catch (error) {
           console.log(error);
           return false; 
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        if(
            localStorage.getItem('cookieFallback') === '[]' || localStorage.getItem('cookieFallback') === null)
         navigate ('/Login')
        checkAuthUser();
    }, []); //αδείο για να καλείται όποτε κάνει reload

   const value= {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser
   }
    return (
        <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
           )
}



export default AuthProvider;
export const useUserContext = () => useContext(AuthContext);