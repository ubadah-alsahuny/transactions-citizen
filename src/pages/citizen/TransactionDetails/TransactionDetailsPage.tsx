import { PageContainer } from "@/layouts/PageContainer.tsx";
import { Section } from "@/layouts/Section.tsx";
import { useEffect, useState } from "react";
import { apiRequest } from "@/data/api/api.ts";
import { useLocation } from "react-router-dom";
import { LoadingCircle } from "@/components/ui/loading-circle/LoadingCircle.tsx";
import Input from "@/components/ui/input/Input.tsx";
import { IoMdCard } from "react-icons/io";
import { Button } from "@/components/ui/button/Button.tsx";
import StepCard from "@/components/ui/step-card/StepCard.tsx";
import { mapInputType } from "@/data/utils/mapInputType.ts";
import styles from '@/styles/pages/citizen/TransactionDetails/transactiondetails.module.css';
import {MdArrowBackIos} from "react-icons/md";

type TransactionSteps = {
    order: number;
    sectionId: string;
    sectionName: string;
}

type RequiredInitialData = {
    id: string;
    keyName: string;
    keyType: string;
    isRequired: boolean;
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
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            setIsLoading(true);
            try {
                const data = await apiRequest(`/citizen/transactions/${transactionId}`);
                setTransactionDetails(data.data);
            } catch (e) {
                console.error("Error loading transaction metrics:", e);
            } finally {
                setIsLoading(false);
            }
        };
        if (transactionId) fetchDetails();
    }, [transactionId]);

    const handleInputChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmitTransaction = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitLoading(true);
        // Execute transaction creation requests here
    };

    if (isLoading) {
        return <LoadingCircle/>;
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

                    {/* Primary Wing Block: Dynamic Form Requirements */}
                    <div className={styles.form_wing_block}>
                        <h3 className={styles.wing_subtitle}>متطلبات المعاملة</h3>
                        <form onSubmit={handleSubmitTransaction}>
                            <ul className={styles.fields_matrix}>
                                {transactionDetails?.requiredIntialData.map((data) => (
                                    <li key={data.id}>
                                        <Input
                                            onChange={(value: string) => handleInputChange(data.keyName, value)}
                                            label={data.keyName}
                                            icon={<IoMdCard size={20} />}
                                            required={data.isRequired}
                                            value={formData[data.keyName] || ''}
                                            type={mapInputType(data.keyType)}
                                        />
                                    </li>
                                ))}
                            </ul>

                            <Button type="submit" variant="submit">
                                {isSubmitLoading ? (
                                    <span>جاري إنشاء المعاملة...</span>
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                                        <span>التقديم على المعاملة</span>
                                        <MdArrowBackIos size={16} style={{ transform: 'rotate(180deg)' }} />
                                    </div>
                                )}
                            </Button>
                        </form>
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