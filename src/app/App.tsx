import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { MockAuthProvider } from './providers/MockAuthProvider'

export default function App() {
    return (
        <MockAuthProvider>
            <RouterProvider router={router} />
        </MockAuthProvider>
    )
}
