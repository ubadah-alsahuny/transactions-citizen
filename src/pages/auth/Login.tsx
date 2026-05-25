import {ElementsContainer} from "@/layouts/ElementsContainer.tsx";
import Input from "@/components/ui/input/Input.tsx";
import {IoMdCard} from "react-icons/io";
import {Si1Password} from "react-icons/si";
import {Button} from "@/components/ui/button/Button.tsx";
import {FaPaperPlane} from "react-icons/fa";
import {PageContainer} from "@/layouts/PageContainer.tsx";
import {useState} from "react";
import {apiRequest} from "@/data/api.ts";
import {useNavigate} from "react-router-dom";
import {MdAlternateEmail} from "react-icons/md";

export default function Login() {
    const navigate = useNavigate();

    // Login Information //
    const [nationalId, setNationalId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Error & Loading //
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        setIsLoading(true);

        try {
            const data = await apiRequest('/citizen/login', {
                method: 'POST',
                bodyData: {
                    nationalId,
                    email,
                    password
                }
            });

            localStorage.setItem('citizenToken', data.data.token);

            navigate('/citizen/dashboard');
        } catch (error: any) {
            console.log(error.message || 'حدث خطأ أثناء عملية تسجيل الدخول، حاول مرة أخرى')
        } finally {
            setIsLoading(false);
        }
    }

    return <PageContainer>
        <div style={{width: '100%', height: '100vh', placeContent: "center"}}>
            <ElementsContainer>
                <h1>
                    سجل دخول
                </h1>
                <form onSubmit={handleLogin}
                      style={{width: '100%', placeContent: 'center', placeItems: 'center', placeSelf: 'center'}}>
                    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                        <Input onChange={setNationalId}
                               label={"الرقم الوطني"} type={'text'}
                               value={nationalId}
                               icon={<IoMdCard size={22}/>} required={true}></Input>

                        <Input onChange={setEmail}
                               label={"البريد الالكتروني"} type={'email'}
                               value={email}
                               icon={<MdAlternateEmail size={22}/>} required={true}></Input>

                        <Input onChange={setPassword}
                               label={"كلمة المرور"} type={'password'}
                               value={password}
                               icon={<Si1Password size={20}/>}
                               required={true}></Input>
                    </div>

                    <Button type={'submit'} variant={'submit'}>
                        <FaPaperPlane size={17}/>
                        {isLoading ?
                            'يتم تسجيل الدخول' : 'سجل دخول'
                        }
                    </Button>
                </form>
            </ElementsContainer>

            <div style={{marginTop: '1rem'}}>
                <p>
                    إن كنتَ لا تملك حساباً، فـ
                    &nbsp;
                    <a href={'/register'} style={{appearance: 'none', color: 'var(--color-sub-text)'}}>
                        أنشأ حساباً جديداً
                    </a>
                </p>
            </div>
        </div>
    </PageContainer>
}
