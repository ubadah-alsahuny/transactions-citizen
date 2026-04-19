import Input from "@/components/ui/input/Input.tsx";
import {FaPerson, FaPersonCane} from "react-icons/fa6";
import {GiFamilyTree} from "react-icons/gi";
import {MdAlternateEmail, MdLoop} from "react-icons/md";
import {Si1Password} from "react-icons/si";
import {Button} from "@/components/ui/button/Button.tsx";
import {FaPaperPlane} from "react-icons/fa";
import {PageContainer} from "@/layouts/PageContainer.tsx";
import {ElementsContainer} from "@/layouts/ElementsContainer.tsx";

export default function Register() {
    return (
        <PageContainer>
            <div style={{placeItems: 'center', height: '100vh', placeContent: 'center'}}>
                <ElementsContainer>
                    <h1>
                        أنشأ حساب جديد
                    </h1>
                    <form method={'POST'} action={'/account_created'}
                          style={{width: '100%', placeContent: 'center', placeItems: 'center', placeSelf: 'center'}}>
                        <div style={{width: '100%', display: 'flex', gap: '1rem'}}>
                            <Input onChange={() => {
                            }} label={"الاسم الأول"} type={'text'} icon={<FaPerson size={22}/>} required={true}></Input>
                            <Input onChange={() => {
                            }} label={"اسم الأب"} type={'text'} icon={<FaPersonCane size={22}/>} required={true}></Input>
                            <Input onChange={() => {
                            }} label={"الكنية"} type={'text'} icon={<GiFamilyTree size={22}/>} required={true}></Input>
                        </div>
                        <Input onChange={() => {
                        }} label={"البريد الالكتروني"} type={'email'}
                               icon={<MdAlternateEmail size={22}/>} required={true}></Input>
                        <div style={{width: '100%', display: 'flex', gap: '1rem'}}>
                            <Input onChange={() => {
                            }} label={"كلمة المرور"} type={'password'} icon={<Si1Password size={20}/>}
                                   required={true}></Input>
                            <Input onChange={() => {
                            }} label={"تأكيد كلمة المرور"} type={'password'} icon={<MdLoop size={22}/>}
                                   required={true}></Input>
                        </div>
                        <Button type={'submit'} variant={'submit'}>
                            <FaPaperPlane size={17}/>
                            أنشأ حساب
                        </Button>
                    </form>
                </ElementsContainer>
            </div>
        </PageContainer>
    )
}
