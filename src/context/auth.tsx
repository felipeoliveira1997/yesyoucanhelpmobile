import React, { createContext, useState, useEffect } from 'react';
import { GetLoginUser } from '../services/api/Login'
import { UserLogin } from '../models/UserLogin';
import AsyncStorage from '@react-native-community/async-storage';
import { accessibilityProps } from 'react-native-paper/lib/typescript/src/components/MaterialCommunityIcon';
interface AutheContextData {
    signed: boolean,
    user: UserLogin | undefined;
    SignIn(): any,
    SingOut(): void
}

const AuthContext = createContext<AutheContextData>({} as AutheContextData);

export const AuthProvider: React.FC = ({ children }) => {

    const [user, setUser] = useState<UserLogin | undefined>(undefined)

    useEffect(() => {
        async function loadStorageData() {
            const storagedataUser = await AsyncStorage.getItem('@yycanhelp:user')

            if (storagedataUser) {
                setUser(JSON.parse(storagedataUser))
            }

        }
        loadStorageData()
    }, [])

    async function SignIn() {
        const response = await GetLoginUser();

        setUser(response)

        await AsyncStorage.setItem('@yycanhelp:user', JSON.stringify(response))

        return response;
    }

    async function SingOut() {
        setUser(undefined)
        await AsyncStorage.removeItem('@yycanhelp:user');
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, SignIn, SingOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

