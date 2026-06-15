import {useEffect} from "react";
import {TransactionCard} from "@/components/ui/transaction-card/TransactionCard.tsx";
import {LoadingCircle} from "@/components/ui/loading-circle/LoadingCircle.tsx";
import {PageContainer} from "@/layouts/PageContainer.tsx";
import {Section} from "@/layouts/Section.tsx";
import {mapStatus} from '@/data/utils/mapStatus.ts';
import {useTransactions} from "@/data/transactions/useTransactions.ts";
import {useNavigate} from "react-router-dom";

export default function MyDocumentsPage() {
    const navigate = useNavigate();
    const { fetchTransactions, myDocuments, isLoading, error } = useTransactions();

    useEffect(() => {
        fetchTransactions();
    }, []);

    if (isLoading) {
        return (
            <div>
                <LoadingCircle color={'white'}></LoadingCircle>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                {error}
            </div>
        )
    }

    return (
        <PageContainer>
            {myDocuments.length == 0 ?
            <div>
                <h1>
                    لا يوجد معاملات حالياً
                </h1>
            </div>
            :
            <Section title={'معاملاتي'}>
                <ul style={{width: '100%', gap: '1rem', display: 'flex', flexDirection: 'column'}}>
                    {myDocuments.map((d) => (
                        <li>
                            <TransactionCard name={d.transactionName} description={d.institutionName} status={mapStatus(d.status)}
                                             onClick={() => {navigate(`/citizen/transaction/${d.id}`)}}>
                            </TransactionCard>
                        </li>
                    ))}
                </ul>
            </Section>}
        </PageContainer>
)
}
