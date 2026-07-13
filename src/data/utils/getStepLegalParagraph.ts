import type { TransactionStepData } from "@/data/transactions/useTransactions.ts";

export function getStepLegalParagraph(data: TransactionStepData): string | null {
    const entry = Object.entries(data).find(([key]) => key.endsWith('LegalParagraph'));

    return entry?.[1] ?? null;
}
