import type { TransactionStepStatus } from "@/data/transactions/useTransactions.ts";

export function mapTransactionStepStatus(
    status: TransactionStepStatus | null | undefined,
): string {
    if (!status) {
        return 'لا يوجد حالة';
    }

    switch (status) {
        case 'approved':
            return 'مقبول';
        case 'rejected':
            return 'مرفوض';
        case 'waiting':
            return 'في حالة انتظار';
        default:
            return 'لا يوجد حالة';
    }
}
