import Input from "@/components/ui/input/Input.tsx";
import {FaPerson, FaPersonCane, FaPersonDress} from "react-icons/fa6";
import {GiFamilyTree} from "react-icons/gi";
import {MdAlternateEmail, MdDateRange, MdLoop} from "react-icons/md";
import {Si1Password} from "react-icons/si";
import {Button} from "@/components/ui/button/Button.tsx";
import {FaPaperPlane} from "react-icons/fa";
import {PageContainer} from "@/layouts/PageContainer.tsx";
import {ElementsContainer} from "@/layouts/ElementsContainer.tsx";
import {IoMdCard} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {apiRequest} from "@/data/api.ts";
import {LoadingCircle} from "@/components/ui/loading-circle/LoadingCircle.tsx";

export default function Register() {
    const navigate = useNavigate();

    // User Information //
    const [firstName, setFirstName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [lastName, setLastName] = useState('');
    const [motherName, setMotherName] = useState('');
    const [nationalId, setNationalId] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Error Message & Loading //
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password != confirmPassword) {
            setError('كلمتا المرور غير متطابقتان');
            return;
        }

        setIsLoading(true);

        const fullName = `${firstName} ${fatherName} ${lastName}`.trim();

        try {
            const data = await apiRequest('/citizen/register', {
                method: 'POST',
                bodyData: {
                    email,
                    password,
                    nationalId,
                    fullName,
                    dateOfBirth,
                    motherName
                }
            });

            localStorage.setItem('citizenToken', data.data.token);

            navigate('/citizen/dashboard');
        } catch (error: any) {
            setError(error.message || 'حدث خطأ أثناء محاولة إنشاء حساب، حاول مرة أخرى');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageContainer>
            <div style={{width: '100%', height: '100vh', placeContent: "center"}}>
                <ElementsContainer>
                    <h1>
                        أنشأ حساب جديد
                    </h1>
                    <form onSubmit={handleRegister}
                          style={{width: '100%', placeContent: 'center', placeItems: 'center', placeSelf: 'center'}}>
                        <div style={{width: '100%', display: 'flex', gap: '1rem'}}>
                            <Input onChange={setFirstName}
                                   label={"الاسم الأول"} type={'text'}
                                   value={firstName}
                                   icon={<FaPerson size={22}/>} required={true}></Input>

                            <Input onChange={setFatherName}
                                   label={"اسم الأب"} type={'text'}
                                   value={fatherName}
                                   icon={<FaPersonCane size={22}/>} required={true}></Input>

                            <Input onChange={setLastName}
                                   label={"الكنية"} type={'text'}
                                   value={lastName}
                                   icon={<GiFamilyTree size={22}/>} required={true}></Input>
                        </div>

                        <div style={{display: 'flex', width: '100%', gap: '1rem'}}>
                            <Input onChange={setMotherName}
                                   label={"اسم الأم مع الكنية"} type={'text'}
                                   value={motherName}
                                   icon={<FaPersonDress size={22}/>} required={true}></Input>

                            <Input onChange={setNationalId}
                                   label={"الرقم الوطني"} type={'text'}
                                   value={nationalId}
                                   icon={<IoMdCard size={22}/>} required={true}></Input>
                        </div>

                        <Input onChange={setDateOfBirth}
                               label={"تاريخ الميلاد"} type={'date'}
                               value={dateOfBirth}
                               icon={<MdDateRange size={22}/>} required={true}></Input>

                        <div style={{width: '100%'}}>
                            <Input onChange={setEmail}
                                   label={"البريد الالكتروني"} type={'email'}
                                   value={email}
                                   icon={<MdAlternateEmail size={22}/>} required={true}></Input>
                        </div>

                        <div style={{width: '100%', display: 'flex', gap: '1rem'}}>
                            <Input onChange={setPassword}
                                   label={"كلمة المرور"} type={'password'}
                                   value={password}
                                   icon={<Si1Password size={20}/>}
                                   required={true}></Input>

                            <Input onChange={setConfirmPassword}
                                   label={"تأكيد كلمة المرور"} type={'password'}
                                   value={confirmPassword}
                                   icon={<MdLoop size={22}/>} required={true}></Input>
                        </div>
                        <Button type={'submit'} variant={'submit'}>
                            <FaPaperPlane size={17}/>
                            {isLoading ?
                                <LoadingCircle color={'black'}></LoadingCircle>
                                :
                                'أنشأ حساب'
                            }
                        </Button>
                    </form>
                </ElementsContainer>

                <div style={{marginTop: '1rem'}}>
                    <p>
                        إن كنتَ تملك حساباً، فـ
                        &nbsp;
                        <a href={'/login'} style={{appearance: 'none', color: 'var(--color-sub-text)'}}>
                            سجل دخولك
                        </a>
                    </p>
                </div>
            </div>
        </PageContainer>
    )
}
