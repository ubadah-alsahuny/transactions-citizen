const BASE_URL = 'http://localhost:3000/api';

interface ApiOptions extends RequestInit {
    bodyData?: any;
}

export async function apiRequest(endpoint: string, options?: ApiOptions = {} ){
    const token = localStorage.getItem('citizenToken');

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        method: options.method || 'GET',
        headers,
        body: options.bodyData ? JSON.stringify(options.bodyData) : undefined,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error) || 'An unexpected error has occurred';
    }

    return response.json();
}