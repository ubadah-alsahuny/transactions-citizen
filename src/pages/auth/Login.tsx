import {ElementsContainer} from "@/layouts/ElementsContainer.tsx";
import Input from "@/components/ui/input/Input.tsx";
import {IoMdCard} from "react-icons/io";
import {Si1Password} from "react-icons/si";
import {Button} from "@/components/ui/button/Button.tsx";
import {FaPaperPlane} from "react-icons/fa";
import {PageContainer} from "@/layouts/PageContainer.tsx";
import {MdAlternateEmail} from "react-icons/md";
import {ErrorMessage} from "@/components/ui/error-message/ErrorMessage.tsx";
import {LoadingCircle} from "@/components/ui/loading-circle/LoadingCircle.tsx";
import {useForm} from "@/data/utils/useForm.ts";
import {useAuth} from "@/data/auth/auth.ts";

export default function Login() {
    const { formData, updateField } = useForm({
        nationalId: '', email: '', password: '',
    });

    const { login, error, isLoading } = useAuth();

    return <PageContainer>
        <div style={{width: '100%', height: '100vh', placeContent: "center"}}>
            {error != '' ? <ErrorMessage children={error}></ErrorMessage> : null}

            <ElementsContainer>
                <h1>
                    سجل دخول
                </h1>
                <form onSubmit={(e) => { e.preventDefault(); login(formData); }}
                      style={{width: '100%', placeContent: 'center', placeItems: 'center', placeSelf: 'center'}}>
                    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                        <Input onChange={updateField('nationalId')}
                               label={"الرقم الوطني"} type={'text'}
                               value={formData.nationalId}
                               icon={<IoMdCard size={22}/>} required={true}></Input>

                        <Input onChange={updateField('email')}
                               label={"البريد الالكتروني"} type={'email'}
                               value={formData.email}
                               icon={<MdAlternateEmail size={22}/>} required={true}></Input>

                        <Input onChange={updateField('password')}
                               label={"كلمة المرور"} type={'password'}
                               value={formData.password}
                               icon={<Si1Password size={20}/>}
                               required={true}></Input>
                    </div>

                    <Button type={'submit'} variant={'submit'}>
                        {isLoading ?
                            <LoadingCircle color={'var(--color-primary)'}></LoadingCircle>
                            :
                            <div>
                                <FaPaperPlane size={17}/>
                                &nbsp;
                                سجل دخول
                            </div>
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
