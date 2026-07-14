/**
 * DynamicFormBuilder
 * ------------------
 * Accepts an array of `requiredIntialData` from the transaction API,
 * builds a Zod schema on the fly, wires it into react-hook-form,
 * and renders the correct field type for each entry.
 *
 * Errors are surfaced ONLY on submit (per user preference).
 *
 * Usage:
 *   <DynamicFormBuilder
 *       fields={transactionDetails.requiredIntialData}
 *       onSubmit={(data) => submitTransaction(data)}
 *       isSubmitting={isSubmitLoading}
 *   />
 */

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { buildZodSchema } from './fieldValidator';
import type { RequiredInitialData } from './fieldValidator';
import DynamicField from './DynamicField';
import { Button } from '@/components/ui/button/Button';
import { MdArrowBackIos } from 'react-icons/md';
import styles from './dynamicFormBuilder.module.css';

type DynamicFormBuilderProps = {
    fields: RequiredInitialData[];
    onSubmit: (data: Record<string, unknown>) => void;
    isSubmitting?: boolean;
    defaultValues?: Record<string, unknown>;
    onValuesChange?: (data: Record<string, unknown>) => void;
};

export default function DynamicFormBuilder({
    fields,
    onSubmit,
    isSubmitting = false,
    defaultValues = {},
    onValuesChange,
}: DynamicFormBuilderProps) {
    // Build the Zod schema from the live fields list
    const schema = buildZodSchema(fields);

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        mode: 'onSubmit',     // only validate on submit
        reValidateMode: 'onSubmit',
        defaultValues,
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    useEffect(() => {
        if (!onValuesChange) {
            return;
        }

        const subscription = watch((values) => {
            onValuesChange(values as Record<string, unknown>);
        });

        return () => subscription.unsubscribe();
    }, [onValuesChange, watch]);

    const handleFormSubmit = (data: Record<string, unknown>) => {
        onSubmit(data);
    };

    if (!fields || fields.length === 0) {
        return (
            <p className={styles.empty_notice}>
                لا توجد بيانات مطلوبة لهذه المعاملة
            </p>
        );
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
            <ul className={styles.fields_list}>
                {fields.map((field) => (
                    <li key={field.id} className={styles.field_item}>
                        <DynamicField
                            keyName={field.keyName}
                            keyType={field.keyType}
                            isRequired={field.isRequired}
                            control={control}
                            error={errors[field.keyName]?.message as string | undefined}
                        />
                        {/* Required indicator legend */}
                        {field.isRequired && (
                            <span className={styles.required_badge}>مطلوب *</span>
                        )}
                    </li>
                ))}
            </ul>

            {/* Global error summary if there are any errors after first submit */}
            {Object.keys(errors).length > 0 && (
                <div className={styles.error_summary}>
                    <span>⚠️</span>
                    <p>يرجى مراجعة الحقول المُشار إليها وتصحيحها قبل الإرسال</p>
                </div>
            )}

            <Button type="submit" variant="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                    <span className={styles.btn_loading}>
                        <span className={styles.spinner} />
                        جاري إنشاء المعاملة...
                    </span>
                ) : (
                    <div className={styles.btn_inner}>
                        <span>التقديم على المعاملة</span>
                        <MdArrowBackIos size={16} style={{ transform: 'rotate(180deg)' }} />
                    </div>
                )}
            </Button>
        </form>
    );
}
