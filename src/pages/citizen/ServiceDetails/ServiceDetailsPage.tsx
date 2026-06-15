import {useNavigate, useParams} from "react-router-dom";
import {apiRequest} from "@/data/api/api.ts";
import {useEffect, useState} from "react";
import {LoadingCircle} from "@/components/ui/loading-circle/LoadingCircle.tsx";
import {Section} from "@/layouts/Section.tsx";
import {PageContainer} from "@/layouts/PageContainer.tsx";
import {TransactionCard} from "@/components/ui/transaction-card/TransactionCard.tsx";
import {mapStatus} from "@/data/utils/mapStatus.ts";

type servicesType = {
    id: number;
    /*type: string;*/
    name: string;
    /*description: string;*/
}

type transaction = {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    institutionName: string,
}

export default function ServiceDetailsPage () {
    const [transactions, setTransactions] = useState<transaction[]>([]);
    const [institutionName, setInstitutionName] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const handleInstitutionTransactions = async () => {
            setIsLoading(true);

            try{
                const data = await apiRequest(`/citizen/institutions/${id}/transactions?page=1&limit=10`);
                setTransactions(data.data);
                console.log(data.data);
                setInstitutionName(data.data.institutionName);
                console.log(data.data.institutionName);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        }

        handleInstitutionTransactions();
    }, []);

    if (isLoading) {
        return (
            <LoadingCircle color={'white'}></LoadingCircle>
        )
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
            <Section title={institutionName}>
                {transactions.length !== 0 ?
                    <ul>
                        {transactions.map((t) => (
                                <li key={t.id}>
                                <TransactionCard
                                    name={t.name}
                                    description={t.description}
                                    status={mapStatus(t.isActive)}
                                    onClick={() => {
                                        navigate(`/citizen/services/transaction/${t.id}`)
                                    }}
                                ></TransactionCard>
                            </li>
                        ))}
                    </ul>
                    :
                    <h4>
                        لا يوجد معاملات جارية لهذه الدائرة الحكومية
                    </h4>}
            </Section>
        </PageContainer>
    )
}