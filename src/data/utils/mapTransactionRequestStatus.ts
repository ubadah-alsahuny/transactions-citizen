import type { TransactionRequestStatus } from "@/data/transactions/useTransactions.ts";

export function mapTransactionRequestStatus(
    status: TransactionRequestStatus | null | undefined,
): string {
    if (!status) {
        return 'لا يوجد حالة';
    }

    switch (status) {
        case 'pending':
        case 'in_progress':
            return 'في حالة انتظار';
        case 'approved':
        case 'completed':
            return 'مقبول';
        case 'rejected':
            return 'مرفوض';
        default:
            return 'لا يوجد حالة';
    }
}
