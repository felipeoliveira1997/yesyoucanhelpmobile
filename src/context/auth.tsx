import React, { createContext, useState, useEffect } from 'react';
import { GetLoginUser } from '../services/api/Login'
import { UserLogin } from '../models/UserLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface AutheContextData {
    signed: boolean,
    user: UserLogin | undefined;
    SignIn(email: string, password: string): any,
    SingOut(): void,
    isLoading: boolean
}

const AuthContext = createContext<AutheContextData>({} as AutheContextData);

export const AuthProvider: React.FC = ({ children }) => {

    const [user, setUser] = useState<UserLogin | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function loadStorageData() {
            const storagedataUser = await AsyncStorage.getItem('@yycanhelp:user')

            if (storagedataUser) {
                setUser(JSON.parse(storagedataUser))
            }

        }
        loadStorageData()
    }, [])

    function UpdateStorageUser_User() {
        //getUser especifico para trazer novos dados

        //setar o user state

        //atualizar o asyncstorage do usuario atual
    }

    async function SignIn(email: string, password: string) {
        try {
            setIsLoading(true)
            const response = await GetLoginUser(email, password);

            if (response) {
                setUser(response)

                await AsyncStorage.setItem('@yycanhelp:user', JSON.stringify(response))
                setIsLoading(false)
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            return Promise.reject(error)
        }
    }

    async function SingOut() {
        setUser(undefined)
        await AsyncStorage.removeItem('@yycanhelp:user');
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, SignIn, SingOut, isLoading: isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

