import { PageContainer } from "@/layouts/PageContainer.tsx";
import { Section } from "@/layouts/Section.tsx";
import OrganizationCard from "@/components/ui/organization-card/OrganizationCard.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_ORIGIN, apiRequest } from "@/data/api/api.ts";
import { LoadingCircle } from "@/components/ui/loading-circle/LoadingCircle.tsx";
import cardStyles from '@/styles/ui/organization-card/organizationcard.module.css';

interface Institution {
    id: string;
    name: string;
    status: string;
    logoSvg: string | null;
    sectionsCount: number;
}

function buildInstitutionLogoUrl(logoPath: string | null): string | undefined {
    if (!logoPath) {
        return undefined;
    }

    try {
        return new URL(logoPath, `${API_ORIGIN}/`).toString();
    } catch {
        return undefined;
    }
}

export default function ServicesPage() {
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
                                    description={`عدد الأقسام: ${institution.sectionsCount}`}
                                    image={buildInstitutionLogoUrl(institution.logoSvg)}
                                    status={institution.status}
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
