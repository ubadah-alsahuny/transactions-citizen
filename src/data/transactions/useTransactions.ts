import {useState} from "react";
import {apiRequest} from "@/data/api/api.ts";

type TransactionStep = {
    id: string;
    stepOrder: number;
    sectionId: string;
    sectionName: string;
    status: string;
    employeeId: string | null;
    employeeName: string | null;
    data: Record<string, string>;
    processedAt: string | null;
}

type Transaction = {
    id: string,
    transactionName: string,
    institutionName: string,
    status: string,
    currentStep: number,
    createdAt: string,
    updatedAt: string,
    steps: TransactionStep[],
}

export function useTransactions () {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [myDocuments, setMyDocuments] = useState<Transaction[]>([]);
    const [transaction, setTransaction] = useState<Transaction>()

    const fetchTransactions = async () => {
        setIsLoading(true);
        try {
            const response = await apiRequest('/citizen/transactions/requests/list');
            setMyDocuments(response.data);
        } catch (e: any) {
            setError('حدث خطأ في جلب البيانات، تحقق من وجود الانترنت وعِد المحاولة لاحقاً');
        } finally {
            setIsLoading(false);
        }
    }

    const fetchSubmittedTransactionDetails = async (transactionId: string) => {
        setIsLoading(true);
        try {
            const response = await apiRequest(`/citizen/transactions/requests/${transactionId}`);
            setTransaction(response.data);
            console.log(response.data);
        } catch (e: any) {
            setError('حدث خطأ في جلب البيانات، تحقق من وجود الانترنت وعِد المحاولة لاحقاً');
        } finally {
            setIsLoading(false);
        }
    }

    return { fetchTransactions, fetchSubmittedTransactionDetails, myDocuments, transaction, isLoading, error }
}