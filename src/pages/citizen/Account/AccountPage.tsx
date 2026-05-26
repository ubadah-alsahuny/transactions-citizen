import {PageContainer} from "@/layouts/PageContainer.tsx";
import {Section} from "@/layouts/Section.tsx";
import {Card} from "@/components/ui/card/Card.tsx";

import ProfilePicture from '@/assets/images/jpg/Profile_Picture.jpg'
import IDFront from '@/assets/images/jpg/ID.jpg'
import IDBack from '@/assets/images/jpg/ID_Back.jpg'

import {FaUserEdit} from "react-icons/fa";
import {BiEdit} from "react-icons/bi";
import {apiRequest} from "@/data/api.ts";
import {useEffect, useRef, useState} from "react";
import {LoadingCircle} from "@/components/ui/loading-circle/LoadingCircle.tsx";

export default function AccountPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [citizenName, setCitizenName] = useState('');
    const [citizenDateOfBirth, setCitizenDateOfBirth] = useState('');

    const [error, setError] = useState('');

    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        const handleShowProfile = async () => {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            setIsLoading(true);

            try {
                const data = await apiRequest('/citizen/profile');

                setCitizenName(data.fullName || data.data.fullName);
                setCitizenDateOfBirth(data.data.dateOfBirth);
            } catch (error: any) {
                setError(error.message);
                console.log(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        handleShowProfile();
    }, []);

    if (isLoading) {
        return (
            <LoadingCircle></LoadingCircle>
        )
    }

    return(
        <PageContainer>
            <Section title={"حسابك الشخصي"} id={"personal-account"}>
                <div style={{placeItems: "center", display: "flex", flexDirection: "row", gap: "3rem"}}>
                    <div style={{width: '18%'}}>
                        <Card
                            type="vertical"
                            width={"100%"}
                            height={"100%"}
                            image={ProfilePicture}
                            variant={'user'}
                            children={
                                <>
                                    <h4>{citizenName}</h4>
                                    <p style={{fontSize: "0.7rem"}}>صورة بخلفية بيضاء معتمدة لصاحب الحساب</p>
                                </>
                            }
                            buttonIcon={<FaUserEdit/>} buttonLabel={<p>تغيير الصورة الشخصية</p>}
                        />
                    </div>

                    <div style={{width: '82%', display: "grid", gap: "1rem"}}>
                        <ul style={{listStyle: "none"}}>
                            <li>
                                <Card
                                    width={"100%"}
                                    height={"6rem"}
                                    image={IDFront}
                                    type='horizontal'
                                    children={
                                       <>
                                            <h5>صورة الهوية الشخصية (من الأمام)</h5>
                                            <p style={{fontSize: "0.7rem"}}>
                                                سوف يتم استعمال هذه الصورة عند إرسالك طلب بخصوص أي معاملة تحتاجها
                                            </p>
                                       </>
                                    }
                                    buttonIcon={<BiEdit/>} buttonLabel={"تغيير"}>
                                </Card>
                            </li>
                            <li>
                                <Card
                                    width={"100%"}
                                    height={"6rem"}
                                    image={IDBack}
                                    type='horizontal'
                                    children={
                                        <>
                                            <h5>صورة الهوية الشخصية (من الخلف)</h5>
                                            <p style={{fontSize: "0.7rem"}}>
                                                سوف يتم استعمال هذه الصورة عند إرسالك طلب بخصوص أي معاملة تحتاجها
                                            </p>
                                        </>
                                    }
                                    buttonIcon={<BiEdit/>} buttonLabel={"تغيير"}>
                                </Card>
                            </li>
                            <li>
                                <Card
                                    width={"100%"}
                                    height={"6rem"}
                                    image={IDBack}
                                    type='horizontal'
                                    children={
                                        <>
                                            <h5>صورة الهوية الشخصية (من الخلف)</h5>
                                            <p style={{fontSize: "0.7rem"}}>
                                                سوف يتم استعمال هذه الصورة عند إرسالك طلب بخصوص أي معاملة تحتاجها
                                            </p>
                                        </>
                                    }
                                    buttonIcon={<BiEdit/>} buttonLabel={"تغيير"}>
                                </Card>
                            </li>
                            <li>
                                <Card
                                    width={"100%"}
                                    height={"6rem"}
                                    image={IDBack}
                                    type='horizontal'
                                    children={
                                        <>
                                            <h5>صورة الهوية الشخصية (من الخلف)</h5>
                                            <p style={{fontSize: "0.7rem"}}>
                                                سوف يتم استعمال هذه الصورة عند إرسالك طلب بخصوص أي معاملة تحتاجها
                                            </p>
                                        </>
                                    }
                                    buttonIcon={<BiEdit/>} buttonLabel={"تغيير"}>
                                </Card>
                            </li>
                        </ul>
                    </div>

                </div>
            </Section>
        </PageContainer>
    )
}