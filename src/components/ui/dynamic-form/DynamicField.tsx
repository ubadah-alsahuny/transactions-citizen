/**
 * DynamicField
 * -----------
 * Renders the correct input element based on `keyType` from the API.
 *
 * Supported types (case-insensitive):
 *  string             → text input
 *  number             → number input
 *  phone              → tel input  (numeric keyboard on mobile)
 *  email              → email input
 *  boolean | checkbox → custom Checkbox toggle
 *  date | datetime
 *  date-time-picker   → datetime-local input with value normalizer
 *
 * Fallback: string / text input
 */

import { Controller } from 'react-hook-form';
import type { Control, FieldValues, Path } from 'react-hook-form';
import Input from '@/components/ui/input/Input';
import Checkbox from '@/components/ui/checkbox/Checkbox';
import {
    IoMdCard,
    IoMdCall,
    IoMdMail,
    IoMdCalculator,
    IoMdCalendar,
    IoMdCheckboxOutline,
} from 'react-icons/io';
import styles from './dynamicField.module.css';

type DynamicFieldProps<T extends FieldValues> = {
    keyName: string;
    keyType: string;
    isRequired: boolean;
    control: Control<T>;
    error?: string;
};

// Normalises a datetime-local value to ISO 8601 for the backend
function normalizeDatetime(raw: string): string {
    if (!raw) return '';
    try {
        return new Date(raw).toISOString();
    } catch {
        return raw;
    }
}

// Ensures an ISO date value is valid for a date input
function formatDateForInput(raw: string): string {
    if (!raw) return '';
    const parsed = new Date(raw);
    if (Number.isNaN(parsed.getTime())) return raw;

    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, '0');
    const day = String(parsed.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

// Ensures an ISO date-time value is valid for a datetime-local input
function formatDatetimeForInput(raw: string): string {
    if (!raw) return '';
    const parsed = new Date(raw);
    if (Number.isNaN(parsed.getTime())) return raw;

    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, '0');
    const day = String(parsed.getDate()).padStart(2, '0');
    const hours = String(parsed.getHours()).padStart(2, '0');
    const minutes = String(parsed.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// Returns the right icon for each type
function getIcon(type: string) {
    switch (type.toLowerCase()) {
        case 'phone':                   return <IoMdCall size={20} />;
        case 'email':                   return <IoMdMail size={20} />;
        case 'number':                  return <IoMdCalculator size={20} />;
        case 'date':
        case 'datetime':
        case 'date-time-picker':        return <IoMdCalendar size={20} />;
        case 'boolean':
        case 'checkbox':                return <IoMdCheckboxOutline size={20} />;
        default:                        return <IoMdCard size={20} />;
    }
}

export default function DynamicField<T extends FieldValues>({
    keyName,
    keyType,
    isRequired,
    control,
    error,
}: DynamicFieldProps<T>) {
    const normalizedType = keyType.toLowerCase();

    // ── Boolean / Checkbox ─────────────────────────────────────────────────
    if (normalizedType === 'boolean' || normalizedType === 'checkbox') {
        return (
            <div className={styles.field_row}>
                <div className={styles.type_badge} data-type="boolean">
                    {getIcon(keyType)}
                    <span>نعم / لا</span>
                </div>
                <Controller
                    name={keyName as Path<T>}
                    control={control}
                    render={({ field }) => (
                        <Checkbox
                            id={`field-${keyName}`}
                            label={keyName}
                            checked={!!field.value}
                            onChange={field.onChange}
                            required={isRequired}
                            error={error}
                        />
                    )}
                />
            </div>
        );
    }

    // ── Datetime ───────────────────────────────────────────────────────────
    if (
        normalizedType === 'date' ||
        normalizedType === 'datetime' ||
        normalizedType === 'date-time-picker'
    ) {
        const isDateOnly = normalizedType === 'date';

        return (
            <div className={styles.field_row}>
                <div className={styles.type_badge} data-type="date">
                    {getIcon(keyType)}
                    <span>تاريخ / وقت</span>
                </div>
                <Controller
                    name={keyName as Path<T>}
                    control={control}
                    render={({ field }) => (
                        <Input
                            id={`field-${keyName}`}
                            label={keyName}
                            icon={getIcon(keyType)}
                            type={isDateOnly ? 'date' : 'datetime-local'}
                            value={
                                isDateOnly
                                    ? formatDateForInput(field.value as string ?? '')
                                    : formatDatetimeForInput(field.value as string ?? '')
                            }
                            onChange={(raw: string) =>
                                field.onChange(
                                    isDateOnly ? raw : normalizeDatetime(raw)
                                )
                            }
                            required={isRequired}
                            error={error}
                        />
                    )}
                />
            </div>
        );
    }

    // ── All other scalar types: string, number, phone, email ───────────────
    const htmlType =
        normalizedType === 'phone'  ? 'tel'    :
        normalizedType === 'number' ? 'number' :
        normalizedType === 'email'  ? 'email'  : 'text';

    return (
        <div className={styles.field_row}>
            <div className={styles.type_badge} data-type={normalizedType}>
                {getIcon(keyType)}
                <span>{getTypeLabelAr(normalizedType)}</span>
            </div>
            <Controller
                name={keyName as Path<T>}
                control={control}
                render={({ field }) => (
                    <Input
                        id={`field-${keyName}`}
                        label={keyName}
                        icon={getIcon(keyType)}
                        type={htmlType}
                        value={field.value ?? ''}
                        onChange={field.onChange}
                        required={isRequired}
                        error={error}
                    />
                )}
            />
        </div>
    );
}

function getTypeLabelAr(type: string): string {
    switch (type) {
        case 'phone':  return 'هاتف';
        case 'email':  return 'بريد';
        case 'number': return 'رقم';
        case 'string': return 'نص';
        default:       return 'نص';
    }
}
