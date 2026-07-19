import { useEffect, useState } from "react";
import { useTransactions } from "@/data/transactions/useTransactions.ts";
import { useParams } from "react-router-dom";
import { LoadingCircle } from "@/components/ui/loading-circle/LoadingCircle.tsx";
import { PageContainer } from "@/layouts/PageContainer.tsx";
import { Section } from "@/layouts/Section.tsx";
import { formatDateAndTime } from "@/data/utils/formatDateAndTime.ts";
import StatusBadge from "@/components/ui/status-badge/StatusBadge.tsx";
import styles from "@/styles/pages/citizen/SubmittedTransactionDetails/submittedtransactiondetails.module.css";
import { mapTransactionRequestStatus } from "@/data/utils/mapTransactionRequestStatus.ts";
import { mapTransactionStepStatus } from "@/data/utils/mapTransactionStepStatus.ts";
import { getStepLegalParagraph } from "@/data/utils/getStepLegalParagraph.ts";
import { getStepRejectionReason } from "@/data/utils/getStepRejectionReason.ts";
import type { TransactionStep } from "@/data/transactions/useTransactions.ts";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { apiRequest } from "@/data/api/api.ts";
import VerificationModal from "@/components/verification/VerificationModal.tsx";
import type { VerificationResult, VerificationResponse } from "@/types/verification.types.ts";

type StepTimelineState = 'completed' | 'active' | 'rejected' | 'upcoming';

function getStepTimelineState(step: TransactionStep, currentStepOrder: number): StepTimelineState {
    if (step.status === 'rejected') {
        return 'rejected';
    }

    if (step.status === 'approved') {
        return 'completed';
    }

    if (step.status === 'waiting' && step.stepOrder === currentStepOrder) {
        return 'active';
    }

    return 'upcoming';
}

