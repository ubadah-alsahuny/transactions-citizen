export function mapInputType(keyType: string | null | undefined): string {
    switch (keyType?.toLowerCase()) {
        case 'string':
            return 'text';
        case 'number':
            return 'number';
        case 'date':
            return 'date';
        default:
            return 'text'; // fallback safety
    }
}