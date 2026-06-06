import {useEffect, useState} from "react";
import {apiRequest} from "@/data/api.ts";
import {TransactionCard} from "@/components/ui/transaction-card/TransactionCard.tsx";
import {LoadingCircle} from "@/components/ui/loading-circle/LoadingCircle.tsx";
import {PageContainer} from "@/layouts/PageContainer.tsx";
import {Section} from "@/layouts/Section.tsx";
import {mapStatus} from '@/data/mapStatus.ts';

type Transaction = {
    transactionName: string,
    institutionName: string,
    status: string,
    currentStep: number,
}

export default function MyDocumentsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [myDocuments, setMyDocuments] = useState<Transaction[]>([]);

    useEffect(() => {
        const handleShowDocuments = async () => {
            setIsLoading(true);
            try {
                const data = await apiRequest('/citizen/transactions/requests/list');
                setMyDocuments(data.data);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        }

        handleShowDocuments();
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
                                             onClick={() => {}}>
                            </TransactionCard>
                        </li>
                    ))}
                </ul>
            </Section>}
        </PageContainer>
)
}
