export interface RegisterFormData {
    firstName: string;
    fatherName: string;
    lastName: string;
    motherName: string;
    nationalId: string;
    dateOfBirth: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginFormData {
    nationalId: string;
    email: string;
    password: string;
}