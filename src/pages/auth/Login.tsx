import {ElementsContainer} from "@/layouts/ElementsContainer.tsx";
import Input from "@/components/ui/input/Input.tsx";
import {IoMdCard} from "react-icons/io";
import {Si1Password} from "react-icons/si";
import {Button} from "@/components/ui/button/Button.tsx";
import {FaPaperPlane} from "react-icons/fa";
import {PageContainer} from "@/layouts/PageContainer.tsx";
import {MdAlternateEmail} from "react-icons/md";
import {LoadingCircle} from "@/components/ui/loading-circle/LoadingCircle.tsx";
import {useForm} from "@/data/utils/useForm.ts";
import {useAuth} from "@/data/auth/auth.ts";

import styles from '@/styles/pages/auth/login.module.css';

export default function Login() {
    const { formData, updateField } = useForm({
        nationalId: '', email: '', password: '',
    });

    const { login, isLoading } = useAuth();

    return (
        <PageContainer>
            <div className={styles.login_page_wrapper}>
                <ElementsContainer>
                    <h1 className={styles.form_title}>
                        سجل دخول
                    </h1>

                    <form
                        onSubmit={(e) => { e.preventDefault(); login(formData); }}
                        className={styles.form_layout}
                    >
                        <div className={styles.inputs_stack}>
                            <Input
                                onChange={updateField('nationalId')}
                                label={"الرقم الوطني"}
                                type={'text'}
                                value={formData.nationalId}
                                icon={<IoMdCard size={20}/>}
                                required={true}
                            />

                            <Input
                                onChange={updateField('email')}
                                label={"البريد الالكتروني"}
                                type={'email'}
                                value={formData.email}
                                icon={<MdAlternateEmail size={20}/>}
                                required={true}
                            />

                            <Input
                                onChange={updateField('password')}
                                label={"كلمة المرور"}
                                type={'password'}
                                value={formData.password}
                                icon={<Si1Password size={18}/>}
                                required={true}
                            />
                        </div>

                        <Button
                            type={'submit'}
                            variant={'submit'}
                            className={styles.submit_button}
                        >
                            {isLoading ? (
                                <LoadingCircle/>
                            ) : (
                                <div className={styles.button_inner_content}>
                                    <FaPaperPlane size={14}/>
                                    <span>سجل دخول</span>
                                </div>
                            )}
                        </Button>
                    </form>
                </ElementsContainer>

                {/*<div className={styles.register_link_container}>*/}
                {/*    <p>*/}
                {/*        إن كنتَ لا تملك حساباً، فـ{' '}*/}
                {/*        <a href={'/register'} className={styles.register_anchor}>*/}
                {/*            أنشأ حساباً جديداً*/}
                {/*        </a>*/}
                {/*    </p>*/}
                {/*</div>*/}
            </div>
        </PageContainer>
    );
}