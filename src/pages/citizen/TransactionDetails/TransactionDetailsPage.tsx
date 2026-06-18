import { PageContainer } from "@/layouts/PageContainer.tsx";
import { Section } from "@/layouts/Section.tsx";
import { useEffect, useState } from "react";
import { apiRequest } from "@/data/api/api.ts";
import { useLocation } from "react-router-dom";
import { LoadingCircle } from "@/components/ui/loading-circle/LoadingCircle.tsx";
import StepCard from "@/components/ui/step-card/StepCard.tsx";
import DynamicFormBuilder from "@/components/ui/dynamic-form/DynamicFormBuilder.tsx";
import type { RequiredInitialData } from "@/components/ui/dynamic-form/fieldValidator.ts";
import styles from '@/styles/pages/citizen/TransactionDetails/transactiondetails.module.css';
import { toast } from "react-toastify";

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
    const transactionId = location.pathname.split("/").pop();

    const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            setIsLoading(true);
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
                    const rawValue = String(formData[field.keyName] ?? '');
                    const normalizedValue =
                        field.keyType.toLowerCase() === 'date'
                            ? rawValue.slice(0, 10)
                            : rawValue;

                    return {
                        ...payload,
                        [field.keyName]: normalizedValue,
                    };
                },
                {} as Record<string, string>
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