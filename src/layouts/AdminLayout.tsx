import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
    return (
        <>
            <h2>Admin Area</h2>
            <Outlet />
        </>
    )
}
