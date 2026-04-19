import { createContext, useContext } from 'react'
import type {UserRole} from '../../types/user.types'

type AuthContextType = {
    role: UserRole
}

const AuthContext = createContext<AuthContextType>({
    role: 'citizen'
})

export const MockAuthProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthContext.Provider value={{ role: 'citizen' }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
