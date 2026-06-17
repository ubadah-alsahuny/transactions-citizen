import {apiRequest} from "@/data/api/api.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import type {LoginFormData, RegisterFormData} from "@/data/types/auth.types.ts";

export function useAuth () {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const register = async (formData: RegisterFormData) => {
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('كلمتا المرور غير متطابقتان');
            return;
        }

        setIsLoading(true);

        const fullName = `${formData.firstName} ${formData.fatherName} ${formData.lastName}`.trim();

        try {
            const data = await apiRequest('/citizen/register', {
                method: 'POST',
                bodyData: {...formData, fullName}
            });

            localStorage.setItem('citizenToken', data.data.token);
            navigate('/citizen/dashboard');
        } catch (error: any) {
            setError(error.message || 'حدث خطأ أثناء محاولة إنشاء حساب، حاول مرة أخرى');
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (formData: LoginFormData) => {
        setError('');

        setIsLoading(true);

        try {
            const data = await apiRequest('/citizen/login', {
                method: 'POST',
                bodyData: {
                    ...formData
                }
            });

            localStorage.setItem('citizenToken', data.data.token);
            navigate('/citizen/dashboard');
        } catch (error: any) {
            setError('بيانات خاطئة (تحقق من صحة المعلومات)')
            console.log(error.message || 'حدث خطأ أثناء عملية تسجيل الدخول، حاول مرة أخرى')
        } finally {
            setIsLoading(false);
        }
    }

    const logout = () => {
        localStorage.removeItem('citizenToken');
        navigate('/login');
    };

    return { login, register, logout, error, isLoading };
}