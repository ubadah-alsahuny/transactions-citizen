function parseDate (dateInput: string | Date | undefined | null): Date | null {
    if (!dateInput) return null;
    const date = new Date(dateInput);
    return isNaN(date.getTime()) ? null : date;
}

export function formatDateAndTime (dateInput: string | Date | undefined | null): string {
    const date = parseDate(dateInput);
    if (!date) return "—";

    return date.toLocaleString('ar-AE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

export function formatDate(dateInput: string | Date | undefined | null): string {
    const date = parseDate(dateInput);
    if (!date) return "—";

    return date.toLocaleDateString('ar-AE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

export function formatTime(dateInput: string | Date | undefined | null): string {
    const date = parseDate(dateInput);
    if (!date) return "—";

    return date.toLocaleTimeString('ar-AE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}