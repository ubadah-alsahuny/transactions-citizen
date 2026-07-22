import {toast} from "react-toastify";

export const API_BASE_URL = 'http://localhost:3000/api';
export const API_ORIGIN = API_BASE_URL.replace(/\/api$/, '');

interface ApiOptions extends RequestInit {
    bodyData?: any;
}

// 1. Removed the '?' since the default value '= {}' already marks it as optional
export async function apiRequest(endpoint: string, options: ApiOptions = {}) {
    const token = localStorage.getItem('citizenToken');

    // 2. Typed as Record<string, string> to allow dynamic string indexing safely
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        method: options.method || 'GET',
        headers,
        body: options.bodyData ? JSON.stringify(options.bodyData) : undefined,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || 'حصل خطأ غير متوقع، يرجى المحاولة لاحقاً';

        toast.error(errorMessage, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            rtl: true,
        });

        throw new Error(errorMessage);
    }

    return response.json();
}
