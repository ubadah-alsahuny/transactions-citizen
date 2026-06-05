import {useLocation, useNavigate} from "react-router-dom";
import {apiRequest} from "@/data/api.ts";
import {useEffect, useState} from "react";
import {LoadingCircle} from "@/components/ui/loading-circle/LoadingCircle.tsx";
import {Section} from "@/layouts/Section.tsx";
import {PageContainer} from "@/layouts/PageContainer.tsx";
import {TransactionCard} from "@/components/ui/transaction-card/TransactionCard.tsx";

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
}

export default function ServiceDetailsPage () {
    const [transactions, setTransactions] = useState<transaction[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const location = useLocation();
    const institutionID = location.pathname.split("/")[4];

    const organization = location.state as servicesType | null;

    useEffect(() => {
        const handleInstitutionTransactions = async () => {
            setIsLoading(true);

            try{
                const data = await apiRequest(`/citizen/institutions/${institutionID}/transactions?page=1&limit=10`);
                setTransactions(data.data);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        }

        handleInstitutionTransactions();
    }, []);

    if (!organization) {
        return <div>
            لم يتم العثور على الخدمة!
        </div>
    }

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
            <Section title={organization.name}>
                {transactions.length !== 0 ?
                    <ul>
                        {transactions.map((t) => (
                            t.isActive ?
                                <li key={t.id}>
                                <TransactionCard
                                    name={t.name}
                                    description={t.description}
                                    isActive={t.isActive}
                                    onClick={() => {
                                        navigate(`/citizen/services/transaction/${t.id}`)
                                    }}
                                ></TransactionCard>
                            </li> : <li key={t.id}>
                                <TransactionCard
                                    name={t.name}
                                    description={t.description}
                                    isActive={t.isActive}
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