import { PageContainer } from "@/layouts/PageContainer.tsx";
import { Section } from "@/layouts/Section.tsx";
import OrganizationCard from "@/components/ui/organization-card/OrganizationCard.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRequest } from "@/data/api/api.ts";
import { LoadingCircle } from "@/components/ui/loading-circle/LoadingCircle.tsx";
import cardStyles from '@/styles/ui/organization-card/organizationcard.module.css';

export default function ServicesPage() {
    interface Institution {
        id: number;
        name: string;
        description: string;
        paragraph_photos: string[];
    }

    const navigation = useNavigate();
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const handleInstitutions = async () => {
            setIsLoading(true);
            try {
                const data = await apiRequest('/citizen/institutions');
                setInstitutions(data.data);
            } catch (e: any) {
                setError(e.message);
                setError('حدث خطأ في جلب البيانات، تحقق من وجود الانترنت وعِد المحاولة لاحقاً');
            } finally {
                setIsLoading(false);
            }
        }
        handleInstitutions();
    }, []);

    if (isLoading) {
        return <div>
            <LoadingCircle/>;
        </div>
    }

    if (error) {
        return (
            <PageContainer>
                <h2 style={{ color: 'var(--color-danger)', marginTop: '2rem' }}>
                    حدث خطأ ما، أعد المحاولة لاحقاً
                </h2>
                <p>{error}</p>
            </PageContainer>
        )
    }

    return (
        <PageContainer>
            {institutions.length !== 0 ? (
                <Section title={"الدوائر الحكومية"}>
                    <ul className={cardStyles.servicesGrid}>
                        {institutions.map((institution) => (
                            <li key={institution.id}>
                                <OrganizationCard
                                    name={institution.name}
                                    description={institution.description}
                                    onClick={() => navigation(`institution/${institution.id}`)}
                                />
                            </li>
                        ))}
                    </ul>
                </Section>
            ) : (
                <h1 style={{ marginTop: '4rem', color: 'var(--color-sub-text)' }}>
                    لا يوجد دوائر حكومية بعد
                </h1>
            )}
        </PageContainer>
    )
}