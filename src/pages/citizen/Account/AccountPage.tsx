import {PageContainer} from "@/layouts/PageContainer.tsx";
import {Section} from "@/layouts/Section.tsx";
import {Card} from "@/components/ui/card/Card.tsx";

import {apiRequest} from "@/data/api/api.ts";
import {useEffect, useRef, useState} from "react";
import {LoadingCircle} from "@/components/ui/loading-circle/LoadingCircle.tsx";
import {MdAlternateEmail, MdDateRange, MdPerson} from "react-icons/md";
import {BiCake} from "react-icons/bi";
import {IoWoman} from "react-icons/io5";
import {formatDate, formatDateAndTime} from "@/data/utils/formatDateAndTime.ts";

import styles from '@/styles/pages/citizen/Account/account.module.css';

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
            <LoadingCircle></LoadingCircle>
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
                <div className={styles.profile_wrapper}>

                    {/* Centered Profile Hero Section Container */}
                    <Card
                        type="vertical"
                        height={"auto"}
                        className={styles.profile_hero}
                    >
                        <div className={styles.avatar_wrapper}>
                            <MdPerson size={45} />
                        </div>
                        <h3 className={styles.hero_name}>{citizenName}</h3>
                        <div className={styles.hero_id}>
                            الرقم الوطني: {citizenNationalId}
                        </div>
                    </Card>

                    {/* Clean 2026 Grid Module Wrapper */}
                    <div className={styles.info_grid}>

                        {/* اسم الأم */}
                        <Card type="horizontal" height={"auto"} className={styles.info_card}>
                            <div className={styles.info_card_inner}>
                                <div className={styles.icon_box}>
                                    <IoWoman size={24} />
                                </div>
                                <div className={styles.card_content}>
                                    <span className={styles.card_label}>اسم الأم</span>
                                    <h4 className={styles.card_value}>{citizenMotherName}</h4>
                                </div>
                            </div>
                        </Card>

                        {/* تاريخ الميلاد */}
                        <Card type="horizontal" height={"auto"} className={styles.info_card}>
                            <div className={styles.info_card_inner}>
                                <div className={styles.icon_box}>
                                    <BiCake size={24} />
                                </div>
                                <div className={styles.card_content}>
                                    <span className={styles.card_label}>تاريخ الميلاد</span>
                                    <h4 className={styles.card_value}>{citizenDateOfBirth}</h4>
                                </div>
                            </div>
                        </Card>

                        {/* البريد الإلكتروني (Includes anti-overflow constraints) */}
                        <Card type="horizontal" height={"auto"} className={styles.info_card}>
                            <div className={styles.info_card_inner}>
                                <div className={styles.icon_box}>
                                    <MdAlternateEmail size={24} />
                                </div>
                                <div className={styles.card_content}>
                                    <span className={styles.card_label}>البريد الإلكتروني</span>
                                    <h4 className={styles.card_value}>{citizenEmail}</h4>
                                </div>
                            </div>
                        </Card>

                        {/* تاريخ إنشاء الحساب */}
                        <Card type="horizontal" height={"auto"} className={styles.info_card}>
                            <div className={styles.info_card_inner}>
                                <div className={styles.icon_box}>
                                    <MdDateRange size={24} />
                                </div>
                                <div className={styles.card_content}>
                                    <span className={styles.card_label}>تاريخ إنشاء الحساب</span>
                                    <h4 className={styles.card_value}>{citizenAccountCreationDate}</h4>
                                </div>
                            </div>
                        </Card>

                    </div>
                </div>
            </Section>
        </PageContainer>
    )
}