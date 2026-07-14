import { PageContainer } from "@/layouts/PageContainer.tsx";
import { Section } from "@/layouts/Section.tsx";
import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "@/data/api/api.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingCircle } from "@/components/ui/loading-circle/LoadingCircle.tsx";
import StepCard from "@/components/ui/step-card/StepCard.tsx";
import DynamicFormBuilder from "@/components/ui/dynamic-form/DynamicFormBuilder.tsx";
import type { RequiredInitialData } from "@/components/ui/dynamic-form/fieldValidator.ts";
import styles from '@/styles/pages/citizen/TransactionDetails/transactiondetails.module.css';
import { toast } from "react-toastify";
import {
    clearTransactionDraft,
    loadTransactionDraft,
    saveTransactionDraft,
} from "@/data/transactions/transactionDraftStorage.ts";

type TransactionSteps = {
    order: number;
    sectionId: string;
    sectionName: string;
}

type TransactionDetails = {
    id: string;
    name: string;
    description: string;
    steps: TransactionSteps[];
    requiredIntialData: RequiredInitialData[];
}

export default function TransactionDetailsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const transactionId = location.pathname.split("/").pop();

    const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const [draftValues, setDraftValues] = useState<Record<string, unknown>>({});

    const draftFieldNames = useMemo(
        () => transactionDetails?.requiredIntialData.map((field) => field.keyName) ?? [],
        [transactionDetails]
    );

    useEffect(() => {
        const fetchDetails = async () => {
            setIsLoading(true);
            setTransactionDetails(null);
            setDraftValues({});
            try {
                const data = await apiRequest(`/citizen/transactions/${transactionId}`);
                setTransactionDetails(data.data);
            } catch (e) {
                console.error("Error loading transaction details:", e);
            } finally {
                setIsLoading(false);
            }
        };
        if (transactionId) fetchDetails();
    }, [transactionId]);

    useEffect(() => {
        if (!transactionId || draftFieldNames.length === 0) {
            setDraftValues({});
            return;
        }

        const savedDraft = loadTransactionDraft(transactionId, draftFieldNames);
        setDraftValues(savedDraft ?? {});
    }, [draftFieldNames, transactionId]);

    const handleDraftChange = (formData: Record<string, unknown>) => {
        if (!transactionId || draftFieldNames.length === 0) {
            return;
        }

        saveTransactionDraft(transactionId, formData, draftFieldNames);
    };

    /**
     * Called by DynamicFormBuilder once the schema has been validated successfully.
     * `formData` is a key→value map matching the `keyName` of each requiredIntialData entry.
     */
    const handleSubmitTransaction = async (formData: Record<string, unknown>) => {
        setIsSubmitLoading(true);
        try {
            // Build the payload matching the backend contract:
            // { intialData: { [keyName]: value } }
            const intialData = transactionDetails!.requiredIntialData.reduce(
                (payload, field) => {
                    const rawValue = formData[field.keyName];
                    const normalizedFieldType = field.keyType.toLowerCase();
                    let normalizedValue: string | boolean;

                    if (normalizedFieldType === 'boolean' || normalizedFieldType === 'checkbox') {
                        normalizedValue = typeof rawValue === 'boolean'
                            ? rawValue
                            : String(rawValue ?? '').toLowerCase() === 'true';
                    } else {
                        const stringValue = String(rawValue ?? '');
                        normalizedValue =
                            normalizedFieldType === 'date'
                                ? stringValue.slice(0, 10)
                                : stringValue;
                    }

                    return {
                        ...payload,
                        [field.keyName]: normalizedValue,
                    };
                },
                {} as Record<string, string | boolean>
            );

            await apiRequest(`/citizen/transactions/${transactionId}/request`, {
                method: 'POST',
                bodyData: {
                    intialData,
                },
            });

            toast.success('تم تقديم المعاملة بنجاح', {
                position: 'top-right',
                autoClose: 4000,
                theme: 'dark',
                rtl: true,
            });

            if (transactionId) {
                clearTransactionDraft(transactionId);
            }

            setDraftValues({});
            navigate('/citizen/documents');
        } catch {
            // apiRequest already shows a toast for HTTP errors
        } finally {
            setIsSubmitLoading(false);
        }
    };

    if (isLoading) {
        return <LoadingCircle />;
    }

    return (
        <PageContainer>
            {transactionDetails && (
                <div className={styles.header_presentation}>
                    <h1 className={styles.page_title}>
                        {transactionDetails.name}
                    </h1>
                    <p className={styles.page_description}>
                        {transactionDetails.description}
                    </p>
                </div>
            )}

            <Section title="تفاصيل المعاملة">
                <div className={styles.workspace_grid}>

                    {/* Primary Wing Block: Dynamic Form with Validation */}
                    <div className={styles.form_wing_block}>
                        <h3 className={styles.wing_subtitle}>متطلبات المعاملة</h3>
                        <DynamicFormBuilder
                            fields={transactionDetails?.requiredIntialData ?? []}
                            onSubmit={handleSubmitTransaction}
                            isSubmitting={isSubmitLoading}
                            defaultValues={draftValues}
                            onValuesChange={handleDraftChange}
                        />
                    </div>

                    {/* Secondary Wing Block: Sequential Sidebar Track Pipeline */}
                    <div className={styles.sidebar_track}>
                        <h3 className={styles.wing_subtitle}>مراحل سير المعاملة</h3>
                        {transactionDetails?.steps
                            .sort((a, b) => a.order - b.order)
                            .map((step) => (
                                <StepCard
                                    key={step.sectionId}
                                    stepOrder={step.order}
                                    sectionName={step.sectionName}
                                />
                            ))
                        }
                    </div>

                </div>
            </Section>
        </PageContainer>
    );
}
