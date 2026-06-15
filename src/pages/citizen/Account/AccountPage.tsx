import {PageContainer} from "@/layouts/PageContainer.tsx";
import {Section} from "@/layouts/Section.tsx";
import {Card} from "@/components/ui/card/Card.tsx";

import {apiRequest} from "@/data/api/api.ts";
import {useEffect, useRef, useState} from "react";
import {LoadingCircle} from "@/components/ui/loading-circle/LoadingCircle.tsx";
import {MdAlternateEmail, MdDateRange, MdPerson} from "react-icons/md";
import {IoMdCard} from "react-icons/io";
import {BiCake} from "react-icons/bi";
import {IoWoman} from "react-icons/io5";
import {formatDate, formatDateAndTime} from "@/data/utils/formatDateAndTime.ts";

export default function AccountPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [citizenName, setCitizenName] = useState('');
    const [citizenMotherName, setCitizenMotherName] = useState('');
    const [citizenDateOfBirth, setCitizenDateOfBirth] = useState('');
    const [citizenEmail, setCitizenEmail] = useState('');
    const [citizenNationalId, setCitizenNationalId] = useState('');
    const [citizenAccountCreationDate, setCitizenAccountCreationDate] = useState('');

    const [error, setError] = useState('');

    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        const handleShowProfile = async () => {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            setIsLoading(true);

            try {
                const data = await apiRequest('/citizen/profile');

                const formatedDate = formatDate(data.data.dateOfBirth);
                const formatedCreationDate = formatDateAndTime(data.data.createdAt);

                console.log(data.data);

                setCitizenName(data.data.fullName);
                setCitizenMotherName(data.data.motherName);
                setCitizenDateOfBirth(formatedDate);
                setCitizenNationalId(data.data.nationalId);
                setCitizenEmail(data.data.email);
                setCitizenAccountCreationDate(formatedCreationDate);
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
                <div style={{placeItems: "center", display: "flex", flexDirection: "row", gap: "3rem", flexWrap: 'wrap'}}>
                    <Card
                        type="vertical"
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

                    <Card
                        type="vertical"
                        height={"100%"}
                        variant={'user'}
                        children={
                            <>
                                <div style={{width: '100%', display: 'flex', flexDirection: 'column', placeItems: 'center'}}>
                                    <IoWoman size={40} color={'var(--color-action)'}/>
                                    <h3>اسم الأم</h3>
                                </div>
                                <h4>{citizenMotherName}</h4>
                                {/*<p style={{fontSize: "0.7rem"}}>صورة بخلفية بيضاء معتمدة لصاحب الحساب</p>*/}
                            </>
                        }
                    />

                    <Card
                        type="vertical"
                        height={"100%"}
                        variant={'user'}
                        children={
                            <>
                                <div style={{width: '100%', display: 'flex', flexDirection: 'column', placeItems: 'center'}}>
                                    <MdAlternateEmail size={40} color={'var(--color-action)'}/>
                                    <h3>البريد الإلكتروني</h3>
                                </div>
                                <h4>{citizenEmail}</h4>
                                {/*<p style={{fontSize: "0.7rem"}}>صورة بخلفية بيضاء معتمدة لصاحب الحساب</p>*/}
                            </>
                        }
                    />

                    <Card
                        type="vertical"
                        height={"100%"}
                        variant={'user'}
                        children={
                            <>
                                <div style={{width: '100%', display: 'flex', flexDirection: 'column', placeItems: 'center'}}>
                                    <MdDateRange size={35} color={'var(--color-action)'}/>
                                    <h3>تاريخ إنشاء الحساب</h3>
                                </div>
                                <h4>{citizenAccountCreationDate}</h4>
                            </>
                        }
                    />
                </div>
            </Section>
        </PageContainer>
    )
}