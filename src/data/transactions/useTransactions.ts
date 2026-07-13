import {useCallback, useState} from "react";
import {apiRequest} from "@/data/api/api.ts";

export type TransactionRequestStatus = 'pending' | 'in_progress' | 'approved' | 'rejected' | 'completed';

export type TransactionStepStatus = 'approved' | 'rejected' | 'waiting';

export type TransactionStepData = Record<string, string>;

export type TransactionStep = {
    id: string;
    stepOrder: number;
    sectionId: string;
    sectionName: string;
    status: TransactionStepStatus;
    employeeId: string | null;
    employeeName: string | null;
    data: TransactionStepData;
    processedAt: string | null;
}

export type Transaction = {
    id: string,
    transactionId: string,
    transactionName: string,
    institutionId: string,
    institutionName: string,
    status: TransactionRequestStatus,
    currentStep: number,
    createdAt: string,
    updatedAt: string,
    steps: TransactionStep[],
}

export function useTransactions () {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [myDocuments, setMyDocuments] = useState<Transaction[]>([]);
    const [transaction, setTransaction] = useState<Transaction | null>(null)

    const fetchTransactions = useCallback(async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await apiRequest('/citizen/transactions/requests/list');
            setMyDocuments(response.data);
        } catch {
            setError('حدث خطأ في جلب البيانات، تحقق من وجود الانترنت وعِد المحاولة لاحقاً');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchSubmittedTransactionDetails = useCallback(async (transactionId: string) => {
        setIsLoading(true);
        setError('');
        try {
            const response = await apiRequest(`/citizen/transactions/requests/${transactionId}`);
            setTransaction(response.data);
        } catch {
            setError('حدث خطأ في جلب البيانات، تحقق من وجود الانترنت وعِد المحاولة لاحقاً');
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { fetchTransactions, fetchSubmittedTransactionDetails, myDocuments, transaction, isLoading, error }
}
