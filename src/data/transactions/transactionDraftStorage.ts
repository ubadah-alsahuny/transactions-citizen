const TRANSACTION_DRAFT_STORAGE_PREFIX = 'transaction-template-draft:';
const DEFAULT_DRAFT_TTL_MINUTES = 10;
const MINIMUM_FIELDS_TO_PERSIST = 3;

type TransactionDraftPayload = {
    savedAt: number;
    expiresAt: number;
    values: Record<string, unknown>;
};

function getDraftStorageKey(transactionId: string): string {
    return `${TRANSACTION_DRAFT_STORAGE_PREFIX}${transactionId}`;
}

function getDraftTtlMinutes(): number {
    const rawMinutes = Number(import.meta.env.VITE_TRANSACTION_TEMPLATE_DRAFT_TTL_MINUTES ?? DEFAULT_DRAFT_TTL_MINUTES);

    if (!Number.isFinite(rawMinutes) || rawMinutes <= 0) {
        return DEFAULT_DRAFT_TTL_MINUTES;
    }

    return rawMinutes;
}

function isFilledDraftValue(value: unknown): boolean {
    if (typeof value === 'boolean') {
        return value;
    }

    if (typeof value === 'string') {
        return value.trim().length > 0;
    }

    return value !== null && value !== undefined;
}

function filterAllowedValues(
    values: Record<string, unknown>,
    allowedKeys?: string[],
): Record<string, unknown> {
    if (!allowedKeys || allowedKeys.length === 0) {
        return values;
    }

    const allowedKeySet = new Set(allowedKeys);

    return Object.fromEntries(
        Object.entries(values).filter(([key]) => allowedKeySet.has(key))
    );
}

export function purgeExpiredTransactionDrafts(): void {
    const currentTime = Date.now();

    Object.keys(localStorage)
        .filter((key) => key.startsWith(TRANSACTION_DRAFT_STORAGE_PREFIX))
        .forEach((key) => {
            try {
                const rawDraft = localStorage.getItem(key);
                if (!rawDraft) {
                    return;
                }

                const parsedDraft = JSON.parse(rawDraft) as Partial<TransactionDraftPayload>;

                if (!parsedDraft.expiresAt || parsedDraft.expiresAt <= currentTime) {
                    localStorage.removeItem(key);
                }
            } catch {
                localStorage.removeItem(key);
            }
        });
}

export function loadTransactionDraft(
    transactionId: string,
    allowedKeys?: string[],
): Record<string, unknown> | null {
    purgeExpiredTransactionDrafts();

    const rawDraft = localStorage.getItem(getDraftStorageKey(transactionId));

    if (!rawDraft) {
        return null;
    }

    try {
        const parsedDraft = JSON.parse(rawDraft) as Partial<TransactionDraftPayload>;

        if (!parsedDraft.expiresAt || parsedDraft.expiresAt <= Date.now()) {
            clearTransactionDraft(transactionId);
            return null;
        }

        if (!parsedDraft.values || typeof parsedDraft.values !== 'object') {
            clearTransactionDraft(transactionId);
            return null;
        }

        return filterAllowedValues(parsedDraft.values as Record<string, unknown>, allowedKeys);
    } catch {
        clearTransactionDraft(transactionId);
        return null;
    }
}

export function saveTransactionDraft(
    transactionId: string,
    values: Record<string, unknown>,
    allowedKeys?: string[],
): void {
    purgeExpiredTransactionDrafts();

    const filteredValues = filterAllowedValues(values, allowedKeys);
    const populatedFieldsCount = Object.values(filteredValues).filter(isFilledDraftValue).length;

    if (populatedFieldsCount < MINIMUM_FIELDS_TO_PERSIST) {
        clearTransactionDraft(transactionId);
        return;
    }

    const savedAt = Date.now();
    const expiresAt = savedAt + getDraftTtlMinutes() * 60 * 1000;

    const payload: TransactionDraftPayload = {
        savedAt,
        expiresAt,
        values: filteredValues,
    };

    localStorage.setItem(getDraftStorageKey(transactionId), JSON.stringify(payload));
}

export function clearTransactionDraft(transactionId: string): void {
    localStorage.removeItem(getDraftStorageKey(transactionId));
}
