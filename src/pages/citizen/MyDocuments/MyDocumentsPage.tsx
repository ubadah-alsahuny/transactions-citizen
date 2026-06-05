import {useEffect, useState} from "react";
import {apiRequest} from "@/data/api.ts";
import {TransactionCard} from "@/components/ui/transaction-card/TransactionCard.tsx";

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
            } catch (e: any){
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        }
    }, []);

    return (
        myDocuments.length == 0 ?
        <div>
            <h1>
                لا يوجد معاملات حالياً
            </h1>
        </div>
            :
            <div>
                {myDocuments.map((d) => (
                    <TransactionCard name={d.transactionName} description={d.institutionName} isActive={true} onClick={() => {}}></TransactionCard>
                ))}
            </div>
    )
}