export default function SubmittedTransactionDetails() {
    const { id } = useParams<{ id: string }>();
    const { fetchSubmittedTransactionDetails, transaction, isLoading, error } = useTransactions();
    const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
    const [verifyResult, setVerifyResult] = useState<VerificationResult | null>(null);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [verifyOpen, setVerifyOpen] = useState(false);

    const handleVerify = async () => {
        if (!id) return;
        setVerifyLoading(true);
        setVerifyOpen(true);
        try {
            const res: VerificationResponse = await apiRequest(`/citizen/transactions/verify/${id}/json`);
            setVerifyResult(res.data);
        } catch {
            setVerifyResult(null);
        } finally {
            setVerifyLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchSubmittedTransactionDetails(id);
        }
    }, [fetchSubmittedTransactionDetails, id]);

    const sortedSteps = transaction?.steps
        ? [...transaction.steps].sort((firstStep, secondStep) => firstStep.stepOrder - secondStep.stepOrder)
        : [];

    const defaultExpandedStepId = sortedSteps[0]?.id;

    const toggleStepDetails = (stepId: string) => {
        setExpandedSteps((currentExpandedSteps) => ({
            ...currentExpandedSteps,
            [stepId]: !currentExpandedSteps[stepId],
        }));
    };

    if (isLoading) {
        return <LoadingCircle/>;
    }

    if (error) {
        return (
            <PageContainer>
                <h2 style={{ color: 'var(--color-danger)', marginTop: '2rem', textAlign: 'center' }}>
                    حدث خطأ ما، أعد المحاولة لاحقاً
                </h2>
                <p style={{ textAlign: 'center' }}>{error}</p>
            </PageContainer>
        );
    }

    const currentStepOrder = transaction?.currentStep || 1;

    return (
        <PageContainer>
            {transaction ? (
                <Section title={transaction.transactionName || "تفاصيل المعاملة"}>
                    <div className={styles.page_wrapper}>
                        <div className={styles.timeline_list}>
                            {sortedSteps.map((step) => {
                                const timelineState = getStepTimelineState(step, currentStepOrder);
                                const isExpanded = expandedSteps[step.id] ?? step.id === defaultExpandedStepId;
                                const legalParagraph = getStepLegalParagraph(step.data);
                                const rejectionReason = getStepRejectionReason(step.data);

                                return (
                                    <article key={step.id} className={styles.step_entry}>
                                        <div className={styles.step_content}>
                                            <div className={styles.step_header}>
                                                <div className={styles.step_heading}>
                                                    <span className={styles.step_order_label}>
                                                        المرحلة {step.stepOrder}
                                                    </span>
                                                    <h3 className={styles.step_title}>{step.sectionName}</h3>
                                                </div>

                                                <button
                                                    type="button"
                                                    className={styles.toggle_button}
                                                    onClick={() => toggleStepDetails(step.id)}
                                                    aria-expanded={isExpanded}
                                                    aria-label={isExpanded ? 'إخفاء تفاصيل المرحلة' : 'إظهار تفاصيل المرحلة'}
                                                >
                                                    {isExpanded ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>

                                            {isExpanded && (
                                                <div className={styles.step_details_card} data-state={timelineState}>
                                                    <div className={styles.step_meta_grid}>
                                                        <div className={styles.meta_item}>
                                                            <span className={styles.meta_item_label}>حالة المرحلة</span>
                                                            <StatusBadge status={mapTransactionStepStatus(step.status)} />
                                                        </div>

                                                        <div className={styles.meta_item}>
                                                            <span className={styles.meta_item_label}>الموظف المسؤول</span>
                                                            <span className={styles.meta_item_value}>
                                                                {step.employeeName || 'لم يتم تعيين موظف بعد'}
                                                            </span>
                                                        </div>

                                                        <div className={styles.meta_item}>
                                                            <span className={styles.meta_item_label}>وقت المعالجة</span>
                                                            <span className={styles.meta_item_value}>
                                                                {step.processedAt ? formatDateAndTime(step.processedAt) : 'لم تتم المعالجة بعد'}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {step.status === 'rejected' && (
                                                        <div className={styles.rejection_block}>
                                                            <span className={styles.meta_item_label}>سبب الرفض</span>
                                                            <p className={styles.legal_paragraph}>
                                                                {rejectionReason || 'لم يتم تزويد سبب الرفض.'}
                                                            </p>
                                                        </div>
                                                    )}

                                                    <div className={styles.legal_block}>
                                                        <span className={styles.meta_item_label}>الفقرة القانونية</span>
                                                        <p className={styles.legal_paragraph}>
                                                            {legalParagraph || 'لا توجد فقرة قانونية مرتبطة بهذه المرحلة حالياً.'}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className={styles.step_rail}>
                                            <div className={styles.step_line} />
                                            <div className={styles.step_node} data-state={timelineState}>
                                                <span className={styles.circle_indicator}>
                                                    {timelineState === 'completed' ? '✓' : timelineState === 'rejected' ? '✕' : step.stepOrder}
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        <div className={styles.meta_dashboard}>
                            <h3 className={styles.meta_title}>معلومات الطلب</h3>

                            <div className={styles.meta_row}>
                                <span className={styles.meta_label}>رقم الطلب</span>
                                <span className={styles.meta_value}>{transaction.id}</span>
                            </div>

                            <div className={styles.meta_row}>
                                <span className={styles.meta_label}>رقم المعاملة</span>
                                <span className={styles.meta_value}>{transaction.transactionId}</span>
                            </div>

                            <div className={styles.meta_row}>
                                <span className={styles.meta_label}>الجهة المسؤولة</span>
                                <span className={styles.meta_value}>{transaction.institutionName}</span>
                            </div>

                            <div className={styles.meta_row}>
                                <span className={styles.meta_label}>تاريخ الإنشاء</span>
                                <span className={styles.meta_value}>{formatDateAndTime(transaction.createdAt)}</span>
                            </div>

                            <div className={styles.meta_row}>
                                <span className={styles.meta_label}>آخر تحديث</span>
                                <span className={styles.meta_value}>{formatDateAndTime(transaction.updatedAt)}</span>
                            </div>

                            <div className={styles.meta_row}>
                                <span className={styles.meta_label}>حالة الطلب العامة</span>
                                <span className={styles.meta_value}>
                                    <StatusBadge status={mapTransactionRequestStatus(transaction.status)} />
                                </span>
                            </div>
                            {transaction.status === 'completed' && (
                                <button
                                    type="button"
                                    className={styles.verify_button}
                                    onClick={handleVerify}
                                >
                                    التحقق
                                </button>
                            )}
                        </div>
                    </div>
                </Section>
            ) : (
                <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--color-sub-text)' }}>
                    تعذر العثور على بيانات المعاملة المطلوبة.
                </p>
            )}
            <VerificationModal
                isOpen={verifyOpen}
                onClose={() => setVerifyOpen(false)}
                result={verifyResult}
                isLoading={verifyLoading}
            />
        </PageContainer>
    );
}
