import { createBrowserRouter } from 'react-router-dom'

import Landing from '../pages/public/Landing.tsx'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'

import CitizenLayout from '../layouts/CitizenLayout'

import CitizenDashboard from '../pages/citizen/Dashboard/DashboardPage.tsx'
import NewTransactionPage from '../pages/citizen/NewTransaction/NewTransactionPage.tsx'
import TransactionDetailsPage from '../pages/citizen/TransactionDetails/TransactionDetailsPage.tsx'
import MyDocumentsPage from '../pages/citizen/MyDocuments/MyDocumentsPage.tsx'
import AccountPage from "../pages/citizen/Account/AccountPage.tsx";
import ServicesPage from "../pages/citizen/Services/ServicesPage.tsx";
import ServiceDetailsPage from '../pages/citizen/ServiceDetails/ServiceDetailsPage.tsx';

import NotFound from '../pages/system/NotFound'
import SubmittedTransactionDetails from "@/pages/citizen/SubmittedTransactionDetails/SubmittedTransactionDetails.tsx";

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
            { path: 'documents', element: <MyDocumentsPage /> },
            { path: 'account', element: <AccountPage />},
            { path: 'transaction/:id', element: <SubmittedTransactionDetails/> },
            {
                path: 'services',
                children: [
                    { index: true, element: <ServicesPage />},
                    { path: 'institution/:id', element: <ServiceDetailsPage />},
                    { path: 'transaction/:id', element: <TransactionDetailsPage />},
                ]
            },
        ]
    },

    { path: '*', element: <NotFound /> }
])
