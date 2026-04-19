import { createBrowserRouter } from 'react-router-dom'

import Landing from '../pages/public/Landing'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'

import CitizenLayout from '../layouts/CitizenLayout'
import OfficerLayout from '../layouts/OfficerLayout'
import AdminLayout from '../layouts/AdminLayout'

import CitizenDashboard from '../pages/citizen/Dashboard/DashboardPage.tsx'
import NewTransactionPage from '../pages/citizen/NewTransaction/NewTransactionPage.tsx'
import TransactionDetailsPage from '../pages/citizen/TransactionDetails/TransactionDetailsPage.tsx'
import MyDocumentsPage from '../pages/citizen/MyDocuments/MyDocumentsPage.tsx'
import AccountPage from "../pages/citizen/Account/AccountPage.tsx";

import OfficerDashboard from '../pages/officer/Dashboard'
import ReviewTransaction from '../pages/officer/ReviewTransaction'

import AdminDashboard from '../pages/admin/Dashboard'
import UserManagement from '../pages/admin/UserManagement'

import NotFound from '../pages/system/NotFound'


export const router = createBrowserRouter([
    { path: '/', element: <Landing /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },

    {
        path: '/citizen',
        element: <CitizenLayout />,
        children: [
            { path: 'dashboard', element: <CitizenDashboard /> },
            { path: 'new', element: <NewTransactionPage /> },
            { path: 'transaction/:id', element: <TransactionDetailsPage /> },
            { path: 'documents', element: <MyDocumentsPage /> },
            { path: 'account', element: <AccountPage />}
        ]
    },

    {
        path: '/officer',
        element: <OfficerLayout />,
        children: [
            { path: 'dashboard', element: <OfficerDashboard /> },
            { path: 'review/:id', element: <ReviewTransaction /> }
        ]
    },

    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            { path: 'dashboard', element: <AdminDashboard /> },
            { path: 'users', element: <UserManagement /> }
        ]
    },

    { path: '*', element: <NotFound /> }
])
