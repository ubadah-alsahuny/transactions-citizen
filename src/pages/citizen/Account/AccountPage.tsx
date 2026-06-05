import {PageContainer} from "@/layouts/PageContainer.tsx";
import {Section} from "@/layouts/Section.tsx";
import {Card} from "@/components/ui/card/Card.tsx";

import {apiRequest} from "@/data/api.ts";
import {useEffect, useRef, useState} from "react";
import {LoadingCircle} from "@/components/ui/loading-circle/LoadingCircle.tsx";
import {MdPerson} from "react-icons/md";
import {IoMdCard} from "react-icons/io";
import {BiCake} from "react-icons/bi";

export default function AccountPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [citizenName, setCitizenName] = useState('');
    const [citizenDateOfBirth, setCitizenDateOfBirth] = useState('');
    const [citizenNationalId, setCitizenNationalId] = useState('');

    const [error, setError] = useState('');

    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        const handleShowProfile = async () => {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            setIsLoading(true);

            try {
                const data = await apiRequest('/citizen/profile');

                const date = new Date(data.data.dateOfBirth);
                const formatedDate = date.toLocaleDateString('en-US');

                setCitizenName(data.data.fullName);
                setCitizenDateOfBirth(formatedDate);
                setCitizenNationalId(data.data.nationalId);
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
            <LoadingCircle color={'var(--color-text)'}></LoadingCircle>
        )
    }

    if (error) {
        return (
            <h1>
                {error}
            </h1>
        )
    }

    return(
        <PageContainer>
            <Section title={"حسابك الشخصي"} id={"personal-account"}>
                <div style={{placeItems: "center", display: "flex", flexDirection: "row", gap: "3rem"}}>
                    <Card
                        type="vertical"
                        width={"100%"}
                        height={"100%"}
                        variant={'user'}
                        children={
                            <>
                                <div style={{width: '100%', display: 'flex', flexDirection: 'column', placeItems: 'center'}}>
                                    <MdPerson size={40} color={'var(--color-action)'}/>
                                    <h3>المواطن</h3>
                                </div>
                                <h4>{citizenName}</h4>
                                {/*<p style={{fontSize: "0.7rem"}}>صورة بخلفية بيضاء معتمدة لصاحب الحساب</p>*/}
                            </>
                        }
                        /*buttonIcon={<FaUserEdit/>} buttonLabel={<p>تغيير الصورة الشخصية</p>}*/
                    />
                    <Card
                        type="vertical"
                        width={"100%"}
                        height={"100%"}
                        variant={'user'}
                        children={
                            <>
                                <div style={{width: '100%', display: 'flex', flexDirection: 'column', placeItems: 'center'}}>
                                    <IoMdCard size={30} color={'var(--color-action)'}/>
                                    <h3>الرقم الوطني</h3>
                                </div>
                                <h4>{citizenNationalId}</h4>
                            </>
                        }
                    />

                    <Card
                        type="vertical"
                        width={"100%"}
                        height={"100%"}
                        variant={'user'}
                        children={
                            <>
                                <div style={{width: '100%', display: 'flex', flexDirection: 'column', placeItems: 'center'}}>
                                    <BiCake size={30} color={'var(--color-action)'}/>
                                    <h3>تاريخ الميلاد</h3>
                                </div>
                                <h4>{citizenDateOfBirth}</h4>
                            </>
                        }
                    />
                </div>
            </Section>
        </PageContainer>
    )
}