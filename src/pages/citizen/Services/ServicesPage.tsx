import {PageContainer} from "@/layouts/PageContainer.tsx";
import {Section} from "@/layouts/Section.tsx";
import OrganizationCard from "@/components/ui/organization-card/OrganizationCard.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {apiRequest} from "@/data/api/api.ts";
import {LoadingCircle} from "@/components/ui/loading-circle/LoadingCircle.tsx";

export default function ServicesPage() {
    interface institution {
        id: number;
        name: string;
        description: string;
        paragraph_photos: string[];
    }

    const navigation = useNavigate();

    const [institutions, setInstitutions] = useState<institution[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const handleInstitutions  = async () => {

            setIsLoading(true);

            try {
                const data = await apiRequest('/citizen/institutions');
                setInstitutions(data.data);
            } catch (e: any) {
                setError(e.message);
                console.log(e.message);
            }
            finally {
                setIsLoading(false);
            }
        }

        handleInstitutions();
    }, []);

    if(isLoading) {
        return (
            LoadingCircle({color: 'white'})
        );
    }

    if (error) {
        return (
            <PageContainer>
                <h2>
                    حدث خطأ ما، أعد المحاولة لاحقاً
                </h2>
                <p>
                    {error}
                </p>
            </PageContainer>
        )
    }

    return (
        <PageContainer>
            {/*<Input label={"ابحث عن معاملة"} icon={<FaSearch/>} ></Input>*/}
                {institutions.length != 0 ?
                    <Section title={"الدوائر الحكومية"}>
                        <ul style={{listStyle: 'none', display: 'flex', gap: '1rem', width: '100%', flexWrap: 'wrap'}}>
                            {institutions.map((institution) => (
                                <li key={institution.id}>
                                    <OrganizationCard name={institution.name} onClick={() => {navigation(`institution/${institution.id}`);}}></OrganizationCard>
                                </li>
                            ))}
                        </ul>
                    </Section>
                    :
                    <h1>
                        "لا يوجد دوائر حكومية بعد"
                    </h1>
                }
        </PageContainer>
    )
}