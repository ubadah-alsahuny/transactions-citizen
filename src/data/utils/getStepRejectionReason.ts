import type { TransactionStepData } from "@/data/transactions/useTransactions.ts";

export function getStepRejectionReason(data: TransactionStepData): string | null {
    return data.rejectionReason ?? null;
}
