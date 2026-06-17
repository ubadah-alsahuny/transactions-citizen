export function mapStatus(status: string | boolean | null | undefined): string {
    if (status === null || status === undefined) {
        return 'لا يوجد حالة';
    }

    if (status === true || status === 'true') {
        return 'مُفعّل';
    }
    if (status === false || status === 'false') {
        return 'غير مُفعّل';
    }

    switch (status.toString().toLowerCase().trim()) {
        case 'pending':
        case 'in_progress':
            return 'في حالة انتظار';
        case 'approved':
        case 'completed':
        case 'accepted':
            return 'مقبول';
        case 'rejected':
            return 'مرفوض';
        default:
            return 'لا يوجد حالة';
    }
}