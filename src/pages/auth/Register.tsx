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
import {LoadingCircle} from "@/components/ui/loading-circle/LoadingCircle.tsx";
import {useAuth} from "@/data/auth/auth.ts";
import {useForm} from "@/data/utils/useForm.ts";
import {ErrorMessage} from "@/components/ui/error-message/ErrorMessage.tsx";

export default function Register() {
    const { formData, updateField } = useForm({
        firstName: '', fatherName: '', lastName: '', motherName: '',
        nationalId: '', dateOfBirth: '',
        email: '', password: '', confirmPassword: '',
    });

    const { register, error, isLoading } = useAuth();

    return (
        <PageContainer>
            <div style={{width: '100%', height: '100vh', placeContent: "center"}}>
                {error != '' ? <ErrorMessage children={error}></ErrorMessage> : null}

                <ElementsContainer>
                    <h1>
                        أنشأ حساب جديد
                    </h1>
                    <form onSubmit={(e) => { e.preventDefault(); register(formData); }}
                          style={{width: '100%', placeContent: 'center', placeItems: 'center', placeSelf: 'center'}}>
                        <div style={{width: '100%', display: 'flex', gap: '1rem'}}>
                            <Input onChange={updateField('firstName')}
                                   label={"الاسم الأول"} type={'text'}
                                   value={formData.firstName}
                                   icon={<FaPerson size={22}/>} required={true}></Input>

                            <Input onChange={updateField('fatherName')}
                                   label={"اسم الأب"} type={'text'}
                                   value={formData.fatherName}
                                   icon={<FaPersonCane size={22}/>} required={true}></Input>

                            <Input onChange={updateField('lastName')}
                                   label={"الكنية"} type={'text'}
                                   value={formData.lastName}
                                   icon={<GiFamilyTree size={22}/>} required={true}></Input>
                        </div>

                        <div style={{display: 'flex', width: '100%', gap: '1rem'}}>
                            <Input onChange={updateField('motherName')}
                                   label={"اسم الأم مع الكنية"} type={'text'}
                                   value={formData.motherName}
                                   icon={<FaPersonDress size={22}/>} required={true}></Input>

                            <Input onChange={updateField('nationalId')}
                                   label={"الرقم الوطني"} type={'text'}
                                   value={formData.nationalId}
                                   icon={<IoMdCard size={22}/>} required={true}></Input>
                        </div>

                        <Input onChange={updateField('dateOfBirth')}
                               label={"تاريخ الميلاد"} type={'date'}
                               value={formData.dateOfBirth}
                               icon={<MdDateRange size={22}/>} required={true}></Input>

                        <div style={{width: '100%'}}>
                            <Input onChange={updateField('email')}
                                   label={"البريد الالكتروني"} type={'email'}
                                   value={formData.email}
                                   icon={<MdAlternateEmail size={22}/>} required={true}></Input>
                        </div>

                        <div style={{width: '100%', display: 'flex', gap: '1rem'}}>
                            <Input onChange={updateField('password')}
                                   label={"كلمة المرور"} type={'password'}
                                   value={formData.password}
                                   icon={<Si1Password size={20}/>}
                                   required={true}></Input>

                            <Input onChange={updateField('confirmPassword')}
                                   label={"تأكيد كلمة المرور"} type={'password'}
                                   value={formData.confirmPassword}
                                   icon={<MdLoop size={22}/>} required={true}></Input>
                        </div>

                        <Button type={'submit'} variant={'submit'}>
                            <FaPaperPlane size={17}/>
                            {isLoading ?
                                <LoadingCircle></LoadingCircle>
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
