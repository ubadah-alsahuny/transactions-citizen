import {useState} from "react";

export function useForm<T>(initialValue: T) {
    const [formData, setFormData] = useState<T>(initialValue);

    const updateField = (key: keyof T) => (value: any) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const resetForm = () => setFormData(initialValue);

    return { formData, updateField, setFormData, resetForm };
}